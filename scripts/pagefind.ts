import type { AstroIntegration } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { load } from 'js-yaml';
import { glob, readFile, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { close, createIndex } from 'pagefind';
import { type PluginOption } from 'vite';
import { getPostPath } from '../src/utils/post';

function createInjectionEl(type: string, key: string, value: string) {
  return `<span data-pagefind-${type}="${key}:${value.replace(/"/g, '&quot;')}" />`;
}

// I only want to index the posts, but without adding extra pagefind data attributes. Hence, all these!
export function pagefindBuilderIntegration(): AstroIntegration {
  return {
    name: 'astro-pagefind-builder',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const { index, errors } = await createIndex({
          rootSelector: '.post-content',
          excludeSelectors: ['.katex', '.katex-display'],
        });
        if (!index) {
          logger.error('Failed to create pagefind index');
          for (const error of errors) logger.error(error);
          return;
        }

        for await (const filePath of glob('src/content/**/index.{md,mdx}')) {
          const content = await readFile(filePath, 'utf-8'),
            frontmatter = load(content.split('---')[1]) as CollectionEntry<'blog'>['data'];
          const slug = getPostPath(frontmatter),
            htmlPath = path.join(outDir, slug, 'index.html'),
            htmlContent = await readFile(htmlPath, 'utf-8');

          const injections: string[] = [
            createInjectionEl('meta', 'title', frontmatter.title),
            createInjectionEl('meta', 'summary', frontmatter.summary),
            createInjectionEl('filter', 'level', frontmatter.level.toString()),
          ];
          for (const tag of frontmatter.tags) injections.push(createInjectionEl('filter', 'tags', tag));

          await index.addHTMLFile({
            content: htmlContent.replace('</div></article>', `<div>${injections.join('')}</div></div></article>`),
            url: slug,
          });
        }

        await index.writeFiles({ outputPath: path.join(outDir, 'pagefind') });
        await close();

        // don't want to bloat deployment
        if (process.env.CI) {
          const targets = glob([`${outDir}pagefind/*ui.*`, `${outDir}pagefind/pagefind-highlight.js`]);
          for await (const file of targets) await rm(file);
        }
      },
    },
  };
}

export function pagefindServerDev(): PluginOption {
  return {
    name: 'pagefind-server',
    configureServer(server) {
      server.middlewares.use('/pagefind', async (req, res, next) => {
        const cleanUrl = req.url!.split('?')[0];
        const file = path.join(process.cwd(), 'dist/pagefind', cleanUrl);

        if ((await stat(file)).isFile()) {
          const ext = path.extname(file);
          const contentTypes: Record<string, string> = {
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.wasm': 'application/wasm',
          };

          res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream');
          return res.end(await readFile(file));
        }
        next();
      });
    },
  };
}
