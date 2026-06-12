export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  stack: string[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';
