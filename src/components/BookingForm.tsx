"use client";

type Activity = {
  slug: string;
  title: string;
};

export default function BookingForm({ activities, to }: { activities: Activity[]; to: string }) {
  return (
    <form
      className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        const name = encodeURIComponent(String(data.get('name') || ''));
        const email = encodeURIComponent(String(data.get('email') || ''));
        const phone = encodeURIComponent(String(data.get('phone') || ''));
        const people = encodeURIComponent(String(data.get('people') || ''));
        const dateRaw = String(data.get('date') || '');
        const date = encodeURIComponent(dateRaw);
        const activity = encodeURIComponent(String(data.get('activity') || ''));
        const message = encodeURIComponent(String(data.get('message') || ''));
        const subject = encodeURIComponent(`【予約希望】${activity} ${date}`);
        const body = `お名前: ${name}\nメール: ${email}\n電話: ${phone}\n人数: ${people}\n希望日: ${date}\n希望アクティビティ: ${activity}\nご要望: ${message}\n\n※ 価格は税込 / 1名 で表示`;
        window.location.href = `mailto:${to}?subject=${subject}&body=${encodeURIComponent(body)}`;
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
      <button className="sm:col-span-2 mt-2 px-5 py-3 rounded-md bg-coral text-deepsea font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-deepsea" type="submit">メール作成</button>
    </form>
  );
}


