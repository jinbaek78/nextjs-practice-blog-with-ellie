import { getPostsData } from '@/service/post';
import PostCard from './PostCard';

type Props = {
  sortOption: 'all' | 'featured' | 'notFeatured';
};

export default async function Posts({ sortOption }: Props) {
  // option
  const data = await getPostsData();
  const sorted =
    sortOption === 'all'
      ? data
      : sortOption === 'featured'
      ? data.filter((post) => post.featured)
      : data.filter((post) => !post.featured);

  return (
    <section className="my-3 ">
      <h2 className="text-2xl font-bold">Featured Posts</h2>
      <ul className="grid grid-cols-4 gap-4 my-2">
        {sorted.map((post) => (
          <PostCard key={post.title} postData={post} />
        ))}
      </ul>
    </section>
  );
}
