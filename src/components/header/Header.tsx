import { Link } from 'react-router-dom';
import { useLocalization } from '../../context/local';
import LangSwitch from '../lang-switcher/lang-switcher';
import styles from './Header.module.scss';
import logoPath from '../../assets/logo.png'
import useAuth from '../../hooks/useAuth';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { removeUser } from '../../store/slices/userSlices';


function Header() {
  const { texts } = useLocalization();
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  
  const handleClick = () =>{
   dispatch(removeUser());
  }
  return (
    <header className={styles.headerWrapper}>
      <Link to={'/'}>
        <img className={styles.logo} src={logoPath}/>
      </Link>     
      <div className={styles.actionBlock}>
        <LangSwitch />
        {isAuth && <button className={styles.signout} onClick={handleClick}>{texts.logOut}</button>}
      </div>
    </header>
  );
}

export default Header;
