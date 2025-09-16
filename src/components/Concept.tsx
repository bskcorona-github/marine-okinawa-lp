export default function Concept() {
  const points = [
    { title: 'はじめてでも安心', desc: '少人数で丁寧にサポート' },
    { title: '写真データ無料', desc: '思い出を丸ごとお渡し' },
    { title: '柔軟対応', desc: '天候や体力に合わせてご提案' },
  ];
  return (
    <section className="container-pad py-12 md:py-16">
      <h2 className="font-heading text-2xl md:text-3xl text-deepsea">コンセプト</h2>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {points.map((p) => (
          <div key={p.title} className="rounded-2xl bg-white/60 backdrop-blur ring-1 ring-white/60 p-5">
            <p className="font-semibold text-deepsea">{p.title}</p>
            <p className="text-deepsea/80 mt-1 text-sm">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


