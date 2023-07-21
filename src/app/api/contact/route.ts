import { sendEmail } from '@/service/email';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

const bodySchema = yup.object().shape({
  from: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().min(3).required(),
});

export async function POST(req: Request) {
  const body = await req.json();

  if (!bodySchema.isValidSync(body)) {
    return NextResponse.json(
      { message: 'it is invalid format' },
      { status: 400 }
    );
  }

  return sendEmail(body) //
    .then(() =>
      NextResponse.json(
        { message: 'your email has successfully delivered' },
        { status: 200 }
      )
    )
    .catch((error) => {
      console.error(error);
      return NextResponse.json(
        {
          message: 'your delivery has failed, please, try again',
        },
        { status: 500 }
      );
    });
}
