'use client';

import { Post } from '@/service/posts';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PostCard from './PostCard';

type Props = {
  posts: Post[];
};
export default function CarouselPosts({ posts }: Props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <Carousel
      className="my-3"
      slidesToSlide={2}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      customTransition="all 1.5s"
      transitionDuration={1500}
      removeArrowOnDeviceType={['tablet', 'mobile']}
    >
      {posts.map((post) => (
        <li key={post.path} className="mx-2">
          <PostCard post={post} />
        </li>
      ))}
    </Carousel>
  );
}
