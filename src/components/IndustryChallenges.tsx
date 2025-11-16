import { Building2, Rocket, Zap, Globe } from 'lucide-react';

const sponsors = [
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
  // Duplicate sponsors for seamless infinite scroll
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Our Sponsors
            </h2>
            <p className="text-xl text-cyan-400">
              Powered by industry leaders
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-6" />
          </div>

          <div className="relative overflow-hidden py-8">
            <div className="flex animate-scroll">
              {duplicatedSponsors.map((sponsor, index) => {
                const Icon = sponsor.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center px-16 flex-shrink-0"
                  >
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${sponsor.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white whitespace-nowrap">
                      {sponsor.company}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-purple-300">
              Thank you to our amazing sponsors for making this event possible
            </p>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }

          .animate-scroll {
            animation: scroll 20s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>
    </div>
  );
}