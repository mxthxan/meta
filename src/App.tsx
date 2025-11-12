import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TracksSection from './components/TracksSection';
import IndustryChallenges from './components/IndustryChallenges';
import ScheduleSection from './components/ScheduleSection';
import PrizesSection from './components/PrizesSection';
import VenueSection from './components/VenueSection';
import ContactSection from './components/ContactSection';

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TracksSection />
      <IndustryChallenges />
      <ScheduleSection />
      <PrizesSection />
      <VenueSection />
      <ContactSection />

      <footer className="relative py-8 px-4 border-t border-cyan-500/30 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="cyber-grid" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-gray-400">
            © 2025 MetaVerse Hackathon. All rights reserved.
          </p>
          <p className="text-cyan-400 mt-2 text-sm">
            Built for Innovation • Powered by Imagination
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
