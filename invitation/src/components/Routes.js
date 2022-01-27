import React from 'react';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';

import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Home from '~/pages/Home';
import NotFound from '~/pages/NotFound';
import Invitation from '~/pages/Invitation';
import Guests from '~/pages/Guests';

const Routes = () => (
    <BrowserRouter>
        <ReactRoutes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Invitation" element={<Invitation />} />
            <Route path="/Guests" element={<Guests />} />
            <Route path="*" element={<NotFound />} />
        </ReactRoutes>
    </BrowserRouter>
);

export default Routes;
