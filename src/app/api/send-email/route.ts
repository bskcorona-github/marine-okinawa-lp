import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    const subject = `【予約希望】${body.activity ?? ''} ${body.date ?? ''}`.trim();
    const text = `お名前: ${body.name ?? ''}
メール: ${body.email ?? ''}
電話: ${body.phone ?? ''}
人数: ${body.people ?? ''}
希望日: ${body.date ?? ''}
希望アクティビティ: ${body.activity ?? ''}
ご要望: ${body.message ?? ''}

※ 価格は税込 / 1名 で表示`;

    await transporter.sendMail({ from, to, subject, text });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}


