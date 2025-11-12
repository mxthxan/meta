import { useEffect, useRef, useState } from 'react';

type Cell = { x: number; y: number };

const ROWS = 20;
const COLS = 20;
const TICK_MS = 120; // game speed (lower = faster)
const INITIAL_LENGTH = 3;

export default function AboutSection() {
  const [snake, setSnake] = useState<Cell[]>(() => {
    const cx = Math.floor(COLS / 2);
    const cy = Math.floor(ROWS / 2);
    // head at center, body to the left (moving right)
    return Array.from({ length: INITIAL_LENGTH }, (_, i) => ({ x: cx - i, y: cy }));
  });
  const [apples, setApples] = useState<Cell[]>(() => [randomApple([])]);
  const [running, setRunning] = useState(false); // start paused until WASD pressed

  const snakeRef = useRef(snake);
  const dirRef = useRef<{ x: number; y: number }>({ x: 1, y: 0 }); // default direction
  const runningRef = useRef(running);

  useEffect(() => { snakeRef.current = snake; }, [snake]);
  useEffect(() => { runningRef.current = running; }, [running]);

  // spawn an apple at a cell not occupied by the snake
  function randomApple(occupied: Cell[]) {
    const occupiedSet = new Set(occupied.map(c => `${c.x},${c.y}`));
    let attempts = 0;
    while (attempts < 1000) {
      const a = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
      if (!occupiedSet.has(`${a.x},${a.y}`)) return a;
      attempts++;
    }
    // fallback
    return { x: 0, y: 0 };
  }

  // keyboard controls (WASD only). Start game when WASD pressed.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key;
      const d = dirRef.current;

      // map WASD keys to directions and prevent direct reverse
      if ((key === 'w' || key === 'W') && !(d.x === 0 && d.y === 1)) {
        dirRef.current = { x: 0, y: -1 };
        if (!runningRef.current) setRunning(true);
      }
      if ((key === 's' || key === 'S') && !(d.x === 0 && d.y === -1)) {
        dirRef.current = { x: 0, y: 1 };
        if (!runningRef.current) setRunning(true);
      }
      if ((key === 'a' || key === 'A') && !(d.x === 1 && d.y === 0)) {
        dirRef.current = { x: -1, y: 0 };
        if (!runningRef.current) setRunning(true);
      }
      if ((key === 'd' || key === 'D') && !(d.x === -1 && d.y === 0)) {
        dirRef.current = { x: 1, y: 0 };
        if (!runningRef.current) setRunning(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // game loop (grid ticks)
  useEffect(() => {
    const id = setInterval(() => {
      if (!runningRef.current) return;

      const current = snakeRef.current;
      const dir = dirRef.current;
      const head = current[0];
      const newHead = { x: head.x + dir.x, y: head.y + dir.y };

      // wall collision = classic behavior -> game over (reset)
      if (newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS) {
        // reset snake and direction
        const cx = Math.floor(COLS / 2);
        const cy = Math.floor(ROWS / 2);
        const resetSnake = Array.from({ length: INITIAL_LENGTH }, (_, i) => ({ x: cx - i, y: cy }));
        dirRef.current = { x: 1, y: 0 };
        setSnake(resetSnake);
        setApples([randomApple(resetSnake)]);
        setRunning(false); // pause after game over until WASD pressed again
        return;
      }

      // self-collision -> reset
      const collision = current.some(seg => seg.x === newHead.x && seg.y === newHead.y);
      if (collision) {
        const cx = Math.floor(COLS / 2);
        const cy = Math.floor(ROWS / 2);
        const resetSnake = Array.from({ length: INITIAL_LENGTH }, (_, i) => ({ x: cx - i, y: cy }));
        dirRef.current = { x: 1, y: 0 };
        setSnake(resetSnake);
        setApples([randomApple(resetSnake)]);
        setRunning(false); // pause after collision
        return;
      }

      // check apple eaten
      const appleIndex = apples.findIndex(a => a.x === newHead.x && a.y === newHead.y);
      let newApples = apples;
      let grew = false;
      if (appleIndex !== -1) {
        // eat apple: grow (do not remove tail)
        newApples = [...apples.slice(0, appleIndex), ...apples.slice(appleIndex + 1)];
        newApples.push(randomApple([...current, newHead]));
        grew = true;
      }

      const newSnake = [newHead, ...current];
      if (!grew) newSnake.pop(); // move without growing

      // persist
      snakeRef.current = newSnake;
      setSnake(newSnake);
      setApples(newApples);
    }, TICK_MS);

    return () => clearInterval(id);
  }, [apples]);

  // rendering helpers: convert grid cell -> percent coords
  const cellWidthPct = 100 / COLS;
  const cellHeightPct = 100 / ROWS;

  return (
    <section className="relative py-24 px-4 overflow-hidden min-h-screen select-none">
      {/* floating instruction box */}
      {!running && (
        <div className="absolute left-1/2 top-8 transform -translate-x-1/2 z-50">
          <div style={{
            background: 'rgba(0,0,0,0.7)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '8px',
            boxShadow: '0 6px 18px rgba(0,0,0,0.6)',
            fontWeight: 600
          }}>
            Use WASD to play
          </div>
        </div>
      )}

      {/* grid background (subtle) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-black/50" />
      </div>

      {/* render snake segments */}
      {snake.map((seg, idx) => (
        <div
          key={`${seg.x}-${seg.y}-${idx}`}
          className="absolute"
          style={{
            left: `${(seg.x + 0.5) * cellWidthPct}%`,
            top: `${(seg.y + 0.5) * cellHeightPct}%`,
            width: `${cellWidthPct}%`,
            height: `${cellHeightPct}%`,
            transform: 'translate(-50%, -50%)',
            boxSizing: 'border-box',
            padding: '2px',
          }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            background: idx === 0 ? '#0ea5a4' : '#06b6d4', // head slightly different color
            border: '2px solid #093c3b',
            borderRadius: '4px' // rectangular look
          }} />
        </div>
      ))}

      {/* apples (red squares) */}
      {apples.map((a, i) => (
        <div
          key={`${a.x}-${a.y}-${i}`}
          className="absolute"
          style={{
            left: `${(a.x + 0.5) * cellWidthPct}%`,
            top: `${(a.y + 0.5) * cellHeightPct}%`,
            width: `${cellWidthPct * 0.7}%`,
            height: `${cellHeightPct * 0.7}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg,#ef4444,#b91c1c)',
            borderRadius: '3px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
          }} />
        </div>
      ))}

      {/* overlay content (unchanged UI) */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-3d mb-6">
            About the Hackathon
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto" />
        </div>

        <div className="holographic-card p-8 md:p-12 backdrop-blur-xl">
          <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
            <p className="text-cyan-200 glow-text">
              Welcome to <span className="text-purple-400 font-bold">MetaVerse</span> — where <span className="text-cyan-400 font-semibold">groundbreaking innovation</span> transcends reality and <span className="text-pink-400 font-semibold">limitless imagination</span> shapes the future.
            </p>

            <p>
              This is not just another hackathon. It's an <span className="text-cyan-400 font-semibold">electrifying 24-hour odyssey</span> into the digital frontier,
              where <span className="text-purple-400 font-semibold">visionaries, disruptors, and tech pioneers</span> converge to architect tomorrow's revolutionary solutions today.
            </p>

            <p>
              Teams will <span className="text-cyan-400 font-semibold">fearlessly dive deep</span> into <span className="text-purple-400 font-semibold">cutting-edge emerging technologies</span>, crafting 
              <span className="text-pink-400 font-semibold"> mind-bending futuristic prototypes</span> that shatter the boundaries of what's possible. From <span className="text-cyan-300">AI-powered breakthroughs</span> to 
              <span className="text-purple-300"> blockchain revolutions</span>, from <span className="text-pink-300">IoT ecosystems</span> to <span className="text-cyan-300">smart city masterpieces</span> — 
              this is where <span className="text-cyan-400 font-semibold">raw code collides with boundless creativity</span> to birth <span className="text-purple-400 font-semibold">world-changing innovations</span>.
            </p>

            <p className="text-pink-300 font-medium text-2xl">
              Are you ready to <span className="text-cyan-400 glow-text">transcend the ordinary</span>, step into the MetaVerse, and <span className="text-purple-400 glow-text">engineer the impossible</span>?
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { number: '24', label: 'Hours of Innovation' },
              { number: '5', label: 'Tech Tracks' },
              { number: '∞', label: 'Possibilities' }
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