"use client";

import { frameSrc, useFrameScrub } from "@/hooks/useFrameScrub";
import VideoOverlay from "@/components/VideoOverlay";

interface ResultsGalleryVideoScrollProps {
  /** Base path (under /public) to the extracted WebP frame sequence, e.g. "/videos/video_2_frames" */
  videoFramePath: string;
  /** Total number of frames in the sequence (frame_0001.webp .. frame_{totalFrames}.webp) */
  totalFrames: number;
  overlayTitle?: string;
  overlayDescription?: string;
  /** How many viewport-heights of scroll the scrub animation spans. */
  scrollHeightMultiplier?: number;
}

export default function ResultsGalleryVideoScroll({
  videoFramePath,
  totalFrames,
  overlayTitle = "Real Patients, Real Transformations",
  overlayDescription = "Explore before-and-after results from patients who trusted us with their smiles.",
  scrollHeightMultiplier = 2,
}: ResultsGalleryVideoScrollProps) {
  const { wrapperRef, currentFrame, isInView, firstFrameLoaded } =
    useFrameScrub({ videoFramePath, totalFrames, scrollHeightMultiplier });

  return (
    <>
      <div
        ref={wrapperRef}
        style={{ height: `${scrollHeightMultiplier * 100}vh` }}
        className="relative w-full"
      >
        {/* Full-screen on mobile so text/video are always in view together; a fixed
            16:9 banner only once there's enough width to spare (md+). */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-clinic-ink md:aspect-video md:h-auto">
          {isInView && firstFrameLoaded ? (
            <img
              src={frameSrc(videoFramePath, currentFrame)}
              alt="Dental clinic results gallery, transitioning from the treatment chair to a wall of before-and-after smile results"
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
