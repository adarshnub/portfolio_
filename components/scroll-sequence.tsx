"use client";

import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import heroManifest from "@/public/sequences/hero/manifest.json";

type Manifest = {
  frameCount: number;
  pattern: string;
  fallback: string;
};

type Priority = "high" | "low";

const manifest = heroManifest as Manifest;
const INITIAL_FRAME_STEP = 10;
const LOAD_CONCURRENCY = 5;

const chapters = [
  { at: 0, label: "V ADARSH", sub: "AI ENGINEER / FULLSTACK" },
  { at: 0.28, label: "I BUILD AI", sub: "THAT LEAVES THE LAB" },
  { at: 0.56, label: "FROM IDEA", sub: "TO PRODUCT SYSTEMS" },
  { at: 0.82, label: "AGENTS, APPS", sub: "AND VIDEO INFRASTRUCTURE" },
];

function framePath(pattern: string, frame: number) {
  return pattern.replace("{frame}", String(frame).padStart(4, "0"));
}

function initialFrameIndices(frameCount: number) {
  const indices = new Set<number>([0, frameCount - 1]);
  for (let index = 0; index < frameCount; index += INITIAL_FRAME_STEP) indices.add(index);
  for (const chapter of chapters) indices.add(Math.round(chapter.at * (frameCount - 1)));
  return [...indices].filter((index) => index >= 0).sort((a, b) => a - b);
}

const INITIAL_FRAME_INDICES = initialFrameIndices(manifest.frameCount);

async function runConcurrent<T>(items: T[], concurrency: number, task: (item: T) => Promise<void>) {
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const item = items[cursor];
      cursor += 1;
      await task(item);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
}

