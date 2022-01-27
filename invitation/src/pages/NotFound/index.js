import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

const theme = createTheme();

const NotFound = () => (
    <ThemeProvider theme={theme}>
        <Grid
            container
            component="home"
            sx={{
                height: '100vh',
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
            }}
        >
            <CssBaseline />
            <h1>Caminho não encontrado</h1>
        </Grid>
    </ThemeProvider>
);

export default NotFound;
