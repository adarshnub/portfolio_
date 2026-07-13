"use client";

import { useEffect, useRef, useState } from "react";

const stages = ["PRODUCT", "MODEL", "QUEUE", "RENDER", "OUTPUT"];

export function SystemSequence() {
  const shellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const shell = shellRef.current;
    const video = videoRef.current;
    if (!shell || !video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        void video.play();
        return;
      }
      video.pause();
    }, { threshold: 0.42 });

    observer.observe(shell);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateStage = () => {
      if (!video.duration) return;
      const progress = video.currentTime / video.duration;
      setActiveStage(Math.min(stages.length - 1, Math.floor(progress * stages.length)));
    };

    video.addEventListener("timeupdate", updateStage);
    return () => video.removeEventListener("timeupdate", updateStage);
  }, []);

  return (
    <div ref={shellRef} className="system-sequence" aria-label="Autoplaying AI system pipeline video">
      <video
        ref={videoRef}
        className={isReady ? "is-ready" : ""}
        src="/omnivideos/One_connected_system_no_black_202607131711.mp4"
        poster="/storyboards/system-start.png"
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => setIsReady(true)}
        aria-hidden="true"
      />
      <div className="system-sequence-glass" aria-hidden="true" />
      <div className="system-stage-list" aria-hidden="true">
        {stages.map((stage, index) => (
          <span className={index === activeStage ? "is-active" : ""} key={stage}>{stage}</span>
        ))}
      </div>
    </div>
  );
}
