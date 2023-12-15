import { useState } from 'react';
import GraphQLSchema from './index';

function TestPage() {
  const [EndPoint, setEndPoint] = useState(
    'https://rickandmortyapi.com/graphql'
  );
  const [isShema, setShema] = useState(false);
  
  const getShema = () => {
    setShema(!isShema);
  };
  return (
    <>
      <input value={EndPoint} onChange={(e) => setEndPoint(e.target.value)} />
         <button type="button" onClick={getShema}>
            {' '}
            shema
          </button>
     
      {isShema && <GraphQLSchema url={EndPoint} />}
    </>
  );
}

export default TestPage;
