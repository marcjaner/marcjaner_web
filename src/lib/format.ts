export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

// Matches the old site's tag URLs (/blog/tags/reflexión) so existing links keep working.
export const tagSlug = (tag: string) => tag.toLowerCase().replace(/\s+/g, "-");
