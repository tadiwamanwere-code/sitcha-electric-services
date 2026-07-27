import {Menu, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useEffect, useState} from 'react';
import {BRAND} from '../data';
import Logo from './Logo';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

/** Must match SECTION_IDS in App.tsx. */
const navItems = [
  {id: 'home', label: 'HOME'},
  {id: 'about', label: 'ABOUT'},
  {id: 'services', label: 'SERVICES'},
  {id: 'projects', label: 'PROJECTS'},
  {id: 'gallery', label: 'GALLERY'},
  {id: 'process', label: 'PROCESS'},
  {id: 'contact', label: 'CONTACT'},
];

export default function Navbar({activeSection, onNavigate}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  /*
   * The bar is transparent over the hero photo and white once scrolled, so every
   * label has to swap between light-on-photo and dark-on-white. The open mobile
   * panel also forces the solid state — a white panel hanging off a transparent
   * bar leaves the logo stranded over the photo.
   */
  const solid = isScrolled || isMobileMenuOpen;

  return (
    <header
      id="main-header"
      /* Transparent over the hero, solid white once scrolled. The py shrink is
         what makes it feel responsive — keep it. */
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-white/95 backdrop-blur-md py-3 border-b border-gray-200 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand */}
        <button
          onClick={() => handleItemClick('home')}
          className="flex items-center gap-2.5 group text-left cursor-pointer"
          id="brand-logo-btn"
        >
          <Logo className="h-10 w-auto" />
          <div>
            <span
              className={`font-display font-bold tracking-wide text-base block leading-tight transition-colors duration-300 ${
                solid ? 'text-gray-900' : 'text-white'
              }`}
            >
              {BRAND.name}
            </span>
            <span
              className={`text-[9px] font-mono tracking-[0.25em] block -mt-0.5 transition-colors duration-300 ${
                solid ? 'text-blue-600' : 'text-yellow-500'
              }`}
            >
              {BRAND.kicker}
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" id="desktop-nav">
          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`text-xs font-mono tracking-widest font-medium cursor-pointer transition-colors duration-300 relative py-2 block ${
                    activeSection === item.id
                      ? solid
                        ? 'text-blue-600'
                        : 'text-blue-400'
                      : solid
                        ? 'text-gray-600 hover:text-gray-900'
                        : 'text-gray-200 hover:text-white'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  {item.label}
                  {/* Shared layoutId → the underline physically slides between items. */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                        solid ? 'bg-blue-600' : 'bg-blue-400'
                      }`}
                      transition={{type: 'spring', stiffness: 380, damping: 30}}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => handleItemClick('contact')}
            className="ml-4 px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-[#101820] font-display font-bold text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer"
            id="nav-cta-btn"
          >
            Get a Quote
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-1 transition-colors cursor-pointer ${
            solid ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-400'
          }`}
          id="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            transition={{duration: 0.3}}
            className="lg:hidden bg-white/98 border-b border-gray-200 overflow-hidden"
            id="mobile-nav-panel"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
              <ul className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item.id)}
                      className={`text-sm font-mono tracking-widest font-medium w-full text-left py-2 border-b border-gray-200 cursor-pointer ${
                        activeSection === item.id ? 'text-blue-600' : 'text-gray-700'
                      }`}
                      id={`mobile-nav-link-${item.id}`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleItemClick('contact')}
                className="w-full text-center py-3 bg-yellow-500 hover:bg-yellow-400 text-[#101820] font-display font-bold text-xs tracking-widest uppercase transition-colors cursor-pointer"
                id="mobile-nav-cta"
              >
                Get a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
