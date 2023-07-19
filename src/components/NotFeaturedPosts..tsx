import { getNotFeaturedPosts } from '@/service/posts';
import CarouselPosts from './CarouselPosts';

export default async function NotFeaturedPosts() {
  const posts = await getNotFeaturedPosts();

  return (
    <section>
      <h2 className="text-2xl font-bold my-2">Featured Posts</h2>
      <CarouselPosts posts={posts} />
    </section>
  );
}
