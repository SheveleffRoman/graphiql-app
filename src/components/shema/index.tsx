import React, { useState, useEffect } from 'react';
import { TSchema, TGloss, TType, IDocsItem, TField, QUERY_FOR_SHEMA } from './types';
import ShemaItems from './shema-items';
import './styles.scss'

export type TDocProps = {
  url: string;
};

function GraphQLSchema(props: TDocProps) {
  const { url } = props; // брать из стора
  const [schema, setSchema] = useState<TSchema | null>(null);
  const [queryShema, setQuerySchema] = useState<TType | null>(null);
  const [gloss, setGloss] = useState<TGloss | null>(null);
  const [isVisible, setVisable] = useState(false);
  const [itemFileds, setItemFileds] = useState<IDocsItem | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const [er, setEr] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocumentation = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: QUERY_FOR_SHEMA,
          }),
        });

        const result = await response.json();
        setSchema(result.data);
        setisLoading(true);
      } 
      catch (error) {
        setisLoading(true);
        const message=(error instanceof Error) ? error.message : 'Error fetching GraphQL documentation';
        setEr(message);
      }
    };

    fetchDocumentation();
  }, [url]);

  useEffect(() => {
    if (!schema) return;

    const q = schema.__schema.types.find(
      (type) =>
        type.name.toUpperCase().includes('QUERY') ||
        type.name.toUpperCase().includes('ROOT')
    );

    if (!q) return; // не нашли query ввыводим одним листом

    setQuerySchema(q);

    if (!q.fields) return;

    // составление словаря для  query
    function createGloss(fields: TField[]) {
      if (!schema) return null;
      const newGloss: TGloss = {};
      for (let i = 0; i < fields.length; i += 1) {
        if (fields[i].name) {
          const name = fields[i].name.trim();
          const q1 = schema.__schema.types.find(
            (type) => type.name.trim().toUpperCase() === name.toUpperCase()
          );
          if (q1) newGloss[name] = q1;
        }
      }
      return newGloss;
    }
    const newGloss = createGloss(q.fields);
    if (newGloss) setGloss(newGloss);
  }, [schema]);

  // открыть подробности

  const clickFied = (field: TField) => {
    const prop: IDocsItem = { field };
    if (gloss && gloss[field.name]) prop.data = gloss[field.name];
    setItemFileds(prop);
    setVisable(true);
  };

  const isLink = (name: string, f: string | undefined) =>
    (gloss && gloss[name]) || f;

  if (!isLoading) {
    return <p>Loading...</p>;
  }
  if (er) {
    return <p>{er}</p>;
  }
  if (!schema) {
    return <p>Not found documentation</p>;
  }
  if (!queryShema) {
    return (
      <>
        {schema.__schema.types.map((type) => (
          <div key={type.name}>
            <h2>{type.name}</h2>
            <p>{type.description}</p>
            <ul className="docs-list">
              {type.fields &&
                type.fields.map((field) => (
                  <li className="docs-item" key={field.name}>
                    <strong>{field.name}</strong>: {field.description}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </>
    );
  }

  // Display schema information as needed
  return (
    <div>
      <h2 className="querys-title">{queryShema.name}</h2>
      <div className="querys-wrapper">
        <ul className="docs-list">
          {queryShema.fields &&
            queryShema.fields.map((field) => (
              <div
                className={
                  isLink(field.name, field.description) ? 'field-link' : ''
                }
                key={field.name}
                onClick={
                  isLink(field.name, field.description)
                    ? () => clickFied(field)
                    : undefined
                }
              >
                <li className="docs-item">{field.name}</li>
              </div>
            ))}
        </ul>
        {isVisible && itemFileds && <ShemaItems {...itemFileds} />}
      </div>
    </div>
  );
}

export default GraphQLSchema;
