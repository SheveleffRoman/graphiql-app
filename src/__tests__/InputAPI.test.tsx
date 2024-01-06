import { cleanup, fireEvent, render } from '@testing-library/react';
import { LocalizationProvider } from '../context/local';
import InputAPI from '../components/inputAPI/InputAPI';
import { setupStore } from '../store';
import { Provider } from 'react-redux';
import React from 'react';
import '@testing-library/jest-dom';

afterEach(cleanup);

const store = setupStore();

it('InputAPI renders input and button correctly', () => {
  const { getByText, getByRole } = render(
    <Provider store={store}>
      <LocalizationProvider>
        <InputAPI />
      </LocalizationProvider>
    </Provider>
  );

  const inputElement = getByRole('inputAPI');
  const buttonElement = getByText('Connect to api');

  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

it('handles input change correctly', () => {
  const { getByRole } = render(
    <Provider store={store}>
      <LocalizationProvider>
        <InputAPI />
      </LocalizationProvider>
    </Provider>
  );
  const inputElement = getByRole('inputAPI') as HTMLInputElement;

  fireEvent.change(inputElement, {
    target: { value: 'https://newapi.com/graphql' },
  });

  expect(inputElement.value).toBe('https://newapi.com/graphql');
});
