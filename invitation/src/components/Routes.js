import React from 'react';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import UserProvider from '../common/contexts/User';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Invitation from '../pages/Invitation';
import Guests from '../pages/Guests';

const Routes = () => (
    <BrowserRouter>
        <UserProvider>
            <ReactRoutes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/invitation" element={<Invitation />} />
                <Route path="/guests" element={<Guests />} />
                <Route path="*" element={<NotFound />} />
            </ReactRoutes>
        </UserProvider>
    </BrowserRouter>
);

export default Routes;
