import { useEffect, useState, useCallback, useRef } from 'react';

// --- Game Configuration ---
const GRID_CELL_SIZE = 30; // Size of each logical grid cell in pixels
const PACMAN_SIZE = 26;
const GHOST_SIZE = 26;
const GHOST_SPEED = 2.5; // Faster ghost speed to hunt the cursor
const PELLET_SIZE = 6;
// 🚀 NEW CONSTANT: Offset to keep pellets out of the navbar/scoreboard area (matching desktop top: 100px)
const NAVBAR_OFFSET_PX = 100; 
const NAVBAR_OFFSET_GRID = Math.ceil(NAVBAR_OFFSET_PX / GRID_CELL_SIZE); // 100px / 30px ≈ 4 rows

// Define the core maze pattern (smallest repeating unit of movement logic)
// 1 = Wall, 2 = Pellet/Path
const coreMazePattern = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
  [1, 2, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1],
  [1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const PATTERN_ROWS = coreMazePattern.length;
const PATTERN_COLS = coreMazePattern[0].length;

// --- Helper Functions ---
const getMazeDimensions = () => ({
  cols: Math.ceil(window.innerWidth / GRID_CELL_SIZE),
  rows: Math.ceil(window.innerHeight / GRID_CELL_SIZE),
});

const toPixel = (gridCoord) => gridCoord * GRID_CELL_SIZE + GRID_CELL_SIZE / 2;
const toGrid = (pixelCoord) => Math.floor(pixelCoord / GRID_CELL_SIZE);

const generateFullMaze = () => {
  const { rows, cols } = getMazeDimensions();
  const fullMaze = Array(rows).fill(0).map(() => Array(cols).fill(0));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // 🚀 Pellet generation constraint: Only generate pattern starting from row NAVBAR_OFFSET_GRID
      if (r >= NAVBAR_OFFSET_GRID) {
        fullMaze[r][c] = coreMazePattern[r % PATTERN_ROWS][c % PATTERN_COLS];
      } else {
         // Force wall or empty space in the top area where the navbar is
         fullMaze[r][c] = 1; 
      }
    }
  }
  return fullMaze;
};

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  const [fullMaze, setFullMaze] = useState(generateFullMaze);
  const [pellets, setPellets] = useState([]);
  const [ghosts, setGhosts] = useState([]);
  const [score, setScore] = useState(0); // Track pellets collected
  const [isMobile, setIsMobile] = useState(false);

  // Reference to the main section element to get its position
  const sectionRef = useRef(null);

  // Mouse position is now the Pac-Man cursor, relative to the section
  const mousePosition = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const mouseMoveDirection = useRef(0);
  const lastMousePosition = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pacmanRandomTargetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ghostRandomTargetsRef = useRef<Record<string, { x: number; y: number }>>({});

  const animationFrameRef = useRef(null);
  const mazeRef = useRef(fullMaze);

  useEffect(() => {
    mazeRef.current = fullMaze;
  }, [fullMaze]);

  // --- Countdown Timer to November 24, 2025 9:00 AM ---
  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date('2025-11-24T09:00:00');
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  // --- Mobile Detection ---
  useEffect(() => {
    const checkMobile = () => {
      // Check for touch capability or narrow screen
      setIsMobile(window.matchMedia('(hover: none)').matches || window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile); // Use resize to check width
    window.addEventListener('change', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('change', checkMobile);
    };
  }, []);

  // --- Initial Game Setup & Resizing ---
  useEffect(() => {
    const setupGame = () => {
      const newMaze = generateFullMaze();
      setFullMaze(newMaze);

      const initialPellets = [];
      const initialGhosts = [];
      const { rows, cols } = getMazeDimensions();

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = newMaze[r][c];
          if (cell === 2) {
            // Pellets are only pushed if the cell allows it (which is constrained in generateFullMaze now)
            initialPellets.push({ id: `${r}-${c}`, gridX: c, gridY: r, isPower: false });
          }
        }
      }

      // Spawn 4 ghosts in different corners
      const ghostColors = ['#FF0000', '#FFB8FF', '#00FFFF', '#FFB852'];
      // Adjust spawn points to be below the offset area
      const spawnPoints = [
        { x: cols * 0.2, y: Math.max(rows * 0.2, NAVBAR_OFFSET_GRID + 2) },
        { x: cols * 0.8, y: Math.max(rows * 0.2, NAVBAR_OFFSET_GRID + 2) },
        { x: cols * 0.2, y: rows * 0.8 },
        { x: cols * 0.8, y: rows * 0.8 },
      ];

      spawnPoints.forEach((point, idx) => {
        initialGhosts.push({
          id: `ghost-${idx}`,
          x: toPixel(Math.floor(point.x)),
          y: toPixel(Math.floor(point.y)),
          color: ghostColors[idx],
        });
      });

      setPellets(initialPellets);
      setGhosts(initialGhosts);
      setScore(0); // Reset score on game setup
    };

    setupGame();

    const handleResize = () => {
      setupGame();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Mouse Tracking Handler (Pac-Man Cursor) ---
  const handleMouseMove = useCallback((e) => {
    // Get the position of the HeroSection relative to the viewport
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Calculate cursor position relative to the HeroSection's top-left corner
    const sectionRelativeX = e.clientX - rect.left;
    const sectionRelativeY = e.clientY - rect.top;

    // Check if cursor is outside the HeroSection boundaries (width/height)
    if (sectionRelativeX < 0 || sectionRelativeX > rect.width ||
        sectionRelativeY < 0 || sectionRelativeY > rect.height) {
      return; // Ignore mouse movement outside the section
    }

    const newX = sectionRelativeX;
    const newY = sectionRelativeY;

    // Calculate direction based on mouse movement
    const dx = newX - lastMousePosition.current.x;
    const dy = newY - lastMousePosition.current.y;

    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
      mouseMoveDirection.current = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
    }

    mousePosition.current = { x: newX, y: newY };
    lastMousePosition.current = { x: newX, y: newY };

    // Remove pellets when cursor (Pac-Man) hovers over them and increment score
    setPellets(prevPellets => {
      const remainingPellets = prevPellets.filter(pellet => {
        const pelletPixelX = toPixel(pellet.gridX);
        const pelletPixelY = toPixel(pellet.gridY);
        
        const distance = Math.hypot(
          pelletPixelX - newX, 
          pelletPixelY - newY 
        );
        if (distance <= PELLET_SIZE * 3) {
          // Pellet eaten, increment score
          setScore(prev => prev + 1);
          return false; // Remove pellet
        }
        return true; // Keep pellet
      });
      return remainingPellets;
    });
  }, []);

  // --- Random Pacman Movement on Mobile ---
  useEffect(() => {
    if (!isMobile) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const sectionWidth = rect.width;
    const sectionHeight = rect.height;

    const interval = setInterval(() => {
      // Generate random target INSIDE the section, respecting the top offset
      pacmanRandomTargetRef.current = {
        x: Math.random() * sectionWidth,
        y: Math.random() * (sectionHeight - NAVBAR_OFFSET_PX) + NAVBAR_OFFSET_PX
      };
    }, 2000);

    const animatePacman = setInterval(() => {
      const current = mousePosition.current;
      const target = pacmanRandomTargetRef.current;

      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 5) {
        const moveSpeed = 3;
        let newX = current.x + (dx / dist) * moveSpeed;
        let newY = current.y + (dy / dist) * moveSpeed;
        
        // Clamp Pac-Man to the section boundaries (respecting the top offset)
        newX = Math.max(0, Math.min(newX, sectionWidth));
        newY = Math.max(NAVBAR_OFFSET_PX, Math.min(newY, sectionHeight)); // 🚀 Clamp bottom y to NAVBAR_OFFSET_PX

        mousePosition.current = { x: newX, y: newY };

        mouseMoveDirection.current = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;

        // Remove pellets (Collision check remains the same since positions are section-relative)
        setPellets(prevPellets => {
          let scoreIncrement = 0;
          const remainingPellets = prevPellets.filter(pellet => {
            const distance = Math.hypot(
              toPixel(pellet.gridX) - mousePosition.current.x,
              toPixel(pellet.gridY) - mousePosition.current.y
            );
            if (distance <= PELLET_SIZE * 3) {
              scoreIncrement++;
              return false;
            }
            return true;
          });
          if (scoreIncrement > 0) {
              setScore(prev => prev + scoreIncrement);
          }
          return remainingPellets;
        });
      }
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(animatePacman);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, isMobile]);

  // --- Ghost AI: Chase the Pac-Man Cursor (No Walls) or Random on Mobile ---
  useEffect(() => {
    const animate = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      const sectionWidth = rect.width;
      const sectionHeight = rect.height;

      setGhosts(prevGhosts => {
        return prevGhosts.map(ghost => {
          let targetX, targetY;

          if (isMobile) {
            // Mobile: Ghost uses random targets within the section (respecting offset)
            if (!ghostRandomTargetsRef.current[ghost.id] || 
                ghostRandomTargetsRef.current[ghost.id].x < 0 || ghostRandomTargetsRef.current[ghost.id].x > sectionWidth ||
                ghostRandomTargetsRef.current[ghost.id].y < NAVBAR_OFFSET_PX || ghostRandomTargetsRef.current[ghost.id].y > sectionHeight) { // 🚀 Check offset
                
              ghostRandomTargetsRef.current[ghost.id] = {
                x: Math.random() * sectionWidth,
                y: Math.random() * (sectionHeight - NAVBAR_OFFSET_PX) + NAVBAR_OFFSET_PX // 🚀 Generate target below offset
              };
            }

            const dist = Math.hypot(
              ghostRandomTargetsRef.current[ghost.id].x - ghost.x,
              ghostRandomTargetsRef.current[ghost.id].y - ghost.y
            );

            // Generate new random target when close enough
            if (dist < 50) {
              ghostRandomTargetsRef.current[ghost.id] = {
                x: Math.random() * sectionWidth,
                y: Math.random() * (sectionHeight - NAVBAR_OFFSET_PX) + NAVBAR_OFFSET_PX // 🚀 Generate target below offset
              };
            }

            targetX = ghostRandomTargetsRef.current[ghost.id].x;
            targetY = ghostRandomTargetsRef.current[ghost.id].y;
          } else {
            // Desktop: chase cursor (mousePosition.current is already section-relative)
            targetX = mousePosition.current.x;
            targetY = mousePosition.current.y;
          }

          let dx = targetX - ghost.x;
          let dy = targetY - ghost.y;
          const dist = Math.hypot(dx, dy);

          let newX = ghost.x;
          let newY = ghost.y;

          if (dist > GHOST_SPEED) {
            // Normalized direction
            const nx = dx / dist;
            const ny = dy / dist;

            // Move directly toward target
            newX = ghost.x + nx * GHOST_SPEED;
            newY = ghost.y + ny * GHOST_SPEED;
          } else {
            // Close enough, snap to target
            newX = targetX;
            newY = targetY;
          }
          
          // Clamp ghost position to the section boundaries (respecting the top offset)
          newX = Math.max(GHOST_SIZE / 2, Math.min(newX, sectionWidth - GHOST_SIZE / 2));
          newY = Math.max(NAVBAR_OFFSET_PX, Math.min(newY, sectionHeight - GHOST_SIZE / 2)); // 🚀 Clamp top y to NAVBAR_OFFSET_PX

          return {
            ...ghost,
            x: newX,
            y: newY,
          };
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile]);

  return (
    // Attach the sectionRef to the main section element and use 'relative' for absolute positioning context
    <section ref={sectionRef} className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      <style>{`
        /* Hide default cursor only within HeroSection */
        .hero-section,
        .hero-section * {
          cursor: none !important;
        }

        /* Pac-Man Cursor Animation */
        @keyframes pacman-chomp {
          0% { 
            clip-path: polygon(
              50% 50%, 
              100% 0%, 
              100% 100%
            ); 
          }
          50% { 
            clip-path: polygon(
              50% 50%, 
              100% 25%, 
              100% 0%, 
              100% 100%, 
              100% 75%
            ); 
          }
          100% { 
            clip-path: polygon(
              50% 50%, 
              100% 0%, 
              100% 100%
            ); 
          }
        }
        
        .pac-man-cursor {
          /* FIX: Changed from fixed to absolute to confine it to the HeroSection */
          position: absolute; 
          width: ${PACMAN_SIZE}px;
          height: ${PACMAN_SIZE}px;
          background-color: #fce303; 
          border-radius: 50%;
          z-index: 1000;
          transform-origin: center center; 
          box-shadow: 0 0 10px rgba(252, 227, 3, 0.8), 0 0 20px rgba(252, 227, 3, 0.4);
          pointer-events: none;
          animation: pacman-chomp 0.2s linear infinite;
        }

        /* Pellet Style */
        .pellet {
          position: absolute;
          width: ${PELLET_SIZE}px;
          height: ${PELLET_SIZE}px;
          background-color: #b8a003;
          border-radius: 50%;
          z-index: 50;
          box-shadow: 0 0 3px rgba(184, 160, 3, 0.5);
        }

        /* Ghost Style */
        .ghost {
          /* FIX: Changed from fixed to absolute to confine it to the HeroSection */
          position: absolute; 
          width: ${GHOST_SIZE}px;
          height: ${GHOST_SIZE}px;
          border-top-left-radius: 50%;
          border-top-right-radius: 50%;
          z-index: 60;
          box-shadow: 0 0 15px currentColor;
          transition: transform 0.1s ease;
        }
        
        .ghost:hover {
          transform: scale(1.1);
        }
        
        /* Ghost skirt effect */
        .ghost::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 8px;
          background: linear-gradient(to right, 
            currentColor 0%, currentColor 20%, 
            transparent 20%, transparent 40%,
            currentColor 40%, currentColor 60%,
            transparent 60%, transparent 80%,
            currentColor 80%, currentColor 100%
          );
        }
        
        .ghost-eyes {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
        }
        
        .ghost-eye {
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
          position: relative;
        }
        
        .ghost-eye::after {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          background-color: #000;
          border-radius: 50%;
          top: 2px;
          left: 2px;
        }

        .text-3d {
          color: #fff;
          text-shadow: 
            1px 1px 0 #ccc,
            2px 2px 0 #999,
            3px 3px 0 #666,
            4px 4px 0 #333,
            5px 5px 10px rgba(0, 0, 0, 0.5),
            6px 6px 15px rgba(0, 0, 0, 0.3);
          transform: perspective(500px) rotateX(10deg);
          transform-style: preserve-3d;
        }
        
        .glow-text {
          text-shadow: 0 0 10px rgba(168, 85, 247, 0.8);
        }
        
        .neon-button {
          background: rgba(6, 182, 212, 0.1);
          border: 2px solid #06b6d4;
          color: #06b6d4;
          transition: all 0.3s ease;
        }
        
        .neon-button:hover {
          background: rgba(6, 182, 212, 0.2);
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
        }
        
        .holographic-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(6, 182, 212, 0.3);
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }
        
        .neon-text {
          color: #06b6d4;
          text-shadow: 0 0 10px rgba(6, 182, 212, 0.8);
        }
      `}</style>


      {/* Pellets and Ghosts Container (absolute positioning is inherited from the section) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {pellets.map(pellet => (
          <div
            key={pellet.id}
            className="pellet"
            style={{
              left: `${toPixel(pellet.gridX) - PELLET_SIZE / 2}px`,
              top: `${toPixel(pellet.gridY) - PELLET_SIZE / 2}px`,
            }}
          />
        ))}

        {/* Ghosts chasing the cursor - Position is now absolute relative to the section */}
        {ghosts.map(ghost => (
          <div
            key={ghost.id}
            className="ghost"
            style={{
              left: `${ghost.x - GHOST_SIZE / 2}px`,
              top: `${ghost.y - GHOST_SIZE / 2}px`,
              backgroundColor: ghost.color,
              color: ghost.color,
            }}
          >
            <div className="ghost-eyes">
              <div className="ghost-eye"></div>
              <div className="ghost-eye"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pac-Man Cursor - Position is now absolute relative to the section */}
      <div
        className="pac-man-cursor"
        style={{
          left: `${mousePosition.current.x}px`,
          top: `${mousePosition.current.y}px`,
          transform: `translate(-50%, -50%) rotate(${mouseMoveDirection.current}deg)`,
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="block text-3d">MetaVerse</span>
            <span className="block text-3xl md:text-5xl lg:text-6xl mt-4 text-cyan-400">
              24 Hours National Level Hackathon
            </span>
          </h1>
          <p className="text-xl md:text-3xl text-purple-300 font-light tracking-wide glow-text">
            Innovation meets Imagination in the Digital Frontier
          </p>
          <div className="flex flex-wrap gap-6 justify-center mt-12">
            <a
              href="https://forms.gle/gwkFuZXKHfLmxM4u5"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-button group relative px-8 py-4 text-lg font-bold inline-block"
            >
              <span className="relative z-10">Register Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            </a>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} className="holographic-card p-6 group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-bold neon-text mb-2">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-cyan-400 text-sm uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}