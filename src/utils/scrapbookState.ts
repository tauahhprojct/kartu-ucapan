import type { MemoryPhoto } from '../data/memories';

export const CAPTIONS_STORAGE_KEY = 'purna_tugas_scrapbook_captions_v1';

export type CaptionMap = Record<string, string>;

export function buildInitialCaptions(memories: MemoryPhoto[]): CaptionMap {
  const result: CaptionMap = {};
  for (const item of memories) {
    result[item.id] = item.defaultCaption;
  }
  return result;
}

export function sanitizeCaption(input: string, fallback: string): string {
  const normalized = input.replace(/\s+/g, ' ').trim();
  if (!normalized) {
    return fallback;
  }
  return normalized.slice(0, 140);
}

export function mergeSavedCaptions(
  memories: MemoryPhoto[],
  rawJson: string | null
): CaptionMap {
  const base = buildInitialCaptions(memories);
  if (!rawJson) {
    return base;
  }
  try {
    const parsed = JSON.parse(rawJson) as Record<string, unknown>;
    if (!parsed || typeof parsed !== 'object') {
      return base;
    }
    for (const item of memories) {
      const candidate = parsed[item.id];
      if (typeof candidate === 'string') {
        base[item.id] = sanitizeCaption(candidate, item.defaultCaption);
      }
    }
    return base;
  } catch {
    return base;
  }
}

export function getNextLightboxIndex(
  currentIndex: number,
  direction: 'prev' | 'next',
  total: number
): number {
  if (total <= 0) return -1;
  if (direction === 'next') {
    return (currentIndex + 1) % total;
  }
  return (currentIndex - 1 + total) % total;
}

export function shouldAutostartFromSearch(search: string): boolean {
  try {
    const params = new URLSearchParams(search);
    return params.get('autostart') === '1';
  } catch {
    return false;
  }
}
