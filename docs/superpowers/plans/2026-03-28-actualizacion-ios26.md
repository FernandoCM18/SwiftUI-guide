# Actualización iOS 26 / Swift 6 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Actualizar la guía bilingual ES/EN para reflejar iOS 26 / Swift 6: eliminar Combine y APIs deprecadas, limpiar viewmodels-mvvm, y agregar 6 nuevas páginas (concurrencia, @Observable, Liquid Glass, keyframeAnimator, PhaseAnimator, SwiftData).

**Architecture:** El sitio es Astro Starlight con MDX. Cada nueva página requiere un archivo `.mdx` en `src/content/docs/` (ES) y su espejo en `src/content/docs/en/` (EN), más un `slug` en el sidebar de `astro.config.mjs`. No hay componentes personalizados — solo MDX con los componentes de Starlight (`:::tip`, `:::caution`, `CardGrid`, etc.).

**Tech Stack:** Astro 5.5, @astrojs/starlight 0.33, MDX, Swift/SwiftUI (contenido)

---

## Mapa de archivos

| Acción | Archivo |
|---|---|
| Modificar | `astro.config.mjs` |
| Modificar | `src/content/docs/index.mdx` |
| Modificar | `src/content/docs/en/index.mdx` |
| Modificar | `src/content/docs/guias-practicas/viewmodels-mvvm.mdx` |
| Modificar | `src/content/docs/en/guias-practicas/viewmodels-mvvm.mdx` |
| Modificar (APIs) | Todos los `.mdx` con `.foregroundColor` / `.cornerRadius` — ES y EN |
| Crear | `src/content/docs/swift/concurrencia.mdx` |
| Crear | `src/content/docs/en/swift/concurrencia.mdx` |
| Crear | `src/content/docs/swiftui/estado/observable.mdx` |
| Crear | `src/content/docs/en/swiftui/estado/observable.mdx` |
| Crear | `src/content/docs/swiftui/efectos/liquid-glass.mdx` |
| Crear | `src/content/docs/en/swiftui/efectos/liquid-glass.mdx` |
| Crear | `src/content/docs/swiftui/animaciones/keyframe.mdx` |
| Crear | `src/content/docs/en/swiftui/animaciones/keyframe.mdx` |
| Crear | `src/content/docs/swiftui/animaciones/phase-animator.mdx` |
| Crear | `src/content/docs/en/swiftui/animaciones/phase-animator.mdx` |
| Crear | `src/content/docs/guias-practicas/swiftdata.mdx` |
| Crear | `src/content/docs/en/guias-practicas/swiftdata.mdx` |

---

## Task 1: Limpiar homepage — eliminar Combine

**Files:**
- Modify: `src/content/docs/index.mdx`
- Modify: `src/content/docs/en/index.mdx`

- [ ] **Step 1: Editar `src/content/docs/index.mdx`**

Reemplazar la descripción y el CardGrid. El archivo actualmente dice:

```
description: Documentación completa en español sobre Swift, SwiftUI y Combine con ejemplos prácticos.
```

Cambiar frontmatter a:
```yaml
---
title: Guía Swift y SwiftUI
description: Documentación completa en español sobre Swift y SwiftUI con ejemplos prácticos.
template: splash
hero:
  tagline: Aprende Swift y SwiftUI desde cero con ejemplos prácticos y visuales.
  actions:
    - text: Empezar con Swift
      link: /swift/
      icon: right-arrow
    - text: Explorar SwiftUI
      link: /swiftui/
      variant: minimal
---
```

En el cuerpo, reemplazar el párrafo que menciona Combine:
```
Esta documentación cubre todo lo que necesitas para construir aplicaciones modernas con el ecosistema Apple. Desde los fundamentos del lenguaje Swift hasta interfaces de usuario declarativas con SwiftUI.
```

Reemplazar el CardGrid completo (eliminar el Card de Combine, dejar solo Swift y SwiftUI):
```mdx
<CardGrid>
  <Card title="Swift" icon="seti:swift">
    Aprende los fundamentos del lenguaje Swift: variables, tipos de datos, funciones, structs, clases, protocolos y más.
    [Comenzar →](/swift/)
  </Card>
  <Card title="SwiftUI" icon="laptop">
    Construye interfaces de usuario declarativas con vistas, controles, layouts, listas, navegación y presentación.
    [Explorar →](/swiftui/)
  </Card>
</CardGrid>
```

- [ ] **Step 2: Editar `src/content/docs/en/index.mdx`**

Aplicar los mismos cambios en inglés. Cambiar description a:
```
description: Complete English documentation for Swift and SwiftUI with practical examples.
```

Párrafo del cuerpo:
```
This documentation covers everything you need to build modern apps with the Apple ecosystem. From Swift language fundamentals to declarative user interfaces with SwiftUI.
```

CardGrid sin Combine:
```mdx
<CardGrid>
  <Card title="Swift" icon="seti:swift">
    Learn Swift fundamentals: variables, data types, functions, structs, classes, protocols and more.
    [Get started →](/en/swift/)
  </Card>
  <Card title="SwiftUI" icon="laptop">
    Build declarative user interfaces with views, controls, layouts, lists, navigation and presentation.
    [Explore →](/en/swiftui/)
  </Card>
</CardGrid>
```

- [ ] **Step 3: Verificar build**

```bash
cd /Users/fernando/Dev/SwiftUI-guide && npm run build 2>&1 | tail -20
```

Esperado: sin errores. Si sale `Cannot find page for slug 'combine'` o similar, ya no debe aparecer porque eliminamos el Card.

- [ ] **Step 4: Commit**

```bash
git add src/content/docs/index.mdx src/content/docs/en/index.mdx
git commit -m "content: remove Combine references from homepage"
```

---

## Task 2: Limpiar viewmodels-mvvm — reducir legacy ObservableObject

**Files:**
- Modify: `src/content/docs/guias-practicas/viewmodels-mvvm.mdx`
- Modify: `src/content/docs/en/guias-practicas/viewmodels-mvvm.mdx`

- [ ] **Step 1: Editar `src/content/docs/guias-practicas/viewmodels-mvvm.mdx`**

Actualizar frontmatter description:
```yaml
description: Cómo implementar el patrón MVVM en SwiftUI con ViewModels, @Observable y gestión de estado moderna.
```

Reemplazar la sección entera "## ViewModel con ObservableObject (iOS 14-16)" y todo su contenido (incluyendo "### Conectar con la Vista") por una nota histórica breve:

```mdx
## Compatibilidad legacy (iOS 14-16)

:::note
Si necesitas dar soporte a iOS 14-16, usa `ObservableObject` con `@Published` y `@StateObject`. En iOS 17+ usa siempre `@Observable`.
:::

```swift
// Solo para proyectos que soporten iOS 14-16
class TareasViewModel: ObservableObject {
    @Published var tareas: [String] = []
}

struct TareasView: View {
    @StateObject private var vm = TareasViewModel()
    var body: some View { Text("\(vm.tareas.count) tareas") }
}
```
```

Reemplazar la sección "## @StateObject vs @ObservedObject vs @EnvironmentObject" (tabla + código de ejemplo) por una nota breve colapsada dentro de la sección legacy:

```mdx
:::note[Property wrappers legacy]
- `@StateObject` — vista que **crea** el ViewModel
- `@ObservedObject` — vista hija que **recibe** el ViewModel
- `@EnvironmentObject` — compartir ViewModel en toda la jerarquía
:::
```

Actualizar la tabla "## @Observable vs ObservableObject" para que sea la última sección del archivo (moverla si es necesario), con encabezado actualizado:

```mdx
## @Observable vs ObservableObject (referencia)
```

- [ ] **Step 2: Editar `src/content/docs/en/guias-practicas/viewmodels-mvvm.mdx`**

Aplicar los mismos cambios en inglés. El archivo en `en/` sigue la misma estructura. Los cambios equivalentes son:

Frontmatter description:
```yaml
description: How to implement the MVVM pattern in SwiftUI with ViewModels, @Observable and modern state management.
```

Sección legacy en inglés:
```mdx
## Legacy compatibility (iOS 14-16)

:::note
If you need to support iOS 14-16, use `ObservableObject` with `@Published` and `@StateObject`. On iOS 17+ always use `@Observable`.
:::

```swift
// Only for projects supporting iOS 14-16
class TasksViewModel: ObservableObject {
    @Published var tasks: [String] = []
}

struct TasksView: View {
    @StateObject private var vm = TasksViewModel()
    var body: some View { Text("\(vm.tasks.count) tasks") }
}
```
```

Note en inglés:
```mdx
:::note[Legacy property wrappers]
- `@StateObject` — view that **creates** the ViewModel
- `@ObservedObject` — child view that **receives** the ViewModel
- `@EnvironmentObject` — share ViewModel across the entire hierarchy
:::
```

- [ ] **Step 3: Verificar build**

