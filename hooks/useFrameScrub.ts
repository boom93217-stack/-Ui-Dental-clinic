"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_PAD = 4;

export function frameSrc(basePath: string, frameIndex: number) {
  const n = String(frameIndex + 1).padStart(FRAME_PAD, "0");
  return `${basePath}/frame_${n}.webp`;
}

interface UseFrameScrubOptions {
  videoFramePath: string;
  totalFrames: number;
  /** How many viewport-heights of scroll the scrub animation spans. */
  scrollHeightMultiplier?: number;
}

/**
 * Drives a scroll-scrubbed image sequence: lazy-loads frames once the section
 * nears the viewport (Intersection Observer), then maps scroll progress through
 * a tall wrapper element onto a frame index (rAF-throttled scroll listener).
 */
export function useFrameScrub({
  videoFramePath,
  totalFrames,
  scrollHeightMultiplier = 3,
}: UseFrameScrubOptions) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const framesRequestedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const [currentFrame, setCurrentFrame] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  // Intersection Observer: only start loading/tracking once the section is near the viewport.
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "200px 0px", threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Lazy-load frames: first frame eagerly for a fast first paint, the rest during idle time.
  useEffect(() => {
    if (!isInView || framesRequestedRef.current) return;
    framesRequestedRef.current = true;

    const first = new window.Image();
    first.src = frameSrc(videoFramePath, 0);
    first.onload = () => setFirstFrameLoaded(true);

    const preloadRemaining = () => {
      for (let i = 1; i < totalFrames; i++) {
        const img = new window.Image();
        img.src = frameSrc(videoFramePath, i);
      }
    };

    const ric = (
      window as typeof window & {
        requestIdleCallback?: (
          cb: () => void,
          opts?: { timeout: number }
        ) => number;
      }
    ).requestIdleCallback;

    if (ric) {
      ric(preloadRemaining, { timeout: 2000 });
    } else {
      setTimeout(preloadRemaining, 300);
    }
  }, [isInView, videoFramePath, totalFrames]);

  // Scroll listener: map scroll progress through the (tall) wrapper onto a frame index.
  useEffect(() => {
    if (!isInView) return;

    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const node = wrapperRef.current;
        if (!node) return;

        const rect = node.getBoundingClientRect();
        const scrollableDistance = rect.height - window.innerHeight;
        if (scrollableDistance <= 0) return;

        const scrolled = Math.min(Math.max(-rect.top, 0), scrollableDistance);
        const progress = scrolled / scrollableDistance;
        const frameIndex = Math.min(
          totalFrames - 1,
          Math.floor(progress * totalFrames)
        );

        setCurrentFrame((prev) => (prev !== frameIndex ? frameIndex : prev));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, totalFrames]);

  return {
    wrapperRef,
    currentFrame,
    isInView,
    firstFrameLoaded,
    scrollHeightMultiplier,
  };
}
