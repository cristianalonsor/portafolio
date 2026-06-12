/**
 * Importamos solo los *tipos* de React que necesitamos.
 * "import type" le dice a TypeScript que estos imports son únicamente
 * para verificación estática — no generan código JavaScript en el bundle final.
 *
 * ButtonHTMLAttributes → contiene todos los atributos nativos de un <button>
 *   (onClick, disabled, type, aria-label, etc.)
 * ReactNode → representa cualquier cosa que React puede renderizar
 *   (texto, JSX, arrays, null, undefined...)
 */
import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Definimos la interfaz de props del componente.
 *
 * "extends ButtonHTMLAttributes<HTMLButtonElement>" significa que ButtonProps
 * hereda TODOS los atributos nativos de un <button> HTML. Gracias a esto,
 * quien use <Button onClick={...} disabled type="submit" /> funciona sin
 * necesidad de declararlos uno a uno aquí.
 *
 * Luego añadimos nuestras props personalizadas encima:
 *   - variant?: el ? significa que es opcional (si no se pasa, usamos 'primary')
 *   - children: el contenido que va dentro del botón
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'; // union type: solo acepta estos dos strings
  children: ReactNode;
}

/**
 * Componente Button reutilizable con dos variantes visuales.
 *
 * Destructuring en los parámetros: extraemos variant, children y className
 * directamente del objeto props. El "= 'primary'" es el valor por defecto
 * si variant no se pasa. El "= ''" evita que className sea undefined.
 *
 * "...props" (rest operator) captura TODOS los demás atributos (onClick,
 * disabled, type, etc.) y los pasa directo al <button> sin declararlos.
 */
export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {

  // Clases base que siempre se aplican, independiente de la variante.
  // Tailwind: px-6=padding horizontal, py-3=padding vertical,
  // rounded-lg=bordes redondeados, transition-all=anima todos los cambios CSS
  const base = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer';

  // Objeto que mapea cada variante a sus clases CSS específicas.
  // "hover:bg-orange" aplica el color naranja solo cuando el mouse está encima.
  // "active:scale-95" reduce el tamaño al 95% cuando se hace click (efecto press).
  const variants = {
    primary: 'bg-coral text-white hover:bg-orange active:scale-95',
    outline: 'border-2 border-coral text-coral hover:bg-coral hover:text-white active:scale-95',
  };

  // Template literal que concatena: clases base + clases de variante + clases extra.
  // El className externo (ej. "w-full") se añade al final para poder sobrescribir si es necesario.
  // El spread {...props} pasa onClick, disabled, type, etc. al elemento nativo.
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
