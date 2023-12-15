import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './firebase';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'graphiql',
    lazy: async () => {
      const { GraphiqlIDE } = await import('../src/pages/GraphiqlIDE');
      return { Component: GraphiqlIDE };
    },
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
  return <RouterProvider router={router} />;
}

export default App;
