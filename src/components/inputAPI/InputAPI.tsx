import { ChangeEvent, useState } from 'react';
import styles from './InputAPI.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setAPI } from '../../store/slices/editorSlices';
import { useLocalization } from '../../context/local';

function InputAPI() {
  const { endpoint } = useAppSelector((state) => state.editor);
  const [value, setValue] = useState(endpoint);
  const dispatch = useAppDispatch();
  const { texts } = useLocalization();

  const handleChangeEndpoint = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const connectApi = () => {
    dispatch(setAPI({ endpoint: value }));
  };

  return (
    <div className={styles.apiInputWrapper}>
      <input
        className={styles.apiInput}
        value={value}
        type="text"
        onChange={handleChangeEndpoint}
        role="inputAPI"
        placeholder='https://rickandmortyapi.com/graphql'
      />
      <button className={styles.apiBtn} onClick={connectApi} role="connectAPI">
        {texts.connectAPI}
      </button>
    </div>
  );
}

export default InputAPI;
