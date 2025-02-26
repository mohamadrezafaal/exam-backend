export function toPascalCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (m) => m.charAt(0).toUpperCase() + m.substring(1),
  );
}
