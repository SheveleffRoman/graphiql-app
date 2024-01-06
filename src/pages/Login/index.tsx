import * as React from 'react';

import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './LoginForm.module.scss';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../store/slices/userSlices';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { useLocalization } from '../../context/local';
import useAuth from '../../hooks/useAuth';
import { Alert } from '@mui/material';

interface Data {
  email: string;
  password: string;
}

const Login: FC = () => {
  const { texts } = useLocalization();
  const { isAuth } = useAuth();
  const [loginError, setLoginError] = useState({ message: '' });
  const schema = Yup.object().shape({
    email: Yup.string()
      .email(texts.errorEmail)
      .required(texts.errorEmailRequired),
    password: Yup.string()
      .required(texts.errorPasswordRequired)
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
        texts.errorPassword
      ),
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    isAuth && navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);
  const onSubmit = (data: Data) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(({ user }) => {
        dispatch(
          setUser({ email: user.email, token: user.refreshToken, id: user.uid })
        );
        navigate('/');
      })
      .catch((error) => {
        setLoginError({ message: error.message });
      });
  };

  return (
    <div className={styles['login-container']}>
      <h2>{texts.login}</h2>
      <form
        className={styles['form-container']}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles['form-group']}>
          <label htmlFor="email">{texts.email}</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="password">{texts.password}</label>
          <input id="password" type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className={styles['button-container']}>
          <button type="submit" disabled={!isDirty || isSubmitting || !isValid}>
            {texts.login}
          </button>
        </div>
      </form>

      <p className={styles['registration-link']}>
        {texts.newUser}
        <Link to="/register">{texts.newUserLink}</Link>.
      </p>
      {loginError.message && (
        <Alert severity="error">{loginError.message}</Alert>
      )}
    </div>
  );
};

export default Login;
