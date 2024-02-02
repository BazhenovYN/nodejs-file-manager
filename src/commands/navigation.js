export function up(location) {
  location.up();
}

export async function cd(location, newPath) {
  await location.cd(newPath);
}
