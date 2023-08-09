import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostData from '../../public/data/posts.json';
import { Post } from '@/service/posts';
import PostCard from '@/components/PostCard';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import mockRouter from 'next-router-mock';

describe.skip('PostCard', () => {
  const post: Post = PostData[0];
  const { title, description, date, category, path } = post;

  it('renders correctly', () => {
    const { container } = render(<PostCard post={post} />);
    expect(container).toMatchSnapshot();
  });

  it('renders post details correctly', () => {
    render(<PostCard post={post} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByText(date.toString())).toBeInTheDocument();
    expect(screen.getByText(category)).toBeInTheDocument();
  });

  it('navigates to clicked post page on the post click', async () => {
    render(<PostCard post={post} />, { wrapper: MemoryRouterProvider });

    await fireEvent.click(screen.getByRole('link'));
    expect(mockRouter.asPath).toBe(`/posts/${path}`);
  });
});