export function ScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef(new Map<number, HTMLImageElement>());
  const loadingRef = useRef(new Map<number, Promise<HTMLImageElement>>());
  const progressRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [chapter, setChapter] = useState(0);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [isBuffered, setIsBuffered] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const drawImage = useCallback((image: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !image.naturalWidth) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
  }, []);

  const loadFrame = useCallback((index: number, priority: Priority = "low") => {
    const cached = imagesRef.current.get(index);
    if (cached?.complete && cached.naturalWidth) return Promise.resolve(cached);

    const loading = loadingRef.current.get(index);
    if (loading) return loading;

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.decoding = "async";
      image.fetchPriority = priority;
      image.onload = async () => {
        try {
          await image.decode();
        } catch {
          // The load event already guarantees the image can be drawn.
        }
        imagesRef.current.set(index, image);
        resolve(image);
      };
      image.onerror = () => reject(new Error(`Unable to load hero frame ${index + 1}`));
      image.src = framePath(manifest.pattern, index + 1);
    }).finally(() => loadingRef.current.delete(index));

    loadingRef.current.set(index, promise);
    return promise;
  }, []);

  const drawNearestFrame = useCallback((target: number) => {
    const exact = imagesRef.current.get(target);
    if (exact) {
      drawImage(exact);
      return true;
    }

    for (let distance = 1; distance < manifest.frameCount; distance += 1) {
      const before = imagesRef.current.get(target - distance);
      const after = imagesRef.current.get(target + distance);
      const nearest = before ?? after;
      if (nearest) {
        drawImage(nearest);
        return true;
      }
    }
    return false;
  }, [drawImage]);

  const renderProgress = useCallback(() => {
    const target = Math.min(manifest.frameCount - 1, Math.round(progressRef.current * (manifest.frameCount - 1)));
    targetFrameRef.current = target;
    drawNearestFrame(target);

    void loadFrame(target, "high").then((image) => {
      if (targetFrameRef.current === target) {
        drawImage(image);
        setIsCanvasReady(true);
      }
    }).catch(() => undefined);

    for (let offset = 1; offset <= 3; offset += 1) {
      if (target + offset < manifest.frameCount) void loadFrame(target + offset).catch(() => undefined);
      if (target - offset >= 0) void loadFrame(target - offset).catch(() => undefined);
    }
  }, [drawImage, drawNearestFrame, loadFrame]);

  useEffect(() => {
    let active = true;
    const startedAt = performance.now();
    const initialFrames = INITIAL_FRAME_INDICES;
    let loaded = 0;

    const updateBufferProgress = () => {
      loaded += 1;
      if (active) setLoadProgress(Math.round((loaded / initialFrames.length) * 100));
    };

    async function prepareSequence() {
      try {
        const firstFrame = await loadFrame(0, "high");
        if (!active) return;
        drawImage(firstFrame);
        setIsCanvasReady(true);
      } catch {
        // The CSS first-frame background remains visible if canvas loading fails.
      }

      await runConcurrent(initialFrames, LOAD_CONCURRENCY, async (index) => {
        try {
          await loadFrame(index, index === 0 ? "high" : "low");
        } catch {
          // A missing frame should not trap the visitor on the loading screen.
        } finally {
          updateBufferProgress();
        }
      });

      const minimumDisplayTime = 700;
      const remainingDelay = Math.max(0, minimumDisplayTime - (performance.now() - startedAt));
      await new Promise((resolve) => window.setTimeout(resolve, remainingDelay));
      if (!active) return;
      setLoadProgress(100);
      setIsBuffered(true);

      const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      if (connection?.saveData) return;

      const initialSet = new Set(initialFrames);
      const remainingFrames = Array.from(
        { length: manifest.frameCount },
        (_, index) => index,
      ).filter((index) => !initialSet.has(index));

      window.setTimeout(() => {
        if (!active) return;
        void runConcurrent(remainingFrames, 3, async (index) => {
          if (!active) return;
          try {
            await loadFrame(index);
          } catch {
            // Nearby buffered frames keep the sequence usable if one request fails.
          }
        });
      }, 300);
    }

    void prepareSequence();
    return () => {
      active = false;
    };
  }, [drawImage, loadFrame]);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const maxScroll = section.offsetHeight - window.innerHeight;
      progressRef.current = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / Math.max(maxScroll, 1)));
      const nextChapter = chapters.reduce((current, item, index) => progressRef.current >= item.at ? index : current, 0);
      setChapter((current) => current === nextChapter ? current : nextChapter);
      renderProgress();
      rafRef.current = null;
    };

    const schedule = () => {
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [renderProgress]);

  const loaderStyle = { "--load-progress": `${loadProgress}%` } as CSSProperties;

  return (
    <section ref={sectionRef} className="sequence" aria-label="Introduction">
      <div className="sequence-sticky">
        <canvas ref={canvasRef} className={isCanvasReady ? "is-ready" : ""} aria-hidden="true" />
        <div className="sequence-wash" aria-hidden="true" />
        <div className="sequence-counter" aria-hidden="true">0{chapter + 1} / 04</div>
        <div className="hero-copy" key={chapter}>
          <p>{chapters[chapter].sub}</p>
          <h1>{chapters[chapter].label}</h1>
        </div>
        <div className="scroll-cue"><ArrowDown size={18} /> Scroll to run the sequence</div>

        <div
          className={`sequence-loader${isBuffered ? " is-complete" : ""}`}
          style={loaderStyle}
          role="status"
          aria-live="polite"
          aria-label={`Preparing interactive introduction: ${loadProgress}%`}
          aria-hidden={isBuffered}
        >
          <div className="loader-header">
            <span>FRAME ENGINE / STARTUP</span>
            <span>V.AD / 001</span>
          </div>
          <div className="loader-machine" aria-hidden="true">
            <span className="loader-frame loader-frame-pink" />
            <span className="loader-frame loader-frame-lime" />
            <span className="loader-frame loader-frame-blue" />
            <span className="loader-frame loader-frame-orange" />
          </div>
          <div className="loader-readout" aria-hidden="true">
            <span className="loader-label">ASSEMBLING<br />INITIAL BUFFER</span>
            <strong>{String(loadProgress).padStart(3, "0")}</strong>
            <span className="loader-unit">%</span>
          </div>
          <div className="loader-track" aria-hidden="true"><span /></div>
          <div className="loader-footer" aria-hidden="true">
            <span>BUFFER</span>
            <span>{String(Math.round((loadProgress / 100) * INITIAL_FRAME_INDICES.length)).padStart(3, "0")} / {INITIAL_FRAME_INDICES.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
