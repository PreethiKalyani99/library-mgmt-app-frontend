import { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useAuthToken } from './hooks/useAuthToken';
import Author from './components/authors/Author';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import './App.css';

function App() {
  const navigate = useNavigate()
  const { token } = useAuthToken()

  useEffect(() => {
    if (token) {
      navigate('/author-form')
    }
  }, [token, navigate])

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/author-form' element={token ? <Author /> : <Navigate to="/" />}/>
    </Routes>
  );
}

export default App;
