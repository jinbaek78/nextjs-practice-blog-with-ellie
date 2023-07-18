import Image from 'next/image';
import ProfileImage from '../../public/images/profile.jpeg';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="text-center">
      <Image
        className="rounded-full mx-auto"
        src={ProfileImage}
        alt="picture of author"
        width={250}
        priority
      />
      <h2 className="text-3xl font-bold mt-2">{"Hi, I'm Jin"}</h2>
      <h3 className="text-xl font-semibold">Full-stack Engineer</h3>
      <Link href={'/contact'}>
        <button className="bg-yellow-500 font-bold rounded-xl py-1 px-4 mt-2">
          Contact Me
        </button>
      </Link>
    </section>
  );
}
