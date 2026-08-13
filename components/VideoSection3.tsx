"use client";

import { frameSrc, useFrameScrub } from "@/hooks/useFrameScrub";
import VideoOverlay from "@/components/VideoOverlay";

export { default as VideoOverlay } from "@/components/VideoOverlay";

interface VideoSection3Props {
  /** Base path (under /public) to the extracted WebP frame sequence, e.g. "/videos/video_3_frames" */
  videoFramePath: string;
  /** Total number of frames in the sequence (frame_0001.webp .. frame_{totalFrames}.webp) */
  totalFrames: number;
  overlayTitle?: string;
  overlayDescription?: string;
  /** How many viewport-heights of scroll the scrub animation spans. */
  scrollHeightMultiplier?: number;
}

export default function VideoSection3({
  videoFramePath,
  totalFrames,
  overlayTitle = "Professional Clinic Design - Built for Your Comfort",
  overlayDescription = "Every space designed for your peace of mind.",
  scrollHeightMultiplier = 3,
}: VideoSection3Props) {
  const { wrapperRef, currentFrame, isInView, firstFrameLoaded } =
    useFrameScrub({ videoFramePath, totalFrames, scrollHeightMultiplier });

  return (
    <>
      {/* Subtle visual separation from the preceding section */}
      <div
        className="mx-auto my-10 h-px w-24 bg-slate-200 sm:my-14 md:my-16"
        aria-hidden="true"
      />

      <div
        ref={wrapperRef}
        style={{ height: `${scrollHeightMultiplier * 100}vh` }}
        className="relative w-full"
      >
        <div className="sticky top-0 aspect-video w-full overflow-hidden bg-clinic-ink">
          {isInView && firstFrameLoaded ? (
            <img
              src={frameSrc(videoFramePath, currentFrame)}
              alt="Dental clinic interior transitioning from an empty patient waiting area to active clinic flow"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <div className="absolute inset-0 h-full w-full animate-pulse bg-slate-300" />
          )}

          <VideoOverlay
            text={overlayTitle}
            description={overlayDescription}
            headingLevel="h2"
            showScrollIndicator={currentFrame < 2}
          />
        </div>
      </div>
    </>
  );
}