```bash
cd /Users/fernando/Dev/SwiftUI-guide && npm run build 2>&1 | tail -20
```

Esperado: sin errores.

- [ ] **Step 4: Commit**

```bash
git add src/content/docs/guias-practicas/viewmodels-mvvm.mdx src/content/docs/en/guias-practicas/viewmodels-mvvm.mdx
git commit -m "content: modernize viewmodels-mvvm, reduce legacy ObservableObject to note"
```

---

## Task 3: Reemplazar APIs deprecadas en todos los .mdx

`.foregroundColor()` → `.foregroundStyle()` y `.cornerRadius(N)` → `.clipShape(.rect(cornerRadius: N))` en todos los archivos de contenido ES y EN.

**Files:**
- Modify: Todos los `.mdx` que contienen estas llamadas (ver lista en Task 3 Step 1)

- [ ] **Step 1: Verificar qué archivos tienen cada patrón**

```bash
grep -rn "\.foregroundColor\|\.cornerRadius" /Users/fernando/Dev/SwiftUI-guide/src/content/docs/ --include="*.mdx" -l
```

Salida esperada (archivos afectados):
```
src/content/docs/swiftui/controles/button.mdx
src/content/docs/swiftui/controles/slider.mdx
src/content/docs/swiftui/index.mdx
src/content/docs/swiftui/layout/hstack.mdx
src/content/docs/swiftui/layout/vstack.mdx
src/content/docs/swiftui/layout/zstack.mdx
src/content/docs/swiftui/listas-y-navegacion/list.mdx
src/content/docs/swiftui/listas-y-navegacion/scrollview.mdx
src/content/docs/swiftui/presentacion/tabview.mdx
src/content/docs/swiftui/texto/image.mdx
src/content/docs/swiftui/texto/label.mdx
src/content/docs/swiftui/texto/text.mdx
src/content/docs/guias-practicas/viewmodels-mvvm.mdx
+ mirrors en en/
```

- [ ] **Step 2: Reemplazar `.foregroundColor` → `.foregroundStyle` en todos los archivos**

```bash
find /Users/fernando/Dev/SwiftUI-guide/src/content/docs -name "*.mdx" -exec sed -i '' 's/\.foregroundColor(/.foregroundStyle(/g' {} \;
```

- [ ] **Step 3: Reemplazar `.cornerRadius(N)` → `.clipShape(.rect(cornerRadius: N))`**

Este reemplazo es más delicado porque el número varía. Usar sed con regex:

```bash
find /Users/fernando/Dev/SwiftUI-guide/src/content/docs -name "*.mdx" -exec sed -i '' 's/\.cornerRadius(\([^)]*\))/.clipShape(.rect(cornerRadius: \1))/g' {} \;
```

- [ ] **Step 4: Verificar que no quedan instancias**

```bash
grep -rn "\.foregroundColor\|\.cornerRadius" /Users/fernando/Dev/SwiftUI-guide/src/content/docs/ --include="*.mdx"
```

Esperado: sin resultados. Si hay alguno, editarlo manualmente.

- [ ] **Step 5: Verificar build**

```bash
cd /Users/fernando/Dev/SwiftUI-guide && npm run build 2>&1 | tail -20
```

Esperado: sin errores.

- [ ] **Step 6: Commit**

```bash
git add src/content/docs/
git commit -m "content: replace deprecated .foregroundColor and .cornerRadius with modern APIs"
```

---

## Task 4: Nueva página — Swift Concurrencia (ES + EN)

**Files:**
- Create: `src/content/docs/swift/concurrencia.mdx`
- Create: `src/content/docs/en/swift/concurrencia.mdx`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Crear `src/content/docs/swift/concurrencia.mdx`**

```mdx
---
title: Concurrencia
description: Domina la concurrencia moderna de Swift 6 con async/await, Task, actors y structured concurrency.
---

La concurrencia en Swift permite ejecutar múltiples operaciones en paralelo sin bloquear la interfaz. Swift 6 introduce concurrencia estricta por defecto, eliminando data races en tiempo de compilación.

## async/await

Marca una función con `async` para indicar que puede suspenderse. Usa `await` para llamarla.

```swift
import Foundation

// Función asíncrona
func obtenerUsuario(id: Int) async throws -> String {
    let url = URL(string: "https://api.example.com/users/\(id)")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return String(data: data, encoding: .utf8) ?? ""
}

