import '@/mocks/CarouselPostsMock';
import '@/mocks/FeaturedPostsMock';
import mockedCarouselPosts from '@/mocks/CarouselPostsMock';
import mockedFeaturedPosts from '@/mocks/FeaturedPostsMock';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '@/app/page';
import Hero from '@/components/Hero';

// 🐛 hoisting not work
jest.mock('@/components/CarouselPosts');
jest.mock('@/components/FeaturedPosts');
jest.mock('@/components/Hero');

describe.skip('HomePage', () => {
  afterEach(() => {
    mockedCarouselPosts.mockReset();
    mockedFeaturedPosts.mockReset();
    (Hero as jest.Mock).mockReset();
  });
  it('renders correctly', () => {
    render(<HomePage />);
    expect(mockedCarouselPosts).toHaveBeenCalledTimes(1);
    expect(mockedFeaturedPosts).toHaveBeenCalledTimes(1);
    expect(Hero).toHaveBeenCalledTimes(1);
  });
});
