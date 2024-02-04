import { createReadStream, createWriteStream } from "node:fs";
import { rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";

import { errors } from "../errors.js";
import { resolvePaths } from "../utils.js";

export async function cat(location, file) {
  const [filePath] = resolvePaths(location, file);

  const readStream = createReadStream(filePath, { encoding: "utf8" });

  return new Promise((resolve, reject) => {
    readStream.on("data", (chunk) => {
      console.log(chunk);
    });

    readStream.on("end", () => {
      resolve();
    });

    readStream.on("error", (error) => {
      reject(error);
    });
  });
}

export async function add(location, file) {
  const [filePath] = resolvePaths(location, file);

  try {
    await writeFile(filePath, "", { flag: "wx" });
  } catch (error) {
    throw new Error(errors.failed);
  }
}

export async function remove(location, file) {
  const [filePath] = resolvePaths(location, file);

  try {
    await rm(filePath);
  } catch (error) {
    throw new Error(errors.failed);
  }
}

export async function rn(location, inputFile, outputFile) {
  const [inputFilePath, outputFilePath] = resolvePaths(
    location,
    inputFile,
    outputFile
  );

  try {
    await rename(inputFilePath, outputFilePath);
  } catch (error) {
    throw new Error(errors.failed);
  }
}

export async function copy(location, inputFile, outputFile) {
  const [inputFilePath, outputFilePath] = resolvePaths(
    location,
    inputFile,
    outputFile
  );

  const readStream = createReadStream(inputFilePath);
  const writeStream = createWriteStream(outputFilePath);

  try {
    await pipeline(readStream, writeStream);
  } catch (error) {
    throw new Error(errors.failed);
  }
}

export async function move(location, file, folder) {
  const [inputFilePath, outputFolderPath] = resolvePaths(
    location,
    file,
    folder
  );

  const outputFilePath = path.resolve(outputFolderPath, file);

  const readStream = createReadStream(inputFilePath);
  const writeStream = createWriteStream(outputFilePath);

  try {
    await pipeline(readStream, writeStream);
    await rm(inputFilePath);
  } catch (error) {
    throw new Error(errors.failed);
  }
}
