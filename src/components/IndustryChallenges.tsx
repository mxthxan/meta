import { useState, useEffect } from 'react';
import { Building2, Rocket, Zap, Globe } from 'lucide-react';

const challenges = [
  {
    icon: Building2,
    company: 'Tech Corp',
    title: 'Sustainable Urban Mobility',
    description: 'Design an AI-powered traffic management system for smart cities',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    icon: Rocket,
    company: 'InnovateLabs',
    title: 'Decentralized Healthcare',
    description: 'Build a blockchain-based patient data management platform',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: Zap,
    company: 'FutureTech',
    title: 'Green Energy Optimization',
    description: 'Create an IoT solution for intelligent energy distribution',
    color: 'from-green-500 to-teal-600'
  },
  {
    icon: Globe,
    company: 'MetaSolutions',
    title: 'AI Content Verification',
    description: 'Develop tools to detect and verify AI-generated content',
    color: 'from-orange-500 to-red-600'
  }
];

export default function IndustryChallenges() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % challenges.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="tech-pattern" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-3d mb-6">
            Real-World Challenges from Industry
          </h2>
          <p className="text-xl text-cyan-400 glow-text">
            Solve problems that matter, create solutions that impact
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-6" />
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {challenges.map((challenge, index) => {
                const Icon = challenge.icon;
                return (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="holographic-card p-12 text-center">
                      <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${challenge.color} flex items-center justify-center mx-auto mb-6 glow-icon animate-pulse`}>
                        <Icon className="w-12 h-12 text-white" />
                      </div>

                      <div className="text-sm uppercase tracking-wider text-purple-400 mb-2">
                        {challenge.company}
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-6">
                        {challenge.title}
                      </h3>

                      <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                        {challenge.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {challenges.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-cyan-400 w-12 glow-dot'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-purple-300 mb-6">
            Partner companies will provide mentorship and potential opportunities
          </p>
          <button className="neon-button px-8 py-4 text-lg font-bold">
            View All Challenges
          </button>
        </div>
      </div>
    </section>
  );
}
