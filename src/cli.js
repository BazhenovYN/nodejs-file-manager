import { showFileHash } from "./commands/hash.js";
import { showOsInfo } from "./commands/os.js";
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
    case "os":
      showOsInfo(command.arguments[0]);
      break;
    case "hash":
      await showFileHash(location, command.arguments[0]);
      break;
    default:
      throw new Error(errors.unknownCommand);
  }
}
