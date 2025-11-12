import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'Venue', href: '#venue' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center glow-icon">
            <span className="text-white font-bold text-lg"></span>
          </div> 
          <span className="text-xl font-bold neon-text hidden md:inline"></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm uppercase tracking-wider hover:glow-text"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button className="neon-button px-6 py-2 text-sm">
            Register
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-cyan-500/30">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded hover:bg-cyan-500/10"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button className="neon-button w-full mt-4">Register</button>
          </div>
        </div>
      )}
    </nav>
  );
}
