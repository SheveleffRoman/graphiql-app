import React from 'react';
import '@testing-library/jest-dom';

import {
  act,
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login/index';
import { Provider } from 'react-redux';
import { setupStore } from '../store';
import { LocalizationProvider } from '../context/local';
import { signInWithEmailAndPassword } from 'firebase/auth';


const store = setupStore();

afterEach(cleanup);

jest.mock('firebase/auth', () => {
  return {
    auth: jest.fn(),
    signInWithEmailAndPassword: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(null);
      });
    }),
    getAuth: jest.fn(),
  };
});

describe('Login Form', () => {
  it('renders login form correctly', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider>
            <Login />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.queryAllByText('Login')).toHaveLength(2);
    expect(screen.getByRole('emailInput')).toBeInTheDocument();
    expect(screen.getByRole('passwordInput')).toBeInTheDocument();
    expect(screen.getByRole('loginBtn')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider>
            <Login />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );

    const inputEmail = screen.getByRole('emailInput') as HTMLInputElement;
    const inputPassword = screen.getByRole('passwordInput') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(inputEmail, {
        target: { value: 'roman@yandex.com' },
      });

      fireEvent.change(inputPassword, {
        target: { value: 'Roman123)' },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('loginBtn'));
    });

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, inputEmail.value, inputPassword.value)
    })
  });

  it('displays error message for invalid login', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider>
            <Login />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );

    const inputEmail = screen.getByRole('emailInput') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(inputEmail, {
        target: { value: 'roman' },
      });
    });

    await waitFor(() => {
      expect(screen.getByText(/Invalid email/)).toBeInTheDocument();
      expect(screen.getByRole('loginBtn')).toBeDisabled();
    });
  });

  it('Logs user button is active', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider>
            <Login />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );

    const inputEmail = screen.getByRole('emailInput') as HTMLInputElement;
    const inputPassword = screen.getByRole('passwordInput') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(inputEmail, {
        target: { value: 'roman@yandex.com' },
      });

      fireEvent.change(inputPassword, {
        target: { value: 'Roman123)' },
      });
    });

    expect(inputEmail).toHaveDisplayValue('roman@yandex.com');
    expect(inputPassword).toHaveValue('Roman123)');
    expect(screen.getByRole('loginBtn')).not.toBeDisabled();
  });
});
