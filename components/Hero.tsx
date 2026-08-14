"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { useRevealOnce } from "@/hooks/useRevealOnce";

interface HeroProps {
  overlayTitle?: string;
  overlayDescription?: string;
}

const MOBILE_BREAKPOINT = 768;

export default function Hero({
  overlayTitle = "Confidence Starts With Your Smile",
  overlayDescription = "Your journey to perfect smiles starts here.",
}: HeroProps) {
  const { ref, isVisible } = useRevealOnce<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const words = overlayTitle.split(" ");

  // Pick the right-sized encode for the viewport. Autoplay always runs, even
  // under prefers-reduced-motion — this video is muted decorative background
  // footage, not a distracting animation, and gating it behind that media
  // query left desktops with "reduce motion" enabled (a common Windows
  // setting) stuck on the static poster frame while phones played fine.
  // Done imperatively on the persistent <video> node — swapping `src` via a
  // remounted element loses the play() call, since it fires on the node
  // that's about to be replaced rather than the freshly mounted one.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.src =
      window.innerWidth < MOBILE_BREAKPOINT
        ? "/videos/hero/hero-mobile.mp4"
        : "/videos/hero/hero-desktop.mp4";

    // Autoplay is only granted by browsers when the element is actually
    // muted at the DOM property level — the JSX `muted` attribute alone
    // isn't always enough before the element has been played once.
    el.muted = true;
    el.load();
    el.play().catch(() => {});
  }, []);

  const fadeUp =
    "motion-safe:transition motion-safe:duration-700 motion-safe:ease-out";
  const revealState = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-3";

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-clinic-ink md:aspect-video md:h-auto">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero/hero-desktop.mp4"
        poster="/videos/hero/hero-poster.webp"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Dark bottom-to-top gradient for headline/CTA contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      <div
        ref={ref}
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-4 pb-16 text-center sm:gap-4 sm:px-6 sm:pb-20 md:pb-24"
      >
        <h1 className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-5xl lg:text-6xl">
          {words.flatMap((word, i) => {
            const span = (
              <span
                key={`w-${i}`}
                className={`inline-block ${fadeUp} ${revealState}`}
                style={{ transitionDelay: isVisible ? `${i * 70}ms` : "0ms" }}
              >
                {word}
              </span>
            );
            // Plain sibling text node, not trailing content inside the inline-block
            // span — trailing whitespace inside an inline-block gets collapsed away
            // by the browser, which was eating the space between words.
            return i < words.length - 1 ? [span, " "] : [span];
          })}
        </h1>

        <p
          className={`max-w-xl text-sm text-white/90 sm:text-base md:text-lg ${fadeUp} ${revealState}`}
          style={{
            transitionDelay: isVisible ? `${words.length * 70 + 150}ms` : "0ms",
          }}
        >
          {overlayDescription}
        </p>

        <div
          className={`mt-2 flex flex-col gap-3 sm:flex-row ${fadeUp} ${revealState}`}
          style={{
            transitionDelay: isVisible ? `${words.length * 70 + 350}ms` : "0ms",
          }}
        >
          <Link
            href="#booking"
            className="rounded-full bg-cyan-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-105 hover:bg-cyan-600"
          >
            Book Appointment
          </Link>
          <Link
            href="#results"
            className="rounded-full border border-white/70 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-transform duration-200 hover:scale-105 hover:bg-white/10"
          >
            See Our Results
          </Link>
        </div>
      </div>
    </div>
  );
}
