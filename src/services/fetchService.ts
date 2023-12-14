import axios, { AxiosHeaderValue } from 'axios';

export type GraphqlQuery = {
  query: string;
  operationName?: string | null;
  variables?: string;
};

export const fetchAllData = (
  endpoint: string,
  graphqlQuery: GraphqlQuery,
  additionalHeaders?: AxiosHeaderValue
) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (additionalHeaders) {
    Object.assign(headers, additionalHeaders);
  }

  const response = axios({
    url: endpoint,
    method: 'post',
    data: JSON.stringify(graphqlQuery),
    headers,
  });
  return response;
};
