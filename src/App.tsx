import { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Author from './components/authors/Author';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import './App.css';

function App() {
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate('/author-form')
  //   }
  // }, [isLoggedIn, navigate])

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/author-form' element={isLoggedIn ? <Author /> : <Navigate to="/" />}/>
    </Routes>
  );
}

export default App;
