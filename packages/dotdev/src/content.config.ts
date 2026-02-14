import { defineCollection, reference } from "astro:content";
import type { icons as lucideIcons } from "@iconify-json/lucide/icons.json";
import type { icons as simpleIcons } from "@iconify-json/simple-icons/icons.json";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const other = defineCollection({
	loader: glob({ base: "src/content/other", pattern: "**/*.{md,mdx}" }),
});

const lucideIconSchema = z.object({
	type: z.literal("lucide"),
	name: z.custom<keyof typeof lucideIcons>(),
});

const simpleIconSchema = z.object({
	type: z.literal("simple-icons"),
	name: z.custom<keyof typeof simpleIcons>(),
});

const quickInfo = defineCollection({
	loader: file("src/content/info.json"),
	schema: z.object({
		id: z.string(),
		icon: z.union([lucideIconSchema, simpleIconSchema]),
		text: z.string(),
	}),
});

const socials = defineCollection({
	loader: file("src/content/socials.json"),
	schema: z.object({
		id: z.string(),
		icon: z.union([lucideIconSchema, simpleIconSchema]),
		text: z.string(),
		link: z.url(),
	}),
});

const workExperience = defineCollection({
	loader: file("src/content/work.json"),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		company: z.string(),
		duration: z.string(),
		description: z.string(),
		href: z.string().optional(),
	}),
});

const tags = defineCollection({
	loader: file("src/content/tags.json"),
	schema: z.object({
		id: z.string(),
	}),
});

const posts = defineCollection({
	loader: glob({ base: "src/content/posts", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			createdAt: z.coerce.date(),
			updatedAt: z.coerce.date().optional(),
			description: z.string(),
			tags: z.array(reference("tags")),
			draft: z.boolean().optional().default(false),
			image: image(),
		}),
});

const reviews = defineCollection({
	loader: glob({ base: "src/content/reviews", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			summary: z.string(),
			spoilers: z.boolean().optional().default(false),
			draft: z.boolean().optional().default(false),
			rating: z.number(),
			platform: z.string(),
			grid: image(),
			hero: image(),
			date: z.date(),
		}),
});

const projects = defineCollection({
	loader: glob({ base: "src/content/projects", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			image: image(),
			link: z.url().optional(),
			info: z.array(
				z.object({
					text: z.string(),
					icon: z.union([lucideIconSchema, simpleIconSchema]),
					link: z.url().optional(),
				}),
			),
		}),
});

const music = defineCollection({
	loader: file("src/content/music.json"),
	schema: ({ image }) =>
		z.object({
			id: z.string(),
			path: z.string(),
			duration: z.number(),
			cover: image(),
			title: z.string(),
			description: z.string(),
			metadata: z.record(
				z.string(),
				z.union([
					z.string(),
					z.object({
						text: z.string(),
						href: z.url(),
					}),
				]),
			),
		}),
});

export const collections = {
	tags,
	posts,
	projects,
	other,
	quickInfo,
	socials,
	workExperience,
	music,
	reviews,
};
