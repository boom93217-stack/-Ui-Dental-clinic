import { NextResponse } from "next/server";

interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValid(payload: Partial<BookingPayload>): payload is BookingPayload {
  return Boolean(
    payload.name &&
      payload.name.trim().length >= 2 &&
      payload.email &&
      EMAIL_PATTERN.test(payload.email) &&
      payload.phone &&
      /^\d{10}$/.test(payload.phone.replace(/\D/g, "")) &&
      payload.service &&
      payload.date &&
      payload.time
  );
}

export async function POST(request: Request) {
  let payload: Partial<BookingPayload>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  if (!isValid(payload)) {
    return NextResponse.json(
      { ok: false, message: "Missing or invalid fields." },
      { status: 400 }
    );
  }

  console.log("New appointment request:", payload);

  return NextResponse.json({ ok: true });
}
