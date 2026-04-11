import { useState, useCallback, useMemo } from "react";
import { ChineseWord, initialWords } from "@/data/words";

const STORAGE_KEY = "chinese-words";

function loadWords(): ChineseWord[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return initialWords;
}

function saveWords(words: ChineseWord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

// Normalize pinyin: remove tones/diacritics, lowercase, remove spaces
function normalizePinyin(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();
}

function normalizeSearch(str: string): string {
  return str.replace(/\s+/g, "").toLowerCase();
}

export function useWords() {
  const [words, setWords] = useState<ChineseWord[]>(loadWords);

  const addWord = useCallback((word: Omit<ChineseWord, "id">) => {
    setWords((prev) => {
      const next = [...prev, { ...word, id: crypto.randomUUID() }];
      saveWords(next);
      return next;
    });
  }, []);

  const deleteWord = useCallback((id: string) => {
    setWords((prev) => {
      const next = prev.filter((w) => w.id !== id);
      saveWords(next);
      return next;
    });
  }, []);

  const searchWords = useCallback(
    (query: string, category?: string) => {
      let results = words;

      if (category && category !== "전체") {
        results = results.filter((w) => w.category === category);
      }

      if (!query.trim()) return results;

      const q = normalizeSearch(query);
      const qPinyin = normalizePinyin(query);

      return results.filter(
        (w) =>
          w.chinese.includes(q) ||
          w.korean.includes(q) ||
          normalizePinyin(w.pinyin).includes(qPinyin)
      );
    },
    [words]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "전체": words.length };
    words.forEach((w) => {
      counts[w.category] = (counts[w.category] || 0) + 1;
    });
    return counts;
  }, [words]);

  return { words, addWord, deleteWord, searchWords, categoryCounts };
}
