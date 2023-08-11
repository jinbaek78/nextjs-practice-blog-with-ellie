const mockedPostContent = jest.fn();
jest.mock('@/components/PostContent', () => mockedPostContent);
export default mockedPostContent;
