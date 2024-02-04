import { access } from "node:fs/promises";
import path from "node:path";
import { homedir } from "node:os";

import { errors } from "./errors.js";
import { resolvePaths } from "./utils.js";

export class Location {
  #current = homedir();

  get current() {
    return this.#current;
  }

  set current(newPath) {
    this.#current = newPath;
  }

  log() {
    console.log(`\nYou are currently in ${this.#current}`);
  }

  up() {
    this.#current = path.resolve(this.#current, "..");
  }

  async cd(newPath) {
    const [folderPath] = resolvePaths(this, newPath);

    try {
      await access(folderPath);
      this.#current = folderPath;
    } catch (error) {
      throw new Error(errors.failed);
    }
  }
}
