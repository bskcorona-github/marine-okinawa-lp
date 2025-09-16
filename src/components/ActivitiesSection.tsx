"use client";

import Reveal from './Reveal';
import ActivityModal from './ActivityModal';
import { useState } from 'react';
import type { Activity } from '@/data/activities';

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
    <div className="rounded-2xl overflow-hidden shadow-md bg-white/60 backdrop-blur ring-1 ring-white/60 hover:shadow-xl hover:-translate-y-0.5 transition-transform duration-200">
      {activity.image ? (
        <img src={activity.image} alt={`${activity.title} の写真`} className="w-full aspect-video object-cover" loading="lazy" />
      ) : (
        <NoImageCard />
      )}
      <div className="p-4">
        <h3 className="font-heading text-lg text-deepsea">{activity.title}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {activity.tags.map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/70 backdrop-blur ring-1 ring-black/10 text-deepsea/90">
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
          <button onClick={() => onOpen(activity)} className="text-sm px-3 py-2 rounded-md bg-white/80 backdrop-blur ring-1 ring-black/10 text-deepsea hover:bg-white">
            詳細を見る
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ActivitiesSection({ activities }: { activities: Activity[] }) {
  const [modal, setModal] = useState<Activity | null>(null);
  const open = (a: Activity) => setModal(a);
  const close = () => setModal(null);
  return (
    <section id="activities" className="container-pad py-12 md:py-16">
      <Reveal>
        <h2 className="font-heading text-2xl md:text-3xl text-deepsea">アクティビティ</h2>
      </Reveal>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((a, idx) => (
          <Reveal key={a.slug} delay={100 * idx}>
            <ActivityCard activity={a} onOpen={open} />
          </Reveal>
        ))}
      </div>
      <ActivityModal activity={modal} onClose={close} />
    </section>
  );
}


