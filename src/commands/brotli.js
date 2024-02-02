import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream/promises";
import path from "node:path";

export async function compress(location, inputFile, outputFile) {
  const inputFilePath = path.resolve(location.current, inputFile);
  const outputFilePath = path.resolve(location.current, outputFile);

  const readStream = createReadStream(inputFilePath);
  const brotliStream = createBrotliCompress();
  const writeStream = createWriteStream(outputFilePath);

  await pipeline(readStream, brotliStream, writeStream);
}

export async function decompress(location, inputFile, outputFile) {
  const inputFilePath = path.resolve(location.current, inputFile);
  const outputFilePath = path.resolve(location.current, outputFile);

  const readStream = createReadStream(inputFilePath);
  const brotliStream = createBrotliDecompress();
  const writeStream = createWriteStream(outputFilePath);

  await pipeline(readStream, brotliStream, writeStream);
}
