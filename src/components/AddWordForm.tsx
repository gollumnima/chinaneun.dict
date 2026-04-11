import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, ChineseWord, ItalianWord } from "@/data/words";
import { Plus } from "lucide-react";
import { toast } from "sonner";

type AddWordFormProps =
  | { language?: "chinese"; onAdd: (word: Omit<ChineseWord, "id">) => void }
  | { language: "italian"; onAdd: (word: Omit<ItalianWord, "id">) => void };

export function AddWordForm({ language = "chinese", onAdd }: AddWordFormProps) {
  const isItalian = language === "italian";

  const [form, setForm] = useState({
    word: "",
    pronunciation: "",
    korean: "",
    category: "",
    example: "",
    examplePronunciation: "",
    exampleKorean: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.word || !form.pronunciation || !form.korean || !form.category) {
      toast.error("필수 항목을 모두 입력해주세요.");
      return;
    }

    if (isItalian) {
      (onAdd as (word: Omit<ItalianWord, "id">) => void)({
        italian: form.word,
        pronunciation: form.pronunciation,
        korean: form.korean,
        category: form.category,
        example: form.example || undefined,
        examplePronunciation: form.examplePronunciation || undefined,
        exampleKorean: form.exampleKorean || undefined,
      });
    } else {
      (onAdd as (word: Omit<ChineseWord, "id">) => void)({
        chinese: form.word,
        pinyin: form.pronunciation,
        korean: form.korean,
        category: form.category,
        example: form.example || undefined,
        examplePinyin: form.examplePronunciation || undefined,
        exampleKorean: form.exampleKorean || undefined,
      });
    }

    setForm({ word: "", pronunciation: "", korean: "", category: "", example: "", examplePronunciation: "", exampleKorean: "" });
    toast.success("단어가 추가되었습니다!");
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-lg p-6 space-y-5">
      <h2 className="text-lg font-semibold text-foreground">새 단어 추가</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="word">{isItalian ? "이탈리아어" : "중국어"} *</Label>
          <Input
            id="word"
            value={form.word}
            onChange={(e) => update("word", e.target.value)}
            placeholder={isItalian ? "Ciao" : "你好"}
            className={isItalian ? "" : "font-chinese"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pronunciation">{isItalian ? "발음 (한국어 표기)" : "병음 (Pinyin)"} *</Label>
          <Input
            id="pronunciation"
            value={form.pronunciation}
            onChange={(e) => update("pronunciation", e.target.value)}
            placeholder={isItalian ? "차오" : "nǐ hǎo"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="korean">한국어 뜻 *</Label>
          <Input
            id="korean"
            value={form.korean}
            onChange={(e) => update("korean", e.target.value)}
            placeholder="안녕하세요"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">카테고리 *</Label>
          <Select value={form.category} onValueChange={(v) => update("category", v)}>
            <SelectTrigger>
              <SelectValue placeholder="선택" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <p className="text-sm text-muted-foreground">예문 (선택사항)</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            value={form.example}
            onChange={(e) => update("example", e.target.value)}
            placeholder={isItalian ? "예문 (이탈리아어)" : "예문 (중국어)"}
            className={isItalian ? "" : "font-chinese"}
          />
          <Input
            value={form.examplePronunciation}
            onChange={(e) => update("examplePronunciation", e.target.value)}
            placeholder={isItalian ? "예문 발음" : "예문 병음"}
          />
          <Input
            value={form.exampleKorean}
            onChange={(e) => update("exampleKorean", e.target.value)}
            placeholder="예문 뜻"
          />
        </div>
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        <Plus className="mr-2 h-4 w-4" />
        단어 추가
      </Button>
    </form>
  );
}
