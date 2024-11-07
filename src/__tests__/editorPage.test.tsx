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
import 'react-toastify/dist/ReactToastify.css';

jest.mock('react-toastify/dist/ReactToastify.css', () => {
  return null;
});

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
      { status: 200 }
    );
  }),
  graphql.query('IntrospectionQuery', () => {
    return HttpResponse.json({
      data: schemaMock,
    });
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

describe('GraphQL page', () => {
  it('graphQL renders page correctly', () => {
    customRender();

    expect(screen.getByText('open schema')).toBeInTheDocument();
    expect(screen.getByText('Connect to api')).toBeInTheDocument();
    expect(screen.getByText('Response')).toBeInTheDocument();
  });

  it('renders response', async () => {
    customRender();

    const inputElement = screen.getByRole('inputAPI') as HTMLInputElement;
    const connectBtn = screen.getByRole('connectAPI');

    fireEvent.change(inputElement, {
      target: { value: 'https://rickandmortyapi.com/graphql' },
    });

    fireEvent.click(connectBtn);

    fireEvent.click(screen.getByText('Response'));

    const results = await waitFor(() => screen.getByRole('responseSection'));

    expect(results).toBeInTheDocument();

    expect(screen.getByText(/Rick Sanchez/i));
  });

  it('Button schema click correctly change name', async () => {
    customRender();

    fireEvent.click(screen.getByText('open schema'));

    await waitFor(() => screen.getByText('close schema'));

    expect(screen.getByText('close schema')).toHaveTextContent('close schema');
  });

  it('renders schema', async () => {
    customRender();

    const inputElement = screen.getByRole('inputAPI') as HTMLInputElement;
    const connectBtn = screen.getByRole('connectAPI');

    fireEvent.change(inputElement, {
      target: { value: 'https://rickandmortyapi.com/graphql' },
    });

    fireEvent.click(connectBtn);

    await waitFor(() => {
      expect(screen.getByText('locationByIds')).toBeInTheDocument();
    });
  });

  it('renders variables editor', () => {
    customRender();
    const variablesTool = screen.getByRole('variablesTool');
    expect(variablesTool).toBeVisible();
    expect(variablesTool).toHaveStyle('display: block');
  });

  it('renders headers editor', () => {
    customRender();
    const headersToolBtn = screen.getByRole('headersToolBtn');
    fireEvent.click(headersToolBtn);
    const headersTool = screen.getByRole('headersTool');
    expect(headersTool).toBeVisible();
    expect(headersTool).toHaveStyle('display: block');
  });
});
