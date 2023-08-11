const mockedFeaturedPosts = jest.fn();
jest.mock('@/components/FeaturedPosts', () => mockedFeaturedPosts);
export default mockedFeaturedPosts;
