import {Clock, ShieldCheck, Wrench} from 'lucide-react';
import {motion} from 'motion/react';
import {SECTIONS, VALUES_DATA} from '../data';

export default function About() {
  /* Indexed by card position — matches the order of VALUES_DATA in data.ts:
     safety-first wiring · one team for the whole property · weekend call-outs. */
  const iconMap = [
    <ShieldCheck
      className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300"
      key="shield"
      strokeWidth={1.75}
    />,
    <Wrench
      className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300"
      key="wrench"
      strokeWidth={1.75}
    />,
    <Clock
      className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300"
      key="clock"
      strokeWidth={1.75}
    />,
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Story — 5/7 asymmetric split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-[1px] w-6 bg-blue-600" />
              <span className="text-xs font-mono tracking-[0.25em] text-blue-600 uppercase font-semibold">
                {SECTIONS.about.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 leading-tight">
              {SECTIONS.about.heading}
            </h2>
          </div>

          {/*
            The only genuinely bespoke long-form prose on the page, so it stays
            inline rather than in data.ts.
            Paragraph 1: what they do and the standard they do it to.
            Paragraph 2: scope, coverage, and how they work.
          */}
          <div className="lg:col-span-7 font-sans text-gray-700 space-y-6 text-base md:text-lg font-light leading-relaxed">
            <p>
              Sitcha Electric Services has been wiring, powering, and repairing homes and businesses
              in Masvingo since 2023. Electrical work is the one trade where a shortcut you cannot
              see becomes a fire you cannot stop — so we earth properly, balance the load, and test
              everything under power before we call a job finished.
            </p>
            <p>
              From a single tripping circuit to a full solar installation, we handle it end to end:
              assessment, quote, installation or repair, testing, and a labelled board you can
              actually read. We cover Masvingo, Zvishavane, and Chiredzi, and we take urgent
              call-outs on weekends.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="border-t border-gray-200 pt-16">
          <div className="mb-12">
            <span className="text-xs font-mono tracking-[0.25em] text-gray-500 uppercase">
              {SECTIONS.values.eyebrow}
            </span>
            <h3 className="text-2xl font-display font-bold tracking-tight text-gray-900 mt-2">
              {SECTIONS.values.heading}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {VALUES_DATA.map((value, idx) => (
              <motion.div
                key={value.title}
                whileHover={{y: -8}}
                transition={{duration: 0.3}}
                className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl relative group flex flex-col overflow-hidden transition-shadow duration-300"
                id={`value-card-${idx}`}
              >
                {/* Square icon tile that inverts on hover */}
                <div className="relative w-16 h-16 bg-blue-50 flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors duration-300 shrink-0">
                  {iconMap[idx % iconMap.length]}
                </div>

                <h4 className="relative text-xl md:text-2xl font-display font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {value.title}
                </h4>
                <p className="relative text-sm md:text-base text-gray-600 font-sans font-light leading-relaxed flex-grow">
                  {value.description}
                </p>

                {/* Accent rule that grows to full width on hover */}
                <div className="relative mt-8 h-1 w-12 bg-yellow-500 group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
