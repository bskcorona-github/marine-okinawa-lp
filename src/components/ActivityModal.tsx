"use client";

type Activity = {
  slug: string;
  title: string;
  price: number;
  duration: string;
  tags: string[];
  image?: string;
  notes?: string;
  age?: string; // 対象年齢
  meetingPoint?: string; // 集合場所
  maxPeople?: string; // 最大人数
  items?: string[]; // 持ち物
};

export default function ActivityModal({ activity, onClose }: { activity: Activity | null; onClose: () => void }) {
  if (!activity) return null;
  const price = `¥${activity.price.toLocaleString()} 税込 / 1名`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-[92%] max-w-lg rounded-2xl bg-white/80 backdrop-blur ring-1 ring-white/60 shadow-xl overflow-hidden">
        {activity.image ? (
          <img src={activity.image} alt={`${activity.title} の写真`} className="w-full aspect-video object-cover" />
        ) : null}
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-heading text-xl text-deepsea">{activity.title}</h3>
            <button aria-label="閉じる" className="text-deepsea/60 hover:text-deepsea" onClick={onClose}>✕</button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {activity.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded-full bg-foam text-deepsea">{t}</span>
            ))}
          </div>
          <div className="mt-4 text-deepsea/90 text-sm">
            <span>{price}</span>
            <span className="mx-2">・</span>
            <span>{activity.duration}</span>
          </div>
          <div className="mt-5 grid gap-3 text-sm text-deepsea/90">
            {activity.age && (
              <div>
                <p className="font-semibold text-deepsea">対象年齢</p>
                <p className="mt-1 text-deepsea/80">{activity.age}</p>
              </div>
            )}
            {activity.meetingPoint && (
              <div>
                <p className="font-semibold text-deepsea">集合場所</p>
                <p className="mt-1 text-deepsea/80">{activity.meetingPoint}</p>
              </div>
            )}
            {activity.maxPeople && (
              <div>
                <p className="font-semibold text-deepsea">最大人数</p>
                <p className="mt-1 text-deepsea/80">{activity.maxPeople}</p>
              </div>
            )}
            {activity.items && activity.items.length > 0 && (
              <div>
                <p className="font-semibold text-deepsea">持ち物</p>
                <ul className="mt-1 list-disc list-inside text-deepsea/80">
                  {activity.items.map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              </div>
            )}
            {activity.notes && (
              <div>
                <p className="font-semibold text-deepsea">注意事項</p>
                <p className="mt-1 whitespace-pre-wrap text-deepsea/80">{activity.notes}</p>
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 rounded-md bg-coral text-deepsea font-medium">閉じる</button>
          </div>
        </div>
      </div>
    </div>
  );
}


