import React from 'react';
import App from '~/containers/App';
import Deposits from '~/components/deposits';
import Chart from '~/components/chart';
import Confirmation from '~/components/confirmation';
import TotalGuests from '~/components/totalGuests';
import { Container, Grid, Paper } from '@mui/material';

const Home = () => (
    <App>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                    >
                    <Chart />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                        }}
                    >
                        <Deposits />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Confirmation />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                        }}
                    >
                        <TotalGuests />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </App>
);

export default Home;