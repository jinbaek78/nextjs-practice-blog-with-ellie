import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import PostData from '../../public/data/posts.json';
// import PostsGrid from '@/components/PostsGrid';
import FeaturedPosts from '@/components/FeaturedPosts';

// import * as postsService from '@/service/posts';
import { getFeaturedPosts } from '@/service/posts';
import Hero from '@/components/Hero';

jest.mock('@/service/posts');
// jest.mock('@/components/PostsGrid');

const posts = PostData;
describe.skip('FeaturedPosts', () => {
  it('renders correctly', () => {
    (
      getFeaturedPosts as jest.MockedFunction<typeof getFeaturedPosts>
    ).mockImplementation(async () => {
      console.log('mocked getFe...');
      return posts;
    });

    // render(<FeaturedPosts />);
    render(<Hero />);

    //
  });
});
