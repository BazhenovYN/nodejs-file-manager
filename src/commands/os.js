import os from "node:os";
import { errors } from "../errors.js";

const OS = {
  EOL: "--EOL",
  HOMEDIR: "--homedir",
  CPUS: "--cpus",
  USERNAME: "--username",
  ARCHITECTURE: "--architecture",
};

export function showOsInfo(param) {
  if (!param) {
    throw new Error(errors.noParams);
  }

  switch (param) {
    case OS.EOL:
      console.log(JSON.stringify(os.EOL));
      break;
    case OS.HOMEDIR:
      console.log(os.homedir());
      break;
    case OS.CPUS: {
      const cpuInfo = os.cpus().map((core) => ({
        model: core.model,
        speed: `${(core.speed / 1000).toFixed(1)} GHz`,
      }));
      console.log(`Total CPUs: ${cpuInfo.length}`);
      console.log(cpuInfo);
      break;
    }
    case OS.USERNAME:
      console.log(os.userInfo().username);
      break;
    case OS.ARCHITECTURE:
      console.log(os.arch());
      break;
    default:
      throw new Error(errors.unknownParams);
  }
}
