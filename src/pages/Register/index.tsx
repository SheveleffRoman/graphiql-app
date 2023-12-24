import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './RegistrationForm.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../store/slices/userSlices';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { useLocalization } from '../../context/local';

interface IRegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}



const Register: FC = () => {
  const navigate = useNavigate();
  const { texts } = useLocalization();
  const schema = Yup.object().shape({
    username: Yup.string()
      .required(texts.errorUserRequired)
      .matches(
        /^[A-Z][a-zA-Z]*$/,
        texts.errorUser
      ),
    email: Yup.string().email(texts.errorEmail).required(texts.errorEmailRequired),
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

  const onSubmit: SubmitHandler<IRegistrationForm> = (data) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
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
          <input type="text" {...register('username')} />
          {touchedFields.username && errors.username && (
            <p className={styles['error-message']}>{errors.username.message}</p>
          )}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="email">{texts.email}</label>
          <input type="text" {...register('email')} />
          {touchedFields.email && errors.email && (
            <p className={styles['error-message']}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="password">{texts.password}</label>
          <input type="password" {...register('password')} />
          {touchedFields.password && errors.password && (
            <p className={styles['error-message']}>{errors.password.message}</p>
          )}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="confirmPassword">{texts.confirmPassword}</label>
          <input type="password" {...register('confirmPassword')} />
          {touchedFields.confirmPassword && errors.confirmPassword && (
            <p className={styles['error-message']}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className={styles['button-container']}>
          <button type="submit" disabled={!isDirty || isSubmitting || !isValid}>
          {texts.registration}
          </button>
        </div>
      </form>
      <p className={styles['login-link']}>
      {texts. haveAccount}<Link to="/login">{texts.loginHere}</Link>.
      </p>
    </div>
  );
};

export default Register;
