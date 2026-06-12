# Style Guide — Portafolio Cristian Reyes

Sistema de diseño basado en **Guía Visual 3**: dark mode con paleta cálida.
Filosofía: seriedad técnica con calidez humana. Oscuro de base, acentos cálidos.

---

## Paleta de colores

| Token         | Hex       | Uso principal |
|---------------|-----------|---------------|
| `dark`        | `#1A1A2E` | Fondo principal, fondo de secciones alternas |
| `slate`       | `#264653` | Fondo de secciones secundarias (About, Projects) |
| `coral`       | `#E63946` | CTAs, acentos primarios, subrayados activos |
| `orange`      | `#F4A261` | Highlights, hover states, gradientes |
| `yellow`      | `#E9C46A` | Detalles puntuales (badge "destacado"), nunca como fondo grande |
| `teal`        | `#2A9D8F` | Elementos interactivos secundarios, labels de categoría, bordes decorativos |
| `muted`       | `#A8A8B3` | Texto secundario, placeholders, iconos inactivos |
| Blanco        | `#FFFFFF` | Texto principal, títulos |

### Reglas de uso de color

- **Coral** es el color de acción. Todo lo que se puede hacer (botones, links activos, CTAs) es coral.
- **Teal** es el color de información/categoría. Labels, badges de categoría, indicadores.
- **Orange** es el color de hover/transición. Aparece cuando el coral necesita un destino animado.
- **Yellow** se usa con moderación — solo como detalle puntual, nunca como área de color grande.
- **Dark/Slate** alternan como fondo de secciones para dar separación visual sin líneas duras.
- El color `dark` es más oscuro, va en Hero, Skills y Contact. `Slate` va en About y Projects.

### Opacidades

Tailwind permite opacidad con el sufijo `/número`:
```
bg-coral/5    → glow sutil (decoración)
bg-coral/10   → fondo muy sutil
border-teal/20 → borde casi invisible
text-white/80  → texto ligeramente atenuado
```

---

## Tipografía

### Fuentes

| Fuente | Uso | Cómo aplicar |
|--------|-----|--------------|
| **Space Grotesk** | Títulos (h1, h2, nombre, logotipo) | `style={{ fontFamily: 'Space Grotesk, sans-serif' }}` |
| **Inter** | Cuerpo de texto, párrafos, labels | Por defecto en `body` del CSS |
| **Monospace** (system) | Código, labels de categoría (`font-mono`), badge "disponible" | Clase `font-mono` de Tailwind |

Las fuentes se cargan desde Google Fonts en `frontend/index.html`.

### Escala tipográfica

| Elemento | Clases Tailwind | Uso |
|---|---|---|
| Nombre hero | `text-6xl sm:text-7xl md:text-8xl font-bold` | Solo en Hero |
| Título de sección | `text-4xl md:text-5xl font-bold` | H2 de cada sección |
| Subtítulo | `text-xl md:text-2xl` | Rol, descripciones importantes |
| Cuerpo | `text-base leading-relaxed` | Párrafos normales |
| Label / eyebrow | `text-xs font-mono tracking-[0.2em] uppercase` | Texto decorativo sobre los títulos |
| Badge / chip | `text-sm font-medium` | Tecnologías, tags |
| Caption | `text-xs` | Notas, metadata |

### Jerarquía visual de secciones

Cada sección sigue este patrón de encabezado:
```tsx
{/* 1. Eyebrow (label pequeño en teal, mayúsculas, monospace) */}
<p className="text-teal text-xs font-mono tracking-[0.2em] uppercase mb-3">
  Categoría
</p>

{/* 2. Título principal (Space Grotesk, grande) */}
<h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
  Título <span className="text-coral">acento</span>
</h2>

{/* 3. Línea decorativa coral */}
<div className="w-16 h-1 bg-coral rounded mb-12" />
```

---

## Espaciado

