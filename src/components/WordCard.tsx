import { ChineseWord, ItalianWord } from "@/data/words";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

type WordCardProps =
  | { word: ChineseWord; language: "chinese"; index: number; onDelete?: (id: string) => void }
  | { word: ItalianWord; language: "italian"; index: number; onDelete?: (id: string) => void };

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
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className={`text-3xl font-semibold text-foreground ${language === "chinese" ? "font-chinese" : ""}`}>
              {primary}
            </span>
            <Badge variant="secondary" className="text-xs">
              {word.category}
            </Badge>
          </div>
          <p className="text-sm text-primary font-medium">{pronunciation}</p>
          <p className="text-base text-muted-foreground">{word.korean}</p>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(word.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {word.example && (
        <div className="mt-4 pt-3 border-t border-border/50 space-y-0.5">
          <p className={`text-sm text-foreground/80 ${language === "chinese" ? "font-chinese" : ""}`}>{word.example}</p>
          <p className="text-xs text-primary/70">{examplePronunciation}</p>
          <p className="text-xs text-muted-foreground">{word.exampleKorean}</p>
        </div>
      )}
    </div>
  );
}
