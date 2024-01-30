export function getUserName() {
  return "User";
}

export function getCommand(line) {
  return { name: line.trim(), arguments: [] };
}
