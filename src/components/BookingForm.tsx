"use client";

import { useState } from 'react';

type Activity = {
  slug: string;
  title: string;
};

export default function BookingForm({ activities, to }: { activities: Activity[]; to: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);

        // Raw values for API
        const nameRaw = String(data.get('name') || '');
        const emailRaw = String(data.get('email') || '');
        const phoneRaw = String(data.get('phone') || '');
        const peopleRaw = String(data.get('people') || '');
        const dateRaw = String(data.get('date') || '');
        const activityRaw = String(data.get('activity') || '');
        const messageRaw = String(data.get('message') || '');

        // Encoded values for mailto fallback
        const name = encodeURIComponent(nameRaw);
        const email = encodeURIComponent(emailRaw);
        const phone = encodeURIComponent(phoneRaw);
        const people = encodeURIComponent(peopleRaw);
        const date = encodeURIComponent(dateRaw);
        const activity = encodeURIComponent(activityRaw);
        const message = encodeURIComponent(messageRaw);

        const subject = `【予約希望】${activityRaw} ${dateRaw}`.trim();
        const bodyPlain = `お名前: ${nameRaw}\nメール: ${emailRaw}\n電話: ${phoneRaw}\n人数: ${peopleRaw}\n希望日: ${dateRaw}\n希望アクティビティ: ${activityRaw}\nご要望: ${messageRaw}\n\n※ 価格は税込 / 1名 で表示`;
        const fallbackHref = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyPlain)}`;

        setIsSubmitting(true);
        try {
          const res = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: nameRaw,
              email: emailRaw,
              phone: phoneRaw,
              people: peopleRaw,
              date: dateRaw,
              activity: activityRaw,
              message: messageRaw,
            }),
          });

          if (res.ok) {
            alert('送信しました。ありがとうございます。');
            form.reset();
          } else {
            // Fallback to mail client
            window.location.href = fallbackHref;
          }
        } catch (err) {
          // Network error -> fallback to mail client
          window.location.href = fallbackHref;
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <input name="name" placeholder="お名前" className="border rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral" required />
      <input name="email" type="email" placeholder="メールアドレス" className="border rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral" required />
      <input name="phone" placeholder="電話番号" className="border rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral" />
      <input name="people" type="number" min={1} placeholder="人数" className="border rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral" required />
      <input name="date" type="date" placeholder="希望日" className="border rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral" min={new Date().toISOString().split('T')[0]} required />
      <select name="activity" className="border rounded px-3 py-2">
        {activities.map((a) => (
          <option key={a.slug} value={a.title}>{a.title}</option>
        ))}
      </select>
      <textarea name="message" placeholder="ご要望" className="border rounded px-3 py-2 sm:col-span-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral" rows={4} />
      <button
        className="sm:col-span-2 mt-2 px-5 py-3 rounded-md bg-coral text-deepsea font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-deepsea disabled:opacity-60 disabled:cursor-not-allowed"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? '送信中…' : 'メール送信'}
      </button>
    </form>
  );
}


