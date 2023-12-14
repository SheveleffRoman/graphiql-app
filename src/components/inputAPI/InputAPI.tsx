import { ChangeEvent, useState } from 'react';
import styles from './InputAPI.module.scss';

interface InputAPIProps {
  onConnectApi: (endpoint: string) => void;
}

function InputAPI({ onConnectApi }: InputAPIProps) {
  const [endpoint, setEndpoint] = useState(
    'https://rickandmortyapi.com/graphql'
  );

  const handleChangeEndpoint = (event: ChangeEvent<HTMLInputElement>) => {
    setEndpoint(event.target.value);
  };

  const handleConnectApi = () => {
    onConnectApi(endpoint);
  };
  return (
    <div className={styles.apiInputWrapper}>
      <input
        className={styles.apiInput}
        value={endpoint}
        type="text"
        onChange={handleChangeEndpoint}
      />
      <button onClick={handleConnectApi}>Connect to api</button>
    </div>
  );
}

export default InputAPI;
