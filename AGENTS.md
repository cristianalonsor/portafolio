# AGENTS.md — Instrucciones del proyecto para opencode

<!--
  ¿Qué es AGENTS.md?
  ──────────────────
  opencode carga este archivo al iniciar y lo inyecta como contexto del sistema
  en TODAS las conversaciones. Es como darle a la IA una "cédula de identidad"
  del proyecto: estructura, reglas, flujo de trabajo.

  Sin AGENTS.md, opencode no sabría cómo está organizado el monorepo, qué
  convenciones de código seguir, ni cómo desplegar.

  Formato: Markdown estándar. opencode lo lee como texto plano.
  Puedes参照 otros archivos con rutas relativas.
-->

# Portafolio — Cristian Reyes

Monorepo de portafolio personal: frontend en React + Vite + Tailwind, backend en Express + Resend.

## Estructura

<!--
  Equivalente a un "mapa" del proyecto. opencode lo usa para saber dónde
  buscar archivos cuando necesita hacer cambios.
  El patrón `proyecto/ → descripción` es deliberado: es fácil de escanear
  visualmente y para la IA.
-->

- `frontend/` → React 19 + TypeScript + Vite + Tailwind CSS v4. SPA con scroll único y detalle de proyectos.
- `backend/` → Node.js + Express 5 + TypeScript. API REST con un endpoint `POST /api/contact`.
- `docs/` → Guía técnica y style guide del diseño visual.
- `frontend/src/data/` → Datos estáticos de proyectos y habilidades (sin base de datos).

## Convenciones de código

<!--
  Estas reglas son vinculantes. opencode las sigue automáticamente al escribir
  código. Sin ellas, podría generar código que no compile o no siga el estilo
  del proyecto.
-->

- Usar `import type` para tipos (verbatimModuleSyntax activo).
  - Razón: `verbatimModuleSyntax` en tsconfig elimina imports de tipos si no se
    usa `import type`. Sin esto, TypeScript lanza error.
- Comentarios JSDoc en funciones y componentes principales.
  - Razón: el proyecto tiene un propósito educativo. Los JSDoc son el equivalente
    a documentación inline para quien estudie el código después.
- Sistema de diseño: dark mode con paleta coral, teal, orange, yellow, dark, slate, muted.
  - Definido en `frontend/src/index.css` con la directiva `@theme` de Tailwind v4.
  - Los colores están disponibles como clases: `bg-coral`, `text-teal`, etc.
- Mobile-first: estilo base para móvil, breakpoints sm/md/lg añaden encima.
  - Ejemplo: `text-4xl md:text-5xl` → 36px en móvil, 48px desde 768px.

## Flujo de trabajo con GitHub Issues

<!--
  Este es el "workflow" que el usuario quiere seguir. Los comandos @opencode
  (definidos en opencode.jsonc) ejecutan estos pasos automáticamente.

  Cada paso usa un subagente diferente (refiner → developer → deployer)
  para separar responsabilidades: planificar NO es lo mismo que escribir código.
-->

1. **Issue creado** → Usar `@opencode issue:refine <número>` para refinarlo.
   - El agente refiner lee el issue, lo divide en tareas y crea tarjetas en el Project Board.
2. **Refinamiento** → El agente refiner analiza el issue, lo divide en tareas y crea tarjetas en el Project Board.
3. **Desarrollo** → Usar `@opencode issue:develop <número>` para implementar. El agente crea rama, desarrolla, y crea PR.
   - La rama sigue el patrón `{tipo}/{slug}` (ej: `feat/contact-form-validation`).
   - Después de implementar, corre `npx tsc --noEmit` y `npm run build` para verificar.
4. **Deploy** → Usar `@opencode deploy` para desplegar frontend (GitHub Pages) y/o backend (Railway).

## Despliegue

<!--
  Ambos deploys son automáticos vía CI/CD. opencode solo necesita hacer push
  a main para activarlos. Los workflows están en .github/workflows/.
-->

- **Frontend**: CI/CD via GitHub Actions. Push a `main` → build automático → GitHub Pages.
  - Workflow: `.github/workflows/deploy.yml`
  - URL resultante: `https://cristianalonsor.github.io/portafolio/`
- **Backend**: Railway. Push a `main` redeploya automáticamente si hay cambios en `backend/`.
  - Railway detecta cambios en el directorio `backend/` y redeploya.
  - Health check: `GET /health` → `{ status: 'ok' }`
