const mockedMarkdownViewer = jest.fn();
jest.mock('@/components/MarkdownViewer', () => mockedMarkdownViewer);
export default mockedMarkdownViewer;
