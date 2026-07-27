import {useEffect, useState} from 'react';
import About from './components/About';
import Chatbot from './components/Chatbot';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Process from './components/Process';
import Projects from './components/Projects';
import Services from './components/Services';

/**
 * Section ids in DOM order. Adding a section means updating this array,
 * `navItems` in Navbar.tsx, the quick-links array in Footer.tsx, and <main> below.
 */
const SECTION_IDS = ['home', 'about', 'services', 'projects', 'gallery', 'process', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const handleNavigate = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({behavior: 'smooth', block: 'start'});
      setActiveSection(sectionId);
    }
  };

  /**
   * Sections are often taller than the viewport, so "most visible" heuristics
   * (IntersectionObserver) flip-flop. A fixed probe line at one third of the
   * viewport compared against section bounds is stable and cheap.
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of SECTION_IDS) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans selection:bg-orange-500 selection:text-white antialiased">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <main id="primary-content-scroller">
        <Hero onNavigate={handleNavigate} />
        {/* Light */}
        <About />
        {/* Deep navy */}
        <Services />
        {/* Light */}
        <Projects />
        {/* Panel navy */}
        <Gallery />
        {/* Light */}
        <Process />
        {/* Deep navy */}
        <Contact />
      </main>

      <Footer onNavigate={handleNavigate} />

      <Chatbot />
    </div>
  );
}
