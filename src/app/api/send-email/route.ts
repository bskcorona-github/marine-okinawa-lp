import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { activities } from '../../../data/activities';

type BookingPayload = {
  name?: string;
  email?: string;
  phone?: string;
  people?: string;
  date?: string;
  activity?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BookingPayload;

    const host = process.env.MAIL_HOST;
    const port = Number(process.env.MAIL_PORT || 587);
    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_PASS;
    const from = process.env.MAIL_FROM || user;
    const to = process.env.MAIL_FROM || user;

    if (!host || !port || !user || !pass || !from || !to) {
      return NextResponse.json({ ok: false, error: 'Mail env is not configured' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const matched = activities.find(a => a.title === body.activity || a.slug === body.activity);
    const unitPrice = matched?.price ?? 0;
    const peopleNum = Number(body.people ?? '0') || 0;
    const total = unitPrice * peopleNum;

    const subject = `【予約希望】${body.activity ?? ''} ${body.date ?? ''}`.trim();
    const text = `お名前: ${body.name ?? ''}
メール: ${body.email ?? ''}
電話: ${body.phone ?? ''}
人数: ${body.people ?? ''}
希望日: ${body.date ?? ''}
希望アクティビティ: ${body.activity ?? ''}
ご要望: ${body.message ?? ''}

単価(税込/1名): ¥${unitPrice.toLocaleString()}
合計(税込): ¥${total.toLocaleString()}

※ 価格は税込 / 1名 で表示`;

    await transporter.sendMail({ from, to, subject, text });

    // Send confirmation to customer (from MAIL_FROM to customer's email)
    if (body.email) {
      const confirmSubject = '【予約受付】お申込みありがとうございます';
      const detailLines = [
        `アクティビティ: ${matched?.title ?? body.activity ?? ''}`,
        `所要時間: ${matched?.duration ?? ''}`,
        `集合場所: ${matched?.meetingPoint ?? '宜野湾マリーナ 集合'}`,
        `対象年齢: ${matched?.age ?? ''}`,
        `最大人数: ${matched?.maxPeople ?? ''}`,
        matched?.items?.length ? `持ち物: ${matched.items.join('、')}` : '',
        matched?.notes ? `注意事項: ${matched.notes}` : '',
      ].filter(Boolean).join('\n');

      const confirmText = `${body.name ?? ''} 様\n\nこの度はお申込みありがとうございます。内容を確認いたしました。\n\n【お申込み内容】\n日付: ${body.date ?? ''}\n人数: ${peopleNum} 名\n単価(税込/1名): ¥${unitPrice.toLocaleString()}\n合計(税込): ¥${total.toLocaleString()}\n\n【サービス詳細】\n${detailLines}\n\n本メールは自動送信です。内容に相違がある場合はご返信ください。`;

      await transporter.sendMail({
        from,
        to: String(body.email),
        subject: confirmSubject,
        text: confirmText,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}


