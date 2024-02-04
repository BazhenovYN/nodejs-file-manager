import { readdir } from "node:fs/promises";

const TYPE = {
  DIRECTORY: "directory",
  FILE: "file",
};

export function up(location) {
  location.up();
}

export async function cd(location, newPath) {
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
    .map((item) => ({ name: item.name, type: TYPE.DIRECTORY }));
  const files = list
    .filter((item) => !item.isDirectory())
    .map((item) => ({ name: item.name, type: TYPE.FILE }));

  const results = [...directories, ...files];

  console.table(results);
}
