import { homedir } from "node:os";

export class Location {
  #path;

  constructor(path) {
    if (path) {
      this.#path = path;
    } else {
      this.#path = import.meta.dirname;
    }
  }

  get() {
    return this.#path;
  }

  set(path) {
    this.#path = path;
  }

  log() {
    console.log(`\nYou are currently in ${this.#path}`);
  }
}

export function getHomeDirectory() {
  return new Location(homedir());
}
