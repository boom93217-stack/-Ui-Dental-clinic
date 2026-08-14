"use client";

import Image from "next/image";
import Link from "next/link";

import { useRevealOnce } from "@/hooks/useRevealOnce";

interface HeroProps {
  /** Path (under /public) to the hero image. */
  imageSrc: string;
  overlayTitle?: string;
  overlayDescription?: string;
}

export default function Hero({
  imageSrc,
  overlayTitle = "Confidence Starts With Your Smile",
  overlayDescription = "Your journey to perfect smiles starts here.",
}: HeroProps) {
  const { ref, isVisible } = useRevealOnce<HTMLDivElement>();
  const words = overlayTitle.split(" ");

  const fadeUp =
    "motion-safe:transition motion-safe:duration-700 motion-safe:ease-out";
  const revealState = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-3";

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-clinic-ink md:aspect-video md:h-auto">
      <Image
        src={imageSrc}
        alt="Confident, healthy smile at UI Dentist"
        fill
        priority
        sizes="100vw"
        className="object-cover motion-safe:animate-hero-zoom"
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
