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
  Existen DOS modos de trabajar con issues:

  A) Manual (local) → Usas opencode en tu terminal con @opencode.
     Tú controlas cada paso: refinar → desarrollar → desplegar.

  B) Automático (CI/CD) → GitHub Actions ejecuta opencode por ti.
     Solo creas el issue y opencode implementa y crea el PR automáticamente.
     Workflow: .github/workflows/opencode.yml
-->

### A) Modo manual (local)

Usa estos comandos en tu terminal con `@opencode`:

1. `@opencode issue:refine <número>` → Refina el issue y crea tarjetas en el Project Board.
2. `@opencode issue:develop <número>` → Implementa el código y crea PR.
3. `@opencode deploy` → Despliega frontend y/o backend.

### B) Modo automático (GitHub Actions) — ¡nuevo!

<!--
  opencode.yml se activa SOLO con crear el issue en GitHub.
  opencode corre dentro del runner de GitHub Actions con modelo gratuito
  (opencode/deepseek-v4-flash-free, que no requiere API key).

  El flujo completo:
    1. GitHub detecta "issues: opened"
    2. Runner clona el repo
    3. npm install -g @opencode-ai/cli
    4. opencode run lee el issue, implementa, commitea y crea PR
    5. Tú recibes notificación del PR, lo revisas y mergeas
-->

1. **Creas un issue** en GitHub → el workflow `opencode.yml` se activa automáticamente.
2. **opencode** (en el runner de GitHub) lee el issue, analiza el código, implementa los cambios, hace commit y crea un **Pull Request**.
3. **Tú revisas el PR** y lo mergeas si está correcto.
4. **El deploy es automático**: al mergear a `main`, el CI/CD despliega frontend y/o backend.

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
