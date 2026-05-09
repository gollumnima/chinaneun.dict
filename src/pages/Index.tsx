import { useMemo, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { WordCard } from "@/components/WordCard";
import { AddWordForm } from "@/components/AddWordForm";
import { useWords, useItalianWords } from "@/hooks/useWords";
import { BookOpen, Plus, Search } from "lucide-react";

type Language = "chinese" | "italian";

const Index = () => {
  const [language, setLanguage] = useState<Language>("chinese");
  const chinese = useWords();
  const italian = useItalianWords();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const [showAdd, setShowAdd] = useState(false);

  const active = language === "chinese" ? chinese : italian;
  const results = active.searchWords(query, category);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return results.slice(0, 6).map((w) =>
      language === "chinese"
        ? { id: w.id, primary: "chinese" in w ? w.chinese : "", sub: w.korean }
        : { id: w.id, primary: "italian" in w ? w.italian : "", sub: w.korean }
    );
  }, [results, query, language]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setQuery("");
    setCategory("전체");
    setShowAdd(false);
  };

  return (
    <div className="min-h-screen bg-background" data-lang={language}>
      {/* Header */}
      <header className="border-b border-border/60 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
            </div>
            <h1 className="text-base sm:text-xl font-bold text-foreground tracking-tight whitespace-nowrap">
              차이나는 사전
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              <button
                onClick={() => handleLanguageChange("chinese")}
                title="중국어"
                className={`text-lg sm:text-xl px-2 sm:px-2.5 py-1 rounded-md transition-all duration-200
                  ${language === "chinese" ? "bg-background shadow-sm scale-105" : "opacity-50 hover:opacity-80"}`}
              >
                🇨🇳
              </button>
              <button
                onClick={() => handleLanguageChange("italian")}
                title="이탈리아어"
                className={`text-lg sm:text-xl px-2 sm:px-2.5 py-1 rounded-md transition-all duration-200
                  ${language === "italian" ? "bg-background shadow-sm scale-105" : "opacity-50 hover:opacity-80"}`}
              >
                🇮🇹
              </button>
            </div>

            <button
              onClick={() => setShowAdd(!showAdd)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                ${showAdd ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
            >
              <Plus className={`h-4 w-4 transition-transform shrink-0 ${showAdd ? "rotate-45" : ""}`} />
              <span className="hidden sm:inline">단어 추가</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Add Word Form */}
        {showAdd && (
          <div className="animate-fade-in">
            {language === "chinese"
              ? <AddWordForm language="chinese" onAdd={chinese.addWord} />
              : <AddWordForm language="italian" onAdd={italian.addWord} />
            }
          </div>
        )}

        {/* Search & Filter */}
        <div className="space-y-4">
          <SearchBar
            value={query}
            onChange={setQuery}
            language={language}
            suggestions={suggestions}
            onSelectSuggestion={setQuery}
          />
          <CategoryFilter selected={category} onSelect={setCategory} counts={active.categoryCounts} />
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          {results.length}개의 단어
          {query && <span className="text-foreground font-medium"> · &quot;{query}&quot; 검색 결과</span>}
        </p>

        {/* Word Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {language === "chinese"
              ? chinese.searchWords(query, category).map((word, i) => (
                  <WordCard key={word.id} word={word} language="chinese" index={i} onDelete={chinese.deleteWord} onEdit={chinese.updateWord} />
                ))
              : italian.searchWords(query, category).map((word, i) => (
                  <WordCard key={word.id} word={word} language="italian" index={i} onDelete={italian.deleteWord} onEdit={italian.updateWord} />
                ))
            }
          </div>
        ) : (
          <div className="text-center py-16 space-y-3">
            <Search className="h-12 w-12 text-muted-foreground/40 mx-auto" />
            <p className="text-muted-foreground">검색 결과가 없습니다.</p>
            <p className="text-sm text-muted-foreground/70">다른 검색어를 시도하거나 새 단어를 추가해보세요.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
