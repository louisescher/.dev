import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import spectre from './package/src';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://louisescher.dev',
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
    expressiveCode(),
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
      // TODO: Re-enable later
      // giscus: {
      //   repository: 'louisescher/spectre',
      //   repositoryId: 'R_kgDONjm3ig',
      //   category: 'General',
      //   categoryId: 'DIC_kwDONjm3is4ClmBF',
      //   mapping: 'pathname',
      //   strict: true,
      //   reactionsEnabled: true,
      //   emitMetadata: false,
      //   lang: 'en',
      // }
    })
  ],
  adapter: node({
    mode: 'standalone'
  })
});