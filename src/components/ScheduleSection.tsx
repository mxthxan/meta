import { Clock, Users, Code, Trophy, Coffee, Presentation } from 'lucide-react';

const schedule = [
  {
    time: '09:00 AM',
    title: 'Registration & Welcome',
    description: 'Check-in and team formation',
    icon: Users,
    color: 'cyan'
  },
  {
    time: '10:00 AM',
    title: 'Opening Ceremony',
    description: 'Inauguration and problem statement reveal',
    icon: Presentation,
    color: 'purple'
  },
  {
    time: '11:00 AM',
    title: 'Hacking Begins',
    description: 'Let the coding marathon begin',
    icon: Code,
    color: 'green'
  },
  {
    time: '02:00 PM',
    title: 'Lunch Break',
    description: 'Refuel and network',
    icon: Coffee,
    color: 'orange'
  },
  {
    time: '06:00 PM',
    title: 'Checkpoint & Mentorship',
    description: 'Progress review with mentors',
    icon: Clock,
    color: 'pink'
  },
  {
    time: '12:00 AM',
    title: 'Midnight Boost',
    description: 'Late night snacks and motivation',
    icon: Coffee,
    color: 'cyan'
  },
  {
    time: '08:00 AM',
    title: 'Final Sprint',
    description: 'Last hours to polish your project',
    icon: Code,
    color: 'purple'
  },
  {
    time: '10:00 AM',
    title: 'Submission Deadline',
    description: 'Code freeze and presentation prep',
    icon: Clock,
    color: 'red'
  },
  {
    time: '11:00 AM',
    title: 'Project Demos',
    description: 'Showcase your innovation',
    icon: Presentation,
    color: 'green'
  },
  {
    time: '02:00 PM',
    title: 'Award Ceremony',
    description: 'Winners announcement and celebration',
    icon: Trophy,
    color: 'yellow'
  }
];

const colorMap: Record<string, string> = {
  cyan: 'border-cyan-500 bg-cyan-500',
  purple: 'border-purple-500 bg-purple-500',
  green: 'border-green-500 bg-green-500',
  orange: 'border-orange-500 bg-orange-500',
  pink: 'border-pink-500 bg-pink-500',
  red: 'border-red-500 bg-red-500',
  yellow: 'border-yellow-500 bg-yellow-500'
};

export default function ScheduleSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="timeline-grid" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-3d mb-6">
            Event Timeline
          </h2>
          <p className="text-xl text-cyan-400 glow-text">
            24 hours of non-stop innovation
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-6" />
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 glow-line" />

          <div className="space-y-12">
            {schedule.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
                >
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-20 md:pl-0`}>
                    <div className="holographic-card p-6 hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colorMap[event.color]} flex items-center justify-center glow-icon`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-lg font-bold text-cyan-400">{event.time}</div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-gray-400">{event.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-black z-10"
                    style={{ borderColor: `var(--${event.color}-500, #06b6d4)` }}
                  />

                  <div className="hidden md:block w-5/12" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
