import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';

export function Projects() {
  return (
    <section id="proyectos" className="py-28 px-6 bg-slate relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <p className="text-teal text-xs font-mono tracking-[0.2em] uppercase mb-3">Portafolio</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Mis <span className="text-coral">Proyectos</span>
        </h2>
        <div className="w-16 h-1 bg-coral rounded mb-12" />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              to={`/proyectos/${project.slug}`}
              className="group relative flex flex-col bg-dark/70 border border-white/5 rounded-2xl overflow-hidden hover:border-coral/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-coral/5"
            >
              {/* Barra superior decorativa */}
              <div className="h-1 w-full bg-gradient-to-r from-coral via-orange to-yellow opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="p-6 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl font-bold text-white/5 select-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] text-yellow font-mono border border-yellow/30 rounded-full px-2.5 py-1 bg-yellow/5">
                      ★ destacado
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-coral transition-colors mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {project.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 5).map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-muted border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 5 && (
                    <span className="px-2.5 py-1 text-xs rounded-md text-muted/60">
                      +{project.stack.length - 5} más
                    </span>
                  )}
                </div>

                {/* Arrow hint */}
                <div className="flex items-center gap-1 mt-5 text-coral/0 group-hover:text-coral/80 transition-all translate-x-0 group-hover:translate-x-1 duration-300">
                  <span className="text-sm font-medium">Ver detalle</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
