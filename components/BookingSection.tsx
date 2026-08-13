"use client";

import BookingForm, { BookingFormValues } from "@/components/BookingForm";

/**
 * Site-specific wiring for BookingForm: posts to our own /api/book route.
 * Swap this handler for an EmailJS call (or any other integration) without
 * touching BookingForm itself.
 */
export default function BookingSection() {
  const handleSubmit = async (data: BookingFormValues) => {
    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(
        "Something went wrong while sending your request. Please call us instead."
      );
    }
  };

  return <BookingForm onSubmit={handleSubmit} />;
}
