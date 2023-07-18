import fs from 'fs/promises';
import path from 'path';
import { cwd } from 'process';

export type Post = {
  title: string;
  description: string;
  date: string;
  category: string;
  path: string;
  featured: boolean;
};

export async function getPostsData(): Promise<Post[]> {
  const postsData = await JSON.parse(
    await fs.readFile(`${path.join(cwd(), 'public', 'data', 'posts.json')}`, {
      encoding: 'utf-8',
    })
  );

  return postsData;
}
