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
  Puedes referenciar otros archivos con rutas relativas.
-->

# Portafolio — Cristian Reyes

Monorepo de portafolio personal: frontend en React + Vite + Tailwind, backend en Express + Resend.

## Estructura

<!--
  Equivalente a un "mapa" del proyecto. opencode lo usa para saber dónde
  buscar archivos cuando necesita hacer cambios.
-->

### Frontend (`frontend/`)

React 19 + TypeScript + Vite + Tailwind CSS v4. SPA con scroll único y detalle de proyectos.

```
frontend/src/
├── components/
│   ├── layout/     → Navbar.tsx, Footer.tsx
│   ├── sections/   → Hero.tsx, About.tsx, Skills.tsx, Projects.tsx, Contact.tsx
│   └── ui/         → Button.tsx, Badge.tsx
├── pages/          → Home.tsx (ensamble de secciones), ProjectDetail.tsx (detalle /proyectos/:slug)
├── data/           → projects.ts, skills.ts (arrays estáticos — SIN base de datos)
├── hooks/          → useContactForm.ts (lógica del formulario de contacto)
├── types/          → index.ts (interfaces Project, SkillCategory, etc.)
└── index.css       → Sistema de colores con directiva @theme de Tailwind v4
```

### Backend (`backend/`)

Node.js + Express 5 + TypeScript. API REST con dos endpoints.

```
backend/src/
├── index.ts                         → Entry point, configura Express y monta rutas
├── routes/contact.route.ts          → POST /api/contact (formulario de contacto)
├── middlewares/validate.middleware.ts → Validación del body del formulario
├── services/mailer.service.ts       → Integración con Resend API para envío de emails
└── types/contact.types.ts           → Interfaces ContactPayload y ApiResponse
```

**Endpoints disponibles:**
- `POST /api/contact` — recibe `{ name, email, subject, message }`, valida y envía email vía Resend
- `GET /health` → `{ status: 'ok' }` — health check usado por Railway para monitoreo

### Documentación (`docs/`)

Guía técnica y style guide del diseño visual. opencode los carga automáticamente via `opencode.jsonc`.

## Convenciones de código

<!--
  Estas reglas son vinculantes. opencode las sigue automáticamente al escribir
  código. Sin ellas, podría generar código que no compile o no siga el estilo
  del proyecto.
-->

### Frontend

- **`import type` para tipos** — `verbatimModuleSyntax` está activo en `frontend/tsconfig.app.json`.
  Sin `import type`, TypeScript lanza error en imports de tipos.
- **JSDoc** en funciones y componentes principales. El proyecto tiene propósito educativo.
- **Sistema de diseño** — paleta definida en `frontend/src/index.css` con `@theme`:
  - `coral` (#E63946) · `teal` (#2A9D8F) · `orange` (#F4A261) · `yellow` (#E9C46A)
  - `dark` (#1a1a2e) · `slate` (#264653) · `muted` (#A8A8B3)
  - Tipografías: `font-grotesk` (Space Grotesk, headings) · `font-inter` (Inter, body)
  - Usar clases Tailwind (`bg-coral`, `text-teal`) — nunca HEX hardcodeados en componentes.
- **Mobile-first** — estilo base para móvil, breakpoints `sm/md/lg` añaden encima.
  - Ejemplo: `text-4xl md:text-5xl` → 36px en móvil, 48px desde 768px.
- **Datos estáticos** — no hay base de datos. Agregar datos = editar `frontend/src/data/`.

### Backend

- **CommonJS con `esModuleInterop`** — el backend usa `module: commonjs` en tsconfig.
  NO requiere `import type` (a diferencia del frontend).
- Las variables de entorno siempre se leen desde `process.env`, nunca hardcodeadas.
- Si se añaden variables de entorno nuevas, actualizar `backend/.env.example`.
- No añadir endpoints nuevos sin un issue que lo justifique.

### General

- **Conventional commits**: `feat/fix/refactor/style/docs: mensaje descriptivo`
- **Ramas**: patrón `{tipo}/{slug}` — ejemplo: `feat/contact-form-validation`
- PRs siempre hacia `main` desde rama de feature — nunca push directo a `main`.

## Variables de entorno

### Backend (`backend/.env.example`)

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor (Railway lo inyecta automáticamente en producción) |
| `FRONTEND_URL` | URL del frontend para CORS — `http://localhost:5173` en dev, GitHub Pages en producción |
| `RESEND_API_KEY` | API key de Resend para envío de emails |
| `FROM_EMAIL` | Email remitente — `onboarding@resend.dev` en dev |
| `TO_EMAIL` | Email destinatario (dueño del portafolio) |

### Frontend (`frontend/.env`)

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL del backend — `http://localhost:3001` en dev, URL de Railway en producción |
| `VITE_BASE_PATH` | Path base de la app — `/portafolio/` en GitHub Pages |

## Flujo de trabajo con GitHub Issues

<!--
  Existen DOS modos de trabajar con issues:

  A) Manual (local) → Usas opencode en tu terminal con @opencode.
     Tú controlas cada paso: refinar → desarrollar → desplegar.

  B) Automático (CI/CD) → GitHub Actions ejecuta opencode por ti.
     Solo aplicas el label 'autoimplement' al issue y opencode implementa.
     Workflow: .github/workflows/opencode.yml
-->

### A) Modo manual (local)

Usa estos comandos en tu terminal con `@opencode`:

1. `@opencode issue:refine <número>` → Refina el issue y crea tarjetas en el Project Board.
2. `@opencode issue:develop <número>` → Implementa el código y crea PR.
3. `@opencode issue:review <número-pr>` → Revisa automáticamente el PR generado.
4. `@opencode deploy` → Despliega frontend y/o backend.

### B) Modo automático (GitHub Actions)

<!--
  opencode.yml se activa cuando aplicas el label 'autoimplement' al issue.
  opencode corre dentro del runner de GitHub Actions con modelo gratuito
  (opencode/deepseek-v4-flash-free, que no requiere API key).

  El flujo completo:
    1. Aplicas el label 'autoimplement' al issue
    2. Runner clona el repo
    3. npm install -g opencode-ai
    4. opencode run lee el issue, implementa, commitea y crea PR
    5. Recibes un comentario en el issue con el resultado
    6. Tú revisas el PR y lo mergeas
-->

1. **Aplicas el label `autoimplement`** al issue en GitHub.
2. **opencode** (en el runner de GitHub) lee el issue, analiza el código, implementa los cambios, hace commit y crea un **Pull Request**.
3. **Recibes un comentario** en el issue confirmando que terminó (o reportando el error con link a los logs).
4. **Tú revisas el PR** y lo mergeas si está correcto.
5. **El deploy es automático**: al mergear a `main`, el CI/CD despliega frontend y/o backend.

## Despliegue

<!--
  Ambos deploys son automáticos vía CI/CD. Solo se necesita hacer push a main.
  Los workflows están en .github/workflows/.
-->

- **Frontend**: CI/CD via GitHub Actions. Push a `main` → build automático → GitHub Pages.
  - Workflow: `.github/workflows/deploy.yml`
  - URL: `https://cristianalonsor.github.io/portafolio/`
  - Post-deploy: el workflow verifica que el sitio responde HTTP 200.

- **Backend**: Railway. Push a `main` redeploya automáticamente si hay cambios en `backend/`.
  - Railway detecta cambios en el directorio `backend/` y redeploya.
  - Health check: `GET /health` → `{ status: 'ok' }`
  - Variables de entorno configuradas en el dashboard de Railway (ver `backend/.env.example`).
