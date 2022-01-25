import React from 'react';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';

import About from '~/pages/About';
import Contact from '~/pages/Contact';
import Home from '~/pages/Home';

const Routes = () => (
    <BrowserRouter>
        <ReactRoutes>
            <Route path="*" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
        </ReactRoutes>
    </BrowserRouter>
);

export default Routes;
