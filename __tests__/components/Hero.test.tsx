import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '@/components/Hero';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import mockRouter from 'next-router-mock';

describe.skip('Hero', () => {
  it('renders correctly', () => {
    const { container } = render(<Hero />);
    expect(container).toMatchSnapshot();
  });

  it('navigates to contact page on contact me button click', async () => {
    render(<Hero />, { wrapper: MemoryRouterProvider });

    await fireEvent.click(screen.getByRole('link'));
    expect(mockRouter.asPath).toBe(`/contact`);
  });
});
