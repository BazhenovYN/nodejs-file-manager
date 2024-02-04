import { resolve } from "node:path";
import { errors } from "./errors.js";

export function getUserName() {
  const username = process.argv
    .slice(2)
    .find((arg) => arg.startsWith("--username="));
  if (!username) {
    return "User";
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
