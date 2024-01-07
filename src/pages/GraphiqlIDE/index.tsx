import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import CodeMirror from '@uiw/react-codemirror';
import styles from './index.module.scss';
import InputAPI from '../../components/inputAPI/InputAPI';
import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { fetchAllData } from '../../services/fetchService';
import { useAppSelector } from '../../hooks/redux-hooks';
import GraphQLSchema from '../../components/shema';
import { useLocalization } from '../../context/local';
import { BASE_SETUP } from './codeMirrorSetup';
import { clsx } from 'clsx';
import { formatGraphQLCode } from './codeFormatter';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GraphiqlIDE() {
  const startQuery = `query GetCharacters($page: Int) {
      characters(page: $page) {
        results {
          name
        }
      }
  }`;

  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const [dataAxios, setDataAxios] = useState(null);
  const [value, setValue] = useState(startQuery);
  const [error, setError] = useState<AxiosError | SyntaxError | null>(null);
  const [variables, setVariables] = useState('{}');
  const [headers, setHeaders] = useState('{}');
  const [editor, SetEditor] = useState(true);
  const [schemaOpen, setSchemaOpen] = useState(false);
  const { endpoint } = useAppSelector((state) => state.editor);
  const { texts } = useLocalization();

  useEffect(() => {
    !isAuth && navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

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
      const notify = () => toast.error(error?.message);
      if (axios.isAxiosError(error)) {
        setError(error);
      } else if (error instanceof SyntaxError) {
        setError(error);
      }
      notify();
    }
  };

  const handleClick = () => {
    fetchData();
  };

  const formatCode = async () => {
    const formatted = await formatGraphQLCode(value);
    setValue(formatted);
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

  const onSchemaButtonClick = () => {
    setSchemaOpen((prevState) => !prevState);
  };

  const onVariablesView = () => SetEditor(true);
  const onHeadersView = () => SetEditor(false);
  return (
    <>
      <ToastContainer />
      <Header />

      <div className={styles.wrapper}>
        <div className={styles.codeWrapper}>
          <InputAPI />
          <div className={styles.graphiqlWrapper}>
            <div className={styles.codeSection}>
              <div className={styles.queryEditor}>
                <CodeMirror
                  height="45vh"
                  minWidth="200px"
                  width="100%"
                  maxWidth="900px"
                  onChange={onChange}
                  value={value}
                  theme={'dark'}
                  basicSetup={BASE_SETUP}
                  role="queryEditor"
                />
              </div>
              <div className={styles.editorToolButtons}>
                <button
                  className={clsx(styles.editorToolBtn, {
                    [styles.editorToolBtnActive]: editor,
                  })}
                  onClick={onVariablesView}
                >
                  {texts.variables}
                </button>
                <button
                  className={clsx(styles.editorToolBtn, {
                    [styles.editorToolBtnActive]: !editor,
                  })}
                  onClick={onHeadersView}
                  role="headersToolBtn"
                >
                  {texts.headers}
                </button>
              </div>
              <div className={styles.editorTool}>
                <CodeMirror
                  height="150px"
                  minWidth="200px"
                  width="100%"
                  maxWidth="900px"
                  onChange={onChangeVariables}
                  style={{ display: editor ? 'block' : 'none' }}
                  placeholder={'{"page": 5}'}
                  theme={'dark'}
                  basicSetup={BASE_SETUP}
                  role="variablesTool"
                />
                <CodeMirror
                  height="150px"
                  minWidth="200px"
                  width="100%"
                  maxWidth="900px"
                  onChange={onChangeHeaders}
                  style={{ display: !editor ? 'block' : 'none' }}
                  placeholder={'{"from": "example@example.com"}'}
                  theme={'dark'}
                  basicSetup={BASE_SETUP}
                  role="headersTool"
                />
              </div>
              <div className={styles.editorToolButtons}>
                <button
                  className={styles.editorToolBtn}
                  onClick={handleClick}
                  role="responseBtn"
                >
                  {texts.response}
                </button>
                <button className={styles.editorToolBtn} onClick={formatCode}>
                  {texts.prettify}
                </button>
              </div>
            </div>
            <div className={styles.graphqlResponse}>
              {error ? (
                <h2 role="errorResponse">{error.message}</h2>
              ) : (
                dataAxios && (
                  <pre role="responseSection">
                    {JSON.stringify(dataAxios, null, 2)}
                  </pre>
                )
              )}
            </div>
            <div
              className={`${styles.schemaWrapper} ${
                schemaOpen ? styles.schemaOpen : ''
              }`}
            >
              <div className={styles.schemaButtons}>
                <div
                  className={styles.schemaOpenButton}
                  onClick={onSchemaButtonClick}
                >
                  {schemaOpen ? texts.closeSchema : texts.openSchema}{' '}
                  {texts.schema}
                </div>
              </div>
              <div className={styles.schemaBlock}>
                {endpoint && <GraphQLSchema url={endpoint} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
