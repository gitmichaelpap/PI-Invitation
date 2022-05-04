import React, { useContext }  from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../common/contexts/User';
import Http from '../../config/Http';
import { MySnackbar } from '../../components/snackbar/index';

const theme = createTheme();

export default function Login() {
    let navigate = useNavigate();
    const { setEngaged, setWeddingDay, setDtRegister } = useContext(UserContext);
    const { err } = MySnackbar()

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const login = {
            email: data.get('email'),
            password: data.get('password'),
        };

        const resp = await Http.getLogin(login);
        if(resp?.status === 200){
            localStorage.setItem('user', JSON.stringify(resp.data?.user));
            localStorage.setItem('token', resp.data?.acessToken);
            setEngaged(`${resp.data?.user.fiancee} & ${resp.data?.user.fiance}`);
            setWeddingDay(new Date(resp.data?.user.weddingDay));
            setDtRegister(new Date(resp.data?.user.dtRegister));
            navigate('/home');
        }else{
            err(resp?.response?.data[0]?.mensagemUsuario);
            resp.response.status === 401 && navigate('/login')
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="login" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                    }}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.login' }}></Avatar>
                        <Typography component="h1" variant="h5">
                            Entrar
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            defaultValue='admin@gmail.com'
                            autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                defaultValue='admin'
                            />
                            {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Lembrar-me" /> */}
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Entrar
                            </Button>
                            <Grid container>
                                {/* <Grid item xs>
                                    <Link href="/" variant="body2">
                                        Esqueci minha senha
                                    </Link>
                                </Grid> */}
                                <Grid item xs>
                                    <Link href="/Register" variant="body2">
                                        Não possui uma conta? Cadastre-se
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
