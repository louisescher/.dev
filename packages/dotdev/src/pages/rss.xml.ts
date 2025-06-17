import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { name, openGraph } from "spectre:globals";

export async function GET(context: APIContext) {
	const posts = await getCollection('posts');

  return rss({
    title: name,
    description: openGraph.home.description!,
    site: context.site!,
    items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.createdAt,
			categories: post.data.tags.map((tag) => tag.id),
			link: `/blog/${post.id}/`,
			description: post.data.description
		})),
    customData: `<language>en-us</language>`,
  });
}