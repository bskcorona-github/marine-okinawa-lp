"use client";

import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, delay = 0, as: Tag = 'div', className }: { children: React.ReactNode; delay?: number; as?: any; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={
        `${className ?? ''} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ` +
        (shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')
      }
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}


