import { spawn } from "node:child_process";

export function runSlidev(talk, args) {
	return new Promise((resolve, reject) => {
		const child = spawn("pnpm", ["exec", "slidev", ...args], {
			cwd: talk.dir,
			stdio: "inherit",
		});

		child.on("error", reject);
		child.on("exit", (code, signal) => {
			if (signal) {
				reject(
					new Error(
						`slidev ${args[0] ?? "dev"} for ${talk.id} was killed by ${signal}`,
					),
				);
			} else if (code !== 0) {
				reject(
					new Error(
						`slidev ${args[0] ?? "dev"} for ${talk.id} exited with code ${code}`,
					),
				);
			} else {
				resolve();
			}
		});
	});
}
