import { Routes, Route } from 'react-router-dom';
import { roles } from './constants/roles';
import PrivateRoute from './routes/PrivateRoutes';
import CreateAuthor from './components/authors/CreateAuthor';
import CreateBook from './components/books/CreateBook';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Sidebar from './components/common/sidebar/Sidebar';
import Authors from './components/authors/Authors';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>

      <Route path='/home' element={<PrivateRoute component={<Sidebar />} />} >
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
          path='book-form' 
          element={
            <PrivateRoute 
              component={<CreateBook />} 
              allowedRoles={[roles.ADMIN, roles.LIBRARIAN]}
            />
          } 
        />  
      </Route>
    </Routes>
  );
}

export default App;
