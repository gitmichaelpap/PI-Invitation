import React from 'react';

import { SnackbarProvider } from "notistack";
import Routes from '../components/Routes';

const Root = () => (
    <SnackbarProvider>
        <Routes />
    </SnackbarProvider>
);

export default Root;
