/**
 * Contact.tsx — sección de contacto del portafolio.
 *
 * Layout de 5 columnas (lg):
 *   - 2 columnas: información de contacto (CONTACT_INFO)
 *   - 3 columnas: formulario controlado por el hook useContactForm
 *
 * La lógica del formulario (estado, validación, fetch al backend) vive
 * completamente en useContactForm — este componente solo presenta la UI.
 */
import { useContactForm } from '../../hooks/useContactForm';
import { Button } from '../ui/Button';

/** Datos de contacto mostrados en la columna izquierda. */
const CONTACT_INFO = [
  { icon: '✉️', label: 'Email', value: 'creyes@ninjaexcel.com' },
  { icon: '📍', label: 'Ubicación', value: 'Chile' },
  { icon: '⏰', label: 'Respuesta', value: 'Menos de 24h' },
];

export function Contact() {
  const { form, status, error, handleChange, handleSubmit } = useContactForm();

  // inputClass evita repetir las mismas 80+ clases Tailwind en cada <input> y <textarea>
  const inputClass =
    'w-full bg-slate/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-muted/60 focus:outline-none focus:border-coral/60 focus:bg-slate/60 transition-all text-sm';

  return (
    <section id="contacto" className="py-28 px-6 bg-dark relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-teal/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <p className="text-teal text-xs font-mono tracking-[0.2em] uppercase mb-3">Contacto</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <span className="text-coral">Hablemos</span>
        </h2>
        <div className="w-16 h-1 bg-coral rounded mb-12" />

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info lateral */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-muted text-base leading-relaxed">
              ¿Tienes un proyecto en mente o quieres cotizar algo? Escríbeme y te respondo a la brevedad.
            </p>
            <div className="space-y-4 pt-2">
              {CONTACT_INFO.map(item => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs text-muted/60 font-mono uppercase tracking-wider">{item.label}</p>
                    <p className="text-white text-sm mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-3">
            {/* status === 'success': reemplaza el form por un mensaje de confirmación */}
            {status === 'success' ? (
              <div className="h-full flex items-center justify-center bg-teal/5 border border-teal/20 rounded-2xl p-12 text-center">
                <div>
                  <span className="text-5xl mb-4 block">✅</span>
                  <p className="text-white text-xl font-semibold mb-2">¡Mensaje enviado!</p>
                  <p className="text-muted text-sm">Te responderé pronto. Gracias por escribir.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted/60 font-mono uppercase tracking-wider mb-1.5 block">Nombre</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre" required className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs text-muted/60 font-mono uppercase tracking-wider mb-1.5 block">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" required className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted/60 font-mono uppercase tracking-wider mb-1.5 block">Asunto</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="¿En qué puedo ayudarte?" required className={inputClass} />
                </div>
                <div>
                  <label className="text-xs text-muted/60 font-mono uppercase tracking-wider mb-1.5 block">Mensaje</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Cuéntame sobre tu proyecto..." required rows={5} className={`${inputClass} resize-none`} />
                </div>
                {/* status === 'error': muestra el mensaje de error del hook encima del botón */}
                {status === 'error' && (
                  <p className="text-coral text-sm flex items-center gap-2">
                    <span>⚠️</span> {error}
                  </p>
                )}
                <Button type="submit" disabled={status === 'loading'} className="w-full text-base py-4">
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </span>
                  ) : 'Enviar mensaje →'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
