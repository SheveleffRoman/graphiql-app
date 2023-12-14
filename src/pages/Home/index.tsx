import * as React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import useAuth from '../../hooks/useAuth';
import { removeUser } from '../../store/slices/userSlices';

export default function Home() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  useEffect(() => {
    !isAuth && navigate('/login');
  }, [isAuth, navigate]);

  return (
    <div>
      <h1>Home GraphiQL</h1>

      <nav>
        <Link to="graphiql">GraphiQL IDE</Link>
      </nav>

      <button onClick={() => dispatch(removeUser())}>Log out </button>
    </div>
  );
}
