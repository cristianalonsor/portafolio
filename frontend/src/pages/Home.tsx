/**
 * Home.tsx — página principal del portafolio (ruta "/").
 *
 * Ensambla las cinco secciones en el orden de scroll:
 *   Hero → About → Skills → Projects → Contact
 *
 * El orden es importante: coincide exactamente con los ids (#hero,
 * #sobre-mi, #skills, #proyectos, #contacto) que usa el Navbar
 * para el scroll suave. Cambiar el orden aquí rompe la navegación.
 */
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { Projects } from '../components/sections/Projects';
import { Contact } from '../components/sections/Contact';

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
