import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { LocalizationProvider } from '../src/context/local';
import GraphiqlIDE from '../src/pages/GraphiqlIDE/index';
import { setupStore } from '../src/store';
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

const schemaMock = {
  __schema: {
    types: [
      {
        kind: 'OBJECT',
        name: 'Query',
        description: '',
        fields: [
          {
            name: 'character',
            description: 'Get a specific character by ID',
          },
          {
            name: 'locationByIds',
            description: 'some description',
          },
        ],
      },
      {
        kind: 'SCALAR',
        name: 'ID',
        description:
          'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.',
        fields: null,
      },
      {
        kind: 'OBJECT',
        name: 'Character',
        description: '',
        fields: [
          {
            name: 'id',
            description: 'The id of the character.',
          },
          {
            name: 'name',
            description: 'The name of the character.',
          },
        ],
      },
    ],
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
        data: schemaMock,
      },
      { status: 600 }
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

describe('GraphQL page with error response', () => {
  it('renders error response', async () => {
    customRender();

    const inputElement = screen.getByRole('inputAPI') as HTMLInputElement;
    const connectBtn = screen.getByRole('connectAPI');

    fireEvent.change(inputElement, {
      target: { value: 'https://rickandmortyapi.com/graphql' },
    });

    fireEvent.click(connectBtn);

    fireEvent.click(screen.getByText('Response'));

    const results = await waitFor(() => screen.getByRole('errorResponse'));

    expect(results).toBeInTheDocument();

    expect(screen.getByText(/Request failed with status code 400/i));
  });

  it('renders schema error', async () => {
    customRender();

    const inputElement = screen.getByRole('inputAPI') as HTMLInputElement;
    const connectBtn = screen.getByRole('connectAPI');

    fireEvent.change(inputElement, {
      target: { value: 'https://rickandmortyapi.com/graphql' },
    });

    fireEvent.click(connectBtn);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
    });

    screen.debug()
  });
});
