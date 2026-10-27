import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import spectre from "./package/src";

// https://astro.build/config
export default defineConfig({
	site: process.env.DOKPLOY_DEPLOY_URL
		? `https://${process.env.DOKPLOY_DEPLOY_URL}`
		: "https://lou.gg",
	output: "static",
	server: {
		host: "0.0.0.0",
		port: 4321,
	},
	redirects: {
		"/you-dont-have-a-bluesky-account": "/blog/you-dont-have-a-bluesky-account"
	},
	vite: {
		server: {
			host: "0.0.0.0",
			port: 4321,
		},
	},
	integrations: [
		expressiveCode({
			themes: ["github-dark", "github-dark"],
		}),
		mdx(),
		sitemap(),
		spectre({
			name: "Louis Escher",
			openGraph: {
				home: {
					title: "Louis Escher",
					description: "Welcome to my corner of the internet.",
				},
				blog: {
					title: "Blog",
				},
				projects: {
					title: "Projects",
				},
			},
		}),
	],
	adapter: node({
		mode: "standalone",
	}),
});
