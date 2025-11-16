import { useState, useEffect, useRef } from 'react';

type Cell = { x: number; y: number };

const ROWS = 20;
const COLS = 20;
const TICK_MS = 120;
const INITIAL_LENGTH = 3;

// Helper function to get a random apple position
function randomApple(occupied: Cell[], cols: number, rows: number): Cell {
  const occupiedSet = new Set(occupied.map(c => `${c.x},${c.y}`));
  let attempts = 0;
  while (attempts < 1000) {
    const a = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    if (!occupiedSet.has(`${a.x},${a.y}`)) return a;
    attempts++;
  }
  return { x: 0, y: 0 }; // Fallback
}

// Function to generate the initial snake state
function createInitialSnake(cols: number, rows: number): Cell[] {
  const cx = Math.floor(cols / 2);
  const cy = Math.floor(rows / 2);
  // Snake starts moving right
  return Array.from({ length: INITIAL_LENGTH }, (_, i) => ({ x: cx - i, y: cy }));
}

export default function AboutSection() {
  const [snake, setSnake] = useState<Cell[]>(() => createInitialSnake(COLS, ROWS));
  const [apples, setApples] = useState<Cell[]>(() => [randomApple(createInitialSnake(COLS, ROWS), COLS, ROWS)]);
  const [running, setRunning] = useState(false);
  const [snakeExited, setSnakeExited] = useState(false);
  const [score, setScore] = useState(0);

  // Ref for mutable state (allows reading current values inside setInterval/keydown)
  const snakeRef = useRef(snake);
  const dirRef = useRef<{ x: number; y: number }>({ x: 1, y: 0 });
  const runningRef = useRef(running);
  const snakeExitedRef = useRef(snakeExited);
  const applesRef = useRef(apples);
  const scoreRef = useRef(score);

  // Keep refs synchronized with state
  useEffect(() => { snakeRef.current = snake; }, [snake]);
  useEffect(() => { runningRef.current = running; }, [running]);
  useEffect(() => { snakeExitedRef.current = snakeExited; }, [snakeExited]);
  useEffect(() => { applesRef.current = apples; }, [apples]);
  useEffect(() => { scoreRef.current = score; }, [score]);

  // Unified Game Over/Reset Function
  const resetGame = (keepActive: boolean = true) => {
    const resetSnake = createInitialSnake(COLS, ROWS);
    dirRef.current = { x: 1, y: 0 };
    setSnake(resetSnake);
    setApples([randomApple(resetSnake, COLS, ROWS)]);
    setRunning(false);
    setScore(0);
    
    // If we're exiting the game completely, set snakeExited to false
    if (!keepActive) {
      setSnakeExited(false);
    }
  };


  // Keydown Handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const d = dirRef.current;
      let newDir = d;

      // Handle WASD input
      if (key === 'w' && !(d.x === 0 && d.y === 1)) newDir = { x: 0, y: -1 };
      else if (key === 's' && !(d.x === 0 && d.y === -1)) newDir = { x: 0, y: 1 };
      else if (key === 'a' && !(d.x === 1 && d.y === 0)) newDir = { x: -1, y: 0 };
      else if (key === 'd' && !(d.x === -1 && d.y === 0)) newDir = { x: 1, y: 0 };
      else return; 

      // Start the game on the first input
      if (newDir.x !== d.x || newDir.y !== d.y) {
        dirRef.current = newDir;
        if (!runningRef.current) {
          setRunning(true);
          // Only set snakeExited on the very first directional input
          if (!snakeExitedRef.current) setSnakeExited(true);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Game Loop (setInterval)
  useEffect(() => {
    const id = setInterval(() => {
      if (!runningRef.current) return;

      const currentSnake = snakeRef.current;
      const currentApples = applesRef.current;
      const dir = dirRef.current;
      const head = currentSnake[0];
      const newHead = { x: head.x + dir.x, y: head.y + dir.y };

      // --- 1. Check Wall Collision ---
      if (newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS) {
        resetGame(true); // Game over, reset state, keep game active (snakeExited=true)
        return;
      }

      // --- 2. Check Self Collision ---
      const collision = currentSnake.some((seg, idx) => idx !== 0 && seg.x === newHead.x && seg.y === newHead.y);
      if (collision) {
        resetGame(true); // Game over, reset state, keep game active (snakeExited=true)
        return;
      }

      // --- 3. Check Apple Collision ---
      const appleIndex = currentApples.findIndex(a => a.x === newHead.x && a.y === newHead.y);
      let newApples = currentApples;
      let grew = false;
      
      if (appleIndex !== -1) {
        newApples = [...currentApples.slice(0, appleIndex), ...currentApples.slice(appleIndex + 1)];
        newApples.push(randomApple([...currentSnake, newHead], COLS, ROWS));
        grew = true;
        setScore(prev => prev + 1);
      }

      // --- 4. Move the Snake ---
      const newSnake = [newHead, ...currentSnake];
      if (!grew) newSnake.pop();

      // Update state
      snakeRef.current = newSnake;
      setSnake(newSnake);
      setApples(newApples);

    }, TICK_MS);

    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const cellWidthPct = 100 / COLS;
  const cellHeightPct = 100 / ROWS;

  // Handler to manually exit the game
  const handleExitGame = () => {
    setRunning(false);
    setSnakeExited(false);
  };

  return (
    <section 
      id="about" 
      className={`relative py-24 px-4 overflow-hidden min-h-screen select-none transition-all duration-500`}
      // The section background itself becomes dark, slightly revealing content behind it
      style={{ background: snakeExited ? 'rgba(0, 0, 0, 0.95)' : 'transparent' }}
    >
      
      {/* Cyberpunk grid overlay when game is active */}
      {snakeExited && (
        <div 
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: `${100 / COLS}% ${100 / ROWS}%`,
          }}
        />
      )}
      
      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit0 {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg) translateY(-150%); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) rotate(0deg) translateY(-180%); opacity: 1; }
        }
        @keyframes orbit1 {
          0%, 100% { transform: translate(-50%, -50%) rotate(90deg) translateY(-150%); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) rotate(90deg) translateY(-180%); opacity: 1; }
        }
        @keyframes orbit2 {
          0%, 100% { transform: translate(-50%, -50%) rotate(180deg) translateY(-150%); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) rotate(180deg) translateY(-180%); opacity: 1; }
        }
        @keyframes orbit3 {
          0%, 100% { transform: translate(-50%, -50%) rotate(270deg) translateY(-150%); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) rotate(270deg) translateY(-180%); opacity: 1; }
        }
      `}</style>
      
      {/* --- Game Elements and Scoreboard (Visible when snakeExited) --- */}
      {snakeExited && (
        <div className="absolute inset-0 pointer-events-none z-40" style={{ position: 'absolute' }}>
          
          {/* Scoreboard - ABSOLUTELY positioned relative to THIS section only */}
          <div style={{
            position: 'absolute',
            top: '6rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
            pointerEvents: 'auto'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.95), rgba(6,182,212,0.95))',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(168,85,247,0.8), 0 0 60px rgba(6,182,212,0.4)',
              fontWeight: 700,
              fontSize: '20px',
              border: '2px solid #a855f7',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              🎮 Score: {score} | Length: {snake.length}
            </div>
          </div>

          {/* Escape Button - ABSOLUTELY positioned relative to THIS section only */}
          <div style={{
            position: 'absolute',
            top: '6rem',
            right: '1rem',
            zIndex: 50,
            pointerEvents: 'auto'
          }}>
            <button 
              onClick={handleExitGame}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#fca5a5',
                background: 'rgba(127, 29, 29, 0.3)',
                border: '2px solid rgba(239, 68, 68, 0.5)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 16px rgba(239, 68, 68, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(185, 28, 28, 0.5)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(239, 68, 68, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(127, 29, 29, 0.3)';
                e.currentTarget.style.color = '#fca5a5';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(239, 68, 68, 0.4)';
              }}
            >
              ✕ EXIT GAME
            </button>
          </div>

          {/* snake segments - cyberpunk futuristic green design */}
          {snake.map((seg, idx) => {
            const isHead = idx === 0;
            const segmentOpacity = 1 - (idx / snake.length) * 0.4; // Gradient opacity from head to tail
            const segmentSize = isHead ? 0.95 : 0.88 - (idx / snake.length) * 0.12; // Head is larger, tail tapers
            const glowIntensity = 1 - (idx / snake.length) * 0.6; // Glow fades toward tail
            
            // --- UPDATED GREEN COLORS ---
            const baseColor = '#39ff14'; // Neon Green
            const highlightColor = '#00ff7f'; // Spring Green
            const darkColor = '#006400'; // Dark Green

            return (
              <div
                key={`${seg.x}-${seg.y}-${idx}`}
                className="absolute"
                style={{
                  left: `${(seg.x + 0.5) * cellWidthPct}%`,
                  top: `${(seg.y + 0.5) * cellHeightPct}%`,
                  width: `${cellWidthPct * segmentSize}%`,
                  height: `${cellHeightPct * segmentSize}%`,
                  transform: 'translate(-50%, -50%)',
                  boxSizing: 'border-box',
                  zIndex: snake.length - idx, // Head on top
                  filter: isHead ? 'brightness(1.2)' : 'none',
                }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: isHead 
                    ? `linear-gradient(135deg, ${baseColor} 0%, ${highlightColor} 25%, ${darkColor} 100%)` 
                    : `linear-gradient(135deg, rgba(57,255,20,${segmentOpacity}) 0%, rgba(0,255,127,${segmentOpacity * 0.9}) 30%, rgba(0,100,0,${segmentOpacity * 0.7}) 100%)`,
                  border: isHead 
                    ? `2px solid ${baseColor}` 
                    : `1.5px solid rgba(57,255,20,${segmentOpacity * 0.6})`,
                  borderRadius: '3px',
                  boxShadow: isHead 
                    ? `0 0 30px ${baseColor}, 0 0 60px ${highlightColor}, inset 0 0 20px rgba(57,255,20,0.3), inset 2px 2px 4px rgba(255,255,255,0.4)` 
                    : `0 0 ${20 * glowIntensity}px ${highlightColor}, 0 0 ${40 * glowIntensity}px ${darkColor}, inset 0 0 10px rgba(57,255,20,${glowIntensity * 0.2})`,
                  transition: 'all 0.12s ease-out',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Cyberpunk circuit pattern overlay */}
                  {isHead && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(57,255,20,0.1) 3px, rgba(57,255,20,0.1) 4px)`,
                      opacity: 0.5,
                    }} />
                  )}
                  
                  {/* Glowing core line through segments */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10%',
                    right: '10%',
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, rgba(57,255,20,${segmentOpacity}) 20%, rgba(0,255,127,${segmentOpacity}) 80%, transparent)`,
                    transform: 'translateY(-50%)',
                    boxShadow: `0 0 8px rgba(57,255,20,${glowIntensity})`,
                  }} />
                  
                  {/* Holographic eyes/sensors on the head */}
                  {isHead && (
                    <>
                      {/* Left eye (Changed color scheme to match green/blue for sensor look) */}
                      <div style={{
                        position: 'absolute',
                        width: '28%',
                        height: '28%',
                        background: 'radial-gradient(circle, #00ffff 0%, #39ff14 50%, transparent 70%)',
                        borderRadius: '50%',
                        top: '20%',
                        left: '18%',
                        boxShadow: '0 0 15px #00ffff, 0 0 30px #39ff14',
                        border: '1px solid #00ffff',
                      }}>
                        <div style={{
                          position: 'absolute',
                          width: '40%',
                          height: '40%',
                          background: '#fff',
                          borderRadius: '50%',
                          top: '30%',
                          left: '30%',
                          boxShadow: '0 0 8px #fff',
                        }} />
                      </div>
                      
                      {/* Right eye */}
                      <div style={{
                        position: 'absolute',
                        width: '28%',
                        height: '28%',
                        background: 'radial-gradient(circle, #00ffff 0%, #39ff14 50%, transparent 70%)',
                        borderRadius: '50%',
                        top: '20%',
                        right: '18%',
                        boxShadow: '0 0 15px #00ffff, 0 0 30px #39ff14',
                        border: '1px solid #00ffff',
                      }}>
                        <div style={{
                          position: 'absolute',
                          width: '40%',
                          height: '40%',
                          background: '#fff',
                          borderRadius: '50%',
                          top: '30%',
                          left: '30%',
                          boxShadow: '0 0 8px #fff',
                        }} />
                      </div>
                      
                      {/* Tech detail lines on head */}
                      <div style={{
                        position: 'absolute',
                        bottom: '15%',
                        left: '20%',
                        right: '20%',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, #39ff14, transparent)',
                        boxShadow: '0 0 4px #39ff14',
                      }} />
                    </>
                  )}
                  
                  {/* Energy pulse effect on body segments */}
                  {!isHead && idx % 2 === 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '30%',
                      left: '20%',
                      width: '60%',
                      height: '40%',
                      background: `radial-gradient(ellipse, rgba(57,255,20,${segmentOpacity * 0.3}) 0%, transparent 70%)`,
                      animation: 'pulse 2s ease-in-out infinite',
                    }} />
                  )}
                </div>
              </div>
            );
          })}

          {/* apples - cyberpunk neon orb design (No change, keeping magenta/pink for contrast) */}
          {apples.map((a, i) => (
            <div
              key={`${a.x}-${a.y}-${i}`}
              className="absolute"
              style={{
                left: `${(a.x + 0.5) * cellWidthPct}%`,
                top: `${(a.y + 0.5) * cellHeightPct}%`,
                width: `${cellWidthPct * 0.8}%`,
                height: `${cellHeightPct * 0.8}%`,
                transform: 'translate(-50%, -50%)',
                animation: 'pulse 1s ease-in-out infinite',
              }}
            >
              {/* Outer glow rings */}
              <div style={{
                position: 'absolute',
                inset: '-40%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,0,255,0.3) 0%, rgba(255,0,255,0.1) 40%, transparent 70%)',
                animation: 'pulse 1.5s ease-in-out infinite',
              }} />
              
              {/* Main orb */}
              <div style={{
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 30% 30%, #ff00ff, #ff0080, #ff0040)',
                borderRadius: '50%',
                boxShadow: '0 0 20px #ff00ff, 0 0 40px #ff0080, 0 0 60px rgba(255,0,255,0.5), inset -4px -4px 8px rgba(0,0,0,0.4), inset 3px 3px 6px rgba(255,255,255,0.3)',
                position: 'relative',
                border: '2px solid rgba(255,0,255,0.8)',
              }}>
                {/* Holographic shine */}
                <div style={{
                  position: 'absolute',
                  top: '15%',
                  left: '20%',
                  width: '35%',
                  height: '35%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 60%)',
                  borderRadius: '50%',
                  filter: 'blur(2px)',
                }} />
                
                {/* Data streams */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'repeating-conic-gradient(from 0deg, transparent 0deg, transparent 30deg, rgba(0,245,255,0.3) 35deg, transparent 40deg)',
                  animation: 'spin 3s linear infinite',
                }} />
                
                {/* Core energy */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '40%',
                  height: '40%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,0,255,0.5) 50%, transparent 70%)',
                  borderRadius: '50%',
                  boxShadow: '0 0 15px rgba(255,0,255,0.8)',
                  animation: 'pulse 0.8s ease-in-out infinite',
                }} />
              </div>
              
              {/* Particle effects */}
              {[0, 1, 2, 3].map((particle) => (
                <div
                  key={particle}
                  style={{
                    position: 'absolute',
                    width: '15%',
                    height: '15%',
                    background: 'radial-gradient(circle, #00f5ff, transparent)',
                    borderRadius: '50%',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${particle * 90}deg) translateY(-150%)`,
                    opacity: 0.6,
                    boxShadow: '0 0 8px #00f5ff',
                    animation: `orbit${particle} 2s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      )}
      
      {/* overlay content (About text) */}
      <div className="relative z-10 max-w-5xl mx-auto transition-opacity duration-300" 
          style={{ opacity: snakeExited ? 0.2 : 1.0 }}>
        
        <div className="text-center mb-16 relative">
            
          <h2 className="text-4xl md:text-6xl font-bold text-3d mb-6">
            🚀 About the MetaVerse Hackathon 🌐
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto" />

          {/* --- MOVED WASD INSTRUCTION BOX HERE --- */}
          {/* Absolutely positioned below the header and centered, only visible when game hasn't started */}
          {!snakeExited && (
            <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto">
              <div style={{
                background: 'linear-gradient(135deg, rgba(6,182,212,0.95), rgba(168,85,247,0.95))',
                color: '#fff',
                padding: '14px 24px',
                borderRadius: '10px',
                boxShadow: '0 8px 32px rgba(6,182,212,0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
                fontWeight: 700,
                fontSize: '16px',
                border: '2px solid #0ea5a4',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}>
                ▶ Use WASD to Play
              </div>
            </div>
          )}
          {/* --- END MOVED INSTRUCTION BOX --- */}
        </div>
        
        <div className="holographic-card p-8 md:p-12 backdrop-blur-xl">
          <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
            <p className="text-cyan-200 glow-text">
              Welcome to <span className="text-purple-400 font-bold">MetaVerse</span> — the <span className="text-cyan-400 font-semibold">24 Hours National Level Hackathon</span> where <span className="text-cyan-400 font-semibold">groundbreaking innovation</span> transcends reality.
            </p>

            <p>
              This is your <span className="text-cyan-400 font-semibold">electrifying 24-hour odyssey</span> into the digital frontier, jointly organized by the Institution's Innovation Council & AICTE Idea Lab. <span className="text-purple-400 font-semibold">Visionaries, disruptors, and tech pioneers</span> will converge to architect tomorrow's revolutionary solutions.
            </p>

            <p>
              Teams will <span className="text-cyan-400 font-semibold">fearlessly dive deep</span> into <span className="text-purple-400 font-semibold">cutting-edge emerging technologies</span>, crafting 
              <span className="text-pink-400 font-semibold"> mind-bending futuristic prototypes</span>. From <span className="text-cyan-300">AI-powered breakthroughs</span> to 
              <span className="text-purple-300"> blockchain revolutions</span>, from <span className="text-pink-300">IoT ecosystems</span> to <span className="text-cyan-300">smart city masterpieces</span> — 
              this is where <span className="text-cyan-400 font-semibold">raw code collides with boundless creativity</span>.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { number: '24', label: 'Hours of Innovation' },
              { number: '∞', label: 'Possibilities' },
              { number: '5', label: 'Idea Themes' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300">
                <div className="text-5xl font-bold neon-text mb-2">{stat.number}</div>
                <div className="text-cyan-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}