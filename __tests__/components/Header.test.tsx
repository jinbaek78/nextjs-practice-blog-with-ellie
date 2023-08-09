import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import mockRouter from 'next-router-mock';
import Header from '@/components/Header';

describe.skip('Header', () => {
  it('renders correctly', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  it('navigates to home page on blog title click', async () => {
    render(<Header />, { wrapper: MemoryRouterProvider });
    await fireEvent.click(screen.getAllByRole('link')[0]);
    expect(mockRouter.asPath).toBe(`/`);
  });

  it('navigates to home page on home button click', async () => {
    render(<Header />, { wrapper: MemoryRouterProvider });
    await fireEvent.click(screen.getByText('home'));
    expect(mockRouter.asPath).toBe(`/`);
  });

  it('navigates to about page on about button click', async () => {
    render(<Header />, { wrapper: MemoryRouterProvider });
    await fireEvent.click(screen.getByText('about'));
    expect(mockRouter.asPath).toBe(`/about`);
  });

  it('navigates to posts page on posts button click', async () => {
    render(<Header />, { wrapper: MemoryRouterProvider });
    await fireEvent.click(screen.getByText('posts'));
    expect(mockRouter.asPath).toBe(`/posts`);
  });

  it('navigates to contact page on contact button click', async () => {
    render(<Header />, { wrapper: MemoryRouterProvider });
    await fireEvent.click(screen.getByText('contact'));
    expect(mockRouter.asPath).toBe(`/contact`);
  });
});
