const mockedCarouselPosts = jest.fn();
jest.mock('@/components/CarouselPosts', () => mockedCarouselPosts);
export default mockedCarouselPosts;
