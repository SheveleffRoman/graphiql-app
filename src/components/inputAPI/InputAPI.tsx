import { ChangeEvent, useState } from 'react';
import styles from './InputAPI.module.scss';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { setAPI } from '../../store/slices/editorSlices';
import { useLocalization } from '../../context/local';

function InputAPI() {
  const [value, setValue] = useState('https://rickandmortyapi.com/graphql');
  const dispatch = useAppDispatch();
  const { texts } = useLocalization();

  const handleChangeEndpoint = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const connectApi = () => {
    dispatch(setAPI({ endpoint: value }));
    console.log('Connecting to API with endpoint:', value);
  };

  return (
    <div className={styles.apiInputWrapper}>
      <input
        className={styles.apiInput}
        value={value}
        type="text"
        onChange={handleChangeEndpoint}
      />
      <button className={styles.apiBtn} onClick={connectApi}>
        {texts.connectAPI}
      </button>
    </div>
  );
}

export default InputAPI;
