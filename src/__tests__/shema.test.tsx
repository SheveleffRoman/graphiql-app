import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { HttpResponse, graphql } from 'msw';
import GraphQLSchema from '../components/shema/index';
import { useLocalization } from '../context/local';
import { LocalizationContextProps } from '../context/types';

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

jest.mock('../context/local', () => ({
  ...jest.requireActual('../context/local'),
  useLocalization: jest.fn(),
}));

describe('shema test', () => {
  beforeEach(() => {
    const mockContext: LocalizationContextProps = {
      lang: 'en',
      setLang: jest.fn(),
      setTexts: jest.fn(),
      texts: {
        errorShema: 'error test',
      },
    };
    (useLocalization as jest.Mock).mockReturnValue(mockContext);
  });

  test('renders preloader', async () => {
    render(<GraphQLSchema url="https://rickandmortyapi.com/graphql" />);
    expect(screen.queryByTestId('preloader')).toBe;
  });
  test('renders shema', async () => {
    render(<GraphQLSchema url="https://rickandmortyapi.com/graphql" />);
    expect(screen.queryByTestId('preloader')).toBe;
    await waitFor(() => screen.queryByText('character'));
    expect(screen.queryByTestId('preloader')).not.toBe;
  });
});
