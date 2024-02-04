import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

import { errors } from "../errors.js";
import { resolvePaths } from "../utils.js";

export async function showFileHash(location, file) {
  const [filePath] = resolvePaths(location, file);

  try {
    const hash = createHash("sha256");
    const data = await readFile(filePath);
    hash.update(data);
    console.log(`Hash: ${hash.digest("hex")}`);
  } catch (error) {
    throw new Error(errors.failed);
  }
}
