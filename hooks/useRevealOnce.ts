"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires `isVisible` true the first time the element enters the viewport, then
 * disconnects — a one-shot reveal trigger. Consumers apply the fade/slide via
 * `motion-safe:` CSS classes so `prefers-reduced-motion` users get the final
 * state without the transition.
 */
export function useRevealOnce<T extends HTMLElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px", ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
