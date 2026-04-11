import { ChineseWord } from "@/data/words";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

interface WordCardProps {
  word: ChineseWord;
  index: number;
  onDelete?: (id: string) => void;
}

export function WordCard({ word, index, onDelete }: WordCardProps) {
  return (
    <div
      className="glass-card rounded-lg p-5 hover:shadow-md transition-all duration-200 group animate-fade-in"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-chinese font-semibold text-foreground">
              {word.chinese}
            </span>
            <Badge variant="secondary" className="text-xs">
              {word.category}
            </Badge>
          </div>
          <p className="text-sm text-primary font-medium">{word.pinyin}</p>
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
          <p className="text-sm font-chinese text-foreground/80">{word.example}</p>
          <p className="text-xs text-primary/70">{word.examplePinyin}</p>
          <p className="text-xs text-muted-foreground">{word.exampleKorean}</p>
        </div>
      )}
    </div>
  );
}
