import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Categories from '@/components/Categories';
import postData from '../../public/data/posts.json';
import { Post } from '@/service/posts';

describe.skip('Categories', () => {
  const posts: Post[] = postData;
  const categories = [...new Set(posts.map((post) => post.category))];
  const mockedOnClick = jest.fn();

  afterEach(() => {
    mockedOnClick.mockReset();
  });

  it('renders correctly', () => {
    const { container } = render(
      <Categories
        categories={categories}
        selected="javascript"
        onClick={mockedOnClick}
      />
    );

    expect(container).toMatchSnapshot();
  });
  it('should call onclick method on a category click', async () => {
    render(
      <Categories
        categories={categories}
        selected="javascript"
        onClick={mockedOnClick}
      />
    );

    const category = screen.getAllByRole('listitem')[0];
    await fireEvent.click(category);
    expect(mockedOnClick).toHaveBeenCalledTimes(1);
  });
});
