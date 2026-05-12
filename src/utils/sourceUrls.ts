export function getExternalSourceUrl(value?: string | null) {
  if (!value) return undefined;

  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (trimmed.startsWith('//')) {
    return `https:${trimmed}`;
  }

  if (!/^https?:\/\//i.test(trimmed)) {
    return undefined;
  }

  return trimmed;
}
