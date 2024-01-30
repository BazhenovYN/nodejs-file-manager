import readline from "node:readline";
import { getCommand, getUserName } from "./utils.js";

function runCommand(line) {
  const command = getCommand(line);

  switch (command.name) {
    case "up":
      console.log("up command...");
      break;
    case "ls":
      console.log("ls command...");
      break;
    case ".exit":
      rl.close();
      break;
    default:
      console.log(`'${line.trim()}': command not found...`);
      break;
  }
}

export function startFileManager() {
  const username = getUserName();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "$$$> ",
  });

  console.log(`Welcome to the File Manager, ${username}!`);
  rl.prompt();

  rl.on("line", (line) => {
    runCommand(line);
    rl.prompt();
  }).on("close", () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  });
}
