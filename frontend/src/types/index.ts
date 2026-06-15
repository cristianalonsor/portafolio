/**
 * types/index.ts — interfaces TypeScript del dominio del frontend.
 *
 * Centraliza todos los tipos compartidos. Importarlos siempre con
 * `import type { ... }` para cumplir con verbatimModuleSyntax del tsconfig.
 */

/** Representa un proyecto del portafolio. */
export interface Project {
  /** Identificador único en la URL: /proyectos/:slug */
  slug: string;
  title: string;
  description: string;
  /** Descripción extendida usada en la página de detalle. */
  longDescription?: string;
  /** Tecnologías del proyecto, mostradas como badges. */
  stack: string[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  /** Si es true, se muestra la etiqueta "destacado" en la card. */
  featured: boolean;
}

/** Agrupa tecnologías bajo una categoría (Frontend, Backend, etc.). */
export interface SkillCategory {
  category: string;
  /** Lista de nombres de tecnologías dentro de la categoría. */
  items: string[];
}

/** Datos del formulario de contacto, sincronizados con los campos del form. */
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Estado del envío del formulario de contacto.
 *   idle    → no se ha intentado enviar
 *   loading → esperando respuesta del backend
 *   success → email enviado correctamente
 *   error   → falló el envío (se muestra `error` del hook)
 */
export type FormStatus = 'idle' | 'loading' | 'success' | 'error';
