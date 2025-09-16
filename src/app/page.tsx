import Link from 'next/link';
import { Metadata } from 'next';
import HeaderNav from '../components/HeaderNav';
import BookingForm from '../components/BookingForm';
import AnimatedHeading from '../components/AnimatedHeading';
import Reveal from '../components/Reveal';
import ActivitiesSection from '../components/ActivitiesSection';
import { activities } from '../data/activities';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

// Header replaced by HeaderNav (client component)

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-okinawa-sky-sea pt-14">
      <div className="absolute inset-0 overflow-hidden">
        <picture>
          <source media="(max-width: 640px)" srcSet="/images/hero-640.webp" />
          <source media="(min-width: 641px)" srcSet="/images/hero.webp" />
          <img src="/images/hero.webp" alt="沖縄の海の静止画" className="w-full h-full object-cover object-[calc(50%+150px)_center] sm:object-center" loading="eager" />
        </picture>
      </div>
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative z-10 container-pad text-center text-white">
        <AnimatedHeading
          text="海と遊ぶ、沖縄時間。"
          className="font-heading text-4xl sm:text-5xl md:text-6xl tracking-wide drop-shadow-lg"
          pauseAfterChar="、"
          pauseMs={1000}
        />
        <p className="mt-3 text-base sm:text-lg opacity-95 text-slow-fade">
          沖縄のマリンスポーツ・マリンレジャーで海遊び。
        </p>
        {/* CTAボタンはヒーローから削除（要望） */}
        {/* 下矢印は非表示（要望） */}
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { title: '安全第一', desc: 'ガイドが丁寧にサポート' },
    { title: '少人数制', desc: 'はじめてでも安心' },
    { title: '写真無料', desc: '思い出をしっかり残す' },
    { title: '柔軟対応', desc: '天候に合わせてご提案' },
    { title: '送迎あり', desc: 'エリア内ご相談ください' },
  ];
  return (
    <section className="container-pad py-12 md:py-16 scroll-mt-16" id="reasons">
      <Reveal>
        <h2 className="font-heading text-2xl md:text-3xl text-deepsea">選ばれる5つの理由</h2>
      </Reveal>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        {items.map((it, idx) => (
          <Reveal key={it.title} delay={100 * idx} className="rounded-2xl bg-white/50 backdrop-blur ring-1 ring-white/60 p-5 shadow-sm">
            <p className="font-semibold text-deepsea">{it.title}</p>
            <p className="text-sm text-deepsea/80 mt-1">{it.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

type Activity = typeof activities[number];

// activities are imported from data module

function NoImageCard() {
  return (
    <div className="aspect-video w-full rounded-md bg-okinawa-foam flex items-center justify-center text-deepsea/70 text-sm">
      Coming soon
    </div>
  );
}

function ActivityCard({ activity, onOpen }: { activity: Activity; onOpen: (a: Activity) => void }) {
  const price = `¥${activity.price.toLocaleString()} 税込 / 1名`;
  return (
    <div className="rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-md hover:-translate-y-0.5 transition-transform duration-200">
      {activity.image ? (
        <img src={activity.image} alt={`${activity.title} の写真`} className="w-full aspect-video object-cover" loading="lazy" />
      ) : (
        <NoImageCard />
      )}
      <div className="p-4">
        <h3 className="font-heading text-lg text-deepsea">{activity.title}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {activity.tags.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-foam text-deepsea">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3 text-deepsea/90 text-sm">
          <span>{price}</span>
          <span className="mx-2">・</span>
          <span>{activity.duration}</span>
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={() => onOpen(activity)} className="text-sm px-3 py-2 rounded bg-foam text-deepsea">
            詳細を見る
          </button>
        </div>
      </div>
    </div>
  );
}

function Activities() {
  return <section className="scroll-mt-16"><ActivitiesSection activities={activities} /></section>;
}

function Booking() {
  const to = 'kanemasa.tatsuro@gmail.com';
  return (
    <section id="booking" className="container-pad py-12 md:py-16 scroll-mt-16">
      <Reveal>
        <h2 className="font-heading text-2xl md:text-3xl text-deepsea">予約（メール）</h2>
      </Reveal>
      <Reveal delay={100}>
        <p className="mt-2 text-deepsea/80 text-sm">入力内容からメールを自動生成して開きます。価格は税込 / 1名です。</p>
      </Reveal>
      <Reveal delay={200}>
        <BookingForm
          to={to}
          activities={activities.map((a) => ({ slug: a.slug, title: a.title }))}
        />
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-8 border-t">
      <div className="container-pad py-8" id="sns">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-deepsea/80 text-sm">© {new Date().getFullYear()} 沖縄 海遊び</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="text-deepsea/80 hover:text-deepsea">Instagram</a>
            <a href="#" aria-label="TikTok" className="text-deepsea/80 hover:text-deepsea">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function StructuredData() {
  const business = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: '沖縄 海遊び',
    areaServed: '沖縄県',
    url: 'https://example.com/',
    description: '沖縄のマリンスポーツ・マリンレジャー体験（少人数・写真無料・税込/1名）',
  };
  const products = activities.map((a) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: a.title,
    description: `${a.title} 体験（${a.duration}）`,
    brand: '沖縄 海遊び',
    offers: {
      '@type': 'Offer',
      price: a.price,
      priceCurrency: 'JPY',
      availability: 'https://schema.org/InStock',
    },
  }));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }} />
      {products.map((p, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(p) }} />
      ))}
    </>
  );
}

