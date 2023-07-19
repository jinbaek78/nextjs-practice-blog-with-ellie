import FeaturedPosts from '@/components/FeaturedPosts';
import Hero from '@/components/Hero';
import NotFeaturedPosts from '@/components/NotFeaturedPosts.';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPosts />
      <NotFeaturedPosts />
    </>
  );
}
