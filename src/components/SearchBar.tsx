import { useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export type Suggestion = {
  id: string;
  primary: string;
  sub: string;
};

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  language: "chinese" | "italian";
  suggestions?: Suggestion[];
  onSelectSuggestion?: (primary: string) => void;
}

const PLACEHOLDER = {
  chinese: "한국어, 중국어, 또는 병음으로 검색...",
  italian: "한국어, 이탈리아어, 또는 발음으로 검색...",
};

export function SearchBar({ value, onChange, language, suggestions = [], onSelectSuggestion }: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const showDropdown = focused && value.trim().length > 0 && suggestions.length > 0;

  const handleSelect = (primary: string) => {
    onSelectSuggestion?.(primary);
    setFocused(false);
    inputRef.current?.blur();
  };

  return (
    <div className="relative max-w-xl w-full">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        placeholder={PLACEHOLDER[language]}
        className="pl-10 pr-9 h-11 bg-card border-border/60 focus-visible:ring-primary/30"
      />
      {value.length > 0 && (
        <button
          onMouseDown={(e) => { e.preventDefault(); onChange(""); inputRef.current?.focus(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="검색어 지우기"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      {showDropdown && (
        <ul className="absolute z-50 top-full mt-1 w-full bg-card border border-border/60 rounded-lg shadow-md overflow-hidden">
          {suggestions.map((s) => (
            <li key={s.id}>
              <button
                onMouseDown={() => handleSelect(s.primary)}
                className="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-secondary/60 transition-colors"
              >
                <span className="font-medium text-foreground">{s.primary}</span>
                <span className="text-sm text-muted-foreground">{s.sub}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
