import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthorProvider } from './hooks/useAuthor';
import { BookProvider } from './hooks/useBook';
import { AuthProvider } from './hooks/useAuth';
import { UserProvider } from './hooks/useUser';
import { BorrowProvider } from './hooks/useBorrow';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router
      basename="/library-mgmt-app-frontend"
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <UserProvider>
          <AuthorProvider>
            <BookProvider>
              <BorrowProvider>
                <App />
              </BorrowProvider>
            </BookProvider>
          </AuthorProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();