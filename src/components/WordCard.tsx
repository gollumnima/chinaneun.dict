import { useState } from "react";
import { ChineseWord, ItalianWord, categories } from "@/data/words";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";

type WordCardProps =
  | { word: ChineseWord; language: "chinese"; index: number; onDelete?: (id: string) => void; onEdit?: (word: ChineseWord) => void }
  | { word: ItalianWord; language: "italian"; index: number; onDelete?: (id: string) => void; onEdit?: (word: ItalianWord) => void };

const TOAST_STYLE: Record<string, React.CSSProperties> = {
  chinese: { background: "hsl(350 80% 55%)", color: "white", border: "none" },
  italian: { background: "hsl(150 60% 38%)", color: "white", border: "none" },
};

function CopyableText({ text, language, className, children }: { text: string; language: string; className?: string; children: React.ReactNode }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    toast("복사됨", { duration: 1200, style: TOAST_STYLE[language] });
  };

  return (
    <span
      className={`${className} cursor-pointer active:opacity-60 transition-opacity select-none`}
      onClick={handleCopy}
    >
      {children}
    </span>
  );
}

export function WordCard(props: WordCardProps) {
  const { word, language, index, onDelete, onEdit } = props;

  const primary = language === "chinese" ? word.chinese : word.italian;
  const pronunciation = language === "chinese" ? word.pinyin : word.pronunciation;
  const examplePronunciation = language === "chinese" ? word.examplePinyin : word.examplePronunciation;

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    word: primary,
    pronunciation: pronunciation,
    korean: word.korean,
    category: word.category,
    example: word.example ?? "",
    examplePronunciation: examplePronunciation ?? "",
    exampleKorean: word.exampleKorean ?? "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleEdit = () => {
    setForm({
      word: primary,
      pronunciation: pronunciation,
      korean: word.korean,
      category: word.category,
      example: word.example ?? "",
      examplePronunciation: examplePronunciation ?? "",
      exampleKorean: word.exampleKorean ?? "",
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!form.word || !form.pronunciation || !form.korean || !form.category) {
      toast.error("필수 항목을 모두 입력해주세요.");
      return;
    }
    if (!onEdit) return;

    if (language === "chinese") {
      (onEdit as (w: ChineseWord) => void)({
        id: word.id,
        chinese: form.word,
        pinyin: form.pronunciation,
        korean: form.korean,
        category: form.category,
        example: form.example || undefined,
        examplePinyin: form.examplePronunciation || undefined,
        exampleKorean: form.exampleKorean || undefined,
      });
    } else {
      (onEdit as (w: ItalianWord) => void)({
        id: word.id,
        italian: form.word,
        pronunciation: form.pronunciation,
        korean: form.korean,
        category: form.category,
        example: form.example || undefined,
        examplePronunciation: form.examplePronunciation || undefined,
        exampleKorean: form.exampleKorean || undefined,
      });
    }

    setIsEditing(false);
    toast.success("수정되었습니다!", { style: TOAST_STYLE[language] });
  };

  return (
    <div
      className="glass-card rounded-lg p-5 hover:shadow-md transition-all duration-200 group animate-fade-in"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {isEditing ? (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              value={form.word}
              onChange={(e) => update("word", e.target.value)}
              placeholder={language === "chinese" ? "중국어" : "이탈리아어"}
              className={language === "chinese" ? "font-chinese text-lg" : "text-lg"}
            />
            <Input
              value={form.pronunciation}
              onChange={(e) => update("pronunciation", e.target.value)}
              placeholder={language === "chinese" ? "병음 (Pinyin)" : "발음"}
            />
            <Input
              value={form.korean}
              onChange={(e) => update("korean", e.target.value)}
              placeholder="한국어 뜻"
            />
            <Select value={form.category} onValueChange={(v) => update("category", v)}>
              <SelectTrigger>
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Input
              value={form.example}
              onChange={(e) => update("example", e.target.value)}
              placeholder="예문 (선택)"
              className={language === "chinese" ? "font-chinese" : ""}
            />
            <Input
              value={form.examplePronunciation}
              onChange={(e) => update("examplePronunciation", e.target.value)}
              placeholder={language === "chinese" ? "예문 병음" : "예문 발음"}
            />
            <Input
              value={form.exampleKorean}
              onChange={(e) => update("exampleKorean", e.target.value)}
              placeholder="예문 뜻"
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>저장</Button>
            <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>취소</Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <CopyableText text={primary} language={language} className={`text-2xl sm:text-3xl font-semibold text-foreground break-words ${language === "chinese" ? "font-chinese" : ""}`}>
                  {primary}
                </CopyableText>
                <Badge variant="secondary" className="text-xs shrink-0">
                  {word.category}
                </Badge>
              </div>
              <p className="text-sm text-primary font-medium break-words">{pronunciation}</p>
              <p className="text-base text-muted-foreground break-words">{word.korean}</p>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              {onEdit && (
                <button
                  onClick={handleEdit}
                  className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(word.id)}
                  className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {word.example && (
            <div className="mt-4 pt-3 border-t border-border/50 space-y-0.5">
              <CopyableText text={word.example} language={language} className={`text-sm text-foreground/80 break-words ${language === "chinese" ? "font-chinese" : ""}`}>
                {word.example}
              </CopyableText>
              <p className="text-xs text-primary/70 break-words">{examplePronunciation}</p>
              <p className="text-xs text-muted-foreground break-words">{word.exampleKorean}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
