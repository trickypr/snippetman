// Assorted helper methods for javascript primitives

export function toTitleCase(str: string): string {
  // https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript

  return str
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(" ");
}
