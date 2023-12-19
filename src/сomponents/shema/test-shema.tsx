import { useState } from 'react';
import GraphQLSchema from './index';
import LangSwitch from '../../components/lang-switcher/lang-switcher';
import { useLocalization } from '../../context/local';

function TestPage() {
  const [EndPoint, setEndPoint] = useState(
    'https://rickandmortyapi.com/graphql'
  );
  const [isShema, setShema] = useState(false);
  const { texts } = useLocalization();
  
  const getShema = () => {
    setShema(!isShema);
  };
  return (
    <>
    <LangSwitch/>
      <input value={EndPoint} onChange={(e) => setEndPoint(e.target.value)} />
         <button type="button" onClick={getShema}>
            {' '}
            shema
          </button>
     
      {isShema && <GraphQLSchema url={EndPoint} />}
      <p>{texts.welcomeText}</p>
   </>
  );
}

export default TestPage;
