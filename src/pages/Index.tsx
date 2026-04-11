import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { WordCard } from "@/components/WordCard";
import { AddWordForm } from "@/components/AddWordForm";
import { useWords } from "@/hooks/useWords";
import { BookOpen, Plus, Search } from "lucide-react";

const Index = () => {
  const { addWord, deleteWord, searchWords, categoryCounts } = useWords();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const [showAdd, setShowAdd] = useState(false);

  const results = searchWords(query, category);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              中文学习
            </h1>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${showAdd ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
          >
            <Plus className={`h-4 w-4 transition-transform ${showAdd ? "rotate-45" : ""}`} />
            단어 추가
          </button>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Add Word Form */}
        {showAdd && (
          <div className="animate-fade-in">
            <AddWordForm onAdd={addWord} />
          </div>
        )}

        {/* Search & Filter */}
        <div className="space-y-4">
          <SearchBar value={query} onChange={setQuery} />
          <CategoryFilter selected={category} onSelect={setCategory} counts={categoryCounts} />
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          {results.length}개의 단어
          {query && <span className="text-foreground font-medium"> · &quot;{query}&quot; 검색 결과</span>}
        </p>

        {/* Word Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((word, i) => (
              <WordCard key={word.id} word={word} index={i} onDelete={deleteWord} />
            ))}
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
