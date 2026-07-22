"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

const chapters = [
  { at: 0, label: "V ADARSH", sub: "AI ENGINEER / FULLSTACK" },
  { at: 0.28, label: "I BUILD AI", sub: "THAT LEAVES THE LAB" },
  { at: 0.56, label: "FROM IDEA", sub: "TO PRODUCT SYSTEMS" },
  { at: 0.82, label: "AGENTS, APPS", sub: "AND VIDEO INFRASTRUCTURE" },
];

export function ScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(6);
  const frameRef = useRef<number | null>(null);
  const [chapter, setChapter] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fallback = window.setTimeout(() => setReady(true), 4500);
    return () => window.clearTimeout(fallback);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      frameRef.current = null;
      const sectionTop = window.scrollY + section.getBoundingClientRect().top;
      const scrollDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, (window.scrollY - sectionTop) / scrollDistance));
      const nextChapter = chapters.reduce(
        (current, item, index) => (progress >= item.at ? index : current),
        0,
      );
      const timelineProgress = reduceMotion
        ? nextChapter / (chapters.length - 1)
        : progress;
      const targetTime = timelineProgress * Math.max(durationRef.current - 0.06, 0);

      setChapter((current) => (current === nextChapter ? current : nextChapter));

      if (
        video.readyState >= HTMLMediaElement.HAVE_METADATA
        && Math.abs(video.currentTime - targetTime) > 0.025
      ) {
        video.currentTime = targetTime;
      }
    };

    const requestUpdate = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(update);
      }
    };

    window.requestAnimationFrame(update);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const markReady = () => setReady(true);
  const loaderStyle = { "--load-progress": ready ? "100%" : "0%" } as CSSProperties;

  return (
    <section ref={sectionRef} className="sequence" aria-label="Introduction">
      <div className="sequence-sticky">
        <video
          ref={videoRef}
          className={`sequence-video${ready ? " is-ready" : ""}`}
          poster="/sequences/hero/frame-0001.webp"
          preload="auto"
          muted
          playsInline
          aria-hidden="true"
          tabIndex={-1}
          onLoadedMetadata={(event) => {
            durationRef.current = event.currentTarget.duration || 6;
            event.currentTarget.pause();
            markReady();
            window.requestAnimationFrame(() => window.dispatchEvent(new Event("scroll")));
          }}
          onLoadedData={markReady}
          onCanPlay={markReady}
          onError={markReady}
        >
          <source
            src="/omnivideos/hero-scroll-master-mobile.mp4?v=20260722-keyframes"
            type="video/mp4"
            media="(max-width: 900px)"
          />
          <source
            src="/omnivideos/hero-scroll-master.mp4?v=20260722-keyframes"
            type="video/mp4"
          />
        </video>

        <div className="sequence-wash" aria-hidden="true" />
        <div className="sequence-counter" aria-hidden="true">0{chapter + 1} / 04</div>
        <div className="hero-copy" key={chapter}>
          <p>{chapters[chapter].sub}</p>
          <h1>{chapters[chapter].label}</h1>
        </div>
        <div className="scroll-cue"><ArrowDown size={18} /> Scroll to run the sequence</div>

        <div
          className={`sequence-loader${ready ? " is-complete" : ""}`}
          style={loaderStyle}
          role="status"
          aria-live="polite"
          aria-label={ready ? "Interactive introduction ready" : "Preparing interactive introduction"}
          aria-hidden={ready}
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
            <span className="loader-label">PREPARING<br />SCROLL FILM</span>
            <strong>{ready ? "100" : "000"}</strong>
            <span className="loader-unit">%</span>
          </div>
          <div className="loader-track" aria-hidden="true"><span /></div>
          <div className="loader-footer" aria-hidden="true">
            <span>VIDEO BUFFER</span>
            <span>24 FPS / GOP 06</span>
          </div>
        </div>
      </div>
    </section>
  );
}
