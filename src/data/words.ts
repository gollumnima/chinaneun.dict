export interface ChineseWord {
  id: string;
  chinese: string;
  pinyin: string;
  korean: string;
  category: string;
  example?: string;
  examplePinyin?: string;
  exampleKorean?: string;
}

export interface ItalianWord {
  id: string;
  italian: string;
  pronunciation: string;
  korean: string;
  category: string;
  example?: string;
  examplePronunciation?: string;
  exampleKorean?: string;
}

export const categories = [
  "인사", "일상", "음식", "교통", "쇼핑", "감정", "숫자", "시간", "장소", "기타",
] as const;

export const initialWords: ChineseWord[] = [
  { id: "1", chinese: "你好", pinyin: "nǐ hǎo", korean: "안녕하세요", category: "인사", example: "你好，很高兴认识你。", examplePinyin: "Nǐ hǎo, hěn gāoxìng rènshí nǐ.", exampleKorean: "안녕하세요, 만나서 반갑습니다." },
  { id: "2", chinese: "再见", pinyin: "zài jiàn", korean: "잘가", category: "인사", example: "明天再见！", examplePinyin: "Míngtiān zàijiàn!", exampleKorean: "내일 또 만나!" },
  { id: "3", chinese: "谢谢", pinyin: "xiè xiè", korean: "감사합니다", category: "인사", example: "谢谢你的帮助。", examplePinyin: "Xièxiè nǐ de bāngzhù.", exampleKorean: "도와주셔서 감사합니다." },
  { id: "4", chinese: "对不起", pinyin: "duì bù qǐ", korean: "죄송합니다", category: "인사", example: "对不起，我迟到了。", examplePinyin: "Duìbùqǐ, wǒ chídào le.", exampleKorean: "죄송합니다, 늦었습니다." },
  { id: "5", chinese: "没关系", pinyin: "méi guān xì", korean: "괜찮습니다", category: "인사" },
  { id: "6", chinese: "请", pinyin: "qǐng", korean: "~해 주세요", category: "일상" },
  { id: "7", chinese: "是", pinyin: "shì", korean: "~이다", category: "일상" },
  { id: "8", chinese: "不是", pinyin: "bú shì", korean: "아니다", category: "일상" },
  { id: "9", chinese: "我", pinyin: "wǒ", korean: "나", category: "일상" },
  { id: "10", chinese: "你", pinyin: "nǐ", korean: "너", category: "일상" },
  { id: "11", chinese: "他", pinyin: "tā", korean: "그", category: "일상" },
  { id: "12", chinese: "她", pinyin: "tā", korean: "그녀", category: "일상" },
  { id: "13", chinese: "吃", pinyin: "chī", korean: "먹다", category: "음식", example: "我想吃饭。", examplePinyin: "Wǒ xiǎng chīfàn.", exampleKorean: "밥 먹고 싶어요." },
  { id: "14", chinese: "喝", pinyin: "hē", korean: "마시다", category: "음식" },
  { id: "15", chinese: "水", pinyin: "shuǐ", korean: "물", category: "음식" },
  { id: "16", chinese: "茶", pinyin: "chá", korean: "차", category: "음식" },
  { id: "17", chinese: "米饭", pinyin: "mǐ fàn", korean: "쌀밥", category: "음식" },
  { id: "18", chinese: "多少钱", pinyin: "duō shǎo qián", korean: "얼마예요?", category: "쇼핑", example: "这个多少钱？", examplePinyin: "Zhège duōshǎo qián?", exampleKorean: "이거 얼마예요?" },
  { id: "19", chinese: "太贵了", pinyin: "tài guì le", korean: "너무 비싸요", category: "쇼핑" },
  { id: "20", chinese: "便宜", pinyin: "pián yí", korean: "싸다", category: "쇼핑" },
  { id: "21", chinese: "高兴", pinyin: "gāo xìng", korean: "기쁘다", category: "감정" },
  { id: "22", chinese: "生气", pinyin: "shēng qì", korean: "화나다", category: "감정" },
  { id: "23", chinese: "难过", pinyin: "nán guò", korean: "슬프다", category: "감정" },
  { id: "24", chinese: "一", pinyin: "yī", korean: "1", category: "숫자" },
  { id: "25", chinese: "二", pinyin: "èr", korean: "2", category: "숫자" },
  { id: "26", chinese: "三", pinyin: "sān", korean: "3", category: "숫자" },
  { id: "27", chinese: "今天", pinyin: "jīn tiān", korean: "오늘", category: "시간" },
  { id: "28", chinese: "明天", pinyin: "míng tiān", korean: "내일", category: "시간" },
  { id: "29", chinese: "昨天", pinyin: "zuó tiān", korean: "어제", category: "시간" },
  { id: "30", chinese: "学校", pinyin: "xué xiào", korean: "학교", category: "장소" },
  { id: "31", chinese: "医院", pinyin: "yī yuàn", korean: "병원", category: "장소" },
  { id: "32", chinese: "车站", pinyin: "chē zhàn", korean: "정거장", category: "교통" },
];

