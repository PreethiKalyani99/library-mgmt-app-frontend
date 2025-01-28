import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthorDataProvider } from './hooks/useAuthorAPI';
import { AuthorProvider } from './hooks/useAuthor';
import { TokenProvider } from './hooks/useAuthToken';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TokenProvider>
      <AuthorDataProvider>
        <AuthorProvider>
          <Router
            basename="/library-mgmt-app-frontend"
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <App />
          </Router>
        </AuthorProvider>
      </AuthorDataProvider>
    </TokenProvider>
  </React.StrictMode>
);

reportWebVitals();