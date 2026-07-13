"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

type Manifest = {
  frameCount: number;
  pattern: string;
  fallback: string;
};

const chapters = [
  { at: 0, label: "V ADARSH", sub: "AI ENGINEER / FULLSTACK" },
  { at: 0.28, label: "I BUILD AI", sub: "THAT LEAVES THE LAB" },
  { at: 0.56, label: "FROM IDEA", sub: "TO PRODUCT SYSTEMS" },
  { at: 0.82, label: "AGENTS, APPS", sub: "AND VIDEO INFRASTRUCTURE" },
];

function framePath(pattern: string, frame: number) {
  return pattern.replace("{frame}", String(frame).padStart(4, "0"));
}

export function ScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef(new Map<number, HTMLImageElement>());
  const manifestRef = useRef<Manifest>({ frameCount: 0, pattern: "", fallback: "/storyboards/hero-start.png" });
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [chapter, setChapter] = useState(0);
  const [isReady, setIsReady] = useState(false);

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

  const loadFrame = useCallback((index: number, draw = false) => {
    const manifest = manifestRef.current;
    const key = manifest.frameCount ? index : -1;
    const cached = imagesRef.current.get(key);
    if (cached?.complete) {
      if (draw) drawImage(cached);
      return;
    }
    const image = new Image();
    image.decoding = "async";
    image.src = manifest.frameCount ? framePath(manifest.pattern, index) : manifest.fallback;
    image.onload = () => {
      imagesRef.current.set(key, image);
      if (draw) {
        drawImage(image);
        setIsReady(true);
      }
    };
  }, [drawImage]);

  const renderProgress = useCallback(() => {
    const manifest = manifestRef.current;
    if (!manifest.frameCount) {
      loadFrame(0, true);
      return;
    }
    const target = Math.min(manifest.frameCount - 1, Math.round(progressRef.current * (manifest.frameCount - 1)));
    loadFrame(target, true);
    for (let offset = 1; offset <= 5; offset += 1) {
      if (target + offset < manifest.frameCount) loadFrame(target + offset);
      if (target - offset >= 0) loadFrame(target - offset);
    }
  }, [loadFrame]);

  useEffect(() => {
    let active = true;
    fetch("/sequences/hero/manifest.json")
      .then((response) => response.json())
      .then((manifest: Manifest) => {
        if (!active) return;
        manifestRef.current = manifest;
        loadFrame(0, true);
      })
      .catch(() => loadFrame(0, true));

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
      active = false;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [loadFrame, renderProgress]);

  return (
    <section ref={sectionRef} className="sequence" aria-label="Introduction">
      <div className="sequence-sticky">
        <canvas ref={canvasRef} className={isReady ? "is-ready" : ""} aria-hidden="true" />
        <div className="sequence-wash" aria-hidden="true" />
        <div className="sequence-counter" aria-hidden="true">0{chapter + 1} / 04</div>
        <div className="hero-copy" key={chapter}>
          <p>{chapters[chapter].sub}</p>
          <h1>{chapters[chapter].label}</h1>
        </div>
        <div className="scroll-cue"><ArrowDown size={18} /> Scroll to run the sequence</div>
      </div>
    </section>
  );
}
