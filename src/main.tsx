import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import './index.scss';
import { store } from './store';
import { LocalizationProvider } from './context/local';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <LocalizationProvider>
          <App />
        </LocalizationProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
