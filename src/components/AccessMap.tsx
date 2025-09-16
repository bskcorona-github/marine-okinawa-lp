"use client";

export default function AccessMap() {
  return (
    <section className="container-pad py-12 md:py-16" id="access">
      <h2 className="font-heading text-2xl md:text-3xl text-deepsea">アクセス</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-6 items-start">
        <div className="rounded-2xl overflow-hidden ring-1 ring-white/60 bg-white/60 backdrop-blur">
          <iframe
            title="集合場所地図"
            src="https://www.google.com/maps?q=%E5%AE%9C%E9%87%8E%E6%B9%BE%E3%83%9E%E3%83%AA%E3%83%BC%E3%83%8A&hl=ja&z=15&output=embed"
            width="100%"
            height="300"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="text-deepsea/90 text-sm">
          <p className="font-semibold text-deepsea">集合場所</p>
          <p className="mt-1">宜野湾マリーナ（宜野湾港マリーナ）</p>
          <p className="mt-3 font-semibold text-deepsea">営業時間</p>
          <p className="mt-1">8:00–18:00（不定休）</p>
        </div>
      </div>
    </section>
  );
}