function PriceTable() {
  return (
    <section className="container-pad py-12 md:py-16">
      <Reveal>
        <h2 className="font-heading text-2xl md:text-3xl text-deepsea">価格・所要時間</h2>
      </Reveal>
      <div className="mt-6 overflow-x-auto bg-white/60 backdrop-blur ring-1 ring-white/60 rounded-2xl p-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-deepsea/90">
              <th className="py-2 pr-4">アクティビティ</th>
              <th className="py-2 pr-4">価格（税込/1名）</th>
              <th className="py-2 pr-4">所要時間</th>
            </tr>
          </thead>
          <tbody className="text-deepsea">
            {activities.map((a, idx) => (
              <tr key={a.slug} className={idx % 2 === 0 ? 'bg-white/40' : 'bg-white/20'}>
                <td className="py-2 pr-4">{a.title}</td>
                <td className="py-2 pr-4">¥{a.price.toLocaleString()}</td>
                <td className="py-2 pr-4">{a.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="container-pad py-12 md:py-16 scroll-mt-16">
      <Reveal>
        <h2 className="font-heading text-2xl md:text-3xl text-deepsea">事業者情報</h2>
      </Reveal>
      <div className="mt-6 grid gap-4 text-deepsea/90">
        <p><span className="font-semibold text-deepsea">屋号</span>: 沖縄 海遊び</p>
        <p><span className="font-semibold text-deepsea">所在地</span>: 沖縄県〇〇市〇〇 1-2-3</p>
        <p><span className="font-semibold text-deepsea">電話</span>: 098-000-0000</p>
        <p><span className="font-semibold text-deepsea">営業時間</span>: 8:00–18:00（不定休・天候により変動）</p>
        <p><span className="font-semibold text-deepsea">許認可</span>: マリンレジャー保険加入 / 事業者登録番号: 000000</p>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { q: '雨天の場合は？', a: '安全第一で催行可否を判断します。中止の場合は料金は発生しません。' },
    { q: '持ち物は？', a: '濡れても良い服装・タオル・サンダル。日焼け対策も推奨です。' },
    { q: '泳げなくても参加できますか？', a: '参加可能です。ライフジャケット着用でスタッフがサポートします。' },
    { q: '子ども料金はありますか？', a: 'アクティビティごとに異なります。各カードの詳細をご確認ください。' },
    { q: '集合場所はどこですか？', a: '各アクティビティの詳細をご確認ください。' },
  ];
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <section id="faq" className="container-pad py-12 md:py-16 scroll-mt-16">
      <Reveal>
        <h2 className="font-heading text-2xl md:text-3xl text-deepsea">よくある質問</h2>
      </Reveal>
      <div className="mt-6 grid gap-4">
        {faqs.map((f) => (
          <details key={f.q} className="rounded-md bg-foam p-4">
            <summary className="cursor-pointer font-semibold text-deepsea">{f.q}</summary>
            <p className="mt-2 text-deepsea/90">{f.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    </section>
  );
}

export default function Page() {
  return (
    <main>
      <HeaderNav />
      <Hero />
      <Features />
      <PriceTable />
      <Activities />
      <Booking />
      <AboutSection />
      <FAQSection />
      <Footer />
      <StructuredData />
    </main>
  );
}


