import readline from "node:readline";

import { runCommand } from "./cli.js";
import { getHomeDirectory } from "./location.js";
import { getUserName } from "./utils.js";

export function startFileManager() {
  const location = getHomeDirectory();
  const username = getUserName();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "$ ",
  });

  console.log(`Welcome to the File Manager, ${username}!`);
  location.log();
  rl.prompt();

  rl.on("line", async (input) => {
    if (input === ".exit") {
      rl.close();
    }
    try {
      await runCommand(location, input);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
    location.log();
    rl.prompt();
  }).on("close", () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  });
}
