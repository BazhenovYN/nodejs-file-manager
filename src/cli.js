import { showFileHash } from "./commands/hash.js";
import { getCommand } from "./utils.js";

export async function runCommand(location, line) {
  const command = getCommand(line);

  switch (command.name) {
    case "up":
      console.log("up command...");
      break;
    case "ls":
      console.log("ls command...");
      break;
    case "hash":
      await showFileHash(location, command.arguments[0]);
      break;
    default:
      console.log(`'${line.trim()}': command not found...`);
      break;
  }
}
