"use client";

export default function ComingSoonImage({ src, alt, className }: { src?: string; alt: string; className?: string }) {
  if (!src) {
    return (
      <div className={`flex items-center justify-center bg-okinawa-foam text-deepsea/70 ${className ?? ''}`}>
        Coming soon
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} loading="lazy" />;
}


