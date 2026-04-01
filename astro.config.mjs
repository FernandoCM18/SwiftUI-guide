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
      components: {
        MarkdownContent: './src/components/MarkdownContent.astro',
      },
      lastUpdated: true,
      head: [
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        { tag: 'meta', attrs: { property: 'og:site_name', content: 'Guía Swift & SwiftUI' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary' } },
        { tag: 'meta', attrs: { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' } },
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
          autogenerate: { directory: 'swift' },
        },
        {
          label: 'SwiftUI',
          translations: { en: 'SwiftUI' },
          items: [
            { slug: 'swiftui' },
            {
              label: 'Texto e Imágenes',
              translations: { en: 'Text & Images' },
              autogenerate: { directory: 'swiftui/texto' },
            },
            {
              label: 'Controles',
              translations: { en: 'Controls' },
              autogenerate: { directory: 'swiftui/controles' },
            },
            {
              label: 'Layout',
              translations: { en: 'Layout' },
              autogenerate: { directory: 'swiftui/layout' },
            },
            {
              label: 'Listas y Navegación',
              translations: { en: 'Lists & Navigation' },
              autogenerate: { directory: 'swiftui/listas-y-navegacion' },
            },
            {
              label: 'Presentación',
              translations: { en: 'Presentation' },
              autogenerate: { directory: 'swiftui/presentacion' },
            },
            {
              label: 'Estado',
              translations: { en: 'State' },
              autogenerate: { directory: 'swiftui/estado' },
            },
            {
              label: 'Efectos',
              translations: { en: 'Effects' },
              autogenerate: { directory: 'swiftui/efectos' },
            },
            {
              label: 'Animaciones',
              translations: { en: 'Animations' },
              autogenerate: { directory: 'swiftui/animaciones' },
            },
          ],
        },
        {
          label: 'Guías Prácticas',
          translations: { en: 'Practical Guides' },
          autogenerate: { directory: 'guias-practicas' },
        },
      ],
    }),
  ],
});
