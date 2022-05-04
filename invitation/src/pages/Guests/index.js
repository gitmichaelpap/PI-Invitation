import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Input } from '@material-ui/core';
import App from '../../containers/App';
import { MySnackbar } from '../../components/snackbar/index';
import Http from '../../config/Http';

export default function DataTable() {
    const methods = useForm();
    const { err, success } = MySnackbar()
    const [rows, setRows] = React.useState([]);
    const [value, setValue] = React.useState('');
    let navigate = useNavigate();

    React.useEffect(() => {
        getGuests();
    }, [])

    const getGuests = async () => {
        const guests = await Http.getAllGuests();
        if(guests?.status === 200){
            setRows(guests.data?.reverse());
          }else{
              err(guests?.response?.data[0]?.mensagemUsuario);
              guests?.response?.status === 401 && navigate('/login');
          }
    }

    const createGuest = async (newGuest) => {
        const guests = await Http.createGuest(newGuest);
        if(guests?.status === 201){
            success('Convidado criado com Sucesso!');
          }else{
              err(guests?.response?.data[0]?.mensagemUsuario);
              guests?.response?.status === 401 && navigate('/login');
          }
    }

    const updateGuest = async (guest) => {
        const guests = await Http.updateGuest(guest.id, guest);
        if(guests?.status === 200){
            success('Convidado alterado com Sucesso!');
          }else{
              err(guests?.response?.data[0]?.mensagemUsuario);
              guests?.response?.status === 401 && navigate('/login');
          }
    }

    const editUser = async (guest) => {
        methods.setValue('id', guest.id);
        methods.setValue('guest', guest.guest);
        setValue(guest.host);
    }

    const deleteUser = async (guest) => {
        const guests = await Http.removeGuest(guest.id);
        if(guests?.status === 200){
            success('Convidado removido com Sucesso!');
            getGuests();
          }else{
              err(guests?.response?.data[0]?.mensagemUsuario);
              guests?.response?.status === 401 && navigate('/login');
          }
    }

    const onSubmit = async (values) => {
        // TODO Retirar o qrcode e confirmation do onSubmit, pois serão validados pelo back
        let newGuest = { 
            guest: values?.guest, 
            qrcode: 1, 
            host: values?.host,
            confirmation: false 
        };
        
        if(!!values?.id) newGuest.id = values?.id;
        
        newGuest?.id ? await updateGuest(newGuest) : await createGuest(newGuest);

        methods.setValue('guest', '');
        methods.setValue('id', '');
        setValue('')
        getGuests();
    };

    const columns = React.useMemo(
        () => [
            { field: 'id', headerName: 'ID', width: 0, hide: true },
            { field: 'guest', headerName: 'Convidado', type: 'string', width: 450, minWidth: 300, maxWidth: 450 },
            { field: 'qrcode', headerName: 'QRCode', type: 'string', width: 200, minWidth: 100, maxWidth: 300 },
            { field: 'host', headerName: 'Noivo / Noiva', type: 'string', width: 200, minWidth: 100, maxWidth: 300 },
            { field: 'confirmation', headerName: 'Confirmado', type: 'boolean', width: 200, minWidth: 100, maxWidth: 300 },
            {
                field: 'action',
                headerName: 'Ações',
                type: 'actions',
                width: 80,
                minWidth: 40,
                maxWidth: 100,
                getActions: (params) => [
                    <GridActionsCellItem icon={<DeleteIcon />} label="Deletar" onClick={() => deleteUser(params)} />,
                    <GridActionsCellItem icon={<EditIcon />} label="Editar" onClick={() => editUser(params.row)} />,
                ],
            },
        ],
        [deleteUser, editUser]
    );

    return (
        <App>
            <FormProvider {...methods}>
                <Box component="form" onSubmit={methods.handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            mt: 3,
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            alignContent: 'center',
                        }}
                    >
                        <TextField name="guest" label="Convidado"  {...methods.register('guest')} required />
                        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="host" row value={value} onChange={(e) => setValue(e.target.value)}>
                            <FormControlLabel value="fiancee" control={<Radio required/>} label="Noiva" {...methods.register('host')} />
                            <FormControlLabel value="fiance" control={<Radio required/>} label="Noivo" {...methods.register('host')} />
                            <FormControlLabel value="couple" control={<Radio required/>} label="Casal" {...methods.register('host')} />
                        </RadioGroup>
                        <Input type="hidden" name="id" label="id" {...methods.register('id')} />
                        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Adicionar
                        </Button>
                    </Grid>
                </Box>
            </FormProvider>

            <div style={{ height: 650, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[15]} />
            </div>
        </App>
    );
}
