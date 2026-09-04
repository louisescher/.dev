#!/usr/bin/env node
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import {
	SLUG_PATTERN,
	manifestPath,
	readManifest,
	rootDir,
	talksDir,
} from "./talks.mjs";

const { flags, positionals } = parseArgs(process.argv.slice(2));
const [id] = positionals;

if (!id) {
	console.error(
		'Usage: pnpm talk:new <id> [--title "..."] [--description "..."] [--event "..."] [--location "..."] [--year 2026] [--date 2026-02-20]',
	);
	process.exit(1);
}

if (!SLUG_PATTERN.test(id)) {
	console.error(
		`"${id}" is not a usable id. Use lowercase letters, digits and dashes: my-talk`,
	);
	process.exit(1);
}

const dir = join(talksDir, id);
if (existsSync(dir)) {
	console.error(`packages/talks/${id} already exists.`);
	process.exit(1);
}

const manifest = await readManifest();
if (manifest.some((entry) => entry.id === id)) {
	console.error(`talks.json already has an entry with the id "${id}".`);
	process.exit(1);
}

const title = flags.title ?? titleCase(id);
const year = Number(flags.year ?? new Date().getFullYear());

await mkdir(join(dir, "public"), { recursive: true });

await writeFile(
	join(dir, "package.json"),
	`${JSON.stringify(
		{
			name: `@talks/${id}`,
			type: "module",
			private: true,
			dependencies: {
				"@slidev/cli": "catalog:",
				"@slidev/theme-default": "catalog:",
				"@slidev/theme-seriph": "catalog:",
				vue: "catalog:",
			},
		},
		null,
		"\t",
	)}\n`,
	"utf8",
);

await writeFile(
	join(dir, "slides.md"),
	`---
theme: default
title: ${title}
transition: fade
layout: cover
---

# ${title}

${[flags.event, flags.location, year].filter(Boolean).join(" / ")}

---

## First slide

Write the talk here. Slidev docs live at https://sli.dev.
`,
	"utf8",
);

await writeFile(join(dir, "public", ".gitkeep"), "", "utf8");

const entry = {
	id,
	title,
	description: flags.description ?? "",
	event: flags.event ?? "",
	location: flags.location ?? "",
	year,
};
if (flags.date) entry.date = flags.date;

manifest.push(entry);
await writeFile(
	manifestPath,
	`${JSON.stringify(manifest, null, "\t")}\n`,
	"utf8",
);

console.log(`Created ${relative(rootDir, dir)}/`);
console.log(`Added "${id}" to ${relative(rootDir, manifestPath)}`);
console.log("\nNext:");
console.log("  pnpm install");
console.log(`  pnpm talk:dev ${id}`);
console.log(`\nIt will be served at /talks/${id}/ and listed on /talks.`);

function parseArgs(list) {
	const flags = {};
	const positionals = [];
	for (let index = 0; index < list.length; index += 1) {
		const arg = list[index];
		if (!arg.startsWith("--")) {
			positionals.push(arg);
			continue;
		}
		const [name, inline] = arg.slice(2).split("=");
		if (inline !== undefined) {
			flags[name] = inline;
			continue;
		}
		const next = list[index + 1];
		if (next !== undefined && !next.startsWith("--")) {
			flags[name] = next;
			index += 1;
		} else {
			flags[name] = "true";
		}
	}
	return { flags, positionals };
}

function titleCase(value) {
	return value
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}
