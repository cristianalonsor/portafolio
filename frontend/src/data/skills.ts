/**
 * data/skills.ts — fuente de datos de habilidades técnicas.
 *
 * Array estático agrupado por categoría. Para añadir una tecnología:
 *   - Buscar la categoría correspondiente y añadir el string a `items`
 * Para añadir una categoría nueva:
 *   - Añadir un objeto { category, items } al array
 *   - Registrar el color en CATEGORY_COLORS dentro de Skills.tsx
 */
import type { SkillCategory } from '../types';

export const skills: SkillCategory[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Angular'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'TypeScript', 'REST APIs'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['Vercel', 'Railway', 'Azure', 'Git', 'GitHub'],
  },
  {
    category: 'Herramientas',
    items: ['VS Code', 'Postman', 'Figma', 'Scrum', 'Jira'],
  },
];
