export function buildQuickSummary(text: string, maxItems = 3) {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return [];

  const sentences = normalized
    .split(/(?<=[.!?。！？]|다\.|요\.|음\.|함\.|됨\.)\s+/)
    .map((item) => item.replace(/[.!?。！？]+$/, '').trim())
    .filter(Boolean);

  const source = sentences.length > 1 ? sentences : normalized.split(/[,·]/);
  const seen = new Set<string>();

  return source
    .map((item) => item.trim())
    .filter((item) => {
      if (!item || seen.has(item)) return false;
      seen.add(item);
      return true;
    })
    .slice(0, maxItems);
}
