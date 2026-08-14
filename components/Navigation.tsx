"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface NavigationProps {
  /** Ordered ids of the sections rendered on the page — drives link labels, hrefs, and scroll-spy. */
  sections?: string[];
}

const DEFAULT_SECTIONS = ["home", "about", "services", "gallery", "location", "booking"];

/** Known id -> display label. Covers both the spec's example ids and this site's real section ids. */
const LABELS: Record<string, string> = {
  home: "Home",
  hero: "Home",
  gallery: "Gallery",
  results: "Gallery",
  location: "Location",
  about: "About Us",
  services: "Services",
  booking: "Book Appointment",
};

function labelFor(id: string) {
  return (
    LABELS[id] ??
    id
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

const NAV_HEIGHT_OFFSET = 120;

export default function Navigation({ sections = DEFAULT_SECTIONS }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(sections[0]);

  useEffect(() => {
    // Cache each section's offsetTop instead of reading it on every scroll
    // tick — offsetTop reads force a synchronous layout, and doing that on
    // every scroll event is what caused scroll jank. Re-measure only on
    // resize/load, when positions can actually change.
    let sectionOffsets: { id: string; offsetTop: number }[] = [];
    let rafId: number | null = null;

    const measure = () => {
      sectionOffsets = sections
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, offsetTop: el.offsetTop } : null;
        })
        .filter((s): s is { id: string; offsetTop: number } => s !== null);
    };

    const updateActive = () => {
      rafId = null;
      const scrollPosition = window.scrollY + NAV_HEIGHT_OFFSET;

      // Pick the section with the greatest offsetTop that's still above the
      // scroll position — computed by actual document position, not array
      // order, so this stays correct regardless of the order `sections` is passed in.
      let current = sections[0];
      let bestOffsetTop = -Infinity;
      for (const { id, offsetTop } of sectionOffsets) {
        if (offsetTop <= scrollPosition && offsetTop > bestOffsetTop) {
          current = id;
          bestOffsetTop = offsetTop;
        }
      }
      setActiveSection(current);
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(updateActive);
    };

    measure();
    updateActive();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("load", measure);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [sections]);

  const ctaId = sections.includes("booking") ? "booking" : sections[sections.length - 1];
  const linkSections = sections.filter((id) => id !== ctaId);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={`#${sections[0]}`}
          className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-clinic-ink sm:text-lg"
        >
          <svg
            viewBox="0 0 32 32"
            className="h-9 w-9 shrink-0"
            aria-hidden="true"
          >
            <rect width="32" height="32" rx="9" fill="#06b6d4" />
            <path
              fill="#ffffff"
              d="M16 6c-4.4 0-7.2 2.6-7.2 6.3 0 2 .6 3.3 1.2 4.7.5 1.1.9 2.2 1.1 3.8.2 1.8.5 4 1.7 5.3.6.6 1.3.5 1.6-.5.4-1.5.9-3.4 1.6-3.4s1.2 1.9 1.6 3.4c.3 1 1 1.1 1.6.5 1.2-1.3 1.5-3.5 1.7-5.3.2-1.6.6-2.7 1.1-3.8.6-1.4 1.2-2.7 1.2-4.7C23.2 8.6 20.4 6 16 6z"
            />
          </svg>
          UI <span className="text-cyan-500">Dentist</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {linkSections.map((id) => (
            <Link
              key={id}
              href={`#${id}`}
              className={`text-sm font-medium transition-colors hover:text-cyan-600 ${
                activeSection === id ? "text-cyan-600" : "text-slate-700"
              }`}
            >
              {labelFor(id)}
            </Link>
          ))}
          <Link
            href={`#${ctaId}`}
            className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-cyan-600"
          >
            {labelFor(ctaId)}
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          {/* Always reachable on mobile, even with the menu closed. */}
          <Link
            href={`#${ctaId}`}
            className="flex min-h-[44px] items-center rounded-full bg-cyan-500 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-cyan-600"
          >
            Book
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-clinic-ink"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="flex flex-col gap-1 border-t border-slate-200 bg-white px-4 pb-4 pt-2 lg:hidden">
          {linkSections.map((id) => (
            <Link
              key={id}
              href={`#${id}`}
              onClick={() => setIsOpen(false)}
              className={`flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium hover:bg-slate-50 hover:text-cyan-600 ${
                activeSection === id ? "text-cyan-600" : "text-slate-700"
              }`}
            >
              {labelFor(id)}
            </Link>
          ))}
          <Link
            href={`#${ctaId}`}
            onClick={() => setIsOpen(false)}
            className="mt-2 flex min-h-[44px] items-center justify-center rounded-full bg-cyan-500 px-5 text-center text-sm font-semibold text-white hover:bg-cyan-600"
          >
            {labelFor(ctaId)}
          </Link>
        </nav>
      )}
    </header>
  );
}
