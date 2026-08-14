"use client";

import { useRevealOnce } from "@/hooks/useRevealOnce";

interface VideoOverlayProps {
  /** Heading text shown in the white gradient region at the bottom of the video. */
  text: string;
  /** Supporting subtext shown beneath the heading. */
  description: string;
  /** Heading tag to render — keep exactly one h1 per page across composed sections. */
  headingLevel?: "h1" | "h2" | "h3";
  showScrollIndicator?: boolean;
  /** Reveal the heading word-by-word with a light stagger, instead of as one block. */
  wordReveal?: boolean;
}

/**
 * Shared bottom-of-video overlay: white-to-transparent gradient, title/description
 * text, and a bouncing scroll-down indicator. Reused across every video section so
 * the gradient, spacing, and typography stay pixel-identical.
 */
export default function VideoOverlay({
  text,
  description,
  headingLevel = "h2",
  showScrollIndicator = true,
  wordReveal = false,
}: VideoOverlayProps) {
  const Heading = headingLevel;
  const { ref, isVisible } = useRevealOnce<HTMLDivElement>();
  const words = wordReveal ? text.split(" ") : [];

  const revealBase =
    "motion-safe:transition motion-safe:duration-700 motion-safe:ease-out";
  const revealState = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-3";

  return (
    <>
      {/* Bottom-to-transparent white gradient overlay, tall enough to keep the
          heading legible over busy photo content. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-white/90 via-white/55 to-transparent" />

      {/* Text overlay */}
      <div
        ref={ref}
        className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 px-4 pb-12 text-center sm:gap-2 sm:px-6 sm:pb-16 md:pb-20"
      >
        <Heading className="text-xl font-semibold leading-tight tracking-tight text-clinic-ink sm:text-2xl md:text-4xl lg:text-5xl">
          {wordReveal ? (
            words.flatMap((word, i) => {
              const span = (
                <span
                  key={`w-${i}`}
                  className={`inline-block ${revealBase} ${revealState}`}
                  style={{ transitionDelay: isVisible ? `${i * 70}ms` : "0ms" }}
                >
                  {word}
                </span>
              );
              // The separating space is a plain sibling text node, not trailing
              // content inside the inline-block span — browsers collapse
              // whitespace at the end of an inline-block's own line box, which
              // was silently eating the space between words.
              return i < words.length - 1 ? [span, " "] : [span];
            })
          ) : (
            <span className={`inline-block ${revealBase} ${revealState}`}>
              {text}
            </span>
          )}
        </Heading>
        <p
          className={`max-w-xl text-xs leading-relaxed text-slate-700 sm:text-sm md:text-base lg:text-lg ${revealBase} ${revealState}`}
          style={{
            transitionDelay: isVisible
              ? wordReveal
                ? `${words.length * 70 + 100}ms`
                : "150ms"
              : "0ms",
          }}
        >
          {description}
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-2 flex justify-center transition-opacity duration-500 ${
          showScrollIndicator ? "opacity-70" : "opacity-0"
        }`}
      >
        <svg
          className="h-6 w-6 motion-safe:animate-bounce text-clinic-ink"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </>
  );
}
