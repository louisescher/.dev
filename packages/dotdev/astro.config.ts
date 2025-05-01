import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import spectre from './package/src';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://lou.gg',
  output: 'static',
  server: {
    host: '0.0.0.0',
    port: 4321
  },
  vite: {
    server: {
      host: '0.0.0.0',
      port: 4321
    }
  },
  integrations: [
    expressiveCode({
      themes: ['github-dark', 'github-dark']
    }),
    mdx(),
    sitemap(),
    spectre({
      name: 'Louis Escher',
      openGraph: {
        home: {
          title: 'Louis Escher',
          description: 'Welcome to my corner of the internet.'
        },
        blog: {
          title: 'Blog',
        },
        projects: {
          title: 'Projects'
        }
      },
      giscus: {
        repository: 'louisescher/.dev',
        repositoryId: 'R_kgDONmSE_w',
        category: 'General',
        categoryId: 'DIC_kwDONmSE_84Cl0fT',
        mapping: 'pathname',
        strict: true,
        reactionsEnabled: true,
        emitMetadata: false,
        commentsInput: 'top',
        lang: 'en',
      }
    })
  ],
  adapter: node({
    mode: 'standalone'
  })
});