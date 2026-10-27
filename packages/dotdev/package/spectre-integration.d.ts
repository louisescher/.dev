interface OpenGraphInfo {
	/**
	 * The title of the page.
	 */
	title: string;
	/**
	 * The description of the page.
	 */
	description?: string;
}

interface OpenGraph {
	/*
	 * Data for the home page.
	 */
	home: OpenGraphInfo;
	/**
	 * Data for the blog page.
	 */
	blog: OpenGraphInfo;
	/**
	 * Data for the projects page.
	 */
	projects: OpenGraphInfo;
}

declare module "spectre:globals" {
	/**
	 * The name that should be displayed on the main page.
	 */
	export const name: string;
	/**
	 * The theme color of the site.
	 */
	export const themeColor: string;
	/**
	 * The Twitter handle of the site.
	 */
	export const twitterHandle: string;
	/**
	 * Open Graph meta tags for various pages.
	 */
	export const openGraph: OpenGraph;
}
