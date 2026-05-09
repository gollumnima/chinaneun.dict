import { useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { ChineseWord, ItalianWord } from "@/data/words";

function normalizePinyin(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();
}

function normalizeSearch(str: string): string {
  return str.replace(/\s+/g, "").toLowerCase();
}

type ChineseRow = {
  id: string;
  chinese: string;
  pinyin: string;
  korean: string;
  category: string;
  example: string | null;
  example_pinyin: string | null;
  example_korean: string | null;
};

function toChineseWord(row: ChineseRow): ChineseWord {
  return {
    id: row.id,
    chinese: row.chinese,
    pinyin: row.pinyin,
    korean: row.korean,
    category: row.category,
    example: row.example ?? undefined,
    examplePinyin: row.example_pinyin ?? undefined,
    exampleKorean: row.example_korean ?? undefined,
  };
}

export function useWords() {
  const queryClient = useQueryClient();

  const { data: words = [] } = useQuery({
    queryKey: ["chinese-words"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chinese_words")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data as ChineseRow[]).map(toChineseWord);
    },
  });

  const addMutation = useMutation({
    mutationFn: async (word: Omit<ChineseWord, "id">) => {
      const { error } = await supabase.from("chinese_words").insert([{
        chinese: word.chinese,
        pinyin: word.pinyin,
        korean: word.korean,
        category: word.category,
        example: word.example ?? null,
        example_pinyin: word.examplePinyin ?? null,
        example_korean: word.exampleKorean ?? null,
      }]);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chinese-words"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("chinese_words").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chinese-words"] }),
  });

  const updateMutation = useMutation({
    mutationFn: async (word: ChineseWord) => {
      const { data, error } = await supabase.from("chinese_words").update({
        chinese: word.chinese,
        pinyin: word.pinyin,
        korean: word.korean,
        category: word.category,
        example: word.example ?? null,
        example_pinyin: word.examplePinyin ?? null,
        example_korean: word.exampleKorean ?? null,
      }).eq("id", word.id).select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("수정 권한이 없습니다. Supabase RLS 정책을 확인해주세요.");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chinese-words"] }),
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const addWord = useCallback(
    (word: Omit<ChineseWord, "id">) => addMutation.mutate(word),
    [addMutation]
  );

  const deleteWord = useCallback(
    (id: string) => deleteMutation.mutate(id),
    [deleteMutation]
  );

  const updateWord = useCallback(
    (word: ChineseWord) => updateMutation.mutate(word),
    [updateMutation]
  );

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
    const counts: Record<string, number> = { 전체: words.length };
    words.forEach((w) => {
      counts[w.category] = (counts[w.category] || 0) + 1;
    });
    return counts;
  }, [words]);

  return { words, addWord, deleteWord, updateWord, searchWords, categoryCounts };
}

type ItalianRow = {
  id: string;
  italian: string;
  pronunciation: string;
  korean: string;
  category: string;
  example: string | null;
  example_pronunciation: string | null;
  example_korean: string | null;
};

function toItalianWord(row: ItalianRow): ItalianWord {
  return {
    id: row.id,
    italian: row.italian,
    pronunciation: row.pronunciation,
    korean: row.korean,
    category: row.category,
    example: row.example ?? undefined,
    examplePronunciation: row.example_pronunciation ?? undefined,
    exampleKorean: row.example_korean ?? undefined,
  };
}

export function useItalianWords() {
  const queryClient = useQueryClient();

  const { data: words = [] } = useQuery({
    queryKey: ["italian-words"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("italian_words")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data as ItalianRow[]).map(toItalianWord);
    },
  });

  const addMutation = useMutation({
    mutationFn: async (word: Omit<ItalianWord, "id">) => {
      const { error } = await supabase.from("italian_words").insert([{
        italian: word.italian,
        pronunciation: word.pronunciation,
        korean: word.korean,
        category: word.category,
        example: word.example ?? null,
        example_pronunciation: word.examplePronunciation ?? null,
        example_korean: word.exampleKorean ?? null,
      }]);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["italian-words"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("italian_words").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["italian-words"] }),
  });

  const updateMutation = useMutation({
    mutationFn: async (word: ItalianWord) => {
      const { data, error } = await supabase.from("italian_words").update({
        italian: word.italian,
        pronunciation: word.pronunciation,
        korean: word.korean,
        category: word.category,
        example: word.example ?? null,
        example_pronunciation: word.examplePronunciation ?? null,
        example_korean: word.exampleKorean ?? null,
      }).eq("id", word.id).select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("수정 권한이 없습니다. Supabase RLS 정책을 확인해주세요.");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["italian-words"] }),
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const addWord = useCallback(
    (word: Omit<ItalianWord, "id">) => addMutation.mutate(word),
    [addMutation]
  );

  const deleteWord = useCallback(
    (id: string) => deleteMutation.mutate(id),
    [deleteMutation]
  );

  const updateWord = useCallback(
    (word: ItalianWord) => updateMutation.mutate(word),
    [updateMutation]
  );

  const searchWords = useCallback(
    (query: string, category?: string) => {
      let results = words;
      if (category && category !== "전체") {
        results = results.filter((w) => w.category === category);
      }
      if (!query.trim()) return results;
      const q = query.replace(/\s+/g, "").toLowerCase();
      return results.filter(
        (w) =>
          w.italian.toLowerCase().includes(q) ||
          w.korean.includes(q) ||
          w.pronunciation.includes(q)
      );
    },
    [words]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 전체: words.length };
    words.forEach((w) => {
      counts[w.category] = (counts[w.category] || 0) + 1;
    });
    return counts;
  }, [words]);

  return { words, addWord, deleteWord, updateWord, searchWords, categoryCounts };
}
