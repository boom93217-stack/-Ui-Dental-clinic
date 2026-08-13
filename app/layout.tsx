import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UI Dentist | Professional Dental Care",
  description:
    "Your journey to perfect smiles starts here. Modern dental care from a clinic built around comfort and craftsmanship.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-white text-clinic-ink">{children}</body>
    </html>
  );
}
