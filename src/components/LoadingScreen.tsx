import { useEffect, useState, useCallback, useRef } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

// 🕶️ Video Intro, White Flash, and VR Loading Screen Component
export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'video-intro' | 'white-flash' | 'worn-view'>('video-intro');
  const videoRef = useRef<HTMLVideoElement>(null);

  // 🚀 UPDATED VIDEO URL
  const VR_INTRO_VIDEO_URL = 'https://ik.imagekit.io/s2s89dfe5/Untitled%20video%20-%20Made%20with%20Clipchamp.mp4';
  
  // Set the transition time to exactly 40 seconds as requested.
  const TRANSITION_TIME_SECONDS = 40;

  const handleComplete = useCallback(() => {
    // Delay final onComplete call slightly after progress reaches 100
    setTimeout(onComplete, 500);
  }, [onComplete]);

  // Function to transition from video to the white flash and then to the loading screen
  const switchToLoadingScreen = useCallback(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.pause();
      // Set to the white flash phase
      setPhase('white-flash');
    }

    // Wait for the 1s white flash animation to finish, then show the loading content
    setTimeout(() => {
      setPhase('worn-view');
    }, 1000);
  }, []);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout | null = null;
    let videoAutoTransitionTimeout: NodeJS.Timeout | null = null;

    if (phase === 'video-intro') {
      // Set a timeout for the automatic transition at 40s (in case onTimeUpdate is missed)
      videoAutoTransitionTimeout = setTimeout(() => {
        if (phase === 'video-intro') {
          switchToLoadingScreen();
        }
      }, TRANSITION_TIME_SECONDS * 1000 + 100); // Add a small buffer
    }
    else if (phase === 'worn-view') {
      setProgress(0); // Reset progress for the new phase
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval!);
            handleComplete();
            return 100;
          }
          return Math.min(100, prev + 0.8);
        });
      }, 25);
    }

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (videoAutoTransitionTimeout) clearTimeout(videoAutoTransitionTimeout);
    };
  }, [phase, handleComplete, switchToLoadingScreen]);

  // Handler for video's time update (Triggers the switch exactly at 40 seconds)
  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoElement = e.currentTarget;
    if (videoElement.currentTime >= TRANSITION_TIME_SECONDS && phase === 'video-intro') {
      switchToLoadingScreen();
    }
  };

  const contentVisible = phase === 'worn-view';
  const showVideo = phase === 'video-intro';
  const showFlashEffect = phase === 'white-flash';

  const progressText = `ACCESSING SERVERS... ${Math.min(100, progress.toFixed(0))}%`;
  const mainLoadingText = progress < 100 ? progressText : 'LOADING COMPLETE. ENTERING METAVERSE...';

  return (
    <>
      <div className={`fixed inset-0 z-50 bg-black overflow-hidden flex items-center justify-center`}>

        {/* --- VIDEO INTRO ELEMENT (Phase: 'video-intro') --- */}
        <div
          className={`absolute inset-0 bg-black
                      transition-opacity duration-500 ease-in
                      ${showVideo ? 'opacity-100 z-30' : 'opacity-0 z-0'}`}
          style={{ display: showVideo ? 'block' : 'none' }}
        >
          <video
            ref={videoRef}
            src={VR_INTRO_VIDEO_URL}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            onTimeUpdate={handleVideoTimeUpdate} // Trigger the transition at 40s
          />

          {/* Skip Button */}
          <button
            onClick={switchToLoadingScreen} // Skip immediately triggers the white flash
            className="absolute bottom-6 right-6 px-6 py-3 bg-white bg-opacity-20 text-white
                        rounded-full backdrop-blur-sm hover:bg-opacity-30 transition-all
                        text-lg font-semibold z-40 border border-white border-opacity-30 shadow-lg"
          >
            SKIP
          </button>
        </div>

        {/* --- WHITE FLASH TRANSITION (Phase: 'white-flash') --- */}
        <div
          // This div is a solid white screen that fades out using the animate-white-flash utility
          className={`absolute inset-0 z-40 bg-white
                      ${showFlashEffect ? 'opacity-100 animate-white-flash' : 'opacity-0'}`}
          style={{
            display: showFlashEffect ? 'block' : 'none',
          }}
        />

        {/* --- WORN VIEW CONTENT (Phase: 'worn-view') --- */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center z-20
                          transition-opacity duration-700 delay-300
                          ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>

          {/* Background effects - Now uses the Tron Grid CSS */}
          <div className={`absolute inset-0 tron-grid-bg`}/>

          <div className={`text-center space-y-4 max-w-lg w-full p-4 ${contentVisible ? 'animate-fade-in-content' : 'opacity-0'}`}>

            {/* Main Title: MetaVerse */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-widest text-shadow-cyberpunk mb-4 glitch-text" data-text="METAVERSE">
              METAVERSE
            </h1>
            
            {/* Subtitle 1: Hackathon Name */}
            <p className="text-2xl font-semibold text-cyan-400 font-sans tracking-wider">
                24 Hours National Level Hackathon
            </p>

            {/* Subtitle 2: Tagline */}
            <p className="text-lg text-gray-400 font-light italic mb-8">
                Innovation meets Imagination in the Digital Frontier
            </p>

            {/* Progress Bar */}
            <div className="relative w-full h-3 bg-gray-900 rounded-full overflow-hidden mx-auto border border-cyan-500 mt-6">
              <div
                className="absolute inset-y-0 left-0 bg-cyan-500 rounded-full transition-all duration-300 shadow-cyan-glow"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Loading Text */}
            <p className="text-xl text-green-400 font-mono animate-pulse pt-2">
              {mainLoadingText}
            </p>
          </div>
        </div>
      </div>

      {/* The style block is now managed entirely in global.css */}
    </>
  );
}