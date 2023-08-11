import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactPage, { LINKS } from '@/app/contact/page';

describe.skip('Contact Page', () => {
  it('renders', () => {
    const { container } = render(<ContactPage />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly', () => {
    render(<ContactPage />);
    expect(screen.getAllByRole('link')).toHaveLength(LINKS.length);
  });
});
