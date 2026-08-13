"use client";

import { useRevealOnce } from "@/hooks/useRevealOnce";

interface RevealTextProps {
  text: string;
  as?: "h2" | "h3";
  className?: string;
  /** Reveal word-by-word with a light stagger, instead of as one block. */
  wordReveal?: boolean;
}

/**
 * One-shot fade/slide-up heading reveal, triggered on first viewport entry.
 * Mirrors VideoOverlay's word-reveal treatment so headline motion feels
 * consistent whether it sits over a video or in a plain section.
 */
export default function RevealText({
  text,
  as = "h2",
  className = "",
  wordReveal = false,
}: RevealTextProps) {
  const { ref, isVisible } = useRevealOnce<HTMLHeadingElement>();
  const words = wordReveal ? text.split(" ") : [];

  const revealBase =
    "motion-safe:transition motion-safe:duration-700 motion-safe:ease-out";
  const revealState = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-3";

  const content = wordReveal ? (
    words.map((word, i) => (
      <span
        key={i}
        className={`inline-block ${revealBase} ${revealState}`}
        style={{ transitionDelay: isVisible ? `${i * 70}ms` : "0ms" }}
      >
        {word}
        {i < words.length - 1 ? " " : ""}
      </span>
    ))
  ) : (
    <span className={`inline-block ${revealBase} ${revealState}`}>{text}</span>
  );

  return as === "h3" ? (
    <h3 ref={ref} className={className}>
      {content}
    </h3>
  ) : (
    <h2 ref={ref} className={className}>
      {content}
    </h2>
  );
}
