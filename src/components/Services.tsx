import {
  CheckCircle2,
  ChevronDown,
  Factory,
  Gauge,
  Layers,
  Lightbulb,
  ShieldCheck,
  Smartphone,
  Sun,
  WashingMachine,
  Wrench,
  Zap,
} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useState} from 'react';
import {SECTIONS, SERVICES_BANNER, SERVICES_DATA} from '../data';

/**
 * String → component map. Keeps data.ts free of JSX so it stays serializable.
 * Add a case whenever a service uses a new icon.
 */
function getIcon(iconName: string) {
  const cls = 'w-6 h-6 text-blue-600';
  switch (iconName) {
    case 'Sun':
      return <Sun className={cls} />;
    case 'Zap':
      return <Zap className={cls} />;
    case 'WashingMachine':
      return <WashingMachine className={cls} />;
    case 'Gauge':
      return <Gauge className={cls} />;
    case 'ShieldCheck':
      return <ShieldCheck className={cls} />;
    case 'Smartphone':
      return <Smartphone className={cls} />;
    case 'Factory':
      return <Factory className={cls} />;
    case 'Lightbulb':
      return <Lightbulb className={cls} />;
    case 'Wrench':
      return <Wrench className={cls} />;
    default:
      return <Layers className={cls} />;
  }
}

export default function Services() {
  // First service open by default.
  const [expandedId, setExpandedId] = useState<string | null>(SERVICES_DATA[0]?.id ?? null);

  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-white text-gray-900 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-[1px] w-6 bg-blue-600" />
            <span className="text-xs font-mono tracking-[0.25em] text-blue-600 uppercase font-semibold">
              {SECTIONS.services.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-6 whitespace-pre-line">
            {SECTIONS.services.heading}
          </h2>
          <p className="text-sm sm:text-base font-sans text-gray-600 font-light leading-relaxed">
            {SECTIONS.services.intro}
          </p>
        </div>

        {/* Photo banner — breaks up an otherwise text-heavy section.
            The photo runs uncovered; only the caption sits on a neutral scrim,
            which it needs to stay legible over a bright image. */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full mb-16 md:mb-24 overflow-hidden border border-gray-200">
          <img
            src={SERVICES_BANNER.src}
            alt={SERVICES_BANNER.alt}
            className="w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-0 left-0 px-6 py-4 md:px-8 md:py-6 bg-gray-900/85">
            <span className="text-xs md:text-sm font-mono tracking-[0.2em] text-yellow-500 uppercase font-semibold">
              {SERVICES_BANNER.caption}
            </span>
          </div>
        </div>

        {/* Selector (5) + detail panel (7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 flex flex-col gap-4">
            {SERVICES_DATA.map((service, idx) => {
              const isExpanded = expandedId === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setExpandedId(isExpanded ? null : service.id)}
                  className={`w-full text-left p-6 border transition-all duration-300 relative group cursor-pointer ${
                    isExpanded
                      ? 'bg-blue-50 border-blue-600 shadow-[0_4px_20px_rgba(14,42,94,0.12)]'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  id={`service-toggle-${service.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 transition-colors duration-300 ${
                          isExpanded ? 'bg-blue-100' : 'bg-gray-100'
                        }`}
                      >
                        {getIcon(service.iconName)}
                      </div>
                      <div>
                        <span className="text-xs font-mono text-gray-500 tracking-wider block mb-0.5">
                          SERVICE_{String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-lg font-display font-bold text-gray-900 tracking-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 h-full flex flex-col justify-between">
            {/* min-h keeps the page from jumping when content swaps or closes */}
            <div className="bg-gray-50 border border-gray-200 p-8 md:p-12 min-h-[420px] flex flex-col justify-between relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 transform translate-x-12 -translate-y-12 rotate-45 pointer-events-none transition-transform duration-700 group-hover:scale-125" />

              <AnimatePresence mode="wait">
                {expandedId ? (
                  SERVICES_DATA.filter((s) => s.id === expandedId).map((service) => (
                    <motion.div
                      key={service.id}
                      initial={{opacity: 0, x: 20}}
                      animate={{opacity: 1, x: 0}}
                      exit={{opacity: 0, x: -20}}
                      transition={{duration: 0.3}}
                      className="flex flex-col justify-between h-full gap-8"
                      id={`service-detail-${service.id}`}
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-mono tracking-widest uppercase">
                            SERVICE
                          </span>
                        </div>
                        <h4 className="text-2xl font-display font-bold text-gray-900 mb-4">
                          {service.title}
                        </h4>
                        <p className="text-sm font-sans text-gray-600 font-light leading-relaxed mb-8">
                          {service.description}
                        </p>

                        <div className="border-t border-gray-200 pt-6">
                          <span className="text-[10px] font-mono tracking-widest text-gray-500 block mb-4 uppercase">
                            WHAT&apos;S INCLUDED:
                          </span>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {service.details.map((detail) => (
                              <li key={detail} className="flex items-start gap-3">
                                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                                <span className="text-xs font-sans text-gray-700 font-light leading-snug">
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="text-xs font-mono text-gray-500">
                          Like the look of this?
                        </span>
                        <a
                          href="#contact"
                          className="text-xs font-mono text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2 group/btn"
                        >
                          GET A FREE QUOTE
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  /* Keep this empty state — without it the panel collapses and
                     the page jumps when a service is toggled closed. */
                  <div className="flex flex-col items-center justify-center text-center h-full py-12">
                    <Layers className="w-12 h-12 text-blue-600/30 mb-4" />
                    <h4 className="text-lg font-display text-gray-700 mb-2">Select a service</h4>
                    <p className="text-xs text-gray-500 max-w-xs font-light">
                      Tap any of our services on the left to see exactly what&apos;s included.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
