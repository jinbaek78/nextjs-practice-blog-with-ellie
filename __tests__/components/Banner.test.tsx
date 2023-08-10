import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Banner, { BannerData } from '@/components/Banner';

describe.skip('Banner', () => {
  it('renders a success message when they receive a success message', () => {
    const successBanner: BannerData = { message: 'success', state: 'success' };
    render(<Banner banner={successBanner} />);

    expect(screen.getByText(/✅ success/i)).toBeInTheDocument();
  });

  it('renders a error message when they receive a error message', () => {
    const errorBanner: BannerData = { message: 'error', state: 'error' };
    render(<Banner banner={errorBanner} />);

    expect(screen.getByText(/🔥 error/i)).toBeInTheDocument();
  });
});
