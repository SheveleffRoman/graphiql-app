export const QUERY_FOR_SHEMA = `
query IntrospectionQuery {
  __schema {
    types {
      kind
      name
      description
      fields {
        name
        description
      }
    }
  }
}
`;
export interface TField {
  name: string;
  description?: string;
}

export interface TType {
  kind: string;
  name: string;
  description?: string;
  fields?: TField[];
}

export interface TSchema {
  __schema: {
    types: TType[];
  };
}
export type TGloss = {
  [key: string]: TType;
};

export type IDocsItem = {
  field: TField;
  data?: TType;
};
