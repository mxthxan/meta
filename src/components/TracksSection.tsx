import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Cpu, Blocks, Code, Wifi, Sparkles } from 'lucide-react';

// --- GALAXIA GAME IMPLEMENTATION ---

// Constants for the Game
const PLAYER_SPEED = 7;
const BULLET_SPEED = 12;
const ENEMY_SPEED = 2;
const ENEMY_SPAWN_INTERVAL = 2000; // ms
const ENEMY_SIZE = 30;

// Game State Object (to be managed by component state/refs)
let gameState = {
    player: { x: 0, y: 0, size: 25 },
    bullets: [],
    enemies: [],
    input: { left: false, right: false, space: false },
    gameLoopId: null,
    lastEnemySpawn: 0,
};

const GalaxiaGame = ({ onGameOver }) => {
    const canvasRef = useRef(null);
    const gameContainerRef = useRef(null);
    const [score, setScore] = useState(0);

    // --- Core Game Loop Logic ---
    const update = (ctx, canvas, currentTime) => {
        // 1. CLEAR SCREEN
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw stars background
        ctx.fillStyle = '#FFFFFF';
        for (let i = 0; i < 50; i++) {
            const x = (i * 137.5) % canvas.width;
            const y = (i * 234.7 + currentTime * 0.05) % canvas.height;
            ctx.fillRect(x, y, 2, 2);
        }

        // 2. INPUT & PLAYER MOVEMENT (Left/Right only)
        const p = gameState.player;
        if (gameState.input.left) p.x -= PLAYER_SPEED;
        if (gameState.input.right) p.x += PLAYER_SPEED;

        // Clamp player position within screen bounds
        p.x = Math.max(0, Math.min(canvas.width - p.size, p.x));

        // 3. SPAWN ENEMIES
        if (currentTime - gameState.lastEnemySpawn > ENEMY_SPAWN_INTERVAL) {
            gameState.enemies.push({
                x: Math.random() * (canvas.width - ENEMY_SIZE),
                y: -ENEMY_SIZE,
                size: ENEMY_SIZE,
                health: 1
            });
            gameState.lastEnemySpawn = currentTime;
        }

        // 4. MOVE ENEMIES
        gameState.enemies = gameState.enemies
            .map(enemy => ({ ...enemy, y: enemy.y + ENEMY_SPEED }))
            .filter(enemy => enemy.y < canvas.height + ENEMY_SIZE && enemy.health > 0);

        // 5. BULLET LOGIC
        gameState.bullets = gameState.bullets
            .map(bullet => ({ ...bullet, y: bullet.y - BULLET_SPEED }))
            .filter(bullet => bullet.y > -10);

        // 6. COLLISION DETECTION
        gameState.bullets.forEach(bullet => {
            gameState.enemies.forEach(enemy => {
                if (enemy.health > 0 &&
                    bullet.x > enemy.x && bullet.x < enemy.x + enemy.size &&
                    bullet.y > enemy.y && bullet.y < enemy.y + enemy.size) {
                    enemy.health = 0;
                    bullet.y = -100; // Remove bullet
                    setScore(s => s + 100);
                }
            });
        });

        // Check if enemies hit player (game over condition)
        gameState.enemies.forEach(enemy => {
            if (enemy.health > 0 &&
                enemy.y + enemy.size > p.y &&
                enemy.x < p.x + p.size &&
                enemy.x + enemy.size > p.x &&
                enemy.y < p.y + p.size) {
                onGameOver();
            }
        });
        
        // 7. DRAWING
        // Draw Player (spaceship shape)
        ctx.fillStyle = '#00FFFF';
        ctx.shadowColor = '#00FFFF';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.moveTo(p.x + p.size / 2, p.y); // Top point
        ctx.lineTo(p.x, p.y + p.size); // Bottom left
        ctx.lineTo(p.x + p.size / 2, p.y + p.size * 0.7); // Middle bottom
        ctx.lineTo(p.x + p.size, p.y + p.size); // Bottom right
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw Enemies (invader style)
        gameState.enemies.forEach(enemy => {
            if (enemy.health > 0) {
                ctx.fillStyle = '#FF0066';
                ctx.shadowColor = '#FF0066';
                ctx.shadowBlur = 10;
                ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size * 0.7);
                ctx.fillRect(enemy.x + 5, enemy.y + enemy.size * 0.3, 5, 5);
                ctx.fillRect(enemy.x + enemy.size - 10, enemy.y + enemy.size * 0.3, 5, 5);
            }
        });
        ctx.shadowBlur = 0;

        // Draw Bullets (energy beams)
        ctx.fillStyle = '#00FF00';
        ctx.shadowColor = '#00FF00';
        ctx.shadowBlur = 8;
        gameState.bullets.forEach(bullet => {
            ctx.fillRect(bullet.x - 2, bullet.y, 4, 15);
        });
        ctx.shadowBlur = 0;

        // 8. RENDER SCORE
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 24px monospace';
        ctx.fillText(`SCORE: ${score}`, 20, 40);
        ctx.font = '16px monospace';
        ctx.fillText(`ENEMIES: ${gameState.enemies.filter(e => e.health > 0).length}`, 20, 70);
    };

    // The Game Loop using requestAnimationFrame
    const gameLoop = (currentTime) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        update(ctx, canvas, currentTime);
        gameState.gameLoopId = requestAnimationFrame(gameLoop);
    };

    // --- Effect for Setup, Input, and Cleanup ---
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = gameContainerRef.current;

        // Initialize Canvas Size and Player Position
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        gameState.player.x = canvas.width / 2 - gameState.player.size / 2;
        gameState.player.y = canvas.height - gameState.player.size * 3;
        gameState.enemies = [];
        gameState.bullets = [];
        gameState.lastEnemySpawn = performance.now();

        // Input Handlers - Arrow Keys, Space, and ESC
        const handleKeyDown = (e) => {
            const key = e.key;
            if (key === 'ArrowLeft') {
                e.preventDefault();
                gameState.input.left = true;
            } else if (key === 'ArrowRight') {
                e.preventDefault();
                gameState.input.right = true;
            } else if (key === ' ' && !gameState.input.space) {
                e.preventDefault();
                gameState.input.space = true;
                gameState.bullets.push({
                    x: gameState.player.x + gameState.player.size / 2,
                    y: gameState.player.y,
                });
            } else if (key === 'Escape') {
                e.preventDefault();
                onGameOver();
            }
        };

        const handleKeyUp = (e) => {
            const key = e.key;
            if (key === 'ArrowLeft') {
                e.preventDefault();
                gameState.input.left = false;
            } else if (key === 'ArrowRight') {
                e.preventDefault();
                gameState.input.right = false;
            } else if (key === ' ') {
                e.preventDefault();
                gameState.input.space = false;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Start the Game Loop
        gameLoop();

        // Cleanup function
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            cancelAnimationFrame(gameState.gameLoopId); // Stop the loop
        };
    }, []);

    // ---------------------------------------------

    return (
        <div ref={gameContainerRef} className="galaxia-game-container w-full h-screen bg-black relative">
            <canvas ref={canvasRef} className="block" />

            {/* Instructions */}
            <div className="absolute top-4 left-4 text-white text-sm z-50 bg-black bg-opacity-50 p-4 rounded-lg">
                <div className="font-bold mb-2">CONTROLS:</div>
                <div>← → Arrow Keys: Move</div>
                <div>SPACEBAR: Fire Beam</div>
                <div>ESC: Exit Game</div>
            </div>
        </div>
    );
};

