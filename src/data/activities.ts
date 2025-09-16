export type Activity = {
  slug: string;
  title: string;
  price: number; // 税込/1名
  duration: string;
  tags: string[];
  image?: string;
  notes?: string;
  age?: string;
  meetingPoint?: string;
  maxPeople?: string;
  items?: string[];
};

export const activities: Activity[] = [
  {
    slug: 'jet-ski',
    title: 'ジェットスキー',
    price: 9800,
    duration: '60min',
    tags: ['免許不要体験', '同乗可'],
    image: '/images/ジェットスキー.webp',
    age: '中学生以上（保護者同伴で小学生可）',
    meetingPoint: '宜野湾マリーナ 集合',
    maxPeople: '1グループ 4名まで',
    items: ['濡れても良い服装', 'タオル', 'サンダル'],
    notes: '波が高い場合は速度を制限します。船酔いが心配な方は事前にご相談ください。',
  },
  {
    slug: 'parasailing',
    title: 'パラセーリング',
    price: 11000,
    duration: '60min',
    tags: ['空の絶景', '船酔い対策'],
    image: '/images/パラセーリング.webp',
    age: '小学生以上',
    meetingPoint: '宜野湾マリーナ（受付前集合）',
    maxPeople: '同時2名まで（体重制限あり）',
    items: ['歩きやすい靴', '羽織もの（風対策）'],
    notes: '強風・雷注意報時は中止になります。高所が苦手な方はご相談ください。',
  },
  {
    slug: 'banana-boat',
    title: 'バナナボート',
    price: 5500,
    duration: '30min',
    tags: ['グループ向け', '濡れてOK'],
    image: '/images/バナナボート.webp',
    age: '5歳以上（保護者同伴）',
    meetingPoint: '宜野湾マリーナ 受付テント',
    maxPeople: '1艇 6名まで',
    items: ['濡れても良い服装', 'タオル'],
    notes: '落水する場合があります。メガネは外すかバンドをご用意ください。',
  },
  {
    slug: 'flyboard',
    title: 'フライボード',
    price: 9800,
    duration: '45min',
    tags: ['初心者OK', '写真無料'],
    image: '/images/フライボード.webp',
    age: '中学生以上',
    meetingPoint: '宜野湾マリーナ 受付カウンター',
    maxPeople: '同時1名（見学同行可）',
    items: ['水着', 'タオル'],
    notes: '最初は低い高さから練習します。安全のためインストラクターの指示に従ってください。',
  },
];


