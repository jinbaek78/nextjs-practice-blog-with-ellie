import Hero from '@/components/Hero';
import Posts from '@/components/Posts';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Posts sortOption="featured" />
    </>
  );
}
