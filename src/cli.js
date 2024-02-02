import { cat } from "./commands/files.js";
import { showFileHash } from "./commands/hash.js";
import { cd, up } from "./commands/navigation.js";
import { showOsInfo } from "./commands/os.js";
import { getCommand } from "./utils.js";

export async function runCommand(location, line) {
  const command = getCommand(line);

  switch (command.name) {
    case "up":
      up(location);
      break;
    case "cd":
      await cd(location, command.arguments[0]);
      break;
    case "ls":
      console.log("ls command...");
      break;
    case "cat":
      await cat(location, command.arguments[0]);
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
