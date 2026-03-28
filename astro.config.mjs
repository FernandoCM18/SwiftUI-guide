import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Guía Swift & SwiftUI',
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
          ],
        },
      ],
    }),
  ],
});
