import { compress, decompress } from "./commands/brotli.js";
import { add, cat, copy, move, remove, rn } from "./commands/files.js";
import { showFileHash } from "./commands/hash.js";
import { cd, ls, up } from "./commands/navigation.js";
import { showOsInfo } from "./commands/os.js";
import { getCommand } from "./utils.js";

import { errors } from "./errors.js";

const COMMAND = {
  UP: "up",
  CD: "cd",
  LIST: "ls",
  CAT: "cat",
  ADD: "add",
  RENAME: "rn",
  COPY: "cp",
  MOVE: "mv",
  REMOVE: "rm",
  OS: "os",
  HASH: "hash",
  COMPRESS: "compress",
  DECOMPRESS: "decompress",
};

export async function runCommand(location, line) {
  const command = getCommand(line);

  switch (command.name) {
    case COMMAND.UP:
      up(location);
      break;
    case COMMAND.CD:
      await cd(location, command.arguments[0]);
      break;
    case COMMAND.LIST:
      await ls(location);
      break;
    case COMMAND.CAT:
      await cat(location, command.arguments[0]);
      break;
    case COMMAND.ADD:
      await add(location, command.arguments[0]);
      break;
    case COMMAND.RENAME:
      await rn(location, command.arguments[0], command.arguments[1]);
      break;
    case COMMAND.COPY:
      await copy(location, command.arguments[0], command.arguments[1]);
      break;
    case COMMAND.MOVE:
      await move(location, command.arguments[0], command.arguments[1]);
      break;
    case COMMAND.REMOVE:
      await remove(location, command.arguments[0]);
      break;
    case COMMAND.OS:
      showOsInfo(command.arguments[0]);
      break;
    case COMMAND.HASH:
      await showFileHash(location, command.arguments[0]);
      break;
    case COMMAND.COMPRESS:
      await compress(location, command.arguments[0], command.arguments[1]);
      break;
    case COMMAND.DECOMPRESS:
      await decompress(location, command.arguments[0], command.arguments[1]);
      break;
    default:
      throw new Error(errors.unknownCommand);
  }
}