// Llamar desde contexto async
func cargarPerfil() async {
    do {
        let usuario = try await obtenerUsuario(id: 1)
        print("Usuario: \(usuario)")
    } catch {
        print("Error: \(error)")
    }
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

## Task y TaskGroup

`Task` crea una unidad de trabajo asíncrono. Úsalo para lanzar trabajo async desde contexto síncrono (como `onAppear`).

```swift
import SwiftUI

struct PerfilView: View {
    @State private var nombre = ""

    var body: some View {
        Text(nombre.isEmpty ? "Cargando..." : nombre)
            .onAppear {
                Task {
                    // Lanzar trabajo async desde contexto sync
                    nombre = await cargarNombre()
                }
            }
    }

    func cargarNombre() async -> String {
        try? await Task.sleep(for: .seconds(1))
        return "Carlos"
    }
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

`TaskGroup` ejecuta múltiples tareas en paralelo y espera a que todas terminen:

```swift
func cargarImagenes(ids: [Int]) async -> [String] {
    await withTaskGroup(of: String.self) { group in
        for id in ids {
            group.addTask {
                // Cada imagen se descarga en paralelo
                await descargarImagen(id: id)
            }
        }

        var resultados: [String] = []
        for await imagen in group {
            resultados.append(imagen)
        }
        return resultados
    }
}

func descargarImagen(id: Int) async -> String {
    try? await Task.sleep(for: .milliseconds(100))
    return "imagen_\(id)"
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

## Actors

Un `actor` protege su estado interno de accesos concurrentes. Solo una tarea puede acceder a sus propiedades a la vez.

```swift
actor ContadorSeguro {
    private var valor = 0

    func incrementar() {
        valor += 1
    }

    func obtenerValor() -> Int {
        return valor
    }
}

// Usar el actor desde async
let contador = ContadorSeguro()

Task {
    await contador.incrementar()
    let total = await contador.obtenerValor()
    print("Total: \(total)")
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

:::tip
Usa `@MainActor` para garantizar que el código se ejecute en el hilo principal — necesario para actualizar la UI.
:::

```swift
@MainActor
class MiViewModel: ObservableObject {
    var titulo = ""

    func cargar() async {
        // Esta función siempre se ejecuta en el main thread
        titulo = await fetchTitulo()
    }

    func fetchTitulo() async -> String {
        try? await Task.sleep(for: .seconds(1))
        return "Hola"
    }
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

## Sendable

`Sendable` es un protocolo que marca un tipo como seguro para pasar entre contextos de concurrencia. Swift 6 lo exige en modo estricto.

```swift
// ✅ Struct es Sendable automáticamente (tipo valor)
struct Producto: Sendable {
    let id: Int
    let nombre: String
}

// ✅ Enum con valores asociados Sendable
enum Estado: Sendable {
    case cargando
    case listo(Producto)
    case error(String)
}

// ⚠️ Clase necesita @unchecked Sendable o ser un actor
// para cumplir con Swift 6 strict concurrency
actor GestorProductos {
    var productos: [Producto] = []
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

## Swift 6 — Concurrencia estricta

Swift 6 activa la verificación estricta de concurrencia por defecto. El compilador detecta data races en tiempo de compilación.

```swift
// En Swift 6 esto genera error:
// "Capture of 'datos' with non-sendable type"
class DatosNoConcurrentes {
    var valor = 0
}

// ✅ Solución: usar actor
actor DatosConcurrentes {
    var valor = 0
    func incrementar() { valor += 1 }
}
```

:::tip
Para migrar a Swift 6 gradualmente, activa `SWIFT_STRICT_CONCURRENCY = targeted` en Build Settings. Solo marca los archivos que ya cumplan con la concurrencia estricta.
:::
```

- [ ] **Step 2: Crear `src/content/docs/en/swift/concurrencia.mdx`**

```mdx
---
title: Concurrency
description: Master modern Swift 6 concurrency with async/await, Task, actors and structured concurrency.
---

Concurrency in Swift allows running multiple operations in parallel without blocking the interface. Swift 6 introduces strict concurrency by default, eliminating data races at compile time.

## async/await

Mark a function with `async` to indicate it can suspend. Use `await` to call it.

```swift
import Foundation

// Async function
func fetchUser(id: Int) async throws -> String {
    let url = URL(string: "https://api.example.com/users/\(id)")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return String(data: data, encoding: .utf8) ?? ""
}

// Call from async context
func loadProfile() async {
    do {
        let user = try await fetchUser(id: 1)
        print("User: \(user)")
    } catch {
        print("Error: \(error)")
    }
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

## Task and TaskGroup

`Task` creates a unit of async work. Use it to launch async work from synchronous context (like `onAppear`).

```swift
import SwiftUI

struct ProfileView: View {
    @State private var name = ""

    var body: some View {
        Text(name.isEmpty ? "Loading..." : name)
            .onAppear {
                Task {
                    // Launch async work from sync context
                    name = await loadName()
                }
            }
    }

    func loadName() async -> String {
        try? await Task.sleep(for: .seconds(1))
        return "Carlos"
    }
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

`TaskGroup` runs multiple tasks in parallel and waits for all to finish:

```swift
func loadImages(ids: [Int]) async -> [String] {
    await withTaskGroup(of: String.self) { group in
        for id in ids {
            group.addTask {
                // Each image downloads in parallel
                await downloadImage(id: id)
            }
        }

        var results: [String] = []
        for await image in group {
            results.append(image)
        }
        return results
    }
}

func downloadImage(id: Int) async -> String {
    try? await Task.sleep(for: .milliseconds(100))
    return "image_\(id)"
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

## Actors

An `actor` protects its internal state from concurrent access. Only one task can access its properties at a time.

```swift
actor SafeCounter {
    private var value = 0

    func increment() {
        value += 1
    }

    func getValue() -> Int {
        return value
    }
}

// Use the actor from async context
let counter = SafeCounter()

Task {
    await counter.increment()
    let total = await counter.getValue()
    print("Total: \(total)")
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

:::tip
Use `@MainActor` to guarantee code runs on the main thread — required for UI updates.
:::

```swift
@MainActor
class MyViewModel: ObservableObject {
    var title = ""

    func load() async {
        // This function always runs on the main thread
        title = await fetchTitle()
    }

    func fetchTitle() async -> String {
        try? await Task.sleep(for: .seconds(1))
        return "Hello"
    }
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

## Sendable

`Sendable` is a protocol that marks a type as safe to pass between concurrency contexts. Swift 6 requires it in strict mode.

```swift
// ✅ Struct is Sendable automatically (value type)
struct Product: Sendable {
    let id: Int
    let name: String
}

// ✅ Enum with Sendable associated values
enum State: Sendable {
    case loading
    case ready(Product)
    case error(String)
}

// ⚠️ Class needs @unchecked Sendable or to be an actor
// to comply with Swift 6 strict concurrency
actor ProductManager {
    var products: [Product] = []
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

## Swift 6 — Strict Concurrency

Swift 6 enables strict concurrency checking by default. The compiler detects data races at compile time.

```swift
// In Swift 6 this generates an error:
// "Capture of 'data' with non-sendable type"
class NonConcurrentData {
    var value = 0
}

// ✅ Solution: use actor
actor ConcurrentData {
    var value = 0
    func increment() { value += 1 }
}
```

:::tip
To migrate to Swift 6 gradually, set `SWIFT_STRICT_CONCURRENCY = targeted` in Build Settings. Only files that already comply with strict concurrency will be checked.
:::
```

- [ ] **Step 3: Agregar slug a `astro.config.mjs`**

En la sección `Swift`, después de `{ slug: 'swift/funciones' }`, agregar:

```js
{ slug: 'swift/concurrencia' },
```

- [ ] **Step 4: Verificar build**

```bash
cd /Users/fernando/Dev/SwiftUI-guide && npm run build 2>&1 | tail -20
```

Esperado: sin errores. Las dos páginas nuevas deben aparecer en el build.

- [ ] **Step 5: Commit**

```bash
git add src/content/docs/swift/concurrencia.mdx src/content/docs/en/swift/concurrencia.mdx astro.config.mjs
git commit -m "content: add Swift 6 concurrency page (ES + EN)"
```

---

## Task 5: Nueva página — @Observable (ES + EN)

**Files:**
- Create: `src/content/docs/swiftui/estado/observable.mdx`
- Create: `src/content/docs/en/swiftui/estado/observable.mdx`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Crear `src/content/docs/swiftui/estado/observable.mdx`**

```mdx
---
title: "@Observable"
description: El framework Observation de Swift — gestión de estado moderna en SwiftUI con @Observable, @State y @Environment.
---

El framework **Observation** (iOS 17+) reemplaza `ObservableObject` con el macro `@Observable`. Es más simple, más eficiente y requiere menos código.

## @Observable

Aplica `@Observable` a una clase para que SwiftUI observe automáticamente todos sus cambios de propiedad.

```swift
import SwiftUI
import Observation

@Observable
class ContadorViewModel {
    var cuenta = 0
    var historial: [Int] = []

    func incrementar() {
        cuenta += 1
        historial.append(cuenta)
    }

    func reiniciar() {
        cuenta = 0
        historial.removeAll()
    }
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

A diferencia de `ObservableObject`, no necesitas marcar cada propiedad con `@Published`. El macro instrumenta todas las propiedades almacenadas automáticamente.

## Usar el ViewModel en una vista

Con `@Observable`, crea el ViewModel con `@State` en la vista que lo posee:

```swift
struct ContadorView: View {
    @State private var vm = ContadorViewModel()

    var body: some View {
        VStack(spacing: 24) {
            Text("\(vm.cuenta)")
                .font(.system(size: 80, weight: .bold, design: .rounded))

            HStack(spacing: 16) {
                Button("Reiniciar") { vm.reiniciar() }
                    .buttonStyle(.bordered)

                Button("Sumar") { vm.incrementar() }
                    .buttonStyle(.borderedProminent)
            }

            if !vm.historial.isEmpty {
                Text("Historial: \(vm.historial.map(String.init).joined(separator: " → "))")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .padding()
    }
}

#Preview { ContadorView() }
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

:::tip
Con `@Observable`, usa `@State` (no `@StateObject`) para crear el ViewModel. SwiftUI recrea la vista si es necesario, pero el `@State` preserva el ViewModel.
:::

## Pasar el ViewModel a vistas hijas

Para pasar el ViewModel a una vista hija sin `@EnvironmentObject`, simplemente pásalo como parámetro. `@Observable` no necesita ningún wrapper especial:

```swift
struct ContadorView: View {
    @State private var vm = ContadorViewModel()

    var body: some View {
        VStack {
            HistorialView(vm: vm)  // Paso directo, sin wrapper
            ContadorControlesView(vm: vm)
        }
    }
}

struct HistorialView: View {
    let vm: ContadorViewModel  // Sin @ObservedObject

    var body: some View {
        List(vm.historial, id: \.self) { valor in
            Text("\(valor)")
        }
    }
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

## @Environment con @Observable

Para compartir un ViewModel en toda la jerarquía de vistas, usa `@Environment` con una clave de entorno personalizada:

```swift
@Observable
class SesionUsuario {
    var nombre = ""
    var estaAutenticado = false

    func iniciarSesion(nombre: String) {
        self.nombre = nombre
        estaAutenticado = true
    }

    func cerrarSesion() {
        nombre = ""
        estaAutenticado = false
    }
}

struct MiApp: App {
    @State private var sesion = SesionUsuario()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(sesion)  // Inyectar en el entorno
        }
    }
}

struct PerfilView: View {
    @Environment(SesionUsuario.self) private var sesion  // Leer del entorno

    var body: some View {
        if sesion.estaAutenticado {
            Text("Hola, \(sesion.nombre)")
            Button("Cerrar sesión") { sesion.cerrarSesion() }
        } else {
            Button("Iniciar sesión") { sesion.iniciarSesion(nombre: "Carlos") }
        }
    }
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

## Propiedades ignoradas

Para excluir una propiedad del tracking de observación, usa `@ObservationIgnored`:

```swift
@Observable
class ConfiguracionViewModel {
    var tema: String = "claro"      // Observado — SwiftUI reacciona a cambios
    var idioma: String = "es"        // Observado

    @ObservationIgnored
    var cache: [String: Any] = [:]  // No observado — cambios no actualizan la UI
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

## @Observable vs ObservableObject

| | `@Observable` (iOS 17+) | `ObservableObject` |
|---|---|---|
| Declaración | `@Observable class VM` | `class VM: ObservableObject` |
| Propiedades | Automáticas | `@Published` en cada una |
| En vista creadora | `@State` | `@StateObject` |
| En vista hija | Parámetro directo | `@ObservedObject` |
| Entorno | `@Environment(Tipo.self)` | `@EnvironmentObject` |
| Re-renders | Granular por propiedad | Por cualquier `@Published` |
```

- [ ] **Step 2: Crear `src/content/docs/en/swiftui/estado/observable.mdx`**

```mdx
---
title: "@Observable"
description: Swift's Observation framework — modern state management in SwiftUI with @Observable, @State and @Environment.
---

The **Observation** framework (iOS 17+) replaces `ObservableObject` with the `@Observable` macro. It's simpler, more efficient and requires less code.

## @Observable

Apply `@Observable` to a class so SwiftUI automatically observes all its property changes.

```swift
import SwiftUI
import Observation

@Observable
class CounterViewModel {
    var count = 0
    var history: [Int] = []

    func increment() {
        count += 1
        history.append(count)
    }

    func reset() {
        count = 0
        history.removeAll()
    }
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

Unlike `ObservableObject`, you don't need to mark each property with `@Published`. The macro instruments all stored properties automatically.

## Using the ViewModel in a view

With `@Observable`, create the ViewModel with `@State` in the owning view:

```swift
struct CounterView: View {
    @State private var vm = CounterViewModel()

    var body: some View {
        VStack(spacing: 24) {
            Text("\(vm.count)")
                .font(.system(size: 80, weight: .bold, design: .rounded))

            HStack(spacing: 16) {
                Button("Reset") { vm.reset() }
                    .buttonStyle(.bordered)

                Button("Add") { vm.increment() }
                    .buttonStyle(.borderedProminent)
            }

            if !vm.history.isEmpty {
                Text("History: \(vm.history.map(String.init).joined(separator: " → "))")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .padding()
    }
}

#Preview { CounterView() }
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

:::tip
With `@Observable`, use `@State` (not `@StateObject`) to create the ViewModel. SwiftUI recreates the view if needed, but `@State` preserves the ViewModel.
:::

## Passing the ViewModel to child views

To pass the ViewModel to a child view without `@EnvironmentObject`, just pass it as a parameter. `@Observable` doesn't need any special wrapper:

```swift
struct CounterView: View {
    @State private var vm = CounterViewModel()

    var body: some View {
        VStack {
            HistoryView(vm: vm)      // Direct pass, no wrapper
            CounterControlsView(vm: vm)
        }
    }
}

struct HistoryView: View {
    let vm: CounterViewModel  // No @ObservedObject needed

    var body: some View {
        List(vm.history, id: \.self) { value in
            Text("\(value)")
        }
    }
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

## @Environment with @Observable

To share a ViewModel across the entire view hierarchy, use `@Environment` with a custom environment key:

```swift
@Observable
class UserSession {
    var name = ""
    var isAuthenticated = false

    func signIn(name: String) {
        self.name = name
        isAuthenticated = true
    }

    func signOut() {
        name = ""
        isAuthenticated = false
    }
}

struct MyApp: App {
    @State private var session = UserSession()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(session)  // Inject into environment
        }
    }
}

struct ProfileView: View {
    @Environment(UserSession.self) private var session  // Read from environment

    var body: some View {
        if session.isAuthenticated {
            Text("Hello, \(session.name)")
            Button("Sign out") { session.signOut() }
        } else {
            Button("Sign in") { session.signIn(name: "Carlos") }
        }
    }
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

## Ignored properties

To exclude a property from observation tracking, use `@ObservationIgnored`:

```swift
@Observable
class SettingsViewModel {
    var theme: String = "light"     // Observed — SwiftUI reacts to changes
    var language: String = "en"      // Observed

    @ObservationIgnored
    var cache: [String: Any] = [:]  // Not observed — changes don't update UI
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

## @Observable vs ObservableObject

| | `@Observable` (iOS 17+) | `ObservableObject` |
|---|---|---|
| Declaration | `@Observable class VM` | `class VM: ObservableObject` |
| Properties | Automatic | `@Published` on each |
| In owner view | `@State` | `@StateObject` |
| In child view | Direct parameter | `@ObservedObject` |
| Environment | `@Environment(Type.self)` | `@EnvironmentObject` |
| Re-renders | Granular per property | On any `@Published` change |
```

- [ ] **Step 3: Agregar subsección "Estado" en `astro.config.mjs`**

En la sección `SwiftUI`, después del bloque de `Presentación`, agregar:

```js
{
  label: 'Estado',
  translations: { en: 'State' },
  items: [
    { slug: 'swiftui/estado/observable' },
  ],
},
```

- [ ] **Step 4: Verificar build**

```bash
cd /Users/fernando/Dev/SwiftUI-guide && npm run build 2>&1 | tail -20
```

Esperado: sin errores.

- [ ] **Step 5: Commit**

```bash
git add src/content/docs/swiftui/estado/ src/content/docs/en/swiftui/estado/ astro.config.mjs
git commit -m "content: add @Observable state management page (ES + EN)"
```

---

## Task 6: Nueva página — Liquid Glass (ES + EN)

**Files:**
- Create: `src/content/docs/swiftui/efectos/liquid-glass.mdx`
- Create: `src/content/docs/en/swiftui/efectos/liquid-glass.mdx`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Crear `src/content/docs/swiftui/efectos/liquid-glass.mdx`**

```mdx
---
title: Liquid Glass
description: El nuevo lenguaje visual de Apple en iOS 26 y macOS 26 — materiales translúcidos, efectos de cristal y blur nativo en SwiftUI.
---

**Liquid Glass** es el nuevo lenguaje visual de Apple presentado en WWDC 2025 con iOS 26 y macOS 26. Los elementos de la interfaz adoptan un aspecto de cristal translúcido que refleja y refracta el contenido detrás de ellos.

## Materiales

SwiftUI ofrece una jerarquía de materiales que aplican el efecto Liquid Glass. Se usan con el modificador `.background()`:

```swift
import SwiftUI

struct TarjetaGlass: View {
    var body: some View {
        VStack(spacing: 16) {
            Text("Liquid Glass")
                .font(.title2.bold())
            Text("iOS 26 · macOS 26")
                .foregroundStyle(.secondary)
        }
        .padding(24)
        .background(.ultraThinMaterial)  // Material más translúcido
        .clipShape(.rect(cornerRadius: 20))
    }
}

#Preview {
    ZStack {
        LinearGradient(
            colors: [.blue, .purple, .pink],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
        .ignoresSafeArea()

        TarjetaGlass()
    }
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

### Jerarquía de materiales

De más a menos translúcido:

| Material | Uso recomendado |
|---|---|
| `.ultraThinMaterial` | Overlays sutiles, barras flotantes |
| `.thinMaterial` | Paneles secundarios |
| `.regularMaterial` | Tarjetas, contenedores principales |
| `.thickMaterial` | Fondos con mayor opacidad |
| `.ultraThickMaterial` | Fondos casi opacos |

## glassBackgroundEffect

El modificador `.glassBackgroundEffect()` aplica el efecto Liquid Glass nativo de iOS 26 en toda su expresión, incluyendo el reflejo dinámico y la refracción:

```swift
import SwiftUI

struct BotonGlass: View {
    var body: some View {
        Button(action: {}) {
            Label("Abrir cámara", systemImage: "camera.fill")
                .font(.headline)
                .padding(.horizontal, 20)
                .padding(.vertical, 12)
        }
        .glassBackgroundEffect()  // Efecto Liquid Glass nativo (iOS 26+)
    }
}

#Preview {
    ZStack {
        Image(systemName: "photo")
            .resizable()
            .scaledToFill()
            .foregroundStyle(
                LinearGradient(colors: [.cyan, .blue], startPoint: .top, endPoint: .bottom)
            )
            .frame(width: 300, height: 300)

        BotonGlass()
    }
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

:::tip
`.glassBackgroundEffect()` está disponible desde iOS 26 / macOS 26. Para versiones anteriores, usa `.background(.regularMaterial)` como fallback.
:::

## Combinando materiales con vibrancy

El efecto `vibrancy` adapta el color del texto al material subyacente para mejorar la legibilidad:

```swift
import SwiftUI

struct PanelGlass: View {
    let titulo: String
    let subtitulo: String

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(titulo)
                .font(.headline)

            Text(subtitulo)
                .font(.subheadline)
                .foregroundStyle(.secondary)

            Divider()

            HStack {
                Image(systemName: "checkmark.circle.fill")
                    .foregroundStyle(.green)
                Text("Activo")
                    .foregroundStyle(.primary)
            }
        }
        .padding(20)
        .background(.ultraThinMaterial)
        .clipShape(.rect(cornerRadius: 16))
        .shadow(color: .black.opacity(0.1), radius: 10, y: 4)
    }
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

## Ejemplo completo: Dashboard con Liquid Glass

```swift
import SwiftUI

struct DashboardView: View {
    var body: some View {
        ZStack {
            // Fondo dinámico
            LinearGradient(
                colors: [.indigo, .purple, .pink],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()

            ScrollView {
                VStack(spacing: 16) {
                    // Tarjeta principal
                    VStack(alignment: .leading, spacing: 12) {
                        Label("Estado del sistema", systemImage: "cpu")
                            .font(.headline)
                        Text("Todo funciona correctamente")
                            .foregroundStyle(.secondary)
                        ProgressView(value: 0.72)
                            .tint(.green)
                    }
                    .padding(20)
                    .background(.regularMaterial)
                    .clipShape(.rect(cornerRadius: 20))

                    // Fila de estadísticas
                    HStack(spacing: 12) {
                        EstadisticaCard(icono: "bolt.fill", valor: "98%", etiqueta: "CPU")
                        EstadisticaCard(icono: "memorychip", valor: "4.2 GB", etiqueta: "RAM")
                        EstadisticaCard(icono: "internaldrive", valor: "128 GB", etiqueta: "Disco")
                    }
                }
                .padding()
            }
        }
    }
}

struct EstadisticaCard: View {
    let icono: String
    let valor: String
    let etiqueta: String

    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icono)
                .font(.title2)
            Text(valor)
                .font(.headline)
            Text(etiqueta)
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 16)
        .background(.ultraThinMaterial)
        .clipShape(.rect(cornerRadius: 16))
    }
}

#Preview { DashboardView() }
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)
```

- [ ] **Step 2: Crear `src/content/docs/en/swiftui/efectos/liquid-glass.mdx`**

```mdx
---
title: Liquid Glass
description: Apple's new visual language in iOS 26 and macOS 26 — translucent materials, glass effects and native blur in SwiftUI.
---

**Liquid Glass** is Apple's new visual language introduced at WWDC 2025 with iOS 26 and macOS 26. Interface elements adopt a translucent glass appearance that reflects and refracts the content behind them.

## Materials

SwiftUI provides a hierarchy of materials that apply the Liquid Glass effect. Use them with the `.background()` modifier:

```swift
import SwiftUI

struct GlassCard: View {
    var body: some View {
        VStack(spacing: 16) {
            Text("Liquid Glass")
                .font(.title2.bold())
            Text("iOS 26 · macOS 26")
                .foregroundStyle(.secondary)
        }
        .padding(24)
        .background(.ultraThinMaterial)  // Most translucent material
        .clipShape(.rect(cornerRadius: 20))
    }
}

#Preview {
    ZStack {
        LinearGradient(
            colors: [.blue, .purple, .pink],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
        .ignoresSafeArea()

        GlassCard()
    }
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

### Material hierarchy

From most to least translucent:

| Material | Recommended use |
|---|---|
| `.ultraThinMaterial` | Subtle overlays, floating bars |
| `.thinMaterial` | Secondary panels |
| `.regularMaterial` | Cards, main containers |
| `.thickMaterial` | Backgrounds with more opacity |
| `.ultraThickMaterial` | Nearly opaque backgrounds |

## glassBackgroundEffect

The `.glassBackgroundEffect()` modifier applies the native iOS 26 Liquid Glass effect in its full expression, including dynamic reflection and refraction:

```swift
import SwiftUI

struct GlassButton: View {
    var body: some View {
        Button(action: {}) {
            Label("Open camera", systemImage: "camera.fill")
                .font(.headline)
                .padding(.horizontal, 20)
                .padding(.vertical, 12)
        }
        .glassBackgroundEffect()  // Native Liquid Glass effect (iOS 26+)
    }
}

#Preview {
    ZStack {
        LinearGradient(colors: [.cyan, .blue], startPoint: .top, endPoint: .bottom)
            .ignoresSafeArea()

        GlassButton()
    }
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

:::tip
`.glassBackgroundEffect()` is available from iOS 26 / macOS 26. For earlier versions, use `.background(.regularMaterial)` as a fallback.
:::

## Combining materials with vibrancy

The `vibrancy` effect adapts text color to the underlying material to improve readability:

```swift
import SwiftUI

struct GlassPanel: View {
    let title: String
    let subtitle: String

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.headline)

            Text(subtitle)
                .font(.subheadline)
                .foregroundStyle(.secondary)

            Divider()

            HStack {
                Image(systemName: "checkmark.circle.fill")
                    .foregroundStyle(.green)
                Text("Active")
                    .foregroundStyle(.primary)
            }
        }
        .padding(20)
        .background(.ultraThinMaterial)
        .clipShape(.rect(cornerRadius: 16))
        .shadow(color: .black.opacity(0.1), radius: 10, y: 4)
    }
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

## Full example: Dashboard with Liquid Glass

```swift
import SwiftUI

struct DashboardView: View {
    var body: some View {
        ZStack {
            // Dynamic background
            LinearGradient(
                colors: [.indigo, .purple, .pink],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()

            ScrollView {
                VStack(spacing: 16) {
                    // Main card
                    VStack(alignment: .leading, spacing: 12) {
                        Label("System status", systemImage: "cpu")
                            .font(.headline)
                        Text("Everything working correctly")
                            .foregroundStyle(.secondary)
                        ProgressView(value: 0.72)
                            .tint(.green)
                    }
                    .padding(20)
                    .background(.regularMaterial)
                    .clipShape(.rect(cornerRadius: 20))

                    // Stats row
                    HStack(spacing: 12) {
                        StatCard(icon: "bolt.fill", value: "98%", label: "CPU")
                        StatCard(icon: "memorychip", value: "4.2 GB", label: "RAM")
                        StatCard(icon: "internaldrive", value: "128 GB", label: "Disk")
                    }
                }
                .padding()
            }
        }
    }
}

struct StatCard: View {
    let icon: String
    let value: String
    let label: String

    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.title2)
            Text(value)
                .font(.headline)
            Text(label)
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 16)
        .background(.ultraThinMaterial)
        .clipShape(.rect(cornerRadius: 16))
    }
}

#Preview { DashboardView() }
```

> [Try in Swift Playground →](https://swiftfiddle.com/)
```

- [ ] **Step 3: Agregar subsección "Efectos" en `astro.config.mjs`**

En la sección `SwiftUI`, después del bloque de `Estado` (añadido en Task 5), agregar:

```js
{
  label: 'Efectos',
  translations: { en: 'Effects' },
  items: [
    { slug: 'swiftui/efectos/liquid-glass' },
  ],
},
```

- [ ] **Step 4: Verificar build**

```bash
cd /Users/fernando/Dev/SwiftUI-guide && npm run build 2>&1 | tail -20
```

Esperado: sin errores.

- [ ] **Step 5: Commit**

```bash
git add src/content/docs/swiftui/efectos/ src/content/docs/en/swiftui/efectos/ astro.config.mjs
git commit -m "content: add Liquid Glass page (ES + EN)"
```

---

## Task 7: Nuevas páginas — Animaciones (keyframeAnimator + PhaseAnimator, ES + EN)

**Files:**
- Create: `src/content/docs/swiftui/animaciones/keyframe.mdx`
- Create: `src/content/docs/en/swiftui/animaciones/keyframe.mdx`
- Create: `src/content/docs/swiftui/animaciones/phase-animator.mdx`
- Create: `src/content/docs/en/swiftui/animaciones/phase-animator.mdx`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Crear `src/content/docs/swiftui/animaciones/keyframe.mdx`**

```mdx
---
title: keyframeAnimator
description: Crea animaciones complejas en SwiftUI con keyframeAnimator — controla offset, escala, opacidad y rotación de forma independiente.
---

`keyframeAnimator` (iOS 17+) permite definir animaciones con fotogramas clave donde cada propiedad tiene su propia curva de animación independiente.

## Estructura básica

```swift
import SwiftUI

struct EjemploKeyframe: View {
    @State private var animar = false

    var body: some View {
        Image(systemName: "star.fill")
            .font(.system(size: 60))
            .foregroundStyle(.yellow)
            .keyframeAnimator(
                initialValue: PropiedadesAnimacion(),
                trigger: animar
            ) { contenido, valor in
                contenido
                    .scaleEffect(valor.escala)
                    .offset(y: valor.offsetY)
                    .opacity(valor.opacidad)
            } keyframes: { _ in
                KeyframeTrack(\.escala) {
                    LinearKeyframe(1.0, duration: 0.1)
                    SpringKeyframe(1.5, duration: 0.3)
                    SpringKeyframe(1.0, duration: 0.3)
                }
                KeyframeTrack(\.offsetY) {
                    LinearKeyframe(0, duration: 0.1)
                    SpringKeyframe(-30, duration: 0.3)
                    SpringKeyframe(0, duration: 0.3)
                }
                KeyframeTrack(\.opacidad) {
                    LinearKeyframe(1.0, duration: 0.5)
                    LinearKeyframe(0.7, duration: 0.2)
                    LinearKeyframe(1.0, duration: 0.1)
                }
            }
            .onTapGesture { animar.toggle() }
    }
}

struct PropiedadesAnimacion {
    var escala: CGFloat = 1.0
    var offsetY: CGFloat = 0
    var opacidad: Double = 1.0
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

## KeyframeTrack

Cada `KeyframeTrack` controla una propiedad usando su keyPath. Dentro del track defines los fotogramas clave:

| Tipo de keyframe | Comportamiento |
|---|---|
| `LinearKeyframe` | Interpolación lineal hasta el valor |
| `SpringKeyframe` | Animación con resorte (rebote natural) |
| `CubicKeyframe` | Curva cúbica suave (Bézier) |
| `MoveKeyframe` | Salta al valor sin animación |

```swift
KeyframeTrack(\.escala) {
    LinearKeyframe(1.0, duration: 0.05)   // Sin animación inicial
    SpringKeyframe(2.0, duration: 0.4)    // Escala con resorte
    CubicKeyframe(1.2, duration: 0.3)     // Baja suavemente
    SpringKeyframe(1.0, duration: 0.2)    // Vuelve al normal
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

## Ejemplo completo: botón de like animado

```swift
import SwiftUI

struct LikeButton: View {
    @State private var estaDandoLike = false
    @State private var disparar = false

    var body: some View {
        Button {
            estaDandoLike.toggle()
            disparar.toggle()
        } label: {
            Image(systemName: estaDandoLike ? "heart.fill" : "heart")
                .font(.system(size: 44))
                .foregroundStyle(estaDandoLike ? .red : .gray)
                .keyframeAnimator(
                    initialValue: ValoresLike(),
                    trigger: disparar
                ) { vista, valor in
                    vista
                        .scaleEffect(valor.escala)
                        .rotationEffect(.degrees(valor.rotacion))
                } keyframes: { _ in
                    KeyframeTrack(\.escala) {
                        MoveKeyframe(1.0)
                        SpringKeyframe(1.4, duration: 0.2, spring: .bouncy)
                        SpringKeyframe(1.0, duration: 0.3, spring: .smooth)
                    }
                    KeyframeTrack(\.rotacion) {
                        MoveKeyframe(0)
                        LinearKeyframe(-8, duration: 0.1)
                        LinearKeyframe(8, duration: 0.1)
                        LinearKeyframe(-4, duration: 0.1)
                        SpringKeyframe(0, duration: 0.2)
                    }
                }
        }
        .buttonStyle(.plain)
    }
}

struct ValoresLike {
    var escala: CGFloat = 1.0
    var rotacion: Double = 0
}

#Preview { LikeButton() }
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)
```

- [ ] **Step 2: Crear `src/content/docs/en/swiftui/animaciones/keyframe.mdx`**

```mdx
---
title: keyframeAnimator
description: Create complex animations in SwiftUI with keyframeAnimator — control offset, scale, opacity and rotation independently.
---

`keyframeAnimator` (iOS 17+) lets you define animations with keyframes where each property has its own independent animation curve.

## Basic structure

```swift
import SwiftUI

struct KeyframeExample: View {
    @State private var animate = false

    var body: some View {
        Image(systemName: "star.fill")
            .font(.system(size: 60))
            .foregroundStyle(.yellow)
            .keyframeAnimator(
                initialValue: AnimationValues(),
                trigger: animate
            ) { content, value in
                content
                    .scaleEffect(value.scale)
                    .offset(y: value.offsetY)
                    .opacity(value.opacity)
            } keyframes: { _ in
                KeyframeTrack(\.scale) {
                    LinearKeyframe(1.0, duration: 0.1)
                    SpringKeyframe(1.5, duration: 0.3)
                    SpringKeyframe(1.0, duration: 0.3)
                }
                KeyframeTrack(\.offsetY) {
                    LinearKeyframe(0, duration: 0.1)
                    SpringKeyframe(-30, duration: 0.3)
                    SpringKeyframe(0, duration: 0.3)
                }
                KeyframeTrack(\.opacity) {
                    LinearKeyframe(1.0, duration: 0.5)
                    LinearKeyframe(0.7, duration: 0.2)
                    LinearKeyframe(1.0, duration: 0.1)
                }
            }
            .onTapGesture { animate.toggle() }
    }
}

struct AnimationValues {
    var scale: CGFloat = 1.0
    var offsetY: CGFloat = 0
    var opacity: Double = 1.0
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

## KeyframeTrack

Each `KeyframeTrack` controls a property using its keyPath. Inside the track you define the keyframes:

| Keyframe type | Behavior |
|---|---|
| `LinearKeyframe` | Linear interpolation to value |
| `SpringKeyframe` | Spring animation (natural bounce) |
| `CubicKeyframe` | Smooth cubic curve (Bézier) |
| `MoveKeyframe` | Jump to value with no animation |

```swift
KeyframeTrack(\.scale) {
    LinearKeyframe(1.0, duration: 0.05)   // No initial animation
    SpringKeyframe(2.0, duration: 0.4)    // Scale with spring
    CubicKeyframe(1.2, duration: 0.3)     // Smooth descent
    SpringKeyframe(1.0, duration: 0.2)    // Return to normal
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

## Full example: animated like button

```swift
import SwiftUI

struct LikeButton: View {
    @State private var isLiked = false
    @State private var trigger = false

    var body: some View {
        Button {
            isLiked.toggle()
            trigger.toggle()
        } label: {
            Image(systemName: isLiked ? "heart.fill" : "heart")
                .font(.system(size: 44))
                .foregroundStyle(isLiked ? .red : .gray)
                .keyframeAnimator(
                    initialValue: LikeValues(),
                    trigger: trigger
                ) { view, value in
                    view
                        .scaleEffect(value.scale)
                        .rotationEffect(.degrees(value.rotation))
                } keyframes: { _ in
                    KeyframeTrack(\.scale) {
                        MoveKeyframe(1.0)
                        SpringKeyframe(1.4, duration: 0.2, spring: .bouncy)
                        SpringKeyframe(1.0, duration: 0.3, spring: .smooth)
                    }
                    KeyframeTrack(\.rotation) {
                        MoveKeyframe(0)
                        LinearKeyframe(-8, duration: 0.1)
                        LinearKeyframe(8, duration: 0.1)
                        LinearKeyframe(-4, duration: 0.1)
                        SpringKeyframe(0, duration: 0.2)
                    }
                }
        }
        .buttonStyle(.plain)
    }
}

struct LikeValues {
    var scale: CGFloat = 1.0
    var rotation: Double = 0
}

#Preview { LikeButton() }
```

> [Try in Swift Playground →](https://swiftfiddle.com/)
```

- [ ] **Step 3: Crear `src/content/docs/swiftui/animaciones/phase-animator.mdx`**

```mdx
---
title: PhaseAnimator
description: Crea secuencias de animación en SwiftUI con PhaseAnimator — cicla automáticamente por estados discretos con animaciones suaves.
---

`PhaseAnimator` (iOS 17+) anima una vista a través de una secuencia de fases definidas por un enum. Ideal para animaciones en bucle o secuencias con pasos discretos.

## Estructura básica

```swift
import SwiftUI

enum FaseRebote: CaseIterable {
    case normal, arriba, abajo
}

struct EjemploPhase: View {
    var body: some View {
        PhaseAnimator(FaseRebote.allCases) { fase in
            Image(systemName: "basketball.fill")
                .font(.system(size: 60))
                .foregroundStyle(.orange)
                .offset(y: offsetPara(fase))
                .scaleEffect(escalaPara(fase))
        } animation: { fase in
            switch fase {
            case .normal: .spring(duration: 0.3)
            case .arriba: .easeOut(duration: 0.4)
            case .abajo: .easeIn(duration: 0.3)
            }
        }
    }

    func offsetPara(_ fase: FaseRebote) -> CGFloat {
        switch fase {
        case .normal: 0
        case .arriba: -80
        case .abajo: 20
        }
    }

    func escalaPara(_ fase: FaseRebote) -> CGFloat {
        switch fase {
        case .normal: 1.0
        case .arriba: 0.9
        case .abajo: 1.1
        }
    }
}

#Preview { EjemploPhase() }
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

:::tip
`PhaseAnimator` cicla automáticamente por todas las fases en bucle. Cada fase puede tener su propia curva de animación.
:::

## Trigger manual

Para controlar cuándo empieza la secuencia, usa el parámetro `trigger`:

```swift
import SwiftUI

enum FaseCarga: CaseIterable {
    case reposo, cargando, completado
}

struct BotonCarga: View {
    @State private var disparar = false

    var body: some View {
        PhaseAnimator(
            FaseCarga.allCases,
            trigger: disparar  // Solo anima cuando disparar cambia
        ) { fase in
            Button {
                disparar.toggle()
            } label: {
                HStack {
                    imagenPara(fase)
                    Text(textoPara(fase))
                        .fontWeight(.semibold)
                }
                .padding(.horizontal, 24)
                .padding(.vertical, 12)
                .background(.blue)
                .foregroundStyle(.white)
                .clipShape(.capsule)
            }
            .buttonStyle(.plain)
            .scaleEffect(fase == .cargando ? 0.95 : 1.0)
        } animation: { fase in
            switch fase {
            case .reposo: .smooth(duration: 0.3)
            case .cargando: .linear(duration: 0.5).repeatCount(3)
            case .completado: .spring(duration: 0.4)
            }
        }
    }

    @ViewBuilder
    func imagenPara(_ fase: FaseCarga) -> some View {
        switch fase {
        case .reposo:
            Image(systemName: "arrow.up.circle")
        case .cargando:
            ProgressView().tint(.white).scaleEffect(0.8)
        case .completado:
            Image(systemName: "checkmark.circle.fill")
        }
    }

    func textoPara(_ fase: FaseCarga) -> String {
        switch fase {
        case .reposo: "Subir archivo"
        case .cargando: "Subiendo..."
        case .completado: "¡Listo!"
        }
    }
}

#Preview { BotonCarga() }
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

## PhaseAnimator vs keyframeAnimator

| | `PhaseAnimator` | `keyframeAnimator` |
|---|---|---|
| Fases | Estados discretos (enum) | Fotogramas clave por tiempo |
| Control | Por fase | Por propiedad individual |
| Bucle | Automático | Solo con trigger |
| Ideal para | Secuencias de estados | Animaciones de propiedades precisas |
| Complejidad | Menor | Mayor |

Usa `PhaseAnimator` cuando tu animación tiene pasos lógicos distintos. Usa `keyframeAnimator` cuando necesitas controlar múltiples propiedades con timing preciso.
```

- [ ] **Step 4: Crear `src/content/docs/en/swiftui/animaciones/phase-animator.mdx`**

```mdx
---
title: PhaseAnimator
description: Create animation sequences in SwiftUI with PhaseAnimator — automatically cycle through discrete states with smooth animations.
---

`PhaseAnimator` (iOS 17+) animates a view through a sequence of phases defined by an enum. Ideal for looping animations or sequences with discrete steps.

## Basic structure

```swift
import SwiftUI

enum BouncePhase: CaseIterable {
    case normal, up, down
}

struct PhaseExample: View {
    var body: some View {
        PhaseAnimator(BouncePhase.allCases) { phase in
            Image(systemName: "basketball.fill")
                .font(.system(size: 60))
                .foregroundStyle(.orange)
                .offset(y: offsetFor(phase))
                .scaleEffect(scaleFor(phase))
        } animation: { phase in
            switch phase {
            case .normal: .spring(duration: 0.3)
            case .up: .easeOut(duration: 0.4)
            case .down: .easeIn(duration: 0.3)
            }
        }
    }

    func offsetFor(_ phase: BouncePhase) -> CGFloat {
        switch phase {
        case .normal: 0
        case .up: -80
        case .down: 20
        }
    }

    func scaleFor(_ phase: BouncePhase) -> CGFloat {
        switch phase {
        case .normal: 1.0
        case .up: 0.9
        case .down: 1.1
        }
    }
}

#Preview { PhaseExample() }
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

:::tip
`PhaseAnimator` automatically cycles through all phases in a loop. Each phase can have its own animation curve.
:::

## Manual trigger

To control when the sequence starts, use the `trigger` parameter:

```swift
import SwiftUI

enum LoadPhase: CaseIterable {
    case idle, loading, completed
}

struct LoadButton: View {
    @State private var trigger = false

    var body: some View {
        PhaseAnimator(
            LoadPhase.allCases,
            trigger: trigger  // Only animates when trigger changes
        ) { phase in
            Button {
                trigger.toggle()
            } label: {
                HStack {
                    iconFor(phase)
                    Text(labelFor(phase))
                        .fontWeight(.semibold)
                }
                .padding(.horizontal, 24)
                .padding(.vertical, 12)
                .background(.blue)
                .foregroundStyle(.white)
                .clipShape(.capsule)
            }
            .buttonStyle(.plain)
            .scaleEffect(phase == .loading ? 0.95 : 1.0)
        } animation: { phase in
            switch phase {
            case .idle: .smooth(duration: 0.3)
            case .loading: .linear(duration: 0.5).repeatCount(3)
            case .completed: .spring(duration: 0.4)
            }
        }
    }

    @ViewBuilder
    func iconFor(_ phase: LoadPhase) -> some View {
        switch phase {
        case .idle:
            Image(systemName: "arrow.up.circle")
        case .loading:
            ProgressView().tint(.white).scaleEffect(0.8)
        case .completed:
            Image(systemName: "checkmark.circle.fill")
        }
    }

    func labelFor(_ phase: LoadPhase) -> String {
        switch phase {
        case .idle: "Upload file"
        case .loading: "Uploading..."
        case .completed: "Done!"
        }
    }
}

#Preview { LoadButton() }
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

## PhaseAnimator vs keyframeAnimator

| | `PhaseAnimator` | `keyframeAnimator` |
|---|---|---|
| Phases | Discrete states (enum) | Keyframes by time |
| Control | Per phase | Per individual property |
| Loop | Automatic | Only with trigger |
| Best for | State sequences | Precise property animations |
| Complexity | Lower | Higher |

Use `PhaseAnimator` when your animation has distinct logical steps. Use `keyframeAnimator` when you need to control multiple properties with precise timing.
```

- [ ] **Step 5: Agregar subsección "Animaciones" en `astro.config.mjs`**

En la sección `SwiftUI`, después del bloque de `Efectos` (añadido en Task 6), agregar:

```js
{
  label: 'Animaciones',
  translations: { en: 'Animations' },
  items: [
    { slug: 'swiftui/animaciones/keyframe' },
    { slug: 'swiftui/animaciones/phase-animator' },
  ],
},
```

- [ ] **Step 6: Verificar build**

```bash
cd /Users/fernando/Dev/SwiftUI-guide && npm run build 2>&1 | tail -20
```

Esperado: sin errores.

- [ ] **Step 7: Commit**

```bash
git add src/content/docs/swiftui/animaciones/ src/content/docs/en/swiftui/animaciones/ astro.config.mjs
git commit -m "content: add keyframeAnimator and PhaseAnimator pages (ES + EN)"
```

---

## Task 8: Nueva página — SwiftData (ES + EN)

**Files:**
- Create: `src/content/docs/guias-practicas/swiftdata.mdx`
- Create: `src/content/docs/en/guias-practicas/swiftdata.mdx`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Crear `src/content/docs/guias-practicas/swiftdata.mdx`**

```mdx
---
title: SwiftData
description: Persistencia de datos en SwiftUI con SwiftData — @Model, @Query, ModelContainer y relaciones entre modelos.
---

**SwiftData** (iOS 17+) es el framework de persistencia moderno de Apple. Reemplaza Core Data con una sintaxis declarativa basada en macros Swift.

## @Model

El macro `@Model` convierte una clase Swift en un modelo persistente. Todas sus propiedades almacenadas se persisten automáticamente.

```swift
import SwiftData

@Model
class Tarea {
    var titulo: String
    var completada: Bool
    var fecha: Date

    init(titulo: String) {
        self.titulo = titulo
        self.completada = false
        self.fecha = Date()
    }
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

## ModelContainer

`ModelContainer` es el contenedor de la base de datos. Se configura una vez en el punto de entrada de la app:

```swift
import SwiftUI
import SwiftData

@main
struct MiApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: Tarea.self)  // Configura el contenedor para Tarea
    }
}
```

Para múltiples modelos:

```swift
.modelContainer(for: [Tarea.self, Proyecto.self, Etiqueta.self])
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

## @Query

`@Query` carga datos desde el contenedor y actualiza la vista automáticamente cuando cambian:

```swift
import SwiftUI
import SwiftData

struct ListaTareasView: View {
    @Query var tareas: [Tarea]
    @Environment(\.modelContext) private var contexto

    var body: some View {
        List {
            ForEach(tareas) { tarea in
                HStack {
                    Image(systemName: tarea.completada ? "checkmark.circle.fill" : "circle")
                        .foregroundStyle(tarea.completada ? .green : .gray)
                    Text(tarea.titulo)
                        .strikethrough(tarea.completada)
                }
                .onTapGesture {
                    tarea.completada.toggle()
                }
            }
            .onDelete { indices in
                for indice in indices {
                    contexto.delete(tareas[indice])
                }
            }
        }
        .navigationTitle("Tareas")
    }
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

### Ordenar y filtrar con @Query

```swift
// Ordenar por fecha, más reciente primero
@Query(sort: \Tarea.fecha, order: .reverse) var tareas: [Tarea]

// Solo tareas pendientes
@Query(filter: #Predicate<Tarea> { !$0.completada }) var pendientes: [Tarea]

// Combinar filtro y orden
@Query(
    filter: #Predicate<Tarea> { !$0.completada },
    sort: \Tarea.fecha,
    order: .forward
) var pendientesOrdenadas: [Tarea]
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

## ModelContext — crear, modificar y eliminar

`ModelContext` es el objeto de trabajo para modificar datos:

```swift
struct NuevaTareaView: View {
    @Environment(\.modelContext) private var contexto
    @State private var titulo = ""
    @Environment(\.dismiss) private var cerrar

    var body: some View {
        NavigationStack {
            Form {
                TextField("Título de la tarea", text: $titulo)
            }
            .navigationTitle("Nueva tarea")
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Guardar") {
                        let nuevaTarea = Tarea(titulo: titulo)
                        contexto.insert(nuevaTarea)  // Insertar
                        cerrar()
                    }
                    .disabled(titulo.isEmpty)
                }
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancelar") { cerrar() }
                }
            }
        }
    }
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

## Relaciones entre modelos

SwiftData maneja relaciones con `@Relationship`:

```swift
import SwiftData

@Model
class Proyecto {
    var nombre: String
    @Relationship(deleteRule: .cascade) var tareas: [Tarea] = []

    init(nombre: String) {
        self.nombre = nombre
    }
}

@Model
class Tarea {
    var titulo: String
    var completada: Bool
    var proyecto: Proyecto?  // Relación inversa (opcional)

    init(titulo: String) {
        self.titulo = titulo
        self.completada = false
    }
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)

:::tip
`deleteRule: .cascade` elimina automáticamente todas las tareas cuando se elimina el proyecto. Otros valores: `.nullify` (pone la relación en nil), `.deny` (impide eliminar si hay relaciones).
:::

## Migración de esquema

Cuando cambias el modelo, SwiftData necesita migrar los datos existentes. Define un `VersionedSchema`:

```swift
import SwiftData

enum EsquemaTareasV1: VersionedSchema {
    static var versionIdentifier = Schema.Version(1, 0, 0)
    static var models: [any PersistentModel.Type] { [Tarea.self] }

    @Model
    class Tarea {
        var titulo: String
        init(titulo: String) { self.titulo = titulo }
    }
}

enum EsquemaTareasV2: VersionedSchema {
    static var versionIdentifier = Schema.Version(2, 0, 0)
    static var models: [any PersistentModel.Type] { [Tarea.self] }

    @Model
    class Tarea {
        var titulo: String
        var prioridad: Int = 0  // Nueva propiedad en V2
        init(titulo: String) { self.titulo = titulo }
    }
}

// Plan de migración de V1 a V2
enum PlanMigracion: SchemaMigrationPlan {
    static var schemas: [any VersionedSchema.Type] {
        [EsquemaTareasV1.self, EsquemaTareasV2.self]
    }
    static var stages: [MigrationStage] {
        [MigrationStage.lightweight(fromVersion: EsquemaTareasV1.self, toVersion: EsquemaTareasV2.self)]
    }
}
```

> [Probar en Swift Playground →](https://swiftfiddle.com/)
```

- [ ] **Step 2: Crear `src/content/docs/en/guias-practicas/swiftdata.mdx`**

```mdx
---
title: SwiftData
description: Data persistence in SwiftUI with SwiftData — @Model, @Query, ModelContainer and model relationships.
---

**SwiftData** (iOS 17+) is Apple's modern persistence framework. It replaces Core Data with a declarative syntax based on Swift macros.

## @Model

The `@Model` macro converts a Swift class into a persistent model. All its stored properties are automatically persisted.

```swift
import SwiftData

@Model
class Task {
    var title: String
    var completed: Bool
    var date: Date

    init(title: String) {
        self.title = title
        self.completed = false
        self.date = Date()
    }
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

## ModelContainer

`ModelContainer` is the database container. It's configured once at the app entry point:

```swift
import SwiftUI
import SwiftData

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: Task.self)  // Configure container for Task
    }
}
```

For multiple models:

```swift
.modelContainer(for: [Task.self, Project.self, Tag.self])
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

## @Query

`@Query` loads data from the container and automatically updates the view when it changes:

```swift
import SwiftUI
import SwiftData

struct TaskListView: View {
    @Query var tasks: [Task]
    @Environment(\.modelContext) private var context

    var body: some View {
        List {
            ForEach(tasks) { task in
                HStack {
                    Image(systemName: task.completed ? "checkmark.circle.fill" : "circle")
                        .foregroundStyle(task.completed ? .green : .gray)
                    Text(task.title)
                        .strikethrough(task.completed)
                }
                .onTapGesture {
                    task.completed.toggle()
                }
            }
            .onDelete { indices in
                for index in indices {
                    context.delete(tasks[index])
                }
            }
        }
        .navigationTitle("Tasks")
    }
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

### Sort and filter with @Query

```swift
// Sort by date, most recent first
@Query(sort: \Task.date, order: .reverse) var tasks: [Task]

// Only incomplete tasks
@Query(filter: #Predicate<Task> { !$0.completed }) var pending: [Task]

// Combine filter and sort
@Query(
    filter: #Predicate<Task> { !$0.completed },
    sort: \Task.date,
    order: .forward
) var sortedPending: [Task]
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

## ModelContext — create, modify and delete

`ModelContext` is the working object for modifying data:

```swift
struct NewTaskView: View {
    @Environment(\.modelContext) private var context
    @State private var title = ""
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Form {
                TextField("Task title", text: $title)
            }
            .navigationTitle("New task")
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        let newTask = Task(title: title)
                        context.insert(newTask)  // Insert
                        dismiss()
                    }
                    .disabled(title.isEmpty)
                }
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
            }
        }
    }
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

## Model relationships

SwiftData handles relationships with `@Relationship`:

```swift
import SwiftData

@Model
class Project {
    var name: String
    @Relationship(deleteRule: .cascade) var tasks: [Task] = []

    init(name: String) {
        self.name = name
    }
}

@Model
class Task {
    var title: String
    var completed: Bool
    var project: Project?  // Inverse relationship (optional)

    init(title: String) {
        self.title = title
        self.completed = false
    }
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)

:::tip
`deleteRule: .cascade` automatically deletes all tasks when the project is deleted. Other values: `.nullify` (sets the relationship to nil), `.deny` (prevents deletion if relationships exist).
:::

## Schema migration

When you change the model, SwiftData needs to migrate existing data. Define a `VersionedSchema`:

```swift
import SwiftData

enum TaskSchemaV1: VersionedSchema {
    static var versionIdentifier = Schema.Version(1, 0, 0)
    static var models: [any PersistentModel.Type] { [Task.self] }

    @Model
    class Task {
        var title: String
        init(title: String) { self.title = title }
    }
}

enum TaskSchemaV2: VersionedSchema {
    static var versionIdentifier = Schema.Version(2, 0, 0)
    static var models: [any PersistentModel.Type] { [Task.self] }

    @Model
    class Task {
        var title: String
        var priority: Int = 0  // New property in V2
        init(title: String) { self.title = title }
    }
}

// Migration plan from V1 to V2
enum MigrationPlan: SchemaMigrationPlan {
    static var schemas: [any VersionedSchema.Type] {
        [TaskSchemaV1.self, TaskSchemaV2.self]
    }
    static var stages: [MigrationStage] {
        [MigrationStage.lightweight(fromVersion: TaskSchemaV1.self, toVersion: TaskSchemaV2.self)]
    }
}
```

> [Try in Swift Playground →](https://swiftfiddle.com/)
```

- [ ] **Step 3: Agregar slug a `astro.config.mjs`**

En la sección `Guías Prácticas`, agregar al final:

```js
{ slug: 'guias-practicas/swiftdata' },
```

- [ ] **Step 4: Verificar build**

```bash
cd /Users/fernando/Dev/SwiftUI-guide && npm run build 2>&1 | tail -20
```

Esperado: sin errores.

- [ ] **Step 5: Commit**

```bash
git add src/content/docs/guias-practicas/swiftdata.mdx src/content/docs/en/guias-practicas/swiftdata.mdx astro.config.mjs
git commit -m "content: add SwiftData guide (ES + EN)"
```

---

## Task 9: Verificación final

- [ ] **Step 1: Build completo y limpio**

```bash
cd /Users/fernando/Dev/SwiftUI-guide && npm run build 2>&1
```

Esperado: `✓ Built in X.Xs` sin warnings ni errores. Si hay errores de slugs faltantes, verificar que todos los slugs en `astro.config.mjs` tienen su archivo `.mdx` correspondiente.

- [ ] **Step 2: Verificar que no quedan APIs deprecadas**

```bash
grep -rn "\.foregroundColor\|\.cornerRadius\b" /Users/fernando/Dev/SwiftUI-guide/src/content/docs/ --include="*.mdx"
```

Esperado: sin resultados.

- [ ] **Step 3: Verificar que no quedan referencias a Combine**

```bash
grep -rn "Combine\|combine" /Users/fernando/Dev/SwiftUI-guide/src/content/docs/ --include="*.mdx" | grep -v "legacy\|anterior\|compatibilidad"
```

Esperado: sin resultados (o solo menciones en contexto histórico).

- [ ] **Step 4: Verificar estructura de archivos nuevos**

```bash
find /Users/fernando/Dev/SwiftUI-guide/src/content/docs -name "*.mdx" | sort
```

Esperado: los 12 archivos nuevos aparecen en ES y EN.

- [ ] **Step 5: Commit final si hay cambios pendientes**

```bash
git status
git add -A
git commit -m "chore: final cleanup and verification for iOS 26 content update"
```
