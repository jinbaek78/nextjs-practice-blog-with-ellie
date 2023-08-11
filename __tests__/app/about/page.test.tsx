import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutPage from '@/app/about/page';
import Hero from '@/components/Hero';
import { AiFillDelete } from 'react-icons/ai';

jest.mock('@/components/Hero');

describe.skip('AboutPage', () => {
  afterEach(() => {
    (Hero as jest.Mock).mockReset();
  });
  it('renders', () => {
    const { container } = render(<AboutPage />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly', () => {
    render(<AboutPage />);

    expect(Hero).toHaveBeenCalled();
  });
});
