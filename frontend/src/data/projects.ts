/**
 * data/projects.ts — fuente de datos de proyectos del portafolio.
 *
 * Array estático: no hay base de datos. Para agregar un proyecto:
 *   1. Añadir un objeto siguiendo la interfaz `Project`
 *   2. Asegurarse de que `slug` sea único y sin espacios (se usa en la URL)
 *   3. Guardar — el cambio aparece automáticamente en la UI
 */
import type { Project } from '../types';

export const projects: Project[] = [
  {
    slug: 'portafolio-personal',
    title: 'Portafolio Personal',
    description: 'Currículum interactivo construido con React, TypeScript y Node.js. Desplegado en Vercel y Railway.',
    longDescription: 'Este mismo portafolio — monorepo con frontend en React + Vite y backend en Express + TypeScript. Integra Resend para el formulario de contacto y está desplegado en Vercel (frontend) y Railway (backend).',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'Resend'],
    featured: true,
    liveUrl: '',
    repoUrl: 'https://github.com/cristianalonsor/portafolio',
  },
];
