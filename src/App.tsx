import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './firebase';
import { lazy, Suspense } from 'react';
import Preloader from './components/preloader';


const GraphiqlIDE = lazy(() => import('./pages/GraphiqlIDE'));
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/Register'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'graphiql',
    element: <GraphiqlIDE />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
]);

function App() {
  return (
    <Suspense fallback={<Preloader />}>
      <RouterProvider router={router} />   
    </Suspense>
  );
}

export default App;
