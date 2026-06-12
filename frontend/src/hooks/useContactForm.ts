/**
 * useState: hook de React que crea una variable reactiva.
 * Cuando el estado cambia, React re-renderiza el componente automáticamente.
 *
 * Convención de nomenclatura para hooks de React: siempre empiezan con "use".
 * Esto no es solo estilo — React lo usa para aplicar sus reglas internas.
 */
import { useState } from 'react';

/**
 * ChangeEvent: el tipo del evento que dispara un <input> o <textarea> al cambiar.
 * FormEvent: el tipo del evento que dispara un <form> al hacer submit.
 * Ambos vienen de React y describen la estructura del evento nativo del browser.
 */
import type { ChangeEvent, FormEvent } from 'react';

/**
 * Importamos las interfaces que definen la forma de nuestros datos.
 * ContactForm: { name, email, subject, message } — los campos del formulario.
 * FormStatus: union type 'idle' | 'loading' | 'success' | 'error'
 *   Usar un union type en lugar de strings sueltos evita errores de tipeo
 *   y permite autocompletado en el IDE.
 */
import type { ContactForm, FormStatus } from '../types';

/**
 * Estado inicial del formulario definido como constante fuera del hook.
 * Razón: si estuviera dentro, se crearía un nuevo objeto en cada render,
 * lo que podría causar renders infinitos si se usara como dependencia de un efecto.
 * Al estar fuera, es una referencia estable en memoria.
 */
const INITIAL_FORM: ContactForm = { name: '', email: '', subject: '', message: '' };

/**
 * Custom Hook: useContactForm
 *
 * ¿Qué es un custom hook?
 * Es una función JavaScript que empieza con "use" y puede llamar otros hooks de React.
 * Sirve para extraer y reutilizar lógica de estado entre componentes.
 * El componente Contact.tsx usa este hook y recibe el estado y los handlers listos.
 *
 * Patrón: lógica en el hook → presentación en el componente.
 * Ventaja: si necesitáramos otro formulario de contacto en otra página,
 * solo importaríamos este hook y tendríamos toda la lógica gratis.
 */
export function useContactForm() {

  /**
   * useState<ContactForm>(INITIAL_FORM)
   * El genérico <ContactForm> le dice a TypeScript qué forma tiene el estado.
   * Devuelve [valorActual, funcionParaCambiarlo].
   * Destructuring: [form, setForm] extrae ambos valores del array.
   */
  const [form, setForm] = useState<ContactForm>(INITIAL_FORM);

  /**
   * Estado que representa en qué fase está el envío del formulario.
   * 'idle'    → el formulario está esperando, el usuario no ha hecho nada aún
   * 'loading' → se está enviando la petición al backend
   * 'success' → el servidor respondió con éxito
   * 'error'   → algo salió mal (red, validación, etc.)
   */
  const [status, setStatus] = useState<FormStatus>('idle');

  // Estado para almacenar el mensaje de error cuando status === 'error'
  const [error, setError] = useState<string>('');

  /**
   * Handler para los campos del formulario.
   *
   * e.target.name  → el atributo name="" del input que disparó el evento
   * e.target.value → el valor actual del input
   *
   * [e.target.name]: e.target.value → "computed property name":
   *   permite usar una variable como clave de un objeto.
   *   Si el input tiene name="email", esto es equivalente a { email: 'valor' }.
   *
   * ...prev → spread operator: copia todos los campos anteriores del formulario.
   *   Sin esto, actualizar un campo borraría los demás.
   *   Con esto: setForm({ name: 'X', email: '', subject: '', message: '', email: 'nuevo' })
   *   → el último 'email' sobrescribe el anterior.
   */
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  /**
   * Handler del submit del formulario.
   * "async" permite usar "await" dentro para esperar promesas sin bloquear el hilo.
   */
  async function handleSubmit(e: FormEvent) {
    // Evita que el browser recargue la página (comportamiento por defecto del form)
    e.preventDefault();

    // Actualizamos el estado para mostrar el spinner en el botón
    setStatus('loading');
    setError('');

    try {
      /**
       * fetch: API nativa del browser para hacer peticiones HTTP.
       * import.meta.env.VITE_API_URL → variable de entorno definida en .env
       *   Vite expone las variables que empiezan con VITE_ al código del browser.
       *   En desarrollo: http://localhost:3001
       *   En producción: la URL de Railway
       */
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // le decimos al servidor que enviamos JSON
        body: JSON.stringify(form), // convertimos el objeto JS a string JSON
      });

      // El servidor siempre responde JSON: { success: boolean, message: string }
      const data = await res.json();

      /**
       * res.ok es true si el HTTP status code está entre 200-299.
       * Si el backend responde 400 o 500, res.ok es false.
       * fetch NO lanza error automáticamente en errores HTTP — solo en fallos de red.
       * Por eso verificamos res.ok manualmente.
       */
      if (!res.ok) {
        throw new Error(data.message || 'Error al enviar');
      }

      setStatus('success');
      setForm(INITIAL_FORM); // limpiamos el formulario al terminar
    } catch (err) {
      setStatus('error');
      /**
       * "instanceof Error" verifica si err es una instancia de la clase Error.
       * Necesario porque en TypeScript el tipo de err en catch es "unknown"
       * (no podemos asumir que es un Error — podría ser cualquier cosa que se lance).
       */
      setError(err instanceof Error ? err.message : 'Error inesperado');
    }
  }

  /**
   * Retornamos un objeto con todo lo que el componente necesita.
   * El componente Contact.tsx puede desestructurar solo lo que usa:
   *   const { form, status, handleChange, handleSubmit } = useContactForm();
   */
  return { form, status, error, handleChange, handleSubmit };
}
