import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostsGrid from '@/components/PostsGrid';
import Categories from '@/components/Categories';
import FilterablePosts from '@/components/FilterablePosts';
import { Post } from '@/service/posts';
import PostData from '../../public/data/posts.json';

jest.mock('@/components/PostsGrid');
// jest.mock('@/components/Categories');

describe('FilterablePosts', () => {
  const posts: Post[] = PostData;
  const categories = [...new Set(posts.map((post) => post.category))];

  afterEach(() => {
    (PostsGrid as jest.MockedFunction<typeof PostsGrid>).mockReset();
  });

  it('filters ALL Posts correctly', () => {
    (PostsGrid as jest.MockedFunction<typeof PostsGrid>).mockImplementation();
    // (Categories as jest.MockedFunction<typeof Categories>).mockImplementation();
    render(<FilterablePosts posts={PostData} categories={categories} />);
    expect(
      (PostsGrid as jest.MockedFunction<typeof PostsGrid>).mock.calls[0][0]
    ).toEqual({ posts });
  });

  // should I test FilterablePosts and Categories to check the filter works welL?
  it('filters javascript Posts correctly', async () => {
    (PostsGrid as jest.MockedFunction<typeof PostsGrid>).mockImplementation();
    render(<FilterablePosts posts={PostData} categories={categories} />);
    const filterOption = 'javascript';
    await fireEvent.click(screen.getByText(filterOption));
    const filtered = posts.filter((post) => post.category === filterOption);
    await waitFor(() => {
      expect(
        PostsGrid as jest.MockedFunction<typeof PostsGrid>
      ).toHaveBeenCalledTimes(2);
    });

    expect(
      (PostsGrid as jest.MockedFunction<typeof PostsGrid>).mock.calls[1][0]
        .posts
    ).toStrictEqual(filtered);

    // const { container } = render(
    //   <FilterablePosts posts={PostData} categories={categories} />
    // );
    // expect(container).toMatchSnapshot();

    // type Props = {
    //   onClick: (category: string) => void;
    // };
    // (PostsGrid as jest.MockedFunction<typeof PostsGrid>).mockImplementation();
    // (Categories as jest.MockedFunction<typeof Categories>).mockImplementation(
    //   ({ onClick }: Props): JSX.Element => {
    //     setTimeout(() => {
    //       onClick('javascript');
    //     }, 100);
    //     return <h1>just JSX</h1>;
    //   }
    // );

    // render(<FilterablePosts posts={PostData} categories={categories} />);
    // const javascriptPosts = posts.filter(
    //   (post) => post.category === 'javascript'
    // );
    // console.log('javascriptPosts:', javascriptPosts);
    // await waitFor(() => {
    //   // console.log(
    //   //   (PostsGrid as jest.MockedFunction<typeof PostsGrid>).mock.calls[0][0]
    //   // );
    //   expect(
    //     (PostsGrid as jest.MockedFunction<typeof PostsGrid>).mock.calls[1][0]
    //   ).toEqual(1);
    // });
  });

  it('filters my story Posts correctly', async () => {
    (PostsGrid as jest.MockedFunction<typeof PostsGrid>).mockImplementation();
    render(<FilterablePosts posts={PostData} categories={categories} />);
    const filterOption = 'my story';
    await fireEvent.click(screen.getByText(filterOption));
    const filtered = posts.filter((post) => post.category === filterOption);
    await waitFor(() => {
      expect(
        PostsGrid as jest.MockedFunction<typeof PostsGrid>
      ).toHaveBeenCalledTimes(2);
    });

    expect(
      (PostsGrid as jest.MockedFunction<typeof PostsGrid>).mock.calls[1][0]
        .posts
    ).toStrictEqual(filtered);
  });

  it('filters backend Posts correctly', async () => {
    (PostsGrid as jest.MockedFunction<typeof PostsGrid>).mockImplementation();
    render(<FilterablePosts posts={PostData} categories={categories} />);
    const filterOption = 'backend';
    await fireEvent.click(screen.getByText(filterOption));
    const filtered = posts.filter((post) => post.category === filterOption);
    await waitFor(() => {
      expect(
        PostsGrid as jest.MockedFunction<typeof PostsGrid>
      ).toHaveBeenCalledTimes(2);
    });

    expect(
      (PostsGrid as jest.MockedFunction<typeof PostsGrid>).mock.calls[1][0]
        .posts
    ).toStrictEqual(filtered);
  });
  it('filters frontend Posts correctly', async () => {
    (PostsGrid as jest.MockedFunction<typeof PostsGrid>).mockImplementation();
    render(<FilterablePosts posts={PostData} categories={categories} />);
    const filterOption = 'frontend';
    await fireEvent.click(screen.getByText(filterOption));
    const filtered = posts.filter((post) => post.category === filterOption);
    await waitFor(() => {
      expect(
        PostsGrid as jest.MockedFunction<typeof PostsGrid>
      ).toHaveBeenCalledTimes(2);
    });

    expect(
      (PostsGrid as jest.MockedFunction<typeof PostsGrid>).mock.calls[1][0]
        .posts
    ).toStrictEqual(filtered);
  });
});
