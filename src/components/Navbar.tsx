import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // active will hold the href, e.g., '#hero'
  const [active, setActive] = useState<string>('');
  const navRef = useRef<HTMLElement | null>(null);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'Venue', href: '#venue' },
    { label: 'Contact', href: '#contact' }
  ];

  // smooth scroll to section with navbar offset
  const navigateTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;

    // Get navbar height for accurate offset calculation
    const navHeight = navRef.current?.getBoundingClientRect().height ?? 64;
    
    // Calculate the target scroll position: 
    // Element's top absolute position + Current scroll position - Navbar height - small gap
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 8; 
    
    window.scrollTo({ top, behavior: 'smooth' });
  };

  // click handler for links
  const onNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    navigateTo(href);
    setIsOpen(false);
  };

  // Click handler specifically for the Register button linking to a section
  const onRegisterClick = (e: React.MouseEvent) => {
      e.preventDefault();
      navigateTo('#contact'); // Always navigate to the #contact section
      setIsOpen(false);
  };

  // update active section on scroll
  useEffect(() => {
    const ids = navItems.map(i => i.href.replace('#', ''));
    
    const onScroll = () => {
      const navHeight = navRef.current?.getBoundingClientRect().height ?? 64;
      let current = ids[0]; // Default to the first item (Home/Hero)
      
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        
        const rect = el.getBoundingClientRect();
        
        // If the section's top edge is above or near the offset position (20px buffer), it's active.
        if (rect.top - navHeight <= 20) {
          current = id;
        } 
        // Since sections are generally ordered top-down, we can break once we've passed the active section.
        else {
          break;
        }
      }
      setActive(current ? `#${current}` : '');
    };
    
    // Run once on mount and on resize
    onScroll();
    
    // Add scroll listener for updating active link
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* --- Desktop Navigation Links --- */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => onNavClick(e, item.href)}
              className={`text-sm uppercase tracking-wider transition-colors duration-300 px-2 py-1 rounded ${
                active === item.href ? 'text-cyan-400 glow-text font-semibold' : 'text-gray-300 hover:text-cyan-400 hover:glow-text'
              }`}
              aria-current={active === item.href ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* --- Register Button (Desktop) --- */}
        <div className="hidden md:block">
          <a 
            href="#contact" // ⬅️ NEW: Link to #contact section
            onClick={onRegisterClick} // ⬅️ Use the specific click handler
            className="neon-button px-6 py-2 text-sm"
          >
            Register
          </a>
        </div>

        {/* --- Mobile Menu Button --- */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cyan-400 hover:text-cyan-300 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-cyan-500/30">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => onNavClick(e, item.href)}
                className="block text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded hover:bg-cyan-500/10"
              >
                {item.label}
              </a>
            ))}
            {/* --- Register Button (Mobile) --- */}
            <a 
              href="#contact" // ⬅️ NEW: Link to #contact section
              className="neon-button w-full mt-4 text-center"
              onClick={onRegisterClick} // ⬅️ Use the specific click handler
            >
              Register
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}