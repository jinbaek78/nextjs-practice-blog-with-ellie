import EmailForm from '@/components/EmailForm';
import { BsGithub, BsLinkedin, BsYoutube } from 'react-icons/bs';
export default function ContactPage() {
  const ICON_CLASS = 'hover:text-yellow-500';
  return (
    <article className="w-full flex flex-col items-center justify-center">
      <section className="">
        <div className="flex flex-col items-center justify-center">
          <h1 className="my-3 text-4xl font-bold">Contact Me</h1>
          <p className="text-lg font-medium">info@dream-coding.com</p>
          <div className="my-3 w-full flex justify-around font-bold text-5xl">
            <BsGithub className={ICON_CLASS} />
            <BsLinkedin className={ICON_CLASS} />
            <BsYoutube className={ICON_CLASS} />
          </div>
        </div>
      </section>
      <h2 className="my-5 text-4xl font-bold">Or Send me an email</h2>
      <EmailForm />
    </article>
  );
}
