import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { errors } from "../errors.js";

export async function showFileHash(location, file) {
  if (!file) {
    throw new Error(errors.noParams);
  }

  const filename = path.join(location.current, file);

  try {
    const hash = createHash("sha256");
    const data = await readFile(filename);
    hash.update(data);
    console.log(`Hash: ${hash.digest("hex")}`);
  } catch (error) {
    throw new Error(errors.failed);
  }
}
