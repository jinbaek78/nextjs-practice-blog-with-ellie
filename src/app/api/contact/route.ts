import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.USER_PASS,
  },
});

export async function POST(req: Request) {
  const data = await req.json();

  let res;
  try {
    res = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: data.subject,
      text: `${data.message}\n\nsender:${data.from}`,
    });
  } catch (err) {
    console.log(err);
    console.log('got error');
    return NextResponse.json({ res }, { status: 500 });
  }

  return NextResponse.json({ res });
}