| Clase | Valor | Uso |
|---|---|---|
| `py-28` | 112px | Padding vertical de secciones principales |
| `px-6` | 24px | Padding horizontal (márgenes laterales) |
| `max-w-5xl mx-auto` | 1024px centrado | Contenedor de secciones |
| `max-w-4xl mx-auto` | 896px centrado | Contenedor de secciones de texto |
| `gap-6` | 24px | Gap entre cards de grid |
| `gap-12` | 48px | Gap entre columnas de layout |
| `mb-12` | 48px | Separación después del divisor de sección |

---

## Componentes UI

### Button

```tsx
<Button>Texto</Button>                    // coral sólido (primario)
<Button variant="outline">Texto</Button>  // borde coral, fondo transparente
<Button disabled>Texto</Button>           // heredado de HTML nativo
<Button className="w-full">Texto</Button> // clases extra se añaden al final
```

Variante `primary`: `bg-coral` → `hover:bg-orange` → `active:scale-95`
Variante `outline`: borde coral, en hover se rellena de coral

### Cards de proyecto

Patrón visual:
- Fondo: `bg-dark/70 border border-white/5 rounded-2xl`
- Barra superior decorativa con gradiente coral → orange → yellow
- Número decorativo grande (opacidad baja) como elemento visual
- Arrow hint que aparece en hover con `group-hover`

### Badges de tecnología

```tsx
<span className="px-3 py-1.5 text-sm font-medium rounded-lg bg-dark/60 text-white/80 border border-white/5">
  React
</span>
```

---

## Efectos decorativos

### Glow de fondo

Círculos con blur extremo que simulan luz difusa. No afectan la interacción (`pointer-events-none`):

```tsx
<div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-coral/5 blur-3xl pointer-events-none" />
```

Cada sección tiene su glow en una esquina distinta para guiar el ojo a través del scroll.

### Línea de hover animada (underline)

```tsx
<a className="relative group">
  Texto
  {/* Empieza en w-0, expande a w-full cuando el padre tiene hover */}
  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-coral group-hover:w-full transition-all duration-300" />
</a>
```

### Divisor de sección

```tsx
<div className="w-16 h-1 bg-coral rounded" />
```

Siempre coral, siempre 64px de ancho, siempre debajo del título principal.

---

## Layout y responsive

El proyecto usa **mobile-first**: el estilo base es para móvil, los breakpoints añaden encima.

| Breakpoint | Ancho | Cambios típicos |
|---|---|---|
| default | < 640px | 1 columna, texto más pequeño, menú hamburger |
| `sm:` | ≥ 640px | 2 columnas en grids, botones en fila |
| `md:` | ≥ 768px | Navbar desktop visible, tipografía más grande |
| `lg:` | ≥ 1024px | Layouts de 5 columnas (About), máximos anchos |

### Patrón de grid de secciones

```tsx
{/* Dos columnas: texto (3/5) + sidebar (2/5) */}
<div className="grid lg:grid-cols-5 gap-12">
  <div className="lg:col-span-3">...</div>
  <div className="lg:col-span-2">...</div>
</div>
```

---

## Variables CSS (Tailwind v4)

Definidas en `frontend/src/index.css` con la directiva `@theme`:

```css
@theme {
  --color-slate:  #264653;
  --color-dark:   #1A1A2E;
  --color-coral:  #E63946;
  --color-orange: #F4A261;
  --color-yellow: #E9C46A;
  --color-teal:   #2A9D8F;
  --color-muted:  #A8A8B3;
}
```

Tailwind v4 genera automáticamente las utilidades `bg-slate`, `text-coral`, `border-teal`, etc. a partir de estas variables.

---

## Checklist antes de añadir una sección nueva

- [ ] Usa el patrón de eyebrow + h2 con acento coral + divisor
- [ ] Fondo alterna correctamente (dark / slate / dark / slate...)
- [ ] Tiene un glow decorativo en una esquina
- [ ] Es responsive (1 columna en móvil, más en desktop)
- [ ] El id del `<section>` coincide con el href del Navbar
- [ ] Los datos estáticos están en `src/data/` si corresponde
