# Spec: Comparativas React + TS en páginas Swift y SwiftUI

**Fecha:** 2026-03-30
**Estado:** Aprobado

---

## Objetivo

Ayudar a developers que vienen de React con TypeScript a entender Swift y SwiftUI más rápido, añadiendo comparativas de código directamente en las páginas existentes — sin crear secciones separadas.

---

## Solución

Dos adiciones por página:

### 1. Tabs de código en cada bloque existente

Cada ejemplo de código Swift se convierte en un componente `<Tabs>` con dos pestañas:
- `Swift` — el código existente sin cambios
- `React + TS` — el equivalente en React/TypeScript

Se usa el componente nativo de Starlight:

```mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="Swift">
    ```swift
    let nombre = "Carlos"
    ```
  </TabItem>
  <TabItem label="React + TS">
    ```tsx
    const nombre = "Carlos"
    ```
  </TabItem>
</Tabs>
```

Si un bloque de código no tiene equivalente razonable en React/TS (ej: sintaxis muy específica de Swift sin análogo), se deja como código simple sin tabs.

### 2. Sección al final: `## Viniendo de React`

Tabla compacta con tres columnas:

| React + TS | Swift | ¿Por qué cambia? |
|---|---|---|
| Sintaxis corta | Sintaxis corta | Explicación concisa con contexto |

La columna "¿Por qué cambia?" usa 1-2 líneas: suficiente para entender la diferencia conceptual, sin entrar en detalles exhaustivos.

---

## Alcance

### Sección Swift (18 archivos — ES + EN)

| Página | Conceptos clave a comparar |
|---|---|
| variables-y-constantes | `const`/`let` → `let`/`var`, interpolación |
| tipos-de-datos | tipos primitivos, arrays, diccionarios, tuples |
| flujo-de-control | `if/else`, ternario, `switch`, `for...of` → `for-in` |
| funciones | arrow functions vs func, parámetros con label, closures |
| structs-y-clases | interfaces/clases → structs/clases, value vs reference types |
| opcionales | `null`/`undefined` vs `Optional`, optional chaining `?.` |
| protocolos | interfaces → protocolos, conformidad |
| enumeraciones | union types/enums → enums con valores asociados |
| concurrencia | `async/await`, `Promise` → `async/await`, `Task` |

### Sección SwiftUI (50 archivos — ES + EN)

| Página | Conceptos clave a comparar |
|---|---|
| estado/observable | `useState`/`useReducer` → `@State`/`@Observable` |
| texto/text | `<p>`, `<span>` → `Text` |
| texto/image | `<img>` → `Image` |
| texto/label | — (sin equivalente directo, nota contextual) |
| controles/button | `<button onClick>` → `Button { action } label:` |
| controles/textfield | `<input type="text">` → `TextField` |
| controles/toggle | `<input type="checkbox">` → `Toggle` |
| controles/picker | `<select>` → `Picker` |
| controles/slider | `<input type="range">` → `Slider` |
| layout/hstack | `flexbox row` → `HStack` |
| layout/vstack | `flexbox column` → `VStack` |
| layout/zstack | `position: absolute` → `ZStack` |
| listas/list | `<ul>` + `.map()` → `List` |
| listas/navigationstack | `react-router` → `NavigationStack` |
| listas/scrollview | `overflow: scroll` → `ScrollView` |
| presentacion/alert | `window.alert` / modal → `Alert` |
| presentacion/sheet | modal/drawer → `.sheet()` |
| presentacion/tabview | tab nav → `TabView` |
| animaciones/keyframe | CSS keyframes / framer-motion → `KeyframeAnimator` |
| animaciones/phase-animator | — (`PhaseAnimator` sin equivalente directo) |
| efectos/liquid-glass | CSS backdrop-filter → `.glassEffect()` |

---

## Reglas de implementación

1. **El import de Tabs se añade solo si la página no lo tiene ya.** Algunas páginas pueden ya importar componentes de Starlight.
2. **No se modifica el contenido Swift existente** — solo se envuelve en `<TabItem label="Swift">`.
3. **El `PlaygroundLink` existente** se mueve fuera del tab (debajo del bloque `<Tabs>`) para que siempre sea visible.
4. **Páginas sin equivalente React claro** reciben tabs solo en los bloques donde aplica; los demás quedan como código simple.
5. **La sección `## Viniendo de React`** va al final, antes del bloque de resumen si existe.
6. **Mismo contenido ES y EN** — la versión EN es traducción directa de la ES.

---

## Lo que NO cambia

- Estructura de carpetas
- Sidebar en `astro.config.mjs`
- Componente `PlaygroundLink`
- Contenido explicativo existente en prosa
