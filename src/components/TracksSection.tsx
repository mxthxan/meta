import { Building2, Rocket, Zap, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const sponsorsData = [
  {
    icon: Building2,
    company: 'Tech Corp',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    icon: Rocket,
    company: 'InnovateLabs',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: Zap,
    company: 'FutureTech',
    color: 'from-green-500 to-teal-600'
  },
  {
    icon: Globe,
    company: 'MetaSolutions',
    color: 'from-orange-500 to-red-600'
  }
];

export default function Sponsors() {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Infinite scroll setup
  const sponsorCount = sponsorsData.length;
  const itemWidth = 280; // Width of each sponsor card + gap
  const totalScrollWidth = itemWidth * sponsorCount;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Start from middle position for infinite scroll illusion
    const startPosition = totalScrollWidth;
    container.scrollLeft = startPosition;
    setScrollPosition(startPosition);

    // Handle infinite scroll
    const handleScroll = () => {
      const scroll = container.scrollLeft;
      
      // Reset to middle when reaching end
      if (scroll >= totalScrollWidth * 2) {
        container.scrollLeft = totalScrollWidth;
        setScrollPosition(totalScrollWidth);
      }
      // Reset to middle when scrolling too far left
      else if (scroll <= 0) {
        container.scrollLeft = totalScrollWidth;
        setScrollPosition(totalScrollWidth);
      } else {
        setScrollPosition(scroll);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [totalScrollWidth, sponsorCount]);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setScrollStart(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const diff = e.clientX - dragStart;
    container.scrollLeft = scrollStart - diff;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setScrollStart(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const diff = e.touches[0].clientX - dragStart;
    container.scrollLeft = scrollStart - diff;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Button scroll handlers with inertia
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 350;
    const targetScroll =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <section id="sponsors" className="relative py-24 px-4 overflow-hidden bg-black hidden lg:block">
      <style>{`
        /* Hide scrollbar */
        .sponsors-container::-webkit-scrollbar {
          display: none;
        }
        .sponsors-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Our Sponsors
          </h2>
          <p className="text-xl text-cyan-400 glow-text">
            Powered by industry leaders
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-6" />
        </div>

        {/* Scrollable Container with Navigation */}
        <div className="relative group">
          {/* Left Navigation Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-6 md:left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-cyan-500 to-purple-600 p-3 rounded-full hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 group/btn"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform" />
          </button>

          {/* Right Navigation Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-6 md:right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-cyan-500 to-purple-600 p-3 rounded-full hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 group/btn"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform" />
          </button>

          {/* Infinite Scrollable Content */}
          <div className="relative">
            {/* Blur Overlay with Text */}
            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 blur-3xl" />
                <div className="relative bg-black/80 backdrop-blur-md px-12 py-6 rounded-2xl border border-cyan-500/30 shadow-2xl">
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-center whitespace-nowrap">
                    Will be unveiled soon
                  </h3>
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-3" />
                </div>
              </div>
            </div>

            {/* Blurred Content */}
            <div
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="sponsors-container flex gap-8 overflow-x-auto py-12 px-8 select-none blur-sm"
              style={{
                cursor: isDragging ? 'grabbing' : 'grab',
                scrollBehavior: 'smooth'
              }}
            >
              {/* Infinite loop: 3 copies of sponsors for seamless scrolling */}
              {[...Array(3)].map((_, setIndex) =>
                sponsorsData.map((sponsor, index) => {
                  const Icon = sponsor.icon;
                  const uniqueKey = `${setIndex}-${index}`;
                  
                  return (
                    <div
                      key={uniqueKey}
                      className="flex flex-col items-center justify-center px-8 py-8 flex-shrink-0 group/sponsor hover:scale-110 transition-all duration-300 ease-out"
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover/sponsor:from-cyan-500/20 group-hover/sponsor:via-purple-500/20 group-hover/sponsor:to-pink-500/20 rounded-full blur-xl opacity-0 group-hover/sponsor:opacity-100 transition-all duration-300 -z-10" />
                      
                      <div
                        className={`w-28 h-28 rounded-full bg-gradient-to-br ${sponsor.color} flex items-center justify-center mb-4 shadow-xl group-hover/sponsor:shadow-2xl group-hover/sponsor:shadow-cyan-500/50 transition-all duration-300 transform group-hover/sponsor:scale-110`}
                      >
                        <Icon className="w-14 h-14 text-white" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white whitespace-nowrap text-center">
                        {sponsor.company}
                      </h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mt-3 opacity-0 group-hover/sponsor:opacity-100 transition-opacity duration-300" />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Infinite scroll indicator */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === 1 ? 'w-8 bg-cyan-400' : 'w-2 bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info Text */}
        <div className="mt-20 text-center">
          <p className="text-lg text-purple-300 mb-2">
            Thank you to our amazing sponsors for making this event possible
          </p>
          <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
            <span></span> 
          </p>
        </div>
      </div>
    </section>
  );
}