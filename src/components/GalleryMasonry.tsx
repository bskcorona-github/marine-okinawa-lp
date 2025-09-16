"use client";

import ComingSoonImage from './ComingSoonImage';

export default function GalleryMasonry({ images }: { images: string[] }) {
  const list = images.length ? images : Array.from({ length: 6 }).map(() => '');
  return (
    <section className="container-pad py-12 md:py-16" id="gallery">
      <h2 className="font-heading text-2xl md:text-3xl text-deepsea">ギャラリー</h2>
      <div className="mt-6 columns-2 md:columns-3 gap-4 [column-fill:_balance]
        [&>div]:mb-4">
        {list.map((src, i) => (
          <div key={i} className="break-inside-avoid">
            <ComingSoonImage src={src} alt={`ギャラリー${i + 1}`} className="w-full h-auto rounded-xl" />
          </div>
        ))}
      </div>
    </section>
  );
}


