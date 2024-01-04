import { cleanup, fireEvent, render } from '@testing-library/react';
import { LocalizationProvider } from '../src/context/local';
import InputAPI from '../src/components/inputAPI/InputAPI';
import { setupStore } from '../src/store';
import { Provider } from 'react-redux';
import React from 'react';
import '@testing-library/jest-dom';

afterEach(cleanup);

const store = setupStore()

it('InputAPI renders input and button correctly', () => {
  const { getByText, getByDisplayValue } = render(
      <Provider store={store}>
        <LocalizationProvider>
          <InputAPI />
        </LocalizationProvider>
      </Provider>
  );

  const inputElement = getByDisplayValue('https://rickandmortyapi.com/graphql');
  const buttonElement = getByText('Connect to api');

  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

it('handles input change correctly', () => {
  const { getByDisplayValue } = render(
      <Provider store={store}>
        <LocalizationProvider>
          <InputAPI />
        </LocalizationProvider>
      </Provider>
  );
  const inputElement = getByDisplayValue(
    'https://rickandmortyapi.com/graphql'
  ) as HTMLInputElement;

  fireEvent.change(inputElement, {
    target: { value: 'https://newapi.com/graphql' },
  });

  expect(inputElement.value).toBe('https://newapi.com/graphql');
});

// it('connects to API on button click', () => {
//   jest.mock('../src/components/inputAPI/InputAPI', () => {
//     return {
//       __esModule: true,
//       connectApi: jest.fn(),
//     };
//   });

//   const { getByText } = render(
//     <React.StrictMode>
//       <Provider store={store}>
//         <LocalizationProvider>
//           <InputAPI />
//         </LocalizationProvider>
//       </Provider>
//     </React.StrictMode>
//   );

//   const buttonElement = getByText('Connect to api');

//   // fireEvent.change(inputElement, {
//   //   target: { value: 'https://newapi.com/graphql' },
//   // });
//   fireEvent.click(buttonElement);

//   expect(buttonElement).toHaveBeenCalled()
// });
