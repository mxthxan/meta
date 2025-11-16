import { Trophy, Award, Users, Briefcase, GraduationCap, Star } from 'lucide-react';

const prizes = [
  {
    icon: Trophy,
    title: '1st Prize',
    amount: '₹15,000',
    color: 'from-yellow-400 to-orange-500',
    glow: 'shadow-yellow-500/50'
  },
  {
    icon: Award,
    title: '2nd Prize',
    amount: '₹7,000',
    color: 'from-gray-300 to-gray-500',
    glow: 'shadow-gray-400/50'
  },
  {
    icon: Star,
    title: '3rd Prize',
    amount: '₹5,000',
    color: 'from-orange-400 to-red-500',
    glow: 'shadow-orange-500/50'
  }
];

const benefits = [
  {
    icon: GraduationCap,
    title: 'Certificates',
    description: 'Official participation and winner certificates',
    color: 'cyan'
  },
  {
    icon: Users,
    title: 'Mentorship',
    description: 'Guidance from industry experts and tech leaders',
    color: 'purple'
  },
  {
    icon: Briefcase,
    title: 'Internship Opportunities',
    description: 'Fast-track interviews with partner companies',
    color: 'green'
  },
  {
    icon: Star,
    title: 'Networking',
    description: 'Connect with innovators and potential co-founders',
    color: 'pink'
  }
];

export default function PrizesSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <section id="prizes" className="relative py-24 px-4 overflow-hidden"></section>
      <div className="absolute inset-0">
        <div className="prize-particles" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-3d mb-6">
            Prizes & Rewards
          </h2>
          <p className="text-xl text-cyan-400 glow-text">
            Recognition, rewards, and opportunities await
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {prizes.map((prize, index) => {
            const Icon = prize.icon;
            return (
              <div
                key={index}
                className="holographic-card p-8 text-center hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${prize.color} flex items-center justify-center mx-auto mb-6 ${prize.glow} shadow-2xl animate-float`}>
                  <Icon className="w-12 h-12 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{prize.title}</h3>

                <div className="text-5xl font-bold neon-text mb-6">
                  {prize.amount}
                </div>

                <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-cyan-900/50 to-purple-900/50 border border-cyan-500/50">
                  <span className="text-cyan-400 text-sm uppercase tracking-wider">Cash Prize</span>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-center text-cyan-300 mb-12">
            Additional Benefits
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="holographic-card p-6 hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br from-${benefit.color}-500 to-${benefit.color}-700 flex items-center justify-center mb-4 glow-icon`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h4 className="text-xl font-bold text-cyan-300 mb-3">{benefit.title}</h4>

                  <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="holographic-card p-8 inline-block">
            <p className="text-xl text-purple-300 mb-4">
              <span className="text-cyan-400 font-bold">Additional Surprise Prizes</span> will be announced during the event!
            </p>
            <p className="text-gray-400">
              Plus exclusive swag, goodies, and lifetime access to our tech community
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
