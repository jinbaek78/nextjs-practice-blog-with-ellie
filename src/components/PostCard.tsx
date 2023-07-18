import { Post } from '@/service/post';
import Image from 'next/image';

type Props = {
  postData: Post;
};
export default function PostCard({
  postData: { path, date, title, description, category },
}: Props) {
  console.log(path, date, title);
  return (
    <li className="flex flex-col gap-1 shadow-xl rounded-lg">
      <Image
        className="rounded-lg"
        src={`/images/posts/${path}.png`}
        alt="post-image"
        width={400}
        height={150}
      />
      <p className="text-right text-zinc-800 mr-3">{date}</p>
      <div className="flex flex-col justify-center items-center">
        <h3 className="font-semibold text-lg">{title}</h3>
        <h5 className="text-sm">{description}</h5>
        <div className="bg-green-200 rounded-xl py-1 px-4 text-sm mt-3 mb-5">
          {category}
        </div>
      </div>
    </li>
  );
}