// --- ORIGINAL TRACKS SECTION COMPONENT ---

const tracks = [
    {
        icon: Cpu,
        title: 'Smart Cities & Technology',
        description: 'Build intelligent urban solutions powered by IoT, AI, and data analytics',
        color: 'from-cyan-500 to-blue-600'
    },
    {
        icon: Blocks,
        title: 'Blockchain Development',
        description: 'Create decentralized applications and explore Web3 innovations',
        color: 'from-purple-500 to-pink-600'
    },
    {
        icon: Code,
        title: 'Development Tools',
        description: 'Craft next-gen tools that empower developers and enhance productivity',
        color: 'from-green-500 to-teal-600'
    },
    {
        icon: Wifi,
        title: 'IoT & Smart Systems',
        description: 'Design connected ecosystems that transform everyday interactions',
        color: 'from-orange-500 to-red-600'
    },
    {
        icon: Sparkles,
        title: 'Generative AI & Tools',
        description: 'Harness the power of AI to create intelligent, adaptive solutions',
        color: 'from-pink-500 to-purple-600'
    }
];

export default function TracksSection() {
    const [isGameActive, setIsGameActive] = useState(false);

    const handleGameOver = useCallback(() => {
        setIsGameActive(false);
    }, []);

    // 1. Arrow Key Listener to START the game
    useEffect(() => {
        if (isGameActive) return;

        const handleKeyDown = (event) => {
            const key = event.key;
            if (key === 'ArrowLeft' || key === 'ArrowRight') {
                event.preventDefault();
                console.log('Arrow key pressed! Activating Galaxia Game.');
                setIsGameActive(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isGameActive]);

    // 2. Body Class Toggler for full-screen override
    useEffect(() => {
        if (isGameActive) {
            document.body.classList.add('game-active');
        } else {
            document.body.classList.remove('game-active');
        }
        return () => {
            document.body.classList.remove('game-active');
        };
    }, [isGameActive]);


    // RENDER LOGIC
    if (isGameActive) {
        return <GalaxiaGame onGameOver={handleGameOver} />;
    }

    // Game is inactive: render the original TracksSection content
    return (
        <section className="relative py-24 px-4 overflow-hidden">
            <section id="tracks" className="relative py-24 px-4 overflow-hidden"></section>
            <div className="absolute inset-0">
                <div className="hologram-particles-bg" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-3d mb-6">
                        Innovation Tracks
                    </h2>
                    <p className="text-xl text-cyan-400 glow-text">
                        Choose your domain and shape the future
                    </p>
                    <p className="text-sm text-gray-400 mt-4">
                        Press ← or → arrow keys to activate secret game mode
                    </p>
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-6" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tracks.map((track, index) => {
                        const Icon = track.icon;
                        return (
                            <div
                                key={index}
                                className="holographic-card p-8 group hover:scale-105 transition-all duration-300 cursor-pointer"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${track.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 glow-icon`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-cyan-300 mb-4 group-hover:text-cyan-200 transition-colors">
                                    {track.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                    {track.description}
                                </p>

                                <div className="mt-6 flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                                    <span className="text-sm uppercase tracking-wider"></span>
                                    
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}