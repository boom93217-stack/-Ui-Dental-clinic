import dynamic from "next/dynamic";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroVideoScroll from "@/components/HeroVideoScroll";
import SectionSkeleton from "@/components/SectionSkeleton";

const ResultsGalleryVideoScroll = dynamic(
  () => import("@/components/ResultsGalleryVideoScroll"),
  { loading: () => <SectionSkeleton /> }
);
const VideoSection3 = dynamic(() => import("@/components/VideoSection3"), {
  loading: () => <SectionSkeleton />,
});
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
          "results",
          "clinic",
          "location",
          "booking",
          "about",
          "services",
        ]}
      />
      <main>
        <div id="hero" className="relative scroll-mt-20">
          <HeroVideoScroll
            videoFramePath="/videos/video_2_frames"
            totalFrames={20}
            overlayTitle="Confidence Starts With Your Smile"
            overlayDescription="Your journey to perfect smiles starts here."
          />
        </div>

        <div id="results" className="relative scroll-mt-20">
          <ResultsGalleryVideoScroll
            videoFramePath="/videos/video_1_frames"
            totalFrames={20}
            overlayTitle="Real Patients, Real Transformations"
            overlayDescription="Explore before-and-after results from patients who trusted us with their smiles."
          />
        </div>

        <div id="clinic" className="relative scroll-mt-20">
          <VideoSection3
            videoFramePath="/videos/video_3_frames"
            totalFrames={20}
            overlayTitle="A Clinic Designed Around Your Comfort"
            overlayDescription="Every space designed for your peace of mind."
          />
        </div>

        <div id="location" className="scroll-mt-20">
          <LocationMap />
        </div>

        <div id="booking" className="scroll-mt-20">
          <BookingSection />
        </div>

        <div id="about" className="scroll-mt-20">
          <AboutUs />
        </div>

        <div id="services" className="scroll-mt-20">
          <ServicesMenu />
        </div>
      </main>
      <Footer />
    </>
  );
}
