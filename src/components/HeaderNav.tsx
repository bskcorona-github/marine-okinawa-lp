"use client";

import { useState } from 'react';

export default function HeaderNav() {
  const [open, setOpen] = useState(false);
  // aria + escape close
  const close = () => setOpen(false);
  if (typeof window !== 'undefined') {
    document.body.style.overflow = open ? 'hidden' : '';
  }
  return (
    <header className="fixed top-0 inset-x-0 z-30 bg-white/70 backdrop-blur border-b border-white/50">
      <div className="container-pad h-14 flex items-center justify-between">
        <a href="#" aria-label="トップへ" className="font-heading text-deepsea text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded">
          沖縄 海遊び
        </a>
        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-5 text-deepsea/90">
          <a href="#activities" className="hover:text-deepsea">アクティビティ</a>
          <a href="#booking" className="hover:text-deepsea">予約</a>
          <a href="#about" className="hover:text-deepsea">事業者情報</a>
          <a href="#faq" className="hover:text-deepsea">FAQ</a>
          <a href="#sns" className="hover:text-deepsea">SNS</a>
        </nav>
        {/* Mobile burger */}
        <button aria-label="メニュー" aria-expanded={open} aria-controls="mobile-drawer" className="sm:hidden text-deepsea/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded" onClick={() => setOpen(true)}>
          ☰
        </button>
      </div>

      {/* Drawer */}
      {open && (
        <div className="sm:hidden fixed inset-0 z-40" onKeyDown={(e) => { if (e.key === 'Escape') close(); }}>
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <nav id="mobile-drawer" className="absolute top-0 right-0 h-full w-64 bg-white/95 backdrop-blur shadow-xl p-6 flex flex-col gap-4">
            <button aria-label="閉じる" className="self-end text-deepsea/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded" onClick={close}>✕</button>
            <a href="#activities" onClick={close} className="text-deepsea focus:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded">アクティビティ</a>
            <a href="#booking" onClick={close} className="text-deepsea focus:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded">予約</a>
            <a href="#about" onClick={close} className="text-deepsea focus:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded">事業者情報</a>
            <a href="#faq" onClick={close} className="text-deepsea focus:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded">FAQ</a>
            <a href="#sns" onClick={close} className="text-deepsea focus:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded">SNS</a>
          </nav>
        </div>
      )}
    </header>
  );
}
