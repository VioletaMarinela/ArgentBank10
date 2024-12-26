
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Pages/Public/Home';
import Signin from './Pages/Public/Sign-in';
import Error from './Pages/Public/Error';

import UserProfile from './Pages/Auth/User';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getToken } from './Redux/Features/token'; // Assurez-vous que le chemin est correct  

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getToken(token));
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='' element={<Navigate to="/home" />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
