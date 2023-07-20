import MarkdownViewer from '@/components/MarkdownViewer';
import { getPostData } from '@/service/posts';
import Image from 'next/image';
import { AiTwotoneCalendar } from 'react-icons/ai';

type Props = {
  params: {
    slug: string;
  };
};
export default async function PostPage({ params: { slug } }: Props) {
  const { path, title, content, date, description } = await getPostData(slug);

  return (
    <section className="bg-zinc-100">
      <Image
        className="w-full h-[30rem] rounded-xl"
        alt="postImage"
        src={`/images/posts/${path}.png`}
        width={400}
        height={400}
      />
      <div className="px-5 py-2 flex flex-col">
        <div className=" flex text-xl items-center justify-end text-sky-500 font-bold">
          <AiTwotoneCalendar className="mr-2 text-2xl" />
          <time className="self-end">{date}</time>
        </div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <h3 className="text-xl font-semibold ">{description}</h3>
        <div className="my-4 w-44 h-1 bg-sky-500"></div>
      </div>
      <MarkdownViewer content={content} />
    </section>
  );
}
