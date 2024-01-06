import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './RegistrationForm.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../store/slices/userSlices';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { useLocalization } from '../../context/local';
import useAuth from '../../hooks/useAuth';
import { Alert } from '@mui/material';

interface IRegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { texts } = useLocalization();
  const [loginError, setLoginError] = useState({ message: '' });
  const schema = Yup.object().shape({
    username: Yup.string()
      .required(texts.errorUserRequired)
      .matches(/^[A-Z][a-zA-Z]*$/, texts.errorUser),
    email: Yup.string()
      .email(texts.errorEmail)
      .required(texts.errorEmailRequired),
    password: Yup.string()
      .required(texts.errorPasswordRequired)
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
        texts.errorPassword
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], texts.erroeMatch)
      .required(texts.errorConfimPassword),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, touchedFields, isValid },
  } = useForm<IRegistrationForm>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    isAuth && navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);
  const onSubmit: SubmitHandler<IRegistrationForm> = (data) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
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
    <div className={styles['registration-container']}>
      <h2>{texts.registration}</h2>
      <form
        className={styles['form-container']}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles['form-group']}>
          <label htmlFor="username">{texts.username}</label>
          <input
            id="username"
            type="text"
            {...register('username')}
            role="inputUsername"
          />
          {touchedFields.username && errors.username && (
            <p className={styles['error-message']}>{errors.username.message}</p>
          )}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="email">{texts.email}</label>
          <input
            id="email"
            type="text"
            {...register('email')}
            role="inputEmail"
          />
          {touchedFields.email && errors.email && (
            <p className={styles['error-message']}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="password">{texts.password}</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            role="inputPassword"
          />
          {touchedFields.password && errors.password && (
            <p className={styles['error-message']}>{errors.password.message}</p>
          )}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="confirmPassword">{texts.confirmPassword}</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            role="inputConfirmPassword"
          />
          {touchedFields.confirmPassword && errors.confirmPassword && (
            <p className={styles['error-message']}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className={styles['button-container']}>
          <button
            type="submit"
            disabled={!isDirty || isSubmitting || !isValid}
            role="registerBtn"
          >
            {texts.registration}
          </button>
        </div>
      </form>
      <p className={styles['login-link']}>
        {texts.haveAccount}
        <Link to="/login">{texts.loginHere}</Link>.
      </p>
      {loginError.message && (
        <Alert severity="error">{loginError.message}</Alert>
      )}
    </div>
  );
};

export default Register;
