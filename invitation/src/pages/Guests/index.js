import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import App from '~/containers/App';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';
// import SelectInput from '@mui/material/Select/SelectInput';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

const initialRows = [
    { id: 1, guest: 'Snow', qrcode: 1, host: 'Noivo', confirmation: false },
    { id: 2, guest: 'Lannister', qrcode: 2, host: 'Noivo', confirmation: false },
    { id: 3, guest: 'Lannister', qrcode: 3, host: 'Noivo', confirmation: false },
    { id: 4, guest: 'Stark', qrcode: 4, host: 'Noivo', confirmation: false },
    { id: 5, guest: 'Targaryen', qrcode: 5, host: 'Noivo', confirmation: false },
    { id: 6, guest: 'Melisandre', qrcode: 6, host: 'Noiva', confirmation: true },
    { id: 7, guest: 'Clifford', qrcode: 7, host: 'Noiva', confirmation: true },
    { id: 8, guest: 'Frances', qrcode: 8, host: 'Noiva', confirmation: true },
    { id: 9, guest: 'Roxie', qrcode: 9, host: 'Noiva', confirmation: true },
    { id: 10, guest: 'Snow', qrcode: 1, host: 'Noivo', confirmation: false },
    { id: 20, guest: 'Lannister', qrcode: 2, host: 'Noivo', confirmation: false },
    { id: 30, guest: 'Lannister', qrcode: 3, host: 'Noivo', confirmation: false },
    { id: 40, guest: 'Stark', qrcode: 4, host: 'Noivo', confirmation: false },
    { id: 50, guest: 'Targaryen', qrcode: 5, host: 'Noivo', confirmation: false },
    { id: 60, guest: 'Melisandre', qrcode: 6, host: 'Noiva', confirmation: true },
    { id: 70, guest: 'Clifford', qrcode: 7, host: 'Noiva', confirmation: true },
    { id: 80, guest: 'Frances', qrcode: 8, host: 'Noiva', confirmation: true },
    { id: 90, guest: 'Roxie', qrcode: 9, host: 'Noiva', confirmation: true },
];

export default function DataTable() {
    const [rows, setRows] = React.useState(initialRows);

    const editUser = React.useCallback(
        (id) => () => {
            //TODO Edit Guest
            // setRows((prevRows) => prevRows.map((row) => (row.id === id ? { ...row, isAdmin: !row.isAdmin } : row)));
        },
        []
    );

    const deleteUser = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            });
        },
        []
    );

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
                    <GridActionsCellItem icon={<DeleteIcon />} label="Deletar" onClick={deleteUser(params.id)} />,
                    <GridActionsCellItem icon={<EditIcon />} label="Editar" onClick={editUser(params.id)} />,
                ],
            },
        ],
        [deleteUser, editUser]
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        //     guest: data.get('guest'),
        //     host: data.get('host'),
        // });
        var initRows = initialRows.concat({ id: 1000, guest: `${data.get('guest')}`, qrcode: 1, host: `${data.get('host')}`, confirmation: false });
        setRows(initRows);
    };

    return (
        <App>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                    <TextField required name="guest" label="Convidado" />
                    <RadioGroup required aria-labelledby="demo-radio-buttons-group-label" defaultValue="fiancee" name="host" row>
                        <FormControlLabel value="fiancee" control={<Radio />} label="Noiva" />
                        <FormControlLabel value="fiance" control={<Radio />} label="Noivo" />
                        <FormControlLabel value="couple" control={<Radio />} label="Casal" />
                    </RadioGroup>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Adicionar
                    </Button>
                </Grid>
            </Box>
            <div style={{ height: 650, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[15]} />
            </div>
        </App>
    );
}
