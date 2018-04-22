/*
  Slugify
*/

export function slugify (string) {
  return string
    .toLowerCase()
    .split(' ')
    .join('-')
    .trim()
}
