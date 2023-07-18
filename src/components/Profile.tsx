import Image from 'next/image';
import Link from 'next/link';

export default function Profile() {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Image
        className="rounded-full"
        src={'/images/profile.jpeg'}
        width={350}
        height={350}
        alt="avatar"
      />
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold text-3xl">{"Hi, I'm Jin"}</p>
        <p className="font-medium">Full-stack Engineer</p>
        <p>a person codes my dream, dream coder Jin</p>
      </div>
      <Link
        href={'/contact'}
        className="bg-yellow-500 font-semibold rounded-lg p-1"
      >
        Contact Me
      </Link>
    </div>
  );
}
