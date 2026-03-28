# Spec: Actualización contenido iOS 26 / Swift 6

**Fecha:** 2026-03-28
**Proyecto:** SwiftUI-guide (sitio bilingual ES/EN con Astro Starlight)
**Audiencia:** Progresiva — principiantes y desarrolladores intermedios

---

## Objetivo

Actualizar la guía para reflejar el estado actual del ecosistema Apple (iOS 26, Swift 6, WWDC 2025). Eliminar contenido obsoleto, limpiar APIs deprecadas y agregar nuevas secciones para los frameworks y features modernos.

---

## 1. Eliminaciones y limpiezas

### 1.1 Quitar referencias a Combine

- `src/content/docs/index.mdx` — eliminar Card "Combine" y mención en descripción
- `src/content/docs/en/index.mdx` — misma limpieza

### 1.2 APIs deprecadas en ejemplos de código (todos los .mdx ES y EN)

Reemplazar en todos los archivos de contenido:

| Deprecado | Reemplazo moderno |
|---|---|
| `.foregroundColor(X)` | `.foregroundStyle(X)` |
| `.cornerRadius(N)` | `.clipShape(.rect(cornerRadius: N))` |

### 1.3 `guias-practicas/viewmodels-mvvm.mdx` (y `en/`)

- La sección "ViewModel con ObservableObject (iOS 14-16)" se reduce a una nota histórica breve
- La tabla `@StateObject vs @ObservedObject vs @EnvironmentObject` se convierte en referencia colapsada o nota "compatibilidad legacy"
- El enfoque principal es 100% `@Observable` + `@State`

---

## 2. Nuevas páginas

Cada página se crea en ES y EN en paths espejados.

### 2.1 Swift 6 — Concurrencia

- **ES:** `src/content/docs/swift/concurrencia.mdx`
- **EN:** `src/content/docs/en/swift/concurrencia.mdx`
- **Sidebar:** dentro de la sección "Swift", después de `funciones`
- **Contenido:** async/await, Task y TaskGroup, actors, Sendable, structured concurrency, strict concurrency mode de Swift 6

### 2.2 Observation — @Observable

- **ES:** `src/content/docs/swiftui/estado/observable.mdx`
- **EN:** `src/content/docs/en/swiftui/estado/observable.mdx`
- **Sidebar:** nueva subsección "Estado" dentro de SwiftUI
- **Contenido:** macro `@Observable`, `@State` para ViewModels, `@Environment` moderno, comparación breve vs ObservableObject legacy

### 2.3 Liquid Glass

- **ES:** `src/content/docs/swiftui/efectos/liquid-glass.mdx`
- **EN:** `src/content/docs/en/swiftui/efectos/liquid-glass.mdx`
- **Sidebar:** nueva subsección "Efectos" dentro de SwiftUI
- **Contenido:** `.glassBackgroundEffect()`, `.background(.ultraThinMaterial)`, `.background(.regularMaterial)`, jerarquía de materiales, casos de uso, iOS 26 / macOS 26

### 2.4 Animaciones — keyframeAnimator

- **ES:** `src/content/docs/swiftui/animaciones/keyframe.mdx`
- **EN:** `src/content/docs/en/swiftui/animaciones/keyframe.mdx`
- **Sidebar:** nueva subsección "Animaciones" dentro de SwiftUI
- **Contenido:** `keyframeAnimator`, definir tracks por propiedad (offset, scale, opacity), KeyframeTrack, ejemplo completo

### 2.5 Animaciones — PhaseAnimator

- **ES:** `src/content/docs/swiftui/animaciones/phase-animator.mdx`
- **EN:** `src/content/docs/en/swiftui/animaciones/phase-animator.mdx`
- **Sidebar:** dentro de subsección "Animaciones", después de keyframe
- **Contenido:** `PhaseAnimator`, fases con enums, trigger manual vs automático, comparación con keyframeAnimator

### 2.6 SwiftData

- **ES:** `src/content/docs/guias-practicas/swiftdata.mdx`
- **EN:** `src/content/docs/en/guias-practicas/swiftdata.mdx`
- **Sidebar:** dentro de "Guías Prácticas"
- **Contenido:** `@Model`, `@Query`, `ModelContainer`, `ModelConfiguration`, relaciones entre modelos, migración básica, integración con SwiftUI

---

## 3. Cambios en astro.config.mjs

### Sección Swift — agregar slug:
```
{ slug: 'swift/concurrencia' }
```
(después de `swift/funciones`)

### Sección SwiftUI — agregar 3 nuevas subsecciones:
```js
{
  label: 'Estado',
  translations: { en: 'State' },
  items: [
    { slug: 'swiftui/estado/observable' },
  ],
},
{
  label: 'Efectos',
  translations: { en: 'Effects' },
  items: [
    { slug: 'swiftui/efectos/liquid-glass' },
  ],
},
{
  label: 'Animaciones',
  translations: { en: 'Animations' },
  items: [
    { slug: 'swiftui/animaciones/keyframe' },
    { slug: 'swiftui/animaciones/phase-animator' },
  ],
},
```

### Sección Guías Prácticas — agregar slug:
```
{ slug: 'guias-practicas/swiftdata' }
```

---

## 4. Archivos afectados (resumen)

**Eliminar/limpiar:**
- `src/content/docs/index.mdx`
- `src/content/docs/en/index.mdx`
- `src/content/docs/guias-practicas/viewmodels-mvvm.mdx`
- `src/content/docs/en/guias-practicas/viewmodels-mvvm.mdx`
- Todos los `.mdx` con `.foregroundColor` / `.cornerRadius` (ES y EN)

**Crear (12 archivos nuevos — 6 ES + 6 EN):**
- `swift/concurrencia.mdx`
- `swiftui/estado/observable.mdx`
- `swiftui/efectos/liquid-glass.mdx`
- `swiftui/animaciones/keyframe.mdx`
- `swiftui/animaciones/phase-animator.mdx`
- `guias-practicas/swiftdata.mdx`
- Mirrors en `en/`

**Configuración:**
- `astro.config.mjs`
