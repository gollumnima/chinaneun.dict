import { categories } from "@/data/words";

interface CategoryFilterProps {
  selected: string;
  onSelect: (cat: string) => void;
  counts: Record<string, number>;
}

export function CategoryFilter({ selected, onSelect, counts }: CategoryFilterProps) {
  const allCategories = ["전체", ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
            ${
              selected === cat
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
        >
          {cat}
          {counts[cat] !== undefined && (
            <span className="ml-1.5 opacity-70">{counts[cat]}</span>
          )}
        </button>
      ))}
    </div>
  );
}
