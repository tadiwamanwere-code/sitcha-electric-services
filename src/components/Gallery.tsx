import {Maximize2, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useEffect, useState} from 'react';
import {GALLERY_IMAGES, SECTIONS} from '../data';

/**
 * Deliberately simpler than Projects — no captions, no metadata, no arrows.
 * This is the section that lets a client show 6-9 good photos with zero copywriting.
 */
export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-white text-gray-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            {/* Blue, not the amber accent: amber on white fails contrast. */}
            <span className="h-[1px] w-6 bg-blue-600" />
            <span className="text-xs font-mono tracking-[0.25em] text-blue-600 uppercase font-semibold">
              {SECTIONS.gallery.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900">
            {SECTIONS.gallery.heading}
          </h2>
          <p className="text-sm sm:text-base font-sans text-gray-600 font-light mt-4">
            {SECTIONS.gallery.intro}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" id="site-gallery-grid">
          {GALLERY_IMAGES.map((img, idx) => (
            <button
              key={img.src}
              onClick={() => setSelected(idx)}
              className="relative aspect-square overflow-hidden group cursor-pointer border border-gray-200"
              id={`gallery-thumb-${idx}`}
              aria-label={`View larger: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Maximize2 className="w-5 h-5 text-white" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelected(null)}
            id="gallery-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={GALLERY_IMAGES[selected].alt}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-yellow-500 hover:text-[#101820] text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{scale: 0.95}}
              animate={{scale: 1}}
              exit={{scale: 0.95}}
              src={GALLERY_IMAGES[selected].src}
              alt={GALLERY_IMAGES[selected].alt}
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