export const initialItalianWords: ItalianWord[] = [
  { id: "i1", italian: "Ciao", pronunciation: "차오", korean: "안녕/잘 가", category: "인사", example: "Ciao! Come stai?", examplePronunciation: "차오! 꼬메 스따이?", exampleKorean: "안녕! 잘 지내?" },
  { id: "i2", italian: "Buongiorno", pronunciation: "부온조르노", korean: "좋은 아침", category: "인사", example: "Buongiorno, signora!", examplePronunciation: "부온조르노, 씨뇨라!", exampleKorean: "좋은 아침이에요, 선생님!" },
  { id: "i3", italian: "Grazie", pronunciation: "그라찌에", korean: "감사합니다", category: "인사", example: "Grazie mille!", examplePronunciation: "그라찌에 밀레!", exampleKorean: "정말 감사합니다!" },
  { id: "i4", italian: "Mi dispiace", pronunciation: "미 디스삐아체", korean: "죄송합니다", category: "인사", example: "Mi dispiace, sono in ritardo.", examplePronunciation: "미 디스삐아체, 소노 인 리따르도.", exampleKorean: "죄송합니다, 늦었습니다." },
  { id: "i5", italian: "Prego", pronunciation: "쁘레고", korean: "천만에요", category: "인사" },
  { id: "i6", italian: "Per favore", pronunciation: "뻬르 파보레", korean: "~해 주세요", category: "일상" },
  { id: "i7", italian: "Sì", pronunciation: "씨", korean: "네", category: "일상" },
  { id: "i8", italian: "No", pronunciation: "노", korean: "아니오", category: "일상" },
  { id: "i9", italian: "Io", pronunciation: "이오", korean: "나", category: "일상" },
  { id: "i10", italian: "Tu", pronunciation: "뚜", korean: "너", category: "일상" },
  { id: "i11", italian: "Lui", pronunciation: "루이", korean: "그", category: "일상" },
  { id: "i12", italian: "Lei", pronunciation: "레이", korean: "그녀", category: "일상" },
  { id: "i13", italian: "Mangiare", pronunciation: "만쟈레", korean: "먹다", category: "음식", example: "Voglio mangiare la pizza.", examplePronunciation: "볼료 만쟈레 라 삐짜.", exampleKorean: "피자 먹고 싶어요." },
  { id: "i14", italian: "Bere", pronunciation: "베레", korean: "마시다", category: "음식" },
  { id: "i15", italian: "Acqua", pronunciation: "아꾸아", korean: "물", category: "음식" },
  { id: "i16", italian: "Tè", pronunciation: "떼", korean: "차", category: "음식" },
  { id: "i17", italian: "Riso", pronunciation: "리조", korean: "쌀밥", category: "음식" },
  { id: "i18", italian: "Quanto costa?", pronunciation: "꽌또 코스따?", korean: "얼마예요?", category: "쇼핑", example: "Quanto costa questo?", examplePronunciation: "꽌또 코스따 꾸에스또?", exampleKorean: "이거 얼마예요?" },
  { id: "i19", italian: "Troppo caro", pronunciation: "뜨로뽀 까로", korean: "너무 비싸요", category: "쇼핑" },
  { id: "i20", italian: "Economico", pronunciation: "에꼬노미꼬", korean: "싸다", category: "쇼핑" },
  { id: "i21", italian: "Felice", pronunciation: "펠리체", korean: "기쁘다", category: "감정" },
  { id: "i22", italian: "Arrabbiato", pronunciation: "아라비아또", korean: "화나다", category: "감정" },
  { id: "i23", italian: "Triste", pronunciation: "뜨리스떼", korean: "슬프다", category: "감정" },
  { id: "i24", italian: "Uno", pronunciation: "우노", korean: "1", category: "숫자" },
  { id: "i25", italian: "Due", pronunciation: "두에", korean: "2", category: "숫자" },
  { id: "i26", italian: "Tre", pronunciation: "뜨레", korean: "3", category: "숫자" },
  { id: "i27", italian: "Oggi", pronunciation: "오찌", korean: "오늘", category: "시간" },
  { id: "i28", italian: "Domani", pronunciation: "도마니", korean: "내일", category: "시간" },
  { id: "i29", italian: "Ieri", pronunciation: "이에리", korean: "어제", category: "시간" },
  { id: "i30", italian: "Scuola", pronunciation: "스꾸올라", korean: "학교", category: "장소" },
  { id: "i31", italian: "Ospedale", pronunciation: "오스뻬달레", korean: "병원", category: "장소" },
  { id: "i32", italian: "Fermata", pronunciation: "페르마따", korean: "정거장", category: "교통" },
];
