import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './RegistrationForm.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../store/slices/userSlices';
import { useAppDispatch } from '../../hooks/redux-hooks';

interface IRegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .matches(
      /^[A-Z][a-zA-Z]*$/,
      'Username must start with an uppercase letter'
    ),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      'Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register: FC = () => {
  const navigate = useNavigate();
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
      <h2>Registration</h2>
      <form
        className={styles['form-container']}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles['form-group']}>
          <label htmlFor="username">Username:</label>
          <input type="text" {...register('username')} />
          {touchedFields.username && errors.username && (
            <p className={styles['error-message']}>{errors.username.message}</p>
          )}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="email">Email:</label>
          <input type="text" {...register('email')} />
          {touchedFields.email && errors.email && (
            <p className={styles['error-message']}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="password">Password:</label>
          <input type="password" {...register('password')} />
          {touchedFields.password && errors.password && (
            <p className={styles['error-message']}>{errors.password.message}</p>
          )}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" {...register('confirmPassword')} />
          {touchedFields.confirmPassword && errors.confirmPassword && (
            <p className={styles['error-message']}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className={styles['button-container']}>
          <button type="submit" disabled={!isDirty || isSubmitting || !isValid}>
            Register
          </button>
        </div>
      </form>
      <p className={styles['login-link']}>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Register;
