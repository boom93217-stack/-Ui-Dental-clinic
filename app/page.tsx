import dynamic from "next/dynamic";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionSkeleton from "@/components/SectionSkeleton";

const ResultsGalleryVideoScroll = dynamic(
  () => import("@/components/ResultsGalleryVideoScroll"),
  { loading: () => <SectionSkeleton /> }
);
const LocationMap = dynamic(() => import("@/components/LocationMap"), {
  loading: () => <SectionSkeleton />,
});
const BookingSection = dynamic(() => import("@/components/BookingSection"), {
  loading: () => <SectionSkeleton />,
});
const AboutUs = dynamic(() => import("@/components/AboutUs"), {
  loading: () => <SectionSkeleton />,
});
const ServicesMenu = dynamic(() => import("@/components/ServicesMenu"), {
  loading: () => <SectionSkeleton />,
});

export default function Home() {
  return (
    <>
      <Navigation
        sections={[
          "hero",
          "about",
          "services",
          "results",
          "location",
          "booking",
        ]}
      />
      <main>
        <div id="hero" className="relative scroll-mt-20">
          <Hero
            imageSrc="/images/home-hero.webp"
            overlayTitle="Confidence Starts With Your Smile"
            overlayDescription="Your journey to perfect smiles starts here."
          />
        </div>

        <div id="about" className="scroll-mt-20">
          <AboutUs />
        </div>

        <div id="services" className="scroll-mt-20">
          <ServicesMenu />
        </div>

        <div id="results" className="relative scroll-mt-20">
          <ResultsGalleryVideoScroll
            videoFramePath="/videos/video_1_frames"
            totalFrames={20}
            overlayTitle="Real Smiles, Real Results"
            overlayDescription="See real before and after transformations."
          />
        </div>

        <div id="location" className="scroll-mt-20">
          <LocationMap />
        </div>

        <div id="booking" className="scroll-mt-20">
          <BookingSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
