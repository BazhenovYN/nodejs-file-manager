import { readFile } from "node:fs/promises";
import path from "node:path";

import { errors } from "../errors.js";

export async function cat(location, file) {
  if (!file) {
    throw new Error(errors.noParams);
  }

  const filePath = path.resolve(location.current, file);
  const contents = await readFile(filePath, { encoding: "utf8" });
  console.log(contents);
}
