import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import CodeMirror from '@uiw/react-codemirror';
import styles from './index.module.scss'
import InputAPI from '../../components/inputAPI/InputAPI';

// export interface IAppProps {}

export default function GraphiqlIDE() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.codeWrapper}>
        <InputAPI onConnectApi={handleConnectApi} />
        <div className={styles.graphiqlWrapper}>
          <div className={styles.codeSection}>
            <div className={styles.queryEditor}>
              <CodeMirror
                height="200px"
                width="700px"
                onChange={onChange}
                value={value}
                // extensions={[langs.json()]}
              />
            </div>
            <div>
              <button onClick={onVariablesView}>Variables:</button>
              <button onClick={onHeadersView}>Http Headers:</button>
            </div>
            <div className={styles.editorTool}>
              <CodeMirror
                height="150px"
                width="700px"
                onChange={onChangeVariables}
                style={{ display: editor ? 'block' : 'none' }}
                // extensions={[langs.json()]}
                placeholder={'{"page": 5}'}
              />
              <CodeMirror
                height="150px"
                width="700px"
                onChange={onChangeHeaders}
                style={{ display: !editor ? 'block' : 'none' }}
                // extensions={[langs.json()]}
              />
            </div>
            <button onClick={handleClick}>response</button>
          </div>
          <div className={styles.graphqlResponse}>
            {error ? (
              <h2>{error.message}</h2>
            ) : (
              <>
                {!dataAxios && <></>}
                {dataAxios && <pre>{JSON.stringify(dataAxios, null, 2)}</pre>}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
