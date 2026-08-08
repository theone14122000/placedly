'use client';

import { useEffect, useRef } from 'react';

const HERO_BG_VIDEO_SRC = '/bg.mp4';

export default function HeroBgVideo({ videoSrc }: { videoSrc?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = videoSrc || HERO_BG_VIDEO_SRC;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    video.muted = true;
    void video.play().catch(() => undefined);
  }, []);

  return (
    <div className="placedly-hero-bg-video-wrap" aria-hidden>
      <video
        ref={videoRef}
        className="placedly-hero-bg-video"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="placedly-hero-bg-video-veil" />
    </div>
  );
}
