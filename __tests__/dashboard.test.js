import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Dashboard from '@/pages/dashboard';
import { AppProvider } from '@/components/providers/AppProvider';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Dashboard', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      push: jest.fn(),
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
    });
  });


  it('renders the Study Stats', () => {
    render(<AppProvider><Dashboard/></AppProvider>)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })

  it('renders Dashboard unchanged', () => {
    const { container } = render(<AppProvider><Dashboard/></AppProvider>)
    expect(container).toMatchSnapshot()
  })
})