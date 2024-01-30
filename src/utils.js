export function getUserName() {
  return "User";
}

export function getCommand(line) {
  const pattern = /(?<command>^"[^"]*"|\S*) *(?<params>.*)?/;
  const match = line.match(pattern);
  return {
    name: match.groups.command,
    arguments: match.groups.params ? [...match.groups.params.split(" ")] : null,
  };
}
