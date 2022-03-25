import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import App from '~/containers/App';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Input } from '@material-ui/core';

import Http from '~/config/Http';

export default function DataTable() {
    const methods = useForm();

    const [rows, setRows] = React.useState([]);
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        getGuests();
    }, [])

    const getGuests = async () => {
        const guests = await Http.getAll();
        setRows(guests.data);
    }

    const createGuest = async (newGuest) => {
        await Http.create(newGuest);
    }

    const updateGuest = async (guest) => {
        await Http.update(guest.id, guest);
    }

    const editUser = async (guest) => {
        methods.setValue('id', guest.id);
        methods.setValue('guest', guest.guest);
        setValue(guest.host);
    }

    const deleteUser = async (guest) => {
        await Http.remove(guest.id);
        getGuests();
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
                        <TextField name="guest" label="Convidado"  {...methods.register('guest')} />
                        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="host" row value={value} onChange={(e) => setValue(e.target.value)}>
                            <FormControlLabel value="fiancee" control={<Radio />} label="Noiva" {...methods.register('host')}/>
                            <FormControlLabel value="fiance" control={<Radio />} label="Noivo" {...methods.register('host')}/>
                            <FormControlLabel value="couple" control={<Radio />} label="Casal" {...methods.register('host')}/>
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
