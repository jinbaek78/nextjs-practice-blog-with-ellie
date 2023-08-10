import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import postData from '../../public/data/posts.json';
import { Post } from '@/service/posts';
import AdjacentPostCard from '@/components/AdjacentPostCard';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

jest.mock('react-icons/fa', () => ({
  FaArrowLeft: jest.fn(() => console.log('fake left called')),
  FaArrowRight: jest.fn(() => console.log('fake right called')),
}));

describe.skip('AdjacentPostCard', () => {
  const posts: Post[] = postData;
  const postInfo = posts[0];
  const { path, title, description } = postInfo;

  afterEach(() => {
    (FaArrowLeft as jest.Mock).mockReset();
    (FaArrowRight as jest.Mock).mockReset();
  });

  xit('renders correctly', () => {
    const { container } = render(
      <AdjacentPostCard post={postInfo} type="prev" />
    );
    expect(container).toMatchSnapshot();
  });

  xit('renders with props correctly', () => {
    const postInfo = posts[0];
    render(<AdjacentPostCard post={postInfo} type="prev" />);
    const link = screen.getByRole('link') as HTMLLinkElement;

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(link.href).toBe(`http://localhost/posts/${path}`);
  });

  it('navigates to the clicked post page when the previous post is clicked', async () => {
    render(<AdjacentPostCard post={postInfo} type="prev" />, {
      wrapper: MemoryRouterProvider,
    });
    const button = screen.getByRole('link');
    await fireEvent.click(button);
    expect(mockRouter.asPath).toEqual(`/posts/${path}`);
    expect(FaArrowLeft).toHaveBeenCalledTimes(1);
    expect(FaArrowRight).not.toBeCalled();
  });

  it('navigates to the clicked post page when the next post is clicked', async () => {
    const nextPost = posts[2];
    const { path, title, description } = nextPost;
    render(<AdjacentPostCard post={nextPost} type="next" />, {
      wrapper: MemoryRouterProvider,
    });
    const button = screen.getByRole('link');
    await fireEvent.click(button);
    expect(mockRouter.asPath).toEqual(`/posts/${path}`);
    expect(FaArrowRight).toHaveBeenCalledTimes(1);
    expect(FaArrowLeft).not.toBeCalled();
  });
});
