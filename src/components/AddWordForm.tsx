import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, ChineseWord } from "@/data/words";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface AddWordFormProps {
  onAdd: (word: Omit<ChineseWord, "id">) => void;
}

export function AddWordForm({ onAdd }: AddWordFormProps) {
  const [form, setForm] = useState({
    chinese: "",
    pinyin: "",
    korean: "",
    category: "",
    example: "",
    examplePinyin: "",
    exampleKorean: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.chinese || !form.pinyin || !form.korean || !form.category) {
      toast.error("필수 항목을 모두 입력해주세요.");
      return;
    }
    onAdd(form);
    setForm({ chinese: "", pinyin: "", korean: "", category: "", example: "", examplePinyin: "", exampleKorean: "" });
    toast.success("단어가 추가되었습니다!");
  };

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-lg p-6 space-y-5">
      <h2 className="text-lg font-semibold text-foreground">새 단어 추가</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="chinese">중국어 *</Label>
          <Input id="chinese" value={form.chinese} onChange={(e) => update("chinese", e.target.value)} placeholder="你好" className="font-chinese" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pinyin">병음 (Pinyin) *</Label>
          <Input id="pinyin" value={form.pinyin} onChange={(e) => update("pinyin", e.target.value)} placeholder="nǐ hǎo" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="korean">한국어 뜻 *</Label>
          <Input id="korean" value={form.korean} onChange={(e) => update("korean", e.target.value)} placeholder="안녕하세요" />
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
          <Input value={form.example} onChange={(e) => update("example", e.target.value)} placeholder="예문 (중국어)" className="font-chinese" />
          <Input value={form.examplePinyin} onChange={(e) => update("examplePinyin", e.target.value)} placeholder="예문 병음" />
          <Input value={form.exampleKorean} onChange={(e) => update("exampleKorean", e.target.value)} placeholder="예문 뜻" />
        </div>
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        <Plus className="mr-2 h-4 w-4" />
        단어 추가
      </Button>
    </form>
  );
}
