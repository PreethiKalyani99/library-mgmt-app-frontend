import { Routes, Route } from 'react-router-dom';
import { roles } from './constants/roles';
import PrivateRoute from './routes/PrivateRoutes';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Main from './components/Main';
import Authors from './components/authors/Authors';
import Books from './components/books/Books';
import Users from './components/users/Users';
import Borrowers from './components/borrowed-books/Borrowers';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>

      <Route path='/home' element={<PrivateRoute component={<Main />} />} >
        <Route
          path='authors'
          element={
            <PrivateRoute 
              component={<Authors />} 
              allowedRoles={[roles.ADMIN, roles.LIBRARIAN, roles.READER, roles.RECEPTIONIST]} 
            />
          }
        />
        <Route 
          path='books' 
          element={
            <PrivateRoute 
              component={<Books />} 
              allowedRoles={[roles.ADMIN, roles.LIBRARIAN, roles.READER, roles.RECEPTIONIST]}
            />
          } 
        />  
        <Route 
          path='users' 
          element={
            <PrivateRoute 
              component={<Users />} 
              allowedRoles={[roles.ADMIN]}
            />
          } 
        />  
        <Route 
          path='borrowed-books' 
          element={
            <PrivateRoute 
              component={<Borrowers />} 
              allowedRoles={[roles.ADMIN, roles.LIBRARIAN, roles.RECEPTIONIST, roles.READER]}
            />
          } 
        />  
      </Route>
    </Routes>
  );
}

export default App;
