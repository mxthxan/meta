import { Cpu, Blocks, Code, Wifi, Sparkles } from 'lucide-react';

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
  return (
    <section className="relative py-24 px-4 overflow-hidden">
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
                  <span className="text-sm uppercase tracking-wider">Explore Track</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
