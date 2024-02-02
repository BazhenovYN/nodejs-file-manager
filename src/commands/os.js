import os from "node:os";
import { errors } from "../errors.js";

export function showOsInfo(param) {
  if (!param) {
    throw new Error(errors.noParams);
  }

  switch (param) {
    case "--EOL":
      console.log(JSON.stringify(os.EOL));
      break;
    case "--homedir":
      console.log(os.homedir());
      break;
    case "--cpus": {
      const cpuInfo = os.cpus().map((core) => ({
        model: core.model,
        speed: `${(core.speed / 1000).toFixed(1)} GHz`,
      }));
      console.log(`Total CPUs: ${cpuInfo.length}`);
      console.log(cpuInfo);
      break;
    }
    case "--username":
      console.log(os.userInfo().username);
      break;
    case "--architecture":
      console.log(os.arch());
      break;
    default:
      throw new Error(errors.unknownParams);
  }
}
