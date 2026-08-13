interface VideoOverlayProps {
  /** Heading text shown in the white gradient region at the bottom of the video. */
  text: string;
  /** Supporting subtext shown beneath the heading. */
  description: string;
  /** Heading tag to render — keep exactly one h1 per page across composed sections. */
  headingLevel?: "h1" | "h2" | "h3";
  showScrollIndicator?: boolean;
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
}: VideoOverlayProps) {
  const Heading = headingLevel;

  return (
    <>
      {/* Bottom-to-transparent white gradient overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-t from-white/85 to-transparent" />

      {/* Text overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 px-4 pb-6 text-center sm:gap-2 sm:px-6 sm:pb-8 md:pb-10">
        <Heading className="text-xl font-semibold leading-tight tracking-tight text-clinic-ink sm:text-2xl md:text-4xl lg:text-5xl">
          {text}
        </Heading>
        <p className="max-w-xl text-xs leading-relaxed text-slate-700 sm:text-sm md:text-base lg:text-lg">
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
          className="h-6 w-6 animate-bounce text-clinic-ink"
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
