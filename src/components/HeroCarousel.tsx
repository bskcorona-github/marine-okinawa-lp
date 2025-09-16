"use client";

import { useRef } from 'react';
import ComingSoonImage from './ComingSoonImage';

export default function HeroCarousel({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <div className="flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth">
        {images.map((src, i) => (
          <div key={i} className="relative shrink-0 w-full h-full snap-center">
            <ComingSoonImage src={src} alt={`ヒーロー${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <span key={i} className="h-2 w-2 rounded-full bg-white/70" />
        ))}
      </div>
    </div>
  );
}


