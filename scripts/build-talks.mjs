#!/usr/bin/env node
import { mkdir, rm } from "node:fs/promises";
import { relative } from "node:path";
import { runSlidev } from "./slidev.mjs";
import { outRoot, rootDir, selectTalks } from "./talks.mjs";

const ids = process.argv.slice(2);
const talks = await selectTalks(ids);

if (talks.length === 0) {
	console.log("No talks listed in packages/dotdev/src/content/talks.json.");
	process.exit(0);
}

if (ids.length === 0) {
	await rm(outRoot, { recursive: true, force: true });
} else {
	for (const talk of talks) {
		await rm(talk.outDir, { recursive: true, force: true });
	}
}
await mkdir(outRoot, { recursive: true });

for (const talk of talks) {
	console.log(`\n> building ${talk.id} at ${talk.base}`);
	await runSlidev(talk, [
		"build",
		"--base",
		talk.base,
		"--router-mode",
		"hash",
		"--out",
		talk.outDir,
	]);
}

console.log(
	`\n> ${relative(rootDir, outRoot)}/ holds ${talks.length} deck${talks.length === 1 ? "" : "s"}: ${talks.map((talk) => talk.base).join(" ")}`,
);
