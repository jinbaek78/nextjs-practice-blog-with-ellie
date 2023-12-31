import { readFile } from 'fs/promises';
import path from 'path';
import { cache } from 'react';

export type Post = {
  title: string;
  description: string;
  date: string;
  category: string;
  path: string;
  featured: boolean;
};

export type PostData = Post & {
  content: string;
  next: Post | null;
  prev: Post | null;
};

export async function getFeaturedPosts(): Promise<Post[]> {
  console.log('getFeaturedPosts called');
  return getAllPosts() //
    .then((posts) => posts.filter((post) => post.featured));
}

export async function getNonFeaturedPosts(): Promise<Post[]> {
  console.log('getNonFeaturedPosts called');
  return getAllPosts() //
    .then((posts) => posts.filter((post) => !post.featured));
}

export const getAllPosts = cache(async () => {
  console.log('getAllPosts called');
  const filePath = path.join(process.cwd(), 'public', 'data', 'posts.json');
  return readFile(filePath, 'utf-8')
    .then<Post[]>(JSON.parse)
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
});

// export async function getAllPosts(): Promise<Post[]> {
//   console.log('getAllPosts called');
//   const filePath = path.join(process.cwd(), 'public', 'data', 'posts.json');
//   return readFile(filePath, 'utf-8')
//     .then<Post[]>(JSON.parse)
//     .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
// }

export async function getPostData(fileName: string): Promise<PostData> {
  console.log('getPostData called');
  const filePath = path.join(
    process.cwd(),
    'public',
    'data',
    'posts',
    `${fileName}.md`
  );
  const posts = await getAllPosts();
  const post = posts.find((post) => post.path === fileName);

  if (!post) {
    throw new Error(`can not find the ${fileName} of the file.`);
  }

  const index = posts.indexOf(post);
  const next = index > 0 ? posts[index - 1] : null;
  const prev = index < posts.length - 1 ? posts[index + 1] : null;
  const content = await readFile(filePath, 'utf-8');
  return { ...post, content, next, prev };
}
