import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export default defineConfig({
  site: 'https://bencevrga.github.io',   // ← saját GH Pages gyökér
  base: '/katicainteriors/',             // ← repo neve per jellel
  outDir: 'dist',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(fileURLToPath(new URL('./src', import.meta.url))),
      },
    },
  },
});
