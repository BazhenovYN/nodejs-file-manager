import { compress, decompress } from "./commands/brotli.js";
import { add, cat, copy, remove, rn } from "./commands/files.js";
import { showFileHash } from "./commands/hash.js";
import { cd, ls, up } from "./commands/navigation.js";
import { showOsInfo } from "./commands/os.js";
import { getCommand } from "./utils.js";

import { errors } from "./errors.js";

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
      await ls(location);
      break;
    case "cat":
      await cat(location, command.arguments[0]);
      break;
    case "add":
      await add(location, command.arguments[0]);
      break;
    case "rn":
      await rn(location, command.arguments[0], command.arguments[1]);
      break;
    case "cp":
      await copy(location, command.arguments[0], command.arguments[1]);
      break;
    case "rm":
      await remove(location, command.arguments[0]);
      break;
    case "os":
      showOsInfo(command.arguments[0]);
      break;
    case "hash":
      await showFileHash(location, command.arguments[0]);
      break;
    case "compress":
      await compress(location, command.arguments[0], command.arguments[1]);
      break;
    case "decompress":
      await decompress(location, command.arguments[0], command.arguments[1]);
      break;
    default:
      throw new Error(errors.unknownCommand);
  }
}
