import { getAllPosts, getBlogPost } from '@/service/posts';
import notFound from './not-found';
import BlogPost from '@/components/BlogPost';

type Props = {
  params: {
    slug: string;
  };
};

export default async function BlogPostPage({ params: { slug } }: Props) {
  const blogPaths = (await getAllPosts()).map((post) => post.path);
  if (!blogPaths.includes(slug)) {
    return notFound();
  }

  const blogPost = await getBlogPost(slug);
  return <BlogPost post={blogPost} />;
}

export async function generateStaticParams() {
  const blogPaths = (await getAllPosts()).map((post) => post.path);
  return blogPaths.map((path) => ({
    slug: path,
  }));
}
