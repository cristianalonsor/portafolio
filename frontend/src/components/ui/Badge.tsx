/**
 * Badge.tsx — etiqueta de tecnología de una sola línea.
 *
 * Componente atómico usado en la página ProjectDetail para listar
 * las tecnologías del stack de un proyecto con estilo teal.
 * (En la sección Skills se usan spans inline directamente, no este componente.)
 */
interface BadgeProps {
  label: string;
}

export function Badge({ label }: BadgeProps) {
  // inline-block en lugar de flex/block para que los badges fluyan naturalmente
  // dentro de un contenedor flex-wrap sin ocupar el 100% del ancho
  return (
    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-slate/60 border border-teal/30 text-teal hover:border-teal transition-colors">
      {label}
    </span>
  );
}
