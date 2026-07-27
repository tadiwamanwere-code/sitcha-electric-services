import {ArrowRight} from 'lucide-react';
import {motion} from 'motion/react';
import {useEffect, useState} from 'react';
import {HERO_DATA} from '../data';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({onNavigate}: HeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-blue-600 flex items-center justify-center"
    >
      {/* Parallax layer. scale-105 so the edges never reveal during the shift. */}
      <div
        className="absolute inset-0 w-full h-full select-none pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <img
          src={HERO_DATA.bgImage}
          alt={HERO_DATA.bgAlt}
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
      </div>

      {/*
        NEUTRAL scrim, only where the text sits. A brand-colour wash over the
        whole photo destroys the reason the photo is there.
        Bright/busy photo → raise to /75 and /55. Dark photo → drop to /50 and /35.
      */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full text-left flex flex-col justify-center h-full">
        <div className="max-w-3xl">
          {/* Eyebrow — accent rule + wide-tracked mono */}
          <motion.div
            initial={{opacity: 0, y: 15}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.2}}
            className="flex items-center gap-2 mb-4"
          >
            <span className="h-[1px] w-8 bg-yellow-500" />
            <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-yellow-500 uppercase font-medium">
              {HERO_DATA.tagline}
            </span>
          </motion.div>

          <motion.h1
            initial={{opacity: 0, y: 25}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.4}}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-6 leading-[1.05]"
            id="hero-headline"
          >
            {HERO_DATA.headline}
          </motion.h1>

          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.6}}
            className="text-base sm:text-lg md:text-xl text-gray-100 font-sans font-light mb-10 leading-relaxed max-w-xl"
            id="hero-subheadline"
          >
            {HERO_DATA.subheadline}
          </motion.p>

          <motion.div
            initial={{opacity: 0, y: 15}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.8}}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
            id="hero-actions"
          >
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-[#101820] font-display font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              id="hero-cta-primary"
            >
              {HERO_DATA.ctaPrimary}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            <button
              onClick={() => onNavigate('projects')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/40 hover:border-white font-display font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              id="hero-cta-secondary"
            >
              {HERO_DATA.ctaSecondary}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue — an accent bar looping down a thin track */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <button
          onClick={() => onNavigate('about')}
          className="text-gray-200 hover:text-yellow-500 transition-colors duration-300 flex flex-col items-center gap-2 cursor-pointer"
          id="scroll-indicator-btn"
          aria-label="Scroll to About section"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] text-gray-300 uppercase">
            EXPLORE
          </span>
          <div className="h-10 w-[1px] bg-white/30 relative overflow-hidden">
            <motion.div
              animate={{y: [0, 40, 0]}}
              transition={{duration: 2, repeat: Infinity, ease: 'easeInOut'}}
              className="absolute top-0 left-0 right-0 h-1/2 bg-yellow-500"
            />
          </div>
        </button>
      </div>
    </section>
  );
}
