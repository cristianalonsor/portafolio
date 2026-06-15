/**
 * About.tsx — sección "Sobre mí" del portafolio.
 *
 * Presenta la bio del desarrollador en un layout de 5 columnas (lg):
 *   - 3 columnas: texto libre + estadísticas numéricas (STATS)
 *   - 2 columnas: tarjetas de área tecnológica (CHIPS)
 *
 * STATS y CHIPS son constantes de módulo (fuera del componente) porque
 * son datos estáticos que no cambian entre renders — evita recrearlos
 * en cada render innecesariamente.
 */

/** Métricas numéricas que refuerzan la experiencia del desarrollador. */
const STATS = [
  { value: '3+', label: 'Años de experiencia' },
  { value: '10+', label: 'Proyectos completados' },
  { value: 'Full', label: 'Stack developer' },
];

/** Tarjetas de área tecnológica con icono, nombre y stack principal. */
const CHIPS = [
  { icon: '⚡', label: 'Frontend', desc: 'React · Angular · TypeScript' },
  { icon: '🛠', label: 'Backend', desc: 'Node.js · Express · REST' },
  { icon: '☁️', label: 'Cloud', desc: 'Vercel · Railway · Azure' },
  { icon: '🔄', label: 'Proceso', desc: 'Scrum · Git · CI/CD' },
];

export function About() {
  return (
    <section id="sobre-mi" className="py-28 px-6 bg-slate relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <p className="text-teal text-xs font-mono tracking-[0.2em] uppercase mb-3">Acerca de mí</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Hola, soy <span className="text-coral">Cristian</span>
        </h2>
        <div className="w-16 h-1 bg-coral rounded mb-10" />

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Texto */}
          <div className="lg:col-span-3 space-y-5 text-muted text-base leading-relaxed">
            <p>
              Soy un desarrollador Full Stack con pasión por construir productos digitales
              modernos, escalables y con propósito. Me especializo en el ecosistema
              JavaScript/TypeScript, trabajando tanto en el frontend como en el backend.
            </p>
            <p>
              Me interesa la automatización de procesos, la integración de tecnologías
              emergentes como la inteligencia artificial, y el despliegue en la nube.
              Cada proyecto es una oportunidad de aprender y entregar algo mejor.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-white/5">
              {STATS.map(s => (
                <div key={s.label}>
                  <p className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</p>
                  <p className="text-xs text-muted mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chips */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {CHIPS.map(chip => (
              <div
                key={chip.label}
                className="flex items-center gap-4 bg-dark/50 rounded-xl p-4 border border-white/5 hover:border-teal/30 transition-colors"
              >
                <span className="text-2xl shrink-0">{chip.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{chip.label}</p>
                  <p className="text-muted text-xs mt-0.5">{chip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
