'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Banner, { BannerData } from './Banner';
import { sendContactEmail } from '@/service/contact';

type Form = {
  from: string;
  subject: string;
  message: string;
};

const DEFAULT_FORM = {
  from: '',
  subject: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState<Form>(DEFAULT_FORM);

  const [banner, setBanner] = useState<BannerData | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendContactEmail(form) //
      .then(({ message }) => {
        setBanner({
          message,
          state: 'success',
        });
        setForm(DEFAULT_FORM);
      })
      .catch(({ message }) => {
        setBanner({
          message,
          state: 'error',
        });
      })
      .finally(() => {
        setTimeout(() => {
          setBanner(null);
        }, 3000);
      });
  };

  return (
    <section className="w-full max-w-md ">
      {banner && <Banner banner={banner} />}
      <form
        className="w-full  flex flex-col gap-2 m-4 p-4 bg-slate-700 rounded-xl text-white"
        onSubmit={onSubmit}
      >
        <label className="font-semibold" htmlFor="from">
          Your Email
        </label>
        <input
          className="text-black"
          type="email"
          id="from"
          name="from"
          required
          autoFocus
          value={form.from}
          onChange={onChange}
        />

        <label className="font-semibold" htmlFor="subject">
          Subject
        </label>
        <input
          className="text-black"
          type="text"
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={onChange}
        />

        <label className="font-semibold" htmlFor="message">
          Message
        </label>
        <textarea
          className="text-black"
          rows={10}
          id="message"
          name="message"
          required
          value={form.message}
          onChange={onChange}
        />
        <button
          className="bg-yellow-300 text-black font-bold hover:bg-yellow-400"
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
