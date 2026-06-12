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
