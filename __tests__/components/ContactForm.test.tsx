import {
  render,
  screen,
  fireEvent,
  waitFor,
  queryByDisplayValue,
  getByTestId,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from '@/components/ContactForm';
import { sendContactEmail } from '@/service/contact';
import Banner, { BannerData } from '@/components/Banner';

jest.mock('@/service/contact');
jest.mock('@/components/Banner');
// jest.mock('@/components/Banner', () => {
//   const originalModule = jest.requireActual('@/components/Banner');
//   return {
//     __esModule: true,
//     ...originalModule,
//     Banner: jest.fn(async () => ({ message: 'success', state: 'success' })),
//   };
// });

describe('ContactForm', () => {
  afterEach(() => {
    (
      sendContactEmail as jest.MockedFunction<typeof sendContactEmail>
    ).mockReset();
    // (Banner as jest.MockedFunction<typeof Banner>).mockReset();
  });

  xit('renders correctly', () => {
    const { container } = render(<ContactForm />);
    expect(container).toMatchSnapshot();
  });

  xit('renders basic ui correctly', () => {
    render(<ContactForm />);

    expect(Banner as jest.MockedFunction<typeof Banner>).not.toBeCalled();
    expect(screen.getByText('Your Email')).toBeInTheDocument();
    expect(screen.getByText('Subject')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('displays a success message banner when we receive a success message and automatically hid it after 3 seconds', async () => {
    const successBanner: BannerData = { message: 'success', state: 'success' };
    (sendContactEmail as jest.Mock).mockImplementation(async (form) => {
      return successBanner;
    });
    // mocked Banner
    (Banner as jest.MockedFunction<typeof Banner>).mockImplementation(
      ({ banner: { message, state } }) => {
        return (
          <p>
            {state === 'success' ? '✅' : '🔥'} {message}
          </p>
        );
      }
    );
    render(<ContactForm />);
    // expect(Banner as jest.MockedFunction<typeof Banner>).toBeCalled();
    const fromInput = screen.getByTestId('from');

    await fireEvent.change(fromInput, {
      target: { value: 'jin123@google.com' },
    });

    await waitFor(() =>
      expect(screen.getByTestId('from')).toHaveDisplayValue('jin123@google.com')
    );
    const subjectInput = screen.getByTestId('subject');
    fireEvent.change(subjectInput, {
      target: { value: 'hi' },
    });
    await waitFor(() =>
      expect(screen.getByTestId('subject')).toHaveDisplayValue('hi')
    );

    const messageInput = screen.getByTestId('message');

    //
    await fireEvent.change(messageInput, {
      target: { value: 'hi, there' },
    });
    await waitFor(() =>
      expect(screen.getByTestId('message')).toHaveDisplayValue('hi, there')
    );

    //
    const submitButton = screen.getByRole('button');

    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('✅ success')).toBeInTheDocument();
    });
  });

  it('displays a error message banner when we receive a error message and automatically hid it after 3 seconds', async () => {
    const errorBanner: BannerData = { message: 'error', state: 'error' };
    (sendContactEmail as jest.Mock).mockImplementation(async (form) => {
      throw new Error(errorBanner.message);
    });
    (Banner as jest.MockedFunction<typeof Banner>).mockImplementation(
      ({ banner: { message, state } }) => {
        console.log('got state:', state);
        return (
          <p>
            {state === 'success' ? '✅' : '🔥'} {message}
          </p>
        );
      }
    );
    render(<ContactForm />);
    const fromInput = screen.getByTestId('from');

    await fireEvent.change(fromInput, {
      target: { value: 'jin123@google.com' },
    });

    await waitFor(() =>
      expect(screen.getByTestId('from')).toHaveDisplayValue('jin123@google.com')
    );
    const subjectInput = screen.getByTestId('subject');
    fireEvent.change(subjectInput, {
      target: { value: 'hi' },
    });
    await waitFor(() =>
      expect(screen.getByTestId('subject')).toHaveDisplayValue('hi')
    );

    const messageInput = screen.getByTestId('message');

    //
    await fireEvent.change(messageInput, {
      target: { value: 'hi, there' },
    });
    await waitFor(() =>
      expect(screen.getByTestId('message')).toHaveDisplayValue('hi, there')
    );

    //
    const submitButton = screen.getByRole('button');

    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('🔥 error')).toBeInTheDocument();
    });
    await waitForElementToBeRemoved(screen.getByText('🔥 error'), {
      timeout: 3000,
    });
  });
});
