import Hero from '@/components/Hero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description: "Jin's Career",
};

const TITLE_CLASS = 'text-2xl font-bold text-gray-800 my-2';

export default function AboutPage() {
  return (
    <>
      <Hero />
      <section className="bg-gray-100 shadow-lg p-8 m-8 text-center">
        <h2 className={TITLE_CLASS}>Who AM I?</h2>
        <p>
          A FullStack developer who loves development so much <br />
          {'I am making an web application including human and design'}
        </p>
        <h2 className={TITLE_CLASS}>Career</h2>
        <p>
          Googler (-Now)
          <br />
          maceBook (-2019) <br />
          samjun (-2016){' '}
        </p>
        <h2 className={TITLE_CLASS}>Skills</h2>
        <p>
          React, Vue, Node
          <br />
          Git, Clean code
          <br />
          VS Code, MongoDB
        </p>
      </section>
    </>
  );
}
