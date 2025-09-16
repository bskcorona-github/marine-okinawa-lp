"use client";

import { useEffect, useMemo, useState } from 'react';

export default function AnimatedHeading({
  text,
  as: Tag = 'h1',
  className,
  delay = 100,
  pauseAfterChar,
  pauseMs = 0,
}: {
  text: string;
  as?: any;
  className?: string;
  delay?: number; // ms per char
  pauseAfterChar?: string; // この文字の後に追加ディレイ
  pauseMs?: number; // 追加ディレイms
}) {
  const chars = useMemo(() => Array.from(text), [text]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const pauseIndex = useMemo(() => {
    if (!pauseAfterChar) return -1;
    return chars.findIndex((c) => c === pauseAfterChar);
  }, [chars, pauseAfterChar]);

  return (
    <Tag className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {chars.map((c, i) => (
          <span
            key={i}
            className="inline-block will-change-transform opacity-0 translate-y-3 animate-charIn"
            style={{ animationDelay: `${i * delay + (pauseIndex >= 0 && i > pauseIndex ? pauseMs : 0)}ms` }}
          >
            {c === ' ' ? '\u00A0' : c}
          </span>
        ))}
      </span>
    </Tag>
  );
}


