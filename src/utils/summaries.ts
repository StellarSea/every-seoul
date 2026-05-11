export function buildQuickSummary(text: string, maxItems = 3) {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return [];

  const sentences = normalized
    .split(/(?<=[.!?。！？]|다\.|요\.|음\.|함\.|됨\.)\s+/)
    .map((item) => item.replace(/[.!?。！？]+$/, '').trim())
    .filter(Boolean);

  const source = sentences.length > 1 ? sentences : normalized.split(/[,·]/);

  return source
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems);
}
