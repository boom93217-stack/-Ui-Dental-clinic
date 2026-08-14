import Image from "next/image";

import VideoOverlay from "@/components/VideoOverlay";

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
  return (
    <div className="relative h-screen w-full overflow-hidden bg-clinic-ink md:aspect-video md:h-auto">
      <Image
        src={imageSrc}
        alt="Confident, healthy smile at UI Dentist"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <VideoOverlay
        text={overlayTitle}
        description={overlayDescription}
        headingLevel="h1"
        wordReveal
      />
    </div>
  );
}
