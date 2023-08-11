import '@/mocks/PostContentMock';
// import postContentMock from '@/mocks/PostContentMock';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { resolvedComponent } from '@/tests/util';
import AdjacentPostCard from '@/components/AdjacentPostCard';

//  🐛
// import PostContent from '@/components/PostContent';
import PostPage from '@/app/posts/[slug]/page';
import { getFeaturedPosts, getPostData } from '@/service/posts';
import postsData from '../../../../public/data/posts.json';

jest.mock('@/service/posts', () => ({
  getFeaturedPosts: jest.fn(),
  getPostData: jest.fn(),
}));

jest.mock('@/components/AdjacentPostCard');

//   🐛 hoisting error: they can not be hoisted for some reason.
// so, as someone in github suggested the solution, I made some mock file  and import it here so that their hoisting work well

// 🐛 jest.mock('@/components/PostContent'); 🐛

describe.skip('Dynamic Posts Page', () => {
  const posts = postsData;
  const postData = {
    ...posts[1],
    content: 'content',
    next: posts[0],
    prev: posts[2],
  };
  afterEach(() => {
    (getFeaturedPosts as jest.Mock).mockReset();
    (getPostData as jest.Mock).mockReset();
    (getFeaturedPosts as jest.Mock).mockReset();
  });
  it('renders', async () => {
    const { path, title, prev, next } = postData;
    (getFeaturedPosts as jest.Mock).mockImplementation(async () => postData);
    (getPostData as jest.Mock).mockImplementation(() => postData);
    (getFeaturedPosts as jest.Mock).mockImplementation(async () => postData);

    const ResolvedDynamicPostPage = await resolvedComponent(PostPage, {
      params: { slug: ' test' },
    });
    render(<ResolvedDynamicPostPage />);

    expect((screen.getByRole('img') as HTMLImageElement).src).toMatch(
      postData.path
    );
    expect(screen.getByAltText(title)).toBeInTheDocument();
    expect(AdjacentPostCard).toHaveBeenCalledTimes(2);
    expect((AdjacentPostCard as jest.Mock).mock.calls[0][0].post).toEqual(
      postData.prev
    );
    expect((AdjacentPostCard as jest.Mock).mock.calls[1][0].post).toEqual(
      postData.next
    );
  });
});
