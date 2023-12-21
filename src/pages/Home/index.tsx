import * as React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import useAuth from '../../hooks/useAuth';
import { removeUser } from '../../store/slices/userSlices';
import { useLocalization } from '../../context/local';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

export default function Home() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const { texts } = useLocalization();
  /*
  useEffect(() => {
    !isAuth && navigate('/login');
  }, [isAuth, navigate]); */

  return (
    <div>
      <Header />
      <p>{texts.welcomeText}</p>

      <nav>
        <Link to="graphiql">GraphiQL IDE</Link>
      </nav>

      <button onClick={() => dispatch(removeUser())}>{texts.logOut}</button>
      <Footer/>
    </div>
  );
}
