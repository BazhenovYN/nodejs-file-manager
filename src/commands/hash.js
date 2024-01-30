import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import path from "node:path";

import { errors } from "../errors.js";

export async function showFileHash(location, file) {
  if (!file) {
    console.log(errors.nofile);
  }

  const filename = path.join(location.get(), file);

  try {
    await access(filename);
    const hash = createHash("sha256");
    const data = await readFile(filename);
    hash.update(data);
    console.log(`Hash: ${hash.digest("hex")}`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(errors.fileNotFound);
    } else {
      throw error;
    }
  }
}
