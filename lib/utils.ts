export function generateId() {
  return crypto.randomUUID();
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function generateUniqueSlug(title: string, existingSlugs: string[]) {
  const base = slugify(title);
  let slug = base;
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${base}-${counter++}`;
  }

  return slug;
}