export default function AboutSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="cyber-grid" />
      </div>

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
              Welcome to <span className="text-purple-400 font-bold">MetaVerse</span> — where innovation transcends reality and imagination shapes the future.
            </p>

            <p>
              This is not just another hackathon. It's a <span className="text-cyan-400 font-semibold">24-hour journey into the digital frontier</span>,
              where visionaries, creators, and tech pioneers come together to build tomorrow's solutions today.
            </p>

            <p>
              Teams will dive deep into <span className="text-purple-400 font-semibold">emerging technologies</span>, crafting futuristic prototypes
              that push the boundaries of what's possible. From AI-powered innovations to blockchain breakthroughs, from IoT ecosystems to smart city solutions —
              this is where <span className="text-cyan-400 font-semibold">code meets creativity</span>.
            </p>

            <p className="text-pink-300 font-medium">
              Are you ready to step into the MetaVerse and create the future?
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
