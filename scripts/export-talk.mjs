#!/usr/bin/env node
import { runSlidev } from "./slidev.mjs";
import { formatTalkList, loadTalks, selectTalks } from "./talks.mjs";

const [id, ...rest] = process.argv.slice(2);

if (!id) {
	const talks = await loadTalks();
	console.error("Usage: pnpm talk:export <id> [slidev export options]\n");
	console.error(
		talks.length > 0 ? `Talks:\n${formatTalkList(talks)}` : "No talks listed.",
	);
	process.exit(1);
}

const [talk] = await selectTalks([id]);
await runSlidev(talk, ["export", ...rest]);
