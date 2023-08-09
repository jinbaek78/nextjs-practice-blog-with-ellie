import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '@/components/Footer';

describe.skip('Footer', () => {
  it('renders correctly', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
