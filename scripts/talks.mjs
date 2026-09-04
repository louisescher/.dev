import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const rootDir = fileURLToPath(new URL("..", import.meta.url));
export const talksDir = join(rootDir, "packages/talks");
export const manifestPath = join(
	rootDir,
	"packages/dotdev/src/content/talks.json",
);
export const outRoot = join(rootDir, "packages/dotdev/public/talks");

export const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

export async function readManifest() {
	return JSON.parse(await readFile(manifestPath, "utf8"));
}

export async function loadTalks() {
	const entries = await readManifest();

	return entries
		.map((entry) => ({
			...entry,
			dir: join(talksDir, entry.id),
			base: `/talks/${entry.id}/`,
			outDir: join(outRoot, entry.id),
		}))
		.sort(newestFirst);
}

export async function selectTalks(ids) {
	const talks = await loadTalks();
	const known = new Map(talks.map((talk) => [talk.id, talk]));

	const missing = talks.filter((talk) => !existsSync(talk.dir));
	if (missing.length > 0) {
		console.error(
			`talks.json lists ${missing.map((talk) => talk.id).join(", ")}, but packages/talks holds no such folder.`,
		);
		process.exit(1);
	}

	if (ids.length === 0) return talks;

	const unknown = ids.filter((id) => !known.has(id));
	if (unknown.length > 0) {
		console.error(
			`Unknown talk${unknown.length === 1 ? "" : "s"}: ${unknown.join(", ")}`,
		);
		console.error(`Available: ${[...known.keys()].join(", ") || "(none)"}`);
		process.exit(1);
	}

	return ids.map((id) => known.get(id));
}

export function formatTalkList(talks) {
	const width = Math.max(...talks.map((talk) => talk.id.length), 0);
	return talks
		.map((talk) => `  ${talk.id.padEnd(width)}  ${talk.title}`)
		.join("\n");
}

function newestFirst(a, b) {
	const left = a.date ?? String(a.year);
	const right = b.date ?? String(b.year);
	if (left !== right) return left < right ? 1 : -1;
	return a.title.localeCompare(b.title);
}
