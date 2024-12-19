import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Home from '../Pages/Public/Home';
import Signin from '../Pages/Public/Sign-in/Sign-in';
import Error from '../Pages/Error';

import UserProfile from '../Pages/Auth/UserProfile';

import Layout from '../Layout/Layout';

const PublicRouteur = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='' element={<Navigate to="/home" />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Signin />} />
                <Route path='/profile' element={<UserProfile />} />

                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    );
};

export default PublicRouteur;