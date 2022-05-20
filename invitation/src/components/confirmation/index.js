import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Http from '../../config/Http';
import { MySnackbar } from '../../components/snackbar/index';

export default function Confirmation() {
    let navigate = useNavigate();
    const [rows, setRows] = React.useState([]);
    const { err } = MySnackbar();

    React.useEffect(() => {
        getGuests();
    }, []);

    const getGuests = async () => {
        let guests = await Http.getAllGuests();

        if (guests?.status === 200) {
            guests = guests.data?.filter((f) => f.confirmation).sort((x, y) => moment(y.confirmationDate) - moment(x.confirmationDate));

            setRows(guests);
        } else if (guests?.status !== 204) {
            err(guests?.response?.data[0]?.mensagemUsuario);
            guests?.response?.status === 401 && navigate('/login');
        }
    };

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Confirmações Recentes
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Data</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.guest}</TableCell>
                            <TableCell>{moment(row.confirmationDate).format('DD/MM/YYYY')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link
                color="primary"
                href="#"
                onClick={() => {
                    navigate('/guests');
                }}
                sx={{ mt: 3 }}
            >
                Lista de Convidados
            </Link>
        </React.Fragment>
    );
}
