import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ptBR } from "date-fns/locale";
// import { ptBR } from '@material-ui/core/locale';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Http from '../../config/Http';
import moment from 'moment';
import { MySnackbar } from '../../components/snackbar/index';

const theme = createTheme();

export default function Register() {
    let navigate = useNavigate();
    const [value, setValue] = React.useState(new Date());
    const { err, success } = MySnackbar()

    function dateToEN(date)
    {	
	    return date.split('/').reverse().join('-');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const login = {
            fiancee: data.get('name-fiancee'),
            fiance: data.get('name-fiance'),
            weddingDay: moment(dateToEN(data.get('weddingDay'))),
            email: data.get('email'),
            password: data.get('password'),
            dtRegister: new Date()
        };
        
        const resp = await Http.createLogin(login);
        
        if(resp?.status === 201){
            success('Usuário criado com Sucesso!')
            navigate('/login')
        }else{
            err(resp?.response?.data[0]?.mensagemUsuario);
            resp.response.status === 401 && navigate('/login')
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
                    <Typography component="h1" variant="h5">
                        Cadastro
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={24} sm={12}>
                                <TextField autoComplete="given-name" name="name-fiancee" required fullWidth id="name-fiancee" label="Nome da Noiva" autoFocus />
                            </Grid>
                            <Grid item xs={24} sm={12}>
                                <TextField autoComplete="given-name" name="name-fiance" required fullWidth id="name-fiance" label="Nome do Noivo" autoFocus />
                            </Grid>
                            <Grid item xs={24} sm={12}>
                                <LocalizationProvider  dateAdapter={AdapterDateFns} locale={ptBR}>
                                    <DatePicker
                                        label="Dia do Casamento"
                                        views={['day', 'month', 'year']}
                                        value={value}
                                        onChange={(newValue) => {
                                        setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField fullWidth required autoFocus  name="weddingDay" id="weddingDay" {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth id="email" label="Email" name="email" autoComplete="email" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Cadastre-se
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Já possui uma conta? Entre
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
