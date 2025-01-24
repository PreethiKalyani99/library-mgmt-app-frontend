import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthorDataProvider } from './hooks/useAuthorAPI';
import { AuthorProvider } from './hooks/useAuthor';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthorDataProvider>
      <AuthorProvider>
        <App />
      </AuthorProvider>
    </AuthorDataProvider>
  </React.StrictMode>
);

reportWebVitals();