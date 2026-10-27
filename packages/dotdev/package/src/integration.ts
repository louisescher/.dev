import type { AstroIntegration } from "astro";
import { z } from "astro/zod";
import { viteVirtualModulePluginBuilder } from "./utils/virtual-module-plugin-builder";

const openGraphOptionsSchema = z.object({
	/**
	 * The title of the page.
	 */
	title: z.string(),
	/**
	 * The description of the page. Optional.
	 */
	description: z.string().optional(),
});

export const optionsSchema = z.object({
	/**
	 * The name that should be displayed on the main page.
	 */
	name: z.string(),
	/**
	 * The theme color of the site. Optional. Defaults to `#8c5cf5`.
	 */
	themeColor: z.string().optional(),
	/**
	 * The Twitter handle of the site. Used for Twitter meta tags. Optional.
	 */
	twitterHandle: z.string().optional(),
	/**
	 * Open Graph meta tags for various pages.
	 */
	openGraph: z.object({
		/**
		 * Open Graph meta tags for the home page.
		 */
		home: openGraphOptionsSchema,
		/**
		 * Open Graph meta tags for the blog page.
		 */
		blog: openGraphOptionsSchema,
		/**
		 * Open Graph meta tags for the projects page.
		 */
		projects: openGraphOptionsSchema,
	}),
});

export default function integration(
	options: z.infer<typeof optionsSchema>,
): AstroIntegration {
	const validatedOptions = optionsSchema.parse(options);

	const globals = viteVirtualModulePluginBuilder(
		"spectre:globals",
		"spectre-theme-globals",
		`
    export const name = ${JSON.stringify(validatedOptions.name)};
    export const themeColor = ${JSON.stringify(validatedOptions.themeColor ?? "#8c5cf5")};
    export const twitterHandle = ${JSON.stringify(validatedOptions.twitterHandle)};
    export const openGraph = {
      home: ${JSON.stringify(validatedOptions.openGraph.home)},
      blog: ${JSON.stringify(validatedOptions.openGraph.blog)},
      projects: ${JSON.stringify(validatedOptions.openGraph.projects)},
    };
  `,
	);

	return {
		name: "spectre-theme",
		hooks: {
			"astro:config:setup": ({ updateConfig }) => {
				updateConfig({
					vite: {
						plugins: [globals()],
					},
				});
			},
		},
	};
}
