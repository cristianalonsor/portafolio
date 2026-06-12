# Guía Técnica — Portafolio Cristian Reyes

Referencia de patrones, conceptos y decisiones del proyecto.

---

## Estructura del proyecto

```
portafolio/
├── frontend/   → React + TypeScript + Vite + Tailwind CSS v4
└── backend/    → Node.js + Express + TypeScript + Resend
```

---

## React: conceptos usados

### useState

Hook que crea una variable reactiva. Cuando cambia, React re-renderiza el componente.

```tsx
const [valor, setValor] = useState<Tipo>(valorInicial);
```

- El genérico `<Tipo>` le dice a TypeScript qué forma tiene el estado.
- Nunca se modifica `valor` directamente — siempre se usa `setValor`.
- Ejemplo en el proyecto: `useContactForm.ts` maneja `form`, `status` y `error` con useState.

### useEffect

Ejecuta código con efectos secundarios (eventos, timers, fetch) sin interferir con el render.

```tsx
useEffect(() => {
  // código al montar o cuando cambian las dependencias
  return () => { /* cleanup al desmontar */ };
}, [dependencias]);
```

- `[]` vacío → se ejecuta solo al montar (equivalente a `componentDidMount`).
- Sin array → se ejecuta en cada render (evitar).
- La función `return` evita memory leaks eliminando listeners al desmontar.
- Ejemplo en el proyecto: `Navbar.tsx` registra y limpia el listener de scroll.

### Custom Hooks

Función que empieza con `use` y puede llamar otros hooks. Separa lógica de presentación.

```tsx
// Hook
export function useContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  // ... lógica
  return { form, handleChange, handleSubmit };
}

// Componente (solo presentación)
function Contact() {
  const { form, handleChange } = useContactForm();
  return <form>...</form>;
}
```

Ventaja: si necesitas el mismo formulario en dos páginas, reutilizas el hook sin duplicar código.

### Renderizado condicional

```tsx
{condicion && <Componente />}        // renderiza si condicion es true
{condicion ? <A /> : <B />}          // ternario: A si true, B si false
```

Ejemplo en el proyecto: `Navbar.tsx` muestra el menú móvil solo si `menuOpen === true`.

### Renderizado de listas

```tsx
{array.map(item => (
  <div key={item.id}>{item.nombre}</div>
))}
```

- `key` es obligatorio: React lo usa para identificar elementos en el Virtual DOM.
- Debe ser único y estable (no usar el índice si el array puede reordenarse).

---

## TypeScript: patrones usados

### import type

```tsx
import type { MiTipo } from './tipos';
```

Solo para tipos e interfaces. No genera código JS. Requerido cuando `verbatimModuleSyntax: true` está activo en `tsconfig.json` (como en este proyecto).

### Interface con extends

```tsx
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}
```

`ButtonProps` hereda todos los atributos nativos del `<button>` HTML y añade los nuestros encima. Evita redeclarar `onClick`, `disabled`, `type`, etc.

### Union types

```tsx
type FormStatus = 'idle' | 'loading' | 'success' | 'error';
```

La variable solo puede tener esos 4 valores. TypeScript detecta el error si escribes `'cargando'`.

### Record<K, V>

```tsx
const COLORS: Record<string, string> = {
  'Frontend': 'text-coral',
  'Backend':  'text-teal',
};
```

Equivale a `{ [key: string]: string }`. Útil para diccionarios/mapas.

### Operador ?? (nullish coalescing)

```tsx
const color = COLORS[categoria] ?? 'text-muted';
```

Si `COLORS[categoria]` es `null` o `undefined`, usa `'text-muted'`. A diferencia de `||`, no activa el fallback para `0` o `''`.

### Optional chaining ?.

```tsx
document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
```

Si `getElementById` retorna `null`, el `?.` detiene la cadena sin lanzar error.

### instanceof para narrowing

```tsx
catch (err) {
  const mensaje = err instanceof Error ? err.message : 'Error desconocido';
}
```

En TypeScript, el tipo de `err` en un catch es `unknown`. `instanceof Error` lo "estrecha" a un tipo conocido para poder acceder a `.message`.

---

## Tailwind CSS v4: clases clave

### Responsive (mobile-first)

```
sm:   → desde 640px
md:   → desde 768px
lg:   → desde 1024px
```

`hidden md:flex` → oculto en móvil, visible como flexbox desde 768px.

### Opacidad con /

```
bg-coral/5    → fondo coral al 5% de opacidad
text-white/80 → texto blanco al 80% de opacidad
border-teal/30 → borde teal al 30%
```

### Posicionamiento

```
relative → contexto de posicionamiento para hijos absolute
absolute → sale del flujo normal, se posiciona relativo al padre relative
inset-0  → top:0 right:0 bottom:0 left:0 (ocupa todo el padre)
```

### Centrado con translate

```
left-1/2 -translate-x-1/2
```

Truco clásico: `left:50%` mueve el borde izquierdo al centro, `translateX(-50%)` lo corrige la mitad de su ancho. Resultado: centrado perfecto.

### Hover y group-hover

```
hover:text-white     → color al pasar el mouse sobre el elemento
group                → (en el padre) habilita group-hover en los hijos
group-hover:w-full   → (en el hijo) se activa cuando el padre tiene hover
```

Ejemplo del navbar: la línea decorativa debajo del link se expande de `w-0` a `w-full` cuando el mouse está sobre el `<a>` padre.

### Blur para efectos glow

```
bg-coral/5 rounded-full blur-3xl
```

Un círculo de color muy transparente con desenfoque extremo = efecto de luz difusa (glow) sin JavaScript ni librerías.

---

## Patrones del proyecto

### Datos estáticos vs base de datos

Los proyectos y skills están definidos en `src/data/projects.ts` y `src/data/skills.ts`.

Para agregar un proyecto nuevo:
1. Abrir `frontend/src/data/projects.ts`
2. Añadir un objeto al array siguiendo la interfaz `Project`
3. Guardar — el cambio aparece automáticamente en la UI

No se necesita base de datos para contenido estático de un portafolio.

### Variables de entorno

```
VITE_API_URL=http://localhost:3001   → en frontend/.env
RESEND_API_KEY=re_...               → en backend/.env
```

- Vite solo expone las variables que empiezan con `VITE_` al código del browser.
- Las demás (sin prefijo) son solo del servidor — nunca llegan al cliente.
- Nunca commitear archivos `.env` al repositorio (están en `.gitignore`).

### API de contacto

```
POST /api/contact
Body: { name, email, subject, message }
→ Middleware valida los campos
→ Servicio llama a Resend API
→ Responde { success: boolean, message: string }
```

El frontend maneja los estados: idle → loading → success/error.

---

## Archivos de referencia rápida

| Archivo | Qué hace |
|---|---|
| `frontend/src/types/index.ts` | Todas las interfaces TypeScript del frontend |
| `frontend/src/data/projects.ts` | Array de proyectos (editar para agregar proyectos) |
| `frontend/src/data/skills.ts` | Array de categorías y tecnologías |
| `frontend/src/hooks/useContactForm.ts` | Lógica del formulario de contacto |
| `frontend/src/index.css` | Variables de color y fuentes del sistema de diseño |
| `backend/src/services/mailer.service.ts` | Integración con Resend para envío de emails |
| `backend/src/.env.example` | Variables de entorno necesarias en el backend |
