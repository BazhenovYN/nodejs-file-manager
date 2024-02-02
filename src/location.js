import { access } from "node:fs/promises";
import path from "node:path";
import { homedir } from "node:os";

import { errors } from "./errors.js";

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
    const dir = path.resolve(this.#current, newPath);
    try {
      await access(dir);
      this.#current = dir;
    } catch (error) {
      throw new Error(errors.failed);
    }
  }
}
