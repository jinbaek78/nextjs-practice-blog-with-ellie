import { readFile } from 'fs/promises';
import path from 'path';

export type Post = {
  title: string;
  description: string;
  date: string;
  category: string;
  path: string;
  featured: boolean;
};

type PostData = Post & { content: string };

export async function getFeaturedPosts(): Promise<Post[]> {
  return getAllPosts() //
    .then((posts) => posts.filter((post) => post.featured));
}

export async function getNonFeaturedPosts(): Promise<Post[]> {
  return getAllPosts() //
    .then((posts) => posts.filter((post) => !post.featured));
}

export async function getAllPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'posts.json');
  return readFile(filePath, 'utf-8')
    .then<Post[]>(JSON.parse)
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
}

export async function getPostData(fileName: string): Promise<PostData> {
  const filePath = path.join(
    process.cwd(),
    'public',
    'data',
    'posts',
    `${fileName}.md`
  );
  const metadata = await getAllPosts() //
    .then((posts) => posts.find((post) => post.path === fileName));
  if (!metadata) {
    throw new Error(`can not find the ${fileName} of the file.`);
  }

  const content = await readFile(filePath, 'utf-8');
  return { ...metadata, content };
}
