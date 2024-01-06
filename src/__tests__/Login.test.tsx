import React from 'react';
import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { Provider } from 'react-redux';
import { setupStore } from '../store';
import { LocalizationProvider } from '../context/local';
const store = setupStore();
describe('Login Form', () => {
  test('renders login form correctly', () => {
    render(
      <Provider store={store}>
        <LocalizationProvider>
          <Login />
        </LocalizationProvider>
      </Provider>,
      { wrapper: MemoryRouter }
    );

    expect(screen.queryAllByText('Login')).toHaveLength(2);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    render(
      <Provider store={store}>
        <LocalizationProvider>
          <Login />
        </LocalizationProvider>
      </Provider>,
      { wrapper: MemoryRouter }
    );

    userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    userEvent.type(screen.getByLabelText(/password/i), 'Test@123');

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    });
  });

  test('displays error message for invalid login', async () => {
    render(
      <Provider store={store}>
        <LocalizationProvider>
          <Login />
        </LocalizationProvider>
      </Provider>,
      { wrapper: MemoryRouter }
    );
    userEvent.type(screen.getByLabelText('Email:'), 'invalid-email');
    userEvent.type(screen.getByLabelText('Password:'), 'weakpassword');

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    });

    expect(screen.getByText(/Email is required/)).toBeInTheDocument();
  });
});
