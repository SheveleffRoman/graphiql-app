import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GraphiqlIDE from './pages/GraphiqlIDE';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'graphiql',
    element: <GraphiqlIDE />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
