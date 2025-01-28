import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthorProvider } from './hooks/useAuthor';
import { BookProvider } from './hooks/useBook';
import { TokenProvider } from './hooks/useAuthToken';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TokenProvider>
        <AuthorProvider>
          <BookProvider>
            <Router
              basename="/library-mgmt-app-frontend"
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            >
              <App />
            </Router>
          </BookProvider>
        </AuthorProvider>
    </TokenProvider>
  </React.StrictMode>
);

reportWebVitals();