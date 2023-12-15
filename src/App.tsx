import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GraphiqlIDE from './pages/GraphiqlIDE';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './firebase';
import TestPage from './сomponents/shema/test-shema';
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
  {
    path: 'test', // удалить в итоговой сборке
    element: <TestPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
