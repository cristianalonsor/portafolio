/**
 * ProjectDetail.tsx — página de detalle de un proyecto (ruta "/proyectos/:slug").
 *
 * Lee el parámetro :slug de la URL, busca el proyecto en el array estático
 * y renderiza su información completa: título, descripción larga, stack y CTAs.
 *
 * Muestra un fallback 404 suave si el slug no coincide con ningún proyecto.
 */
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export function ProjectDetail() {
  // useParams extrae los segmentos dinámicos de la URL actual (:slug → { slug: "portafolio-personal" })
  const { slug } = useParams<{ slug: string }>();
  // find recorre el array y retorna el primer elemento donde p.slug === slug, o undefined si no hay match
  const project = projects.find(p => p.slug === slug);

  // Fallback 404 suave: no lanza error, solo informa al usuario y ofrece volver
  if (!project) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold text-white mb-4">Proyecto no encontrado</h2>
        <Link to="/" className="text-coral hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/#proyectos" className="text-teal text-sm hover:underline mb-8 inline-block">
          ← Volver a proyectos
        </Link>
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-4xl font-bold text-white font-grotesk">{project.title}</h1>
          {project.featured && (
            <span className="text-xs text-yellow font-mono border border-yellow/30 rounded px-2 py-1">
              destacado
            </span>
          )}
        </div>
        <div className="w-16 h-1 bg-coral rounded mb-8" />
        <p className="text-muted leading-relaxed mb-8 text-lg">
          {project.longDescription || project.description}
        </p>
        <div className="mb-8">
          <p className="text-teal text-xs font-mono uppercase tracking-wider mb-3">Stack tecnológico</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map(tech => (
              <Badge key={tech} label={tech} />
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          {project.liveUrl && (
            <Button onClick={() => window.open(project.liveUrl, '_blank')}>
              Ver en vivo
            </Button>
          )}
          {project.repoUrl && (
            <Button variant="outline" onClick={() => window.open(project.repoUrl, '_blank')}>
              Ver código
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
