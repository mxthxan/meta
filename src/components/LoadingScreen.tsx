import { useEffect, useState, useCallback, useRef } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

// 🕶️ Video Intro and White Flash Component
export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<'video-intro' | 'white-flash' | 'complete'>('video-intro');
  const videoRef = useRef<HTMLVideoElement>(null);

  // 🚀 UPDATED VIDEO URL (Kept for completeness)
  const VR_INTRO_VIDEO_URL = 'https://ik.imagekit.io/jacw2jgvs/loading.mp4';
  
  // Set the video play time to exactly 13 seconds as requested.
  const VIDEO_PLAY_TIME_SECONDS = 13;
  
  // Define the duration for the white flash animation in milliseconds (1s for 'animate-white-flash')
  const WHITE_FLASH_DURATION_MS = 1000;

  // The component is considered "complete" when the phase transitions out of 'white-flash'.
  const handleCompletion = useCallback(() => {
    // This function will be called 1 second after the white-flash starts.
    setPhase('complete');
    // Call the parent's onComplete to transition to the main content (Hero Section).
    onComplete();
  }, [onComplete]);

  // Function to transition from video to the white flash and then trigger onComplete
  const switchToWhiteFlashAndComplete = useCallback(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.pause();
    }

    // Set to the white flash phase
    setPhase('white-flash');

    // Wait for the white flash animation to finish (1 second) and then trigger onComplete.
    // This is set to fire 1000ms after the flash starts, which is 13 + 1.0 = 14 seconds from start.
    setTimeout(handleCompletion, WHITE_FLASH_DURATION_MS);
  }, [handleCompletion]);

  useEffect(() => {
    let videoAutoTransitionTimeout: NodeJS.Timeout | null = null;
    
    // Auto transition logic for the video phase
    if (phase === 'video-intro') {
      // Set a timeout for the automatic transition after 13 seconds.
      // This acts as a fallback/primary transition trigger.
      videoAutoTransitionTimeout = setTimeout(() => {
        if (phase === 'video-intro') {
          switchToWhiteFlashAndComplete();
        }
      }, VIDEO_PLAY_TIME_SECONDS * 1000); 
    }

    return () => {
      // Clear the timeout when the component unmounts or phase changes
      if (videoAutoTransitionTimeout) clearTimeout(videoAutoTransitionTimeout);
    };
  }, [phase, switchToWhiteFlashAndComplete]);

  // Handler for video's time update (Triggers the switch exactly at 13 seconds)
  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoElement = e.currentTarget;
    // Use a small buffer to ensure the 13.00s point is hit, or rely on the setTimeout above.
    if (videoElement.currentTime >= VIDEO_PLAY_TIME_SECONDS && phase === 'video-intro') {
      switchToWhiteFlashAndComplete();
    }
  };

  const showVideo = phase === 'video-intro';
  const showFlashEffect = phase === 'white-flash';
  const isComponentActive = phase !== 'complete';

  // The entire component fades out when phase is 'complete'.
  if (!isComponentActive && !showFlashEffect) {
    return null; 
  }

  return (
    <>
      {/* Mobile-only Banner - Visible only on mobile screens */}
      <div className="fixed top-0 left-0 right-0 md:hidden z-[60] bg-black bg-opacity-70 px-4 py-3 text-center backdrop-blur-sm">
        <p className="text-white font-medium text-xs">
          For the best experience, use desktop or large screen devices
        </p>
      </div>

      {/* The main container is shown only until the 'complete' phase. */}
      <div 
        className={`fixed inset-0 z-50 bg-black overflow-hidden flex items-center justify-center 
                    transition-opacity duration-500 ease-out 
                    ${phase === 'complete' ? 'opacity-0' : 'opacity-100'}`}
      >

        {/* --- VIDEO INTRO ELEMENT (Phase: 'video-intro') --- */}
        <div
          // This container ensures the video is the primary visual element
          className={`absolute inset-0 bg-black transition-opacity duration-500 ease-in
                      ${showVideo ? 'opacity-100 z-30' : 'opacity-0 z-0'}`}
          style={{ display: showVideo ? 'block' : 'none' }}
        >
          <video
            ref={videoRef}
            src={VR_INTRO_VIDEO_URL}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-contain md:object-cover"
            onTimeUpdate={handleVideoTimeUpdate} // Trigger the transition at 13s
          />

          {/* Skip Button */}
          <button
            onClick={switchToWhiteFlashAndComplete} // Skip immediately triggers the white flash
            className="absolute bottom-6 right-6 px-6 py-3 bg-white bg-opacity-20 text-white
                       rounded-full backdrop-blur-sm hover:bg-opacity-30 transition-all
                       text-lg font-semibold z-40 border border-white border-opacity-30 shadow-lg"
          >
            SKIP
          </button>
        </div>

        {/* --- WHITE FLASH TRANSITION (Phase: 'white-flash') --- */}
        <div
          // The white flash is now the final stage before removal.
          className={`absolute inset-0 z-40 bg-white
                      ${showFlashEffect ? 'opacity-100 animate-white-flash' : 'opacity-0'}`}
          style={{
            // Show the flash div, but it will be instantly made transparent by the CSS animation.
            // The white flash effect is 1s, which aligns with the setTimeout(handleCompletion, 1000).
            display: showFlashEffect ? 'block' : 'none',
          }}
        />

        {/* The worn-view content (progress bar, text) is completely removed. */}
      </div>

      {/* The style block is now managed entirely in global.css */}
    </>
  );
}