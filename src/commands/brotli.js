import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream/promises";

import { errors } from "../errors.js";
import { resolvePaths } from "../utils.js";

export async function compress(location, inputFile, outputFile) {
  const [inputFilePath, outputFilePath] = resolvePaths(
    location,
    inputFile,
    outputFile
  );

  const readStream = createReadStream(inputFilePath);
  const brotliStream = createBrotliCompress();
  const writeStream = createWriteStream(outputFilePath);

  try {
    await pipeline(readStream, brotliStream, writeStream);
  } catch (error) {
    throw new Error(errors.failed);
  }
}

export async function decompress(location, inputFile, outputFile) {
  const [inputFilePath, outputFilePath] = resolvePaths(
    location,
    inputFile,
    outputFile
  );

  const readStream = createReadStream(inputFilePath);
  const brotliStream = createBrotliDecompress();
  const writeStream = createWriteStream(outputFilePath);

  try {
    await pipeline(readStream, brotliStream, writeStream);
  } catch (error) {
    throw new Error(errors.failed);
  }
}
