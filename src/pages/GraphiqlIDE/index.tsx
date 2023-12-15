import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import CodeMirror from '@uiw/react-codemirror';
import styles from './index.module.scss';
import InputAPI from '../../components/inputAPI/InputAPI';
import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { fetchAllData } from '../../services/fetchService';
import { useAppSelector } from '../../hooks/redux-hooks';

export function GraphiqlIDE() {
  const startQuery = `query GetCharacters($page: Int) {
    characters(page: $page) {
      results {
        name
      }
    }
}`;

  const [dataAxios, setDataAxios] = useState(null);
  const [value, setValue] = useState(startQuery);
  const [error, setError] = useState<AxiosError | SyntaxError | null>(null);
  const [variables, setVariables] = useState('{}');
  const [headers, setHeaders] = useState('{}');
  const [editor, SetEditor] = useState(true);
  const { endpoint } = useAppSelector((state) => state.editor);

  const fetchData = async () => {
    try {
      const parsedVariables = JSON.parse(variables || '{}');
      const nameRegex = /query ([\w]+)/;
      const match = value.match(nameRegex);
      const parsedHeaders = JSON.parse(headers || '{}');
      const response = await fetchAllData(
        endpoint,
        {
          query: value,
          variables: parsedVariables,
          operationName: match ? match[1] : null,
        },
        parsedHeaders
      );
      setDataAxios(response.data);
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching data:', error.message);
        setError(error);
      } else if (error instanceof SyntaxError) {
        console.log(error);
        console.error('Error json formatting:', error.message);
        setError(error);
      }
    }
  };

  const handleClick = () => {
    fetchData();
  };

  const onChange = useCallback((val: string) => {
    setValue(val);
  }, []);

  const onChangeVariables = useCallback((val: string) => {
    setVariables(val);
  }, []);

  const onChangeHeaders = useCallback((val: string) => {
    setHeaders(val);
  }, []);

  const onVariablesView = () => SetEditor(true);
  const onHeadersView = () => SetEditor(false);
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.codeWrapper}>
        <InputAPI />
        <div className={styles.graphiqlWrapper}>
          <div className={styles.codeSection}>
            <div className={styles.queryEditor}>
              <CodeMirror
                height="200px"
                width="700px"
                onChange={onChange}
                value={value}
              />
            </div>
            <div>
              <button onClick={onVariablesView}>Variables</button>
              <button onClick={onHeadersView}>Http Headers</button>
            </div>
            <div className={styles.editorTool}>
              <CodeMirror
                height="150px"
                width="700px"
                onChange={onChangeVariables}
                style={{ display: editor ? 'block' : 'none' }}
                placeholder={'{"page": 5}'}
              />
              <CodeMirror
                height="150px"
                width="700px"
                onChange={onChangeHeaders}
                style={{ display: !editor ? 'block' : 'none' }}
                placeholder={'{"from": "example@example.com"}'}
              />
            </div>
            <button onClick={handleClick}>response</button>
            <Link to={'/'}>
              <button>To main</button>
            </Link>
          </div>
          <div className={styles.graphqlResponse}>
            {error ? (
              <h2>{error.message}</h2>
            ) : (
              dataAxios && <pre>{JSON.stringify(dataAxios, null, 2)}</pre>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
