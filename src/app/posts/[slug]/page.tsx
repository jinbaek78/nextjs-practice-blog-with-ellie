import MarkdownViewer from '@/components/MarkdownViewer';
import { getPostData, getPreviousNextPost } from '@/service/posts';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';
import { AiTwotoneCalendar } from 'react-icons/ai';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
type Props = {
  params: {
    slug: string;
  };
};
export default async function PostPage({ params: { slug } }: Props) {
  const {
    title,
    content,
    path: path,
    description,
    date,
  } = await getPostData(slug);
  // get prev / next Post
  const [prevPost, nextPost] = await getPreviousNextPost(path);

  return (
    <article className="rounded-2xl overflow-hidden bg-gray-100 shadow-lg m-4">
      <Image
        className="w-full h-1/5 max-h-[500px]"
        src={`/images/posts/${path}.png`}
        alt={title}
        width={760}
        height={420}
      />

      <section className="flex flex-col p-4">
        <div className="flex items-center self-end text-sky-600">
          <AiTwotoneCalendar />
          <p className="font-semibold ml-2">{date.toString()}</p>
        </div>
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-xl font-bold">{description}/</p>
        <div className="w-44 border-2 border-sky-600 mt-4 mb-8"></div>
        <MarkdownViewer content={content} />
      </section>
      <section className="flex w-full">
        {prevPost && (
          <Link
            href={`/posts/${prevPost?.path}`}
            style={{
              backgroundImage: `url('/images/posts/${prevPost.path}.png')`,
            }}
            className="flex justify-evenly items-center w-full grow bg-cover bg-center h-44"
          >
            <FaArrowLeft className="text-6xl text-yellow-300 font-semibold" />
            <div className="text-white font-semibold">
              <h1 className="text-3xl font-bold">{prevPost?.title}</h1>
              <h3 className="text-xl font-normal">{prevPost?.description}</h3>
            </div>
          </Link>
        )}
        {nextPost && (
          <Link
            href={`/posts/${nextPost?.path}`}
            style={{
              backgroundImage: `url('/images/posts/${nextPost.path}.png')`,
              backgroundColor: '#0o0',
              opacity: '0.5',
            }}
            className="flex justify-evenly items-center w-full grow bg-cover bg-center h-44  "
          >
            <div className="text-white font-semibold">
              <h1 className="text-3xl font-bold">{nextPost?.title}</h1>
              <h3 className="text-xl font-normal">{nextPost?.description}</h3>
            </div>
            <FaArrowRight className="text-6xl text-yellow-300 font-semibold" />
          </Link>
        )}
      </section>
    </article>
  );
}
