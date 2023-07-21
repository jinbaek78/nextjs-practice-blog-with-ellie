'use client';

import { FormEvent, useState } from 'react';

const LABEL_CLASS = 'flex flex-col text-3xl w-[30rem] text-white p-2';
const INPUT_CLASS = 'text-black outline-none p-1 px-2';
const PARAGRAPH_CLASS = '"my-2 mb-3';
type INPUT_TYPE = 'from' | 'subject' | 'message';

export default function EmailForm() {
  const [from, setFrom] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ from, subject, message });
    setIsSuccess(true);
  };

  const handleChange = (e: FormEvent<HTMLElement>) => {
    const target: HTMLInputElement | HTMLTextAreaElement = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement;

    const type: INPUT_TYPE = target.name as INPUT_TYPE;

    if (type === 'from') {
      return setFrom(target.value);
    } else if (type === 'subject') {
      return setSubject(target.value);
    } else {
      return setMessage(target.value);
    }
  };

  return (
    <section>
      {isSuccess && (
        <p className="mt-6 mb-8 rounded-xl bg-green-300 text-center text-2xl p-2 font-semibold">
          {'✅ success!'}
        </p>
      )}
      <form
        className="flex flex-col bg-slate-700 text-black w-full p-4 mt-3 rounded-xl"
        onSubmit={handleSubmit}
      >
        <label className={LABEL_CLASS}>
          <p className={PARAGRAPH_CLASS}>Your Email</p>
          <input
            onChange={handleChange}
            value={from}
            className={INPUT_CLASS}
            type="text"
            name="from"
          />
        </label>
        <label className={LABEL_CLASS}>
          <p className={PARAGRAPH_CLASS}>Subject</p>
          <input
            onChange={handleChange}
            value={subject}
            className={INPUT_CLASS}
            type="text"
            name="subject"
          />
        </label>
        <label className={LABEL_CLASS}>
          <p className={PARAGRAPH_CLASS}>Message</p>
          <textarea
            onChange={handleChange}
            value={message}
            className="h-[20rem] text-black outline-none p-2"
            name="message"
          />
        </label>
        <button
          className=" mx-2 p-2 text-2xl my-3 bg-yellow-400  text-slate-700 font-bold"
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
