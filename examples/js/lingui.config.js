import { defineConfig } from '@lingui/cli'
import { createBabelExtractor } from '@lingui/cli/api/extractors/babel'

export default defineConfig({
  locales: ["en", "cs", "pseudo"],
  sourceLocale: 'en',
  // pseudoLocale: 'pseudo',
  pseudoLocale: {
    locale: 'pseudo',
    prepend: '⟦_',
    append: '_⟧',
    extend: 0.4,
  },
  compileNamespace: "es",
  fallbackLocales: {
    default: 'en',
  },
  catalogs: [
    {
      path: "./src/locale/{locale}/messages",
      include: ["./src"],
    },
  ],
})
