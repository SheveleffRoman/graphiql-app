import { Link } from 'react-router-dom';
import { useLocalization } from '../../context/local';
import LangSwitch from '../lang-switcher/lang-switcher';
import styles from './Header.module.scss';

function Header() {
  const { texts } = useLocalization();
  return (
    <header className={styles.headerWrapper}>
      <Link to={'/'}>
        <h1>Logo</h1>
      </Link>

      <div className={styles.actionBlock}>
        <LangSwitch />
        <button className={styles.signout}>{texts.logOut}</button>
      </div>
    </header>
  );
}

export default Header;
