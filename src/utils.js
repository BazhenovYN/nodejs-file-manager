import { resolve } from "node:path";
import { errors } from "./errors.js";

const DEFAULT_USER_NAME = "User";
const USER_NAME_PARAM = "--username";

export function getUserName() {
  const username = process.argv
    .slice(2)
    .find((arg) => arg.startsWith(USER_NAME_PARAM));
  if (!username) {
    return DEFAULT_USER_NAME;
  }
  return username.split("=")[1];
}

export function getCommand(line) {
  const pattern = /(?<command>^"[^"]*"|\S*) *(?<params>.*)?/;
  const match = line.match(pattern);
  return {
    name: match.groups.command,
    arguments: match.groups.params ? [...match.groups.params.split(" ")] : [],
  };
}

export function resolvePaths(location, ...paths) {
  return paths.map((path) => {
    if (!path) {
      throw new Error(errors.noParams);
    }
    return resolve(location.current, path);
  });
}
