import readline from "node:readline";

import { runCommand } from "./cli.js";
import { Location } from "./location.js";
import { getUserName } from "./utils.js";

const EXIT_COMMAND = ".exit";

export function startFileManager() {
  const location = new Location();
  const username = getUserName();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  const prompt = () => {
    location.log();
    rl.prompt();
  };

  console.log(`Welcome to the File Manager, ${username}!`);
  prompt();

  rl.on("line", async (input) => {
    if (input.trim() === EXIT_COMMAND) {
      rl.close();
    }
    try {
      await runCommand(location, input);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
    prompt();
  }).on("close", () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  });
}
