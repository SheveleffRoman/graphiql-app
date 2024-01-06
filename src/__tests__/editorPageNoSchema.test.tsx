import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { LocalizationProvider } from '../context/local';
import GraphiqlIDE from '../pages/GraphiqlIDE/index';
import { setupStore } from '../store';
import { Provider } from 'react-redux';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { setupServer } from 'msw/node';
import { HttpResponse, graphql } from 'msw';

const store = setupStore();

const mockResponse = {
  character: {
    results: {
      name: 'Rick Sanchez',
    },
  },
};

export const handlers = [
  graphql.query('GetCharacters', () => {
    return HttpResponse.json(
      {
        data: mockResponse,
      },
      { status: 400 }
    );
  }),
  graphql.query('IntrospectionQuery', () => {
    return HttpResponse.json(
      {
        data: null,
      },
      { status: 400 }
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const customRender = () => {
  return render(
    <MemoryRouter>
      <Provider store={store}>
        <LocalizationProvider>
          <GraphiqlIDE />
        </LocalizationProvider>
      </Provider>
    </MemoryRouter>
  );
};

afterEach(cleanup);

describe('GraphQL page with no schema', () => {
  it('renders no schema message', async () => {
    customRender();

    const inputElement = screen.getByRole('inputAPI') as HTMLInputElement;
    const connectBtn = screen.getByRole('connectAPI');

    fireEvent.change(inputElement, {
      target: { value: 'https://rickandmortyapi.com/graphql' },
    });

    fireEvent.click(connectBtn);

    await waitFor(() => {
      expect(screen.getByText('Not found documentation')).toBeInTheDocument();
    });
  });
});
