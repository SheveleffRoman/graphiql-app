import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Register from '../pages/Register';
import { Provider } from 'react-redux';
import { setupStore } from '../store';
import { LocalizationProvider } from '../context/local';

const store = setupStore();

describe('Register Form', () => {
  test('renders registration form correctly', () => {
    render(
      <Provider store={store}>
        <LocalizationProvider>
          <Register />
        </LocalizationProvider>
      </Provider>,
      { wrapper: MemoryRouter }
    );

    expect(screen.queryAllByText('Registration')).toHaveLength(2);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password:')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Registration' })
    ).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    render(
      <Provider store={store}>
        <LocalizationProvider>
          <Register />
        </LocalizationProvider>
      </Provider>,
      { wrapper: MemoryRouter }
    );

    userEvent.type(screen.getByLabelText(/Username/i), 'testuser');
    userEvent.type(screen.getByLabelText(/Email/i), 'test@example.com');
    userEvent.type(screen.getByLabelText(/Confirm Password/i), 'Test@123');

    fireEvent.click(screen.getByRole('button', { name: 'Registration' }));
  });
});
