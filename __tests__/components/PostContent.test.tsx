import '@/mocks/MarkdownViewerMock';
import mockedMarkdownViewer from '@/mocks/MarkdownViewerMock';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostContent from '@/components/PostContent';
import posts from '../../public/data/posts.json';

// 🐛 hoisting not work;
jest.mock('@/components/MarkdownViewer');

describe('PostContent', () => {
  const postData = {
    ...posts[1],
    content: 'content',
    next: posts[2],
    prev: posts[0],
  };
  it('renders', () => {
    const { title, content, description, date } = postData;
    render(<PostContent post={postData} />);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByText(date.toString())).toBeInTheDocument();

    expect(mockedMarkdownViewer.mock.calls[0][0].content).toBe(content);
  });
});
