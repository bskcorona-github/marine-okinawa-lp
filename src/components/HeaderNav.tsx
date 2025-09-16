"use client";

import { useEffect, useState } from 'react';

export default function HeaderNav() {
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  // aria + escape close
  const close = () => setOpen(false);
  if (typeof window !== 'undefined') {
    document.body.style.overflow = open ? 'hidden' : '';
  }
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { root: null, rootMargin: '-56px 0px 0px 0px', threshold: 0 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-30 transition-colors ${
      overHero ? 'bg-transparent border-transparent' : 'bg-white/70 backdrop-blur border-b border-white/50'
    }`}>
      <div className="container-pad h-14 flex items-center justify-between">
        <a href="#" aria-label="トップへ" className={`font-heading text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded ${overHero ? 'text-white' : 'text-deepsea'}`}>
          沖縄 海遊び
        </a>
        {/* Desktop nav */}
        <nav className={`hidden sm:flex items-center gap-5 ${overHero ? 'text-white/90' : 'text-deepsea/90'}`}>
          <a href="#activities" className={overHero ? 'hover:text-white' : 'hover:text-deepsea'}>アクティビティ</a>
          <a href="#booking" className={overHero ? 'hover:text-white' : 'hover:text-deepsea'}>予約</a>
          <a href="#about" className={overHero ? 'hover:text-white' : 'hover:text-deepsea'}>事業者情報</a>
          <a href="#faq" className={overHero ? 'hover:text-white' : 'hover:text-deepsea'}>FAQ</a>
          <a href="#sns" className={overHero ? 'hover:text-white' : 'hover:text-deepsea'}>SNS</a>
        </nav>
        {/* Mobile burger */}
        <button aria-label="メニュー" aria-expanded={open} aria-controls="mobile-drawer" className={`sm:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded ${overHero ? 'text-white/90' : 'text-deepsea/90'}`} onClick={() => setOpen(true)}>
          ☰
        </button>
      </div>

      {/* Drawer */}
      {open && (
        <div className="sm:hidden fixed inset-0 z-40" onKeyDown={(e) => { if (e.key === 'Escape') close(); }}>
          <div className="absolute inset-0 bg-transparent" onClick={() => setOpen(false)} />
          <nav id="mobile-drawer" className="absolute top-0 right-0 h-full w-64 bg-transparent backdrop-blur-0 shadow-none p-6 flex flex-col gap-4">
            <button aria-label="閉じる" className="self-end text-deepsea/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded" onClick={close}>✕</button>
            <a href="#activities" onClick={close} className="text-deepsea/90 rounded-xl px-4 py-3 bg-white/60 backdrop-blur ring-1 ring-white/60 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-coral hover:bg-white/70 hover:shadow-lg transition">アクティビティ</a>
            <a href="#booking" onClick={close} className="text-deepsea/90 rounded-xl px-4 py-3 bg-white/60 backdrop-blur ring-1 ring-white/60 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-coral hover:bg-white/70 hover:shadow-lg transition">予約</a>
            <a href="#about" onClick={close} className="text-deepsea/90 rounded-xl px-4 py-3 bg-white/60 backdrop-blur ring-1 ring-white/60 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-coral hover:bg-white/70 hover:shadow-lg transition">事業者情報</a>
            <a href="#faq" onClick={close} className="text-deepsea/90 rounded-xl px-4 py-3 bg-white/60 backdrop-blur ring-1 ring-white/60 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-coral hover:bg-white/70 hover:shadow-lg transition">FAQ</a>
            <a href="#sns" onClick={close} className="text-deepsea/90 rounded-xl px-4 py-3 bg-white/60 backdrop-blur ring-1 ring-white/60 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-coral hover:bg-white/70 hover:shadow-lg transition">SNS</a>
          </nav>
        </div>
      )}
    </header>
  );
}
