import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useLocalization } from '../../context/local';
import useAuth from '../../hooks/useAuth';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';


// Mocking 
jest.mock('../../context/local');
jest.mock('../../hooks/useAuth');
jest.mock('../../hooks/redux-hooks');

describe('Header component', () => {
  beforeEach(() => {
    (useLocalization as jest.Mock).mockReturnValue({
      lang: 'en',
      setLang: jest.fn(),
      setTexts: jest.fn(),
      texts: { logOut: 'Log Out', login: 'Login', registration: 'Registration' },
    });
    (useAuth as jest.Mock).mockReturnValue({ isAuth: true });   
    
  });
  test('renders Header component', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('switch')).toBeInTheDocument();
  });
  test('renders Header component', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('switch')).toBeInTheDocument();
  });
  test('renders log out button when user is authenticated', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText(/Log out/i)).toBeInTheDocument();
  });
  it('does not render log out button when user is not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuth: false });
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.queryByText(/Log out/i)).toBeNull();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Registration/i)).toBeInTheDocument();
  });

  
});
