import {CheckCircle2, ClipboardCheck, Clock, Hammer, Trophy} from 'lucide-react';
import {PROCESS_STEPS, SECTIONS} from '../data';

/** consult → quote → build → hand over. Swap icons for the trade, keep the arc. */
const STEP_ICONS = [ClipboardCheck, Clock, Hammer, Trophy];

/**
 * No Motion in this section on purpose — four cards animating on scroll is noise.
 * Pure CSS hover lift instead.
 */
export default function Process() {
  return (
    <section
      id="process"
      className="py-24 md:py-32 bg-[#F4F7FA] text-gray-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-[1px] w-6 bg-blue-600" />
            <span className="text-xs font-mono tracking-[0.25em] text-blue-600 uppercase font-semibold">
              {SECTIONS.process.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900">
            {SECTIONS.process.heading}
          </h2>
          <p className="text-sm sm:text-base font-sans text-gray-600 font-light mt-4">
            {SECTIONS.process.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = STEP_ICONS[idx % STEP_ICONS.length];
            return (
              <div
                key={step.step}
                className="bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-7 flex flex-col h-full group"
                id={`process-card-${idx}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 flex items-center justify-center bg-blue-600 text-white font-display font-bold text-xl shrink-0">
                    {step.step}
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-50 group-hover:bg-yellow-500 transition-colors duration-300">
                    <Icon
                      className="w-5 h-5 text-blue-600 group-hover:text-[#101820] transition-colors duration-300"
                      strokeWidth={1.75}
                    />
                  </div>
                </div>

                {/* The anxiety-reducer. Honest even when vague. */}
                <span className="text-[10px] font-mono tracking-widest text-blue-600 uppercase font-semibold block mb-2">
                  {step.duration}
                </span>
                <h4 className="text-lg md:text-xl font-display font-bold text-gray-900 mb-3">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-600 font-sans font-light leading-relaxed mb-6 flex-grow">
                  {step.description}
                </p>

                <ul className="space-y-2 border-t border-gray-100 pt-4">
                  {step.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-500 font-sans leading-snug">
                        {deliverable}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
