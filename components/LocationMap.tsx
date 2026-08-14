"use client";

import Image from "next/image";

import { useRevealOnce } from "@/hooks/useRevealOnce";

interface OfficeHour {
  label: string;
  value: string;
}

interface LocationMapProps {
  address?: string;
  phone?: string;
  email?: string;
  hours?: OfficeHour[];
}

const DEFAULT_HOURS: OfficeHour[] = [
  { label: "Mon - Fri", value: "8:00 AM - 6:00 PM" },
  { label: "Saturday", value: "9:00 AM - 2:00 PM" },
  { label: "Sunday", value: "Closed" },
];

export default function LocationMap({
  address = "123 Smile Avenue, Wellness District, Springfield, ST 12345",
  phone = "+1 (555) 010-2024",
  email = "hello@wedesignsmiles.com",
  hours = DEFAULT_HOURS,
}: LocationMapProps) {
  const mapQuery = encodeURIComponent(address);
  const { ref: photoRef, isVisible: photoVisible } =
    useRevealOnce<HTMLDivElement>();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">
          Visit Us
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-clinic-ink sm:text-4xl">
          Find Our Clinic
        </h2>
        <p className="mt-3 text-slate-600">
          Conveniently located with easy parking.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        <div className="flex flex-col gap-6 lg:col-span-3">
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <div className="aspect-video w-full">
              <iframe
                title="UI Dentist clinic location"
                src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div
            ref={photoRef}
            className={`aspect-video w-full overflow-hidden rounded-2xl motion-safe:transition motion-safe:duration-700 motion-safe:ease-out ${
              photoVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
          >
            <Image
              src="/images/contact-reception.webp"
              alt="UI Dentist reception area"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 rounded-2xl bg-slate-50 p-6 sm:p-8 lg:col-span-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Address
            </h3>
            <p className="mt-1 text-clinic-ink">{address}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Phone
            </h3>
            <a
              href={`tel:${phone.replace(/[^+\d]/g, "")}`}
              className="mt-1 block text-clinic-ink hover:text-sky-600"
            >
              {phone}
            </a>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Email
            </h3>
            <a
              href={`mailto:${email}`}
              className="mt-1 block text-clinic-ink hover:text-sky-600"
            >
              {email}
            </a>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Hours
            </h3>
            <ul className="mt-1 space-y-1">
              {hours.map((h) => (
                <li key={h.label} className="flex justify-between gap-4 text-sm">
                  <span className="text-slate-500">{h.label}</span>
                  <span className="text-clinic-ink">{h.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
