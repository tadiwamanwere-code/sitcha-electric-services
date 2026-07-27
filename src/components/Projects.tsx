import {DollarSign, Layers, MapPin, Maximize2, User, X} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useEffect, useState} from 'react';
import {PROJECTS_DATA, SECTIONS} from '../data';
import type {Project} from '../types';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Escape closes the modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="projects" className="py-24 md:py-32 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-[1px] w-6 bg-blue-600" />
            <span className="text-xs font-mono tracking-[0.25em] text-blue-600 uppercase font-semibold">
              {SECTIONS.projects.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900">
            {SECTIONS.projects.heading}
          </h2>
          <p className="text-sm sm:text-base font-sans text-gray-600 font-light mt-4 max-w-2xl">
            {SECTIONS.projects.intro}
          </p>
        </div>

        {/* layout + popLayout so a category filter can be added later without rework */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8" id="portfolio-grid">
          <AnimatePresence mode="popLayout">
            {PROJECTS_DATA.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{opacity: 0, scale: 0.95}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.95}}
                transition={{duration: 0.4}}
                onClick={() => setSelectedProject(project)}
                className="bg-white border border-gray-100 overflow-hidden group shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
                id={`project-thumbnail-${project.id}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                  <img
                    src={project.afterImage}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-gray-900 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-md">
                      <Maximize2 className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-sm border border-gray-200 text-[10px] font-mono tracking-widest text-gray-800 uppercase">
                    {project.categoryLabel}
                  </div>
                </div>

                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {project.location}
                      </span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>
                    <h4 className="text-xl font-display font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-3">
                      {project.title}
                    </h4>
                    <p className="text-sm text-gray-600 font-sans font-light leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-mono text-blue-600 font-medium">VIEW DETAILS</span>
                    <span className="text-xs font-mono text-gray-500">{project.area}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/*
              Honest placeholder so a client with only 2-3 real projects still has
              a balanced grid. DELETE THIS BLOCK once there are 4+ projects.
            */}
            <motion.div
              layout
              key="more-projects-soon"
              initial={{opacity: 0, scale: 0.95}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.95}}
              transition={{duration: 0.4}}
              className="border border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-8 min-h-[280px]"
            >
              <span className="text-xs font-mono tracking-widest text-gray-500 uppercase">
                More projects coming soon
              </span>
              <p className="text-sm text-gray-500 font-sans font-light mt-2 max-w-xs">
                Reach out for references and a look at our completed and in-progress work.
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Detail modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 overflow-y-auto"
              onClick={() => setSelectedProject(null)}
              id="project-lightbox-modal"
              role="dialog"
              aria-modal="true"
              aria-label={selectedProject.title}
            >
              <motion.div
                initial={{scale: 0.95, y: 20}}
                animate={{scale: 1, y: 0}}
                exit={{scale: 0.95, y: 20}}
                transition={{type: 'spring', duration: 0.5}}
                className="bg-white text-gray-900 max-w-4xl w-full border border-gray-200 overflow-hidden relative shadow-2xl my-8"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-40 p-2 bg-black/60 hover:bg-blue-600 text-white rounded-full transition-colors cursor-pointer"
                  id="close-lightbox-btn"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12">
                  <div className="md:col-span-7 relative bg-gray-100 min-h-[300px] md:h-full">
                    <img
                      src={selectedProject.afterImage}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover min-h-[300px] md:absolute md:inset-0"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="md:col-span-5 p-8 md:p-10 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-blue-600 uppercase font-bold">
                        {selectedProject.categoryLabel}
                      </span>
                      <h3 className="text-2xl font-display font-bold text-gray-900 mt-1 mb-4">
                        {selectedProject.title}
                      </h3>

                      <p className="text-sm text-gray-600 font-sans font-light leading-relaxed mb-6">
                        {selectedProject.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-6 mb-6">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-gray-500 block">CLIENT</span>
                          <span className="text-xs font-sans text-gray-800 font-medium flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-gray-500" />
                            {selectedProject.client}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-gray-500 block">LOCATION</span>
                          <span className="text-xs font-sans text-gray-800 font-medium flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gray-500" />
                            {selectedProject.location}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-gray-500 block">AREA</span>
                          <span className="text-xs font-sans text-gray-800 font-medium flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-gray-500" />
                            {selectedProject.area}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-gray-500 block">
                            STATUS / YEAR
                          </span>
                          <span className="text-xs font-sans text-gray-800 font-medium flex items-center gap-1.5">
                            <DollarSign className="w-3.5 h-3.5 text-gray-500" />
                            {selectedProject.budget || selectedProject.year}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-gray-500 block mb-3 uppercase">
                          DETAILS:
                        </span>
                        <ul className="space-y-2.5">
                          {selectedProject.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-center gap-2.5">
                              <div className="w-1.5 h-1.5 bg-blue-600 shrink-0" />
                              <span className="text-xs font-sans text-gray-700 font-light">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 border-t border-gray-100 pt-6">
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="w-full py-3 bg-gray-900 hover:bg-blue-600 text-white font-mono text-xs tracking-widest uppercase transition-colors cursor-pointer"
                        id="lightbox-close-cta"
                      >
                        CLOSE
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
