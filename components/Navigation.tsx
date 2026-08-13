"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface NavigationProps {
  /** Ordered ids of the sections rendered on the page — drives link labels, hrefs, and scroll-spy. */
  sections?: string[];
}

const DEFAULT_SECTIONS = ["home", "videos", "gallery", "about", "services", "booking"];

/** Known id -> display label. Covers both the spec's example ids and this site's real section ids. */
const LABELS: Record<string, string> = {
  home: "Home",
  hero: "Home",
  videos: "Videos",
  clinic: "Videos",
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
    const handleScroll = () => {
      const scrollPosition = window.scrollY + NAV_HEIGHT_OFFSET;

      // Pick the section with the greatest offsetTop that's still above the
      // scroll position — computed by actual document position, not array
      // order, so this stays correct regardless of the order `sections` is passed in.
      let current = sections[0];
      let bestOffsetTop = -Infinity;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition && el.offsetTop > bestOffsetTop) {
          current = id;
          bestOffsetTop = el.offsetTop;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const ctaId = sections.includes("booking") ? "booking" : sections[sections.length - 1];
  const linkSections = sections.filter((id) => id !== ctaId);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={`#${sections[0]}`}
          className="text-base font-semibold tracking-tight text-clinic-ink sm:text-lg"
        >
          WE DESIGN <span className="text-cyan-500">SMILES</span>
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

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-clinic-ink lg:hidden"
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

      {isOpen && (
        <nav className="flex flex-col gap-1 border-t border-slate-200 bg-white px-4 pb-4 pt-2 lg:hidden">
          {linkSections.map((id) => (
            <Link
              key={id}
              href={`#${id}`}
              onClick={() => setIsOpen(false)}
              className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-50 hover:text-cyan-600 ${
                activeSection === id ? "text-cyan-600" : "text-slate-700"
              }`}
            >
              {labelFor(id)}
            </Link>
          ))}
          <Link
            href={`#${ctaId}`}
            onClick={() => setIsOpen(false)}
            className="mt-2 rounded-full bg-cyan-500 px-5 py-2 text-center text-sm font-semibold text-white hover:bg-cyan-600"
          >
            {labelFor(ctaId)}
          </Link>
        </nav>
      )}
    </header>
  );
}
