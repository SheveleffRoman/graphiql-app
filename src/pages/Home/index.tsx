import * as React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useLocalization } from '../../context/local';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

import './style.scss';

export default function Home() {
  const { isAuth } = useAuth();
  const { texts } = useLocalization();
  return (
    <>
      <Header />
      <section className="wrapper">
        <h3 className="title">{texts.welcomeTitle}</h3>
        <p className="text-block">{texts.welcomeText}</p>
        {!isAuth && (
          <p className="text-block">
            {' '}
            <span>{texts.welcomeText2}</span>
            <Link to="/login" className="link">
              {texts.login}
            </Link>
            {' / '}
            <Link to="/register" className="link">
              {texts.registration}
            </Link>
            .
          </p>
        )}
        {isAuth && (
          <Link to="/graphiql" className="link">
            {texts.welcomeText3}
          </Link>
        )}
      </section>
      <Footer />
    </>
  );
}
