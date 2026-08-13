"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import RevealText from "@/components/RevealText";

export interface BookingFormValues {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
}

interface BookingFormProps {
  /** Called with the validated form values on submit — wire this to EmailJS, an API route, etc. Throw to show the error state. */
  onSubmit: (data: BookingFormValues) => Promise<void> | void;
}

const SERVICES = ["Cleaning", "Whitening", "Restoration", "Consultation", "Other"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX_LENGTH = 300;
const BUSINESS_OPEN = "09:00";
const BUSINESS_CLOSE = "18:00";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function maxBookingDateISO() {
  const max = new Date();
  max.setDate(max.getDate() + 60);
  return max.toISOString().split("T")[0];
}

type Status = "idle" | "success" | "error";

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({ mode: "onBlur", reValidateMode: "onChange" });

  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const minDate = todayISO();
  const maxDate = maxBookingDateISO();
  const messageLength = watch("message")?.length ?? 0;

  const submitHandler = async (data: BookingFormValues) => {
    setStatus("idle");
    setStatusMessage("");

    try {
      await onSubmit(data);
      setStatus("success");
      setStatusMessage("Thank you! We'll contact you soon.");
      reset();
    } catch (err) {
      setStatus("error");
      setStatusMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong while sending your request. Please call us instead."
      );
    }
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-lg border px-4 py-2.5 text-clinic-ink shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
      hasError
        ? "border-red-400 focus:border-red-500"
        : "border-slate-300 focus:border-cyan-500"
    }`;

  return (
    <section className="bg-sky-50 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[600px] px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600">
            Book an Appointment
          </p>
          <RevealText
            text="Ready to love your smile?"
            wordReveal
            className="mt-2 text-3xl font-semibold tracking-tight text-clinic-ink sm:text-4xl"
          />
          <p className="mt-3 text-slate-600">
            Tell us a little about yourself and pick a time that works for you.
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(submitHandler)}
          className="mt-10 space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-clinic-ink"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              className={fieldClass(!!errors.name)}
              {...register("name", {
                required: "Please enter your full name.",
                minLength: { value: 2, message: "Name must be at least 2 characters." },
              })}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-clinic-ink"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="jane@example.com"
                className={fieldClass(!!errors.email)}
                {...register("email", {
                  required: "Please enter your email address.",
                  pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address." },
                })}
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-clinic-ink"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(555) 123-4567"
                className={fieldClass(!!errors.phone)}
                {...register("phone", {
                  required: "Please enter your phone number.",
                  validate: (value) =>
                    /^\d{10}$/.test(value.replace(/\D/g, "")) ||
                    "Enter a valid 10-digit phone number.",
                })}
              />
              {errors.phone && (
                <p className="mt-1.5 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="service"
              className="mb-1.5 block text-sm font-medium text-clinic-ink"
            >
              Preferred Service
            </label>
            <select
              id="service"
              defaultValue=""
              className={fieldClass(!!errors.service)}
              {...register("service", { required: "Please select a service." })}
            >
              <option value="" disabled>
                Select a service
              </option>
              {SERVICES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="mt-1.5 text-sm text-red-600">{errors.service.message}</p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="date"
                className="mb-1.5 block text-sm font-medium text-clinic-ink"
              >
                Preferred Date
              </label>
              <input
                id="date"
                type="date"
                min={minDate}
                max={maxDate}
                className={fieldClass(!!errors.date)}
                {...register("date", {
                  required: "Select a preferred date.",
                  validate: (value) => {
                    if (value < minDate) return "Date cannot be in the past.";
                    if (value > maxDate)
                      return "Please choose a date within the next 60 days.";
                    return true;
                  },
                })}
              />
              {errors.date && (
                <p className="mt-1.5 text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="time"
                className="mb-1.5 block text-sm font-medium text-clinic-ink"
              >
                Preferred Time
              </label>
              <input
                id="time"
                type="time"
                min={BUSINESS_OPEN}
                max={BUSINESS_CLOSE}
                className={fieldClass(!!errors.time)}
                {...register("time", {
                  required: "Select a preferred time.",
                  validate: (value) =>
                    (value >= BUSINESS_OPEN && value <= BUSINESS_CLOSE) ||
                    "Choose a time between 9:00 AM and 6:00 PM.",
                })}
              />
              {errors.time && (
                <p className="mt-1.5 text-sm text-red-600">{errors.time.message}</p>
              )}
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-baseline justify-between">
              <label htmlFor="message" className="block text-sm font-medium text-clinic-ink">
                Message <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <span className="text-xs text-slate-400">
                {messageLength}/{MESSAGE_MAX_LENGTH}
              </span>
            </div>
            <textarea
              id="message"
              rows={4}
              maxLength={MESSAGE_MAX_LENGTH}
              placeholder="Anything you'd like us to know before your visit?"
              className={fieldClass(!!errors.message)}
              {...register("message", {
                maxLength: {
                  value: MESSAGE_MAX_LENGTH,
                  message: `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.`,
                },
              })}
            />
            {errors.message && (
              <p className="mt-1.5 text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Request Appointment"}
          </button>

          {status === "success" && (
            <p
              role="status"
              className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
            >
              {statusMessage}
            </p>
          )}
          {status === "error" && statusMessage && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
