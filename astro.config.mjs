import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  site: 'https://fernandocm18.github.io/SwiftUI-guide',
  base: '/SwiftUI-guide',
  vite: {
    resolve: {
      alias: {
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      },
    },
  },
  integrations: [
    starlight({
      title: 'Guía Swift & SwiftUI',
      customCss: ['./src/styles/code-appearance.css', './src/styles/reading-progress.css'],
      lastUpdated: true,
      head: [
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        { tag: 'meta', attrs: { property: 'og:site_name', content: 'Guía Swift & SwiftUI' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary' } },
        { tag: 'meta', attrs: { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' } },
        { tag: 'script', attrs: { src: '/SwiftUI-guide/reading-progress.js', defer: true } },
      ],
      defaultLocale: 'root',
      locales: {
        root: { label: 'Español', lang: 'es' },
        en: { label: 'English', lang: 'en' },
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/FernandoCM18/SwiftUI-guide' },
      ],
      sidebar: [
        {
          label: 'Swift',
          translations: { en: 'Swift' },
          items: [
            { slug: 'swift' },
            { slug: 'swift/variables-y-constantes' },
            { slug: 'swift/tipos-de-datos' },
            { slug: 'swift/flujo-de-control' },
            { slug: 'swift/funciones' },
            { slug: 'swift/concurrencia' },
            { slug: 'swift/structs-y-clases' },
            { slug: 'swift/opcionales' },
            { slug: 'swift/protocolos' },
            { slug: 'swift/enumeraciones' },
          ],
        },
        {
          label: 'SwiftUI',
          translations: { en: 'SwiftUI' },
          items: [
            { slug: 'swiftui' },
            {
              label: 'Texto e Imágenes',
              translations: { en: 'Text & Images' },
              items: [
                { slug: 'swiftui/texto/text' },
                { slug: 'swiftui/texto/label' },
                { slug: 'swiftui/texto/image' },
              ],
            },
            {
              label: 'Controles',
              translations: { en: 'Controls' },
              items: [
                { slug: 'swiftui/controles/button' },
                { slug: 'swiftui/controles/toggle' },
                { slug: 'swiftui/controles/slider' },
                { slug: 'swiftui/controles/picker' },
                { slug: 'swiftui/controles/textfield' },
              ],
            },
            {
              label: 'Layout',
              translations: { en: 'Layout' },
              items: [
                { slug: 'swiftui/layout/vstack' },
                { slug: 'swiftui/layout/hstack' },
                { slug: 'swiftui/layout/zstack' },
              ],
            },
            {
              label: 'Listas y Navegación',
              translations: { en: 'Lists & Navigation' },
              items: [
                { slug: 'swiftui/listas-y-navegacion/list' },
                { slug: 'swiftui/listas-y-navegacion/scrollview' },
                { slug: 'swiftui/listas-y-navegacion/navigationstack' },
              ],
            },
            {
              label: 'Presentación',
              translations: { en: 'Presentation' },
              items: [
                { slug: 'swiftui/presentacion/sheet' },
                { slug: 'swiftui/presentacion/alert' },
                { slug: 'swiftui/presentacion/tabview' },
              ],
            },
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
          ],
        },
{
          label: 'Guías Prácticas',
          translations: { en: 'Practical Guides' },
          items: [
            { slug: 'guias-practicas/viewmodels-mvvm' },
            { slug: 'guias-practicas/conectar-api' },
            { slug: 'guias-practicas/assets-imagenes-colores' },
            { slug: 'guias-practicas/arquitectura-proyecto' },
            { slug: 'guias-practicas/swiftdata' },
          ],
        },
      ],
    }),
  ],
});
