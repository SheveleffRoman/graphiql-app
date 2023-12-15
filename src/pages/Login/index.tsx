import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './LoginForm.module.scss';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../store/slices/userSlices';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { useLocalization } from '../../context/local';

interface Data {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login: FC = () => {
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
  const { texts } = useLocalization();

  const onSubmit = (data: Data) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({ email: user.email, token: user.refreshToken, id: user.uid })
        );
        navigate('/');
      })
      .catch((error) => {
        console.log(error.message);
      });
    console.log(data);
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
          <input type="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="password">{texts.password}</label>
          <input type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div className={styles['button-container']}>
          <button type="submit" disabled={!isDirty || isSubmitting || !isValid}>
          {texts.login}
          </button>
        </div>
      </form>

      <p className={styles['registration-link']}>
       {texts.newUser}<Link to="/register">{texts.newUserLink}</Link>.
      </p>
    </div>
  );
};

export default Login;
