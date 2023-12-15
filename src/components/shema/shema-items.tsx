import { IDocsItem } from './types';

function ShemaItems(props: IDocsItem) {
  const { data, field } = props;

  return (
    <div className="docs-item-wrapper">
      {!data || !data.description
        ? field.description && (
            <p className="docs-description">{field.description}</p>
          )
        : data.description && <p>{data.description}</p>}
      <ul className="docs-list">
        {data &&
          data.fields &&
          data.fields.map((f) => (
            <li key={f.name} className="docs-item">
              <span className="docs-item-name" key={field.name}>
                {f.name}
              </span>
              {f.description && (
                <span className="docs-item-description">{f.description}</span>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ShemaItems;
