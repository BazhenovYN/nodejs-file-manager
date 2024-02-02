import { readFile } from "node:fs/promises";
import path from "node:path";

export async function cat(location, file) {
  const filePath = path.resolve(location.current, file);
  const contents = await readFile(filePath, { encoding: "utf8" });
  console.log(contents);
}
