import { unified, type RemarkPlugins } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import { customKatexMacroPlugin, replaceMathNodeDev } from './scripts/math';
import { handleAlertNode } from './scripts/md';
import { pagefindBuilderIntegration, pagefindServerDev } from './scripts/pagefind';

const isProd = process.env.NODE_ENV === 'production';

const remarkPlugins: RemarkPlugins = [remarkMath, () => handleAlertNode];
export default defineConfig({
  site: 'https://sherlockdoyle.github.io/wlog',
  base: '/wlog/',
  integrations: [mdx(), sitemap(), svelte(), pagefindBuilderIntegration()],
  markdown: {
    processor: unified({
      remarkPlugins: isProd ? remarkPlugins : [...remarkPlugins, () => replaceMathNodeDev],
      rehypePlugins: isProd ? [customKatexMacroPlugin] : undefined,
    }),
  },
  vite: { plugins: [pagefindServerDev()] },
});
