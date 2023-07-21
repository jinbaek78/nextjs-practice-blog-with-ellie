import { BannerData } from '@/components/Banner';
import { Form } from '@/components/ContactForm';
import { object, string, number, date, InferType } from 'yup';

export async function sendEmail(
  data: Form
  // callback: (banner: BannerData) => void
): Promise<BannerData> {
  let formSchema = object({
    subject: string().required(),
    from: string().email().required(),
    message: string().min(2).required(),
  });

  let dataValidationResult;
  try {
    dataValidationResult = await formSchema.validate(data);
  } catch (err) {
    console.log(err);
    return { message: 'please, write the right format', state: 'error' };
  }

  const formHeader = new Headers();
  formHeader.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: formHeader,
    body: JSON.stringify(data),
  };

  let res;
  let resultBanner: BannerData;
  try {
    res = await fetch('http://localhost:3000/api/contact', requestOptions);
  } catch (err) {
    console.log(err);
    return (resultBanner = { message: 'fail', state: 'error' });
  }

  return res.status === 200
    ? { message: 'success', state: 'success' }
    : { message: 'fail', state: 'error' };

  // return fetch('http://localhost:3000/api/contact', requestOptions)
  //   .then((response) => response.json())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log('error', error));
}
