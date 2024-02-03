import { readFile, rename, rm, writeFile } from "node:fs/promises";
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

export async function add(location, file) {
  if (!file) {
    throw new Error(errors.noParams);
  }

  const filename = path.resolve(location.current, file);

  try {
    await writeFile(filename, "", { flag: "wx" });
  } catch (error) {
    throw new Error(errors.failed);
  }
}

export async function remove(location, file) {
  if (!file) {
    throw new Error(errors.noParams);
  }

  const filename = path.resolve(location.current, file);

  try {
    await rm(filename);
  } catch (error) {
    throw new Error(errors.failed);
  }
}

export async function rn(location, inputFile, outputFile) {
  if (!inputFile || !outputFile) {
    throw new Error(errors.noParams);
  }

  const inputFilePath = path.resolve(location.current, inputFile);
  const outputFilePath = path.resolve(location.current, outputFile);

  try {
    await rename(inputFilePath, outputFilePath);
  } catch (error) {
    throw new Error(errors.failed);
  }
}
