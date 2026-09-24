import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getPostPath } from '../utils/post';

export async function GET({ site }: APIContext) {
  const posts = await getCollection('blog');
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: site!,
    items: posts.map(post => ({ ...post.data, link: `${import.meta.env.BASE_URL}${getPostPath(post.data)}/` })),
  });
}
