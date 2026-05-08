-- 중국어 단어 테이블
create table chinese_words (
  id uuid primary key default gen_random_uuid(),
  chinese text not null,
  pinyin text not null,
  korean text not null,
  category text not null,
  example text,
  example_pinyin text,
  example_korean text,
  created_at timestamptz not null default now()
);

-- 이탈리아어 단어 테이블
create table italian_words (
  id uuid primary key default gen_random_uuid(),
  italian text not null,
  pronunciation text not null,
  korean text not null,
  category text not null,
  example text,
  example_pronunciation text,
  example_korean text,
  created_at timestamptz not null default now()
);

-- RLS 활성화 (퍼블릭 읽기/쓰기 허용 - 필요시 인증 추가)
alter table chinese_words enable row level security;
alter table italian_words enable row level security;

create policy "public read chinese_words" on chinese_words for select using (true);
create policy "public insert chinese_words" on chinese_words for insert with check (true);
create policy "public delete chinese_words" on chinese_words for delete using (true);

create policy "public read italian_words" on italian_words for select using (true);
create policy "public insert italian_words" on italian_words for insert with check (true);
create policy "public delete italian_words" on italian_words for delete using (true);
