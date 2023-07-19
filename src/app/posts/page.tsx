import Posts from '@/components/Posts';
import { getAllPosts } from '@/service/posts';

export default async function PostsPage() {
  const posts = await getAllPosts();

  return <Posts posts={posts} />;
}
