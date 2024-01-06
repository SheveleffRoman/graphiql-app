import React from 'react';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  act,
  waitFor
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../pages/Register/index';
import { Provider } from 'react-redux';
import { setupStore } from '../store';
import { LocalizationProvider } from '../context/local';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const store = setupStore();

afterEach(cleanup);

jest.mock('firebase/auth', () => {
  return {
    auth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(null);
      });
    }),
    getAuth: jest.fn(),
  };
});

describe('Register Form', () => {
  it('renders registration form correctly', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider>
            <Register />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole('inputUsername')).toBeInTheDocument();
    expect(screen.getByRole('inputEmail')).toBeInTheDocument();
    expect(screen.getByRole('inputPassword')).toBeInTheDocument();
    expect(screen.getByRole('inputConfirmPassword')).toBeInTheDocument();
    expect(screen.getByRole('registerBtn')).toBeInTheDocument();
    expect(screen.getByRole('registerBtn')).toBeDisabled();
  });

  it('submits the form with valid data', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LocalizationProvider>
            <Register />
          </LocalizationProvider>
        </Provider>
      </MemoryRouter>
    );

    const inputUsername = screen.getByRole('inputUsername') as HTMLInputElement;
    const inputEmail = screen.getByRole('inputEmail') as HTMLInputElement;
    const inputPassword = screen.getByRole('inputPassword') as HTMLInputElement;
    const inputConfirmPassword = screen.getByRole(
      'inputConfirmPassword'
    ) as HTMLInputElement;
    const registerBtn = screen.getByRole('registerBtn') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(inputUsername, {
        target: { value: 'Roman' },
      });

      fireEvent.change(inputEmail, {
        target: { value: 'roman@yandex.com' },
      });

      fireEvent.change(inputPassword, {
        target: { value: 'Roman123)' },
      });

      fireEvent.change(inputConfirmPassword, {
        target: { value: 'Roman123)' },
      });
    });

    await act(async () => {
      fireEvent.click(registerBtn);
    });

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(undefined, inputEmail.value, inputPassword.value)
    })
  });
});
