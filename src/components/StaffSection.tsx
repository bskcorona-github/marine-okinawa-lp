import ComingSoonImage from './ComingSoonImage';

type Staff = { name: string; role: string; image?: string; intro?: string };

const staffList: Staff[] = [
  { name: 'Taro', role: 'インストラクター', image: undefined, intro: '安全第一でサポートします。' },
  { name: 'Hanako', role: 'ガイド', image: undefined, intro: 'おすすめスポットをご案内。' },
];

export default function StaffSection() {
  return (
    <section className="container-pad py-12 md:py-16" id="staff">
      <h2 className="font-heading text-2xl md:text-3xl text-deepsea">スタッフ紹介</h2>
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {staffList.map((s) => (
          <div key={s.name} className="rounded-2xl bg-white/60 backdrop-blur ring-1 ring-white/60 p-4">
            <ComingSoonImage src={s.image} alt={`${s.name}`} className="w-full aspect-[4/3] object-cover rounded-xl" />
            <p className="mt-3 font-semibold text-deepsea">{s.name}</p>
            <p className="text-deepsea/70 text-sm">{s.role}</p>
            <p className="text-deepsea/80 text-sm mt-1">{s.intro}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


