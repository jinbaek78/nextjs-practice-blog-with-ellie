import postsData from '../../public/data/posts.json';
import { render, screen } from '@testing-library/react';
import PostCard from '@/components/PostCard';
import PostsGrid from '@/components/PostsGrid';
jest.mock('@/components/PostCard');

describe.skip('PostGrid', () => {
  const posts = postsData;
  afterEach(() => {
    (PostCard as jest.MockedFunction<typeof PostCard>).mockReset();
  });
  it('renders with posts correctly', () => {
    render(<PostsGrid posts={posts} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(posts.length);
  });

  it('renders correctly', () => {
    const { asFragment } = render(<PostsGrid posts={posts} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
