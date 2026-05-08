import { useState } from "react";
import { ChineseWord, ItalianWord } from "@/data/words";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

type WordCardProps =
  | { word: ChineseWord; language: "chinese"; index: number; onDelete?: (id: string) => void }
  | { word: ItalianWord; language: "italian"; index: number; onDelete?: (id: string) => void };

function CopyableText({ text, className, children }: { text: string; className?: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback for older mobile browsers
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <span className="relative inline-flex items-center gap-1">
      <span
        className={`${className} cursor-pointer active:opacity-60 transition-opacity select-none`}
        onClick={handleCopy}
      >
        {children}
      </span>
      {copied && (
        <span className="text-xs text-primary font-medium animate-fade-in">복사됨</span>
      )}
    </span>
  );
}

export function WordCard(props: WordCardProps) {
  const { word, language, index, onDelete } = props;

  const primary = language === "chinese" ? word.chinese : word.italian;
  const pronunciation = language === "chinese" ? word.pinyin : word.pronunciation;
  const examplePronunciation = language === "chinese" ? word.examplePinyin : word.examplePronunciation;

  return (
    <div
      className="glass-card rounded-lg p-5 hover:shadow-md transition-all duration-200 group animate-fade-in"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <CopyableText text={primary} className={`text-2xl sm:text-3xl font-semibold text-foreground break-words ${language === "chinese" ? "font-chinese" : ""}`}>
              {primary}
            </CopyableText>
            <Badge variant="secondary" className="text-xs shrink-0">
              {word.category}
            </Badge>
          </div>
          <p className="text-sm text-primary font-medium break-words">{pronunciation}</p>
          <p className="text-base text-muted-foreground break-words">{word.korean}</p>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(word.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {word.example && (
        <div className="mt-4 pt-3 border-t border-border/50 space-y-0.5">
          <p className={`text-sm text-foreground/80 break-words ${language === "chinese" ? "font-chinese" : ""}`}>{word.example}</p>
          <p className="text-xs text-primary/70 break-words">{examplePronunciation}</p>
          <p className="text-xs text-muted-foreground break-words">{word.exampleKorean}</p>
        </div>
      )}
    </div>
  );
}
