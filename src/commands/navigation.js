import { readdir } from "node:fs/promises";
import { errors } from "../errors.js";

export function up(location) {
  location.up();
}

export async function cd(location, newPath) {
  if (!newPath) {
    throw new Error(errors.noParams);
  }

  await location.cd(newPath);
}

export async function ls(location) {
  const list = await readdir(location.current, { withFileTypes: true });

  if (list.length === 0) {
    console.log("The current directory is empty");
    return;
  }

  const directories = list
    .filter((item) => item.isDirectory())
    .map((item) => ({ name: item.name, type: "directory" }));
  const files = list
    .filter((item) => !item.isDirectory())
    .map((item) => ({ name: item.name, type: "file" }));

  const results = [...directories, ...files];

  console.table(results);
}
