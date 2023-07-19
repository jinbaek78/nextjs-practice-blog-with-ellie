'use client';

import { Post } from '@/service/posts';
import { useState } from 'react';
import PostsGrid from './PostsGrid';
import Category from './Category';

type Props = {
  posts: Post[];
};

export type Category =
  | 'All Posts'
  | 'my story'
  | 'frontend'
  | 'backend'
  | 'javascript';

export default function Posts({ posts }: Props) {
  const [selected, setSelected] = useState<Category>('All Posts');
  const filtered =
    selected === 'All Posts'
      ? posts
      : posts.filter((post) => post.category === selected);

  return (
    <main className="flex gap-10">
      <section className="grow">
        <PostsGrid posts={filtered} />
      </section>
      <section className=" my-3 ">
        <Category selected={selected} onSelected={setSelected} />
      </section>
    </main>
  );
}
