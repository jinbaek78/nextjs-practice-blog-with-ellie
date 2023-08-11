import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getFeaturedPosts } from '@/service/posts';
import PostsGrid from '@/components/PostsGrid';
import FeaturedPosts from '@/components/FeaturedPosts';
import PostData from '../../public/data/posts.json';
import { resolvedComponent } from '@/tests/util';
jest.mock('@/service/posts', () => ({
  getFeaturedPosts: jest.fn(),
}));
jest.mock('@/components/PostsGrid');
const posts = PostData;

describe.skip('FeaturedPosts', () => {
  it('renders correctly', async () => {
    (getFeaturedPosts as jest.Mock).mockImplementation(async () => posts);
    (PostsGrid as jest.MockedFunction<typeof PostsGrid>).mockImplementation(
      () => {
        console.log('mocked PostsGrid called');
        return <h1>test</h1>;
      }
    );
    // render(<FeaturedPosts />);
    const ResolvedFeaturedPosts = await resolvedComponent(FeaturedPosts);
    render(<ResolvedFeaturedPosts />);

    expect(PostsGrid).toHaveBeenCalledTimes(1);
    //
  });
});
