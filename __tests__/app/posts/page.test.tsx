import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import PostsPage from '@/app/posts/page';
import postData from '../../../public/data/posts.json';
import { resolvedComponent } from '@/tests/util';

import { getAllPosts } from '@/service/posts';
import FilterablePosts from '@/components/FilterablePosts';
jest.mock('@/service/posts', () => ({
  getAllPosts: jest.fn(),
}));
jest.mock('@/components/FilterablePosts');

describe.skip('Posts Page', () => {
  const posts = postData;
  const categories = [...new Set(posts.map((post) => post.category))];
  afterEach(() => {
    (FilterablePosts as jest.Mock).mockReset();
    (getAllPosts as jest.Mock).mockReset();
  });

  it('renders correctly', async () => {
    (getAllPosts as jest.Mock).mockImplementation(async () => posts);
    const ResolvedPostPage = await resolvedComponent(PostsPage);
    render(<ResolvedPostPage />);

    expect(FilterablePosts).toHaveBeenCalledTimes(1);
    expect((FilterablePosts as jest.Mock).mock.calls[0][0].posts).toStrictEqual(
      posts
    );
    expect(
      (FilterablePosts as jest.Mock).mock.calls[0][0].categories
    ).toStrictEqual(categories);
  });
  //
  //
});
