import App from '~/containers/App';
import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

function createData(guest, qrcode, host, confirmation) {
    return {
        guest,
        qrcode,
        host,
        confirmation,
    };
}

const rows = [
    createData('Carol', 305, 'Noiva', 'nao'),
    createData('Michael', 452, 'Noivo', 'sim'),
    createData('Oscar', 262, 'Noivo', 'nao'),
    createData('Max', 159, 'Noivo', 'sim'),
    createData('Alexandra', 356, 'Noivo', 'nao'),
    createData('India', 408, 'Noivo', 'sim'),
    createData('Arlinda', 237, 'Noivo', 'nao'),
    createData('Wanderley', 375, 'Noivo', 'sim'),
    createData('Julio', 518, 'Noiva', 'nao'),
    createData('Raquel', 392, 'Noiva', 'sim'),
    createData('Filipe', 302, 'Noiva', 'nao'),
    createData('Laura', 360, 'Noiva', 'sim'),
    createData('Renata', 437, 'Noiva', 'nao'),
    createData('Carol', 305, 'Noiva', 'nao'),
    createData('Michael', 452, 'Noivo', 'sim'),
    createData('Oscar', 262, 'Noivo', 'nao'),
    createData('Max', 159, 'Noivo', 'sim'),
    createData('Alexandra', 356, 'Noivo', 'nao'),
    createData('India', 408, 'Noivo', 'sim'),
    createData('Arlinda', 237, 'Noivo', 'nao'),
    createData('Wanderley', 375, 'Noivo', 'sim'),
    createData('Julio', 518, 'Noiva', 'nao'),
    createData('Raquel', 392, 'Noiva', 'sim'),
    createData('Filipe', 302, 'Noiva', 'nao'),
    createData('Laura', 360, 'Noiva', 'sim'),
    createData('Renata', 437, 'Noiva', 'nao'),
    createData('Carol', 305, 'Noiva', 'nao'),
    createData('Michael', 452, 'Noivo', 'sim'),
    createData('Oscar', 262, 'Noivo', 'nao'),
    createData('Max', 159, 'Noivo', 'sim'),
    createData('Alexandra', 356, 'Noivo', 'nao'),
    createData('India', 408, 'Noivo', 'sim'),
    createData('Arlinda', 237, 'Noivo', 'nao'),
    createData('Wanderley', 375, 'Noivo', 'sim'),
    createData('Julio', 518, 'Noiva', 'nao'),
    createData('Raquel', 392, 'Noiva', 'sim'),
    createData('Filipe', 302, 'Noiva', 'nao'),
    createData('Laura', 360, 'Noiva', 'sim'),
    createData('Renata', 437, 'Noiva', 'nao'),
    createData('Carol', 305, 'Noiva', 'nao'),
    createData('Michael', 452, 'Noivo', 'sim'),
    createData('Oscar', 262, 'Noivo', 'nao'),
    createData('Max', 159, 'Noivo', 'sim'),
    createData('Alexandra', 356, 'Noivo', 'nao'),
    createData('India', 408, 'Noivo', 'sim'),
    createData('Arlinda', 237, 'Noivo', 'nao'),
    createData('Wanderley', 375, 'Noivo', 'sim'),
    createData('Julio', 518, 'Noiva', 'nao'),
    createData('Raquel', 392, 'Noiva', 'sim'),
    createData('Filipe', 302, 'Noiva', 'nao'),
    createData('Laura', 360, 'Noiva', 'sim'),
    createData('Renata', 437, 'Noiva', 'nao'),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'guest',
        numeric: false,
        disablePadding: true,
        label: 'Convidado',
    },
    {
        id: 'qrcode',
        numeric: true,
        disablePadding: false,
        label: 'QRCode',
    },
    {
        id: 'host',
        numeric: true,
        disablePadding: false,
        label: 'Noivo / Noiva',
    },
    {
        id: 'confirmation',
        numeric: true,
        disablePadding: false,
        label: 'Confirmado',
    },
    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'Ações',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selecionados
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                    Lista de Convidados
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Deletar">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filtro">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function Guests() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('qrcode');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.guest);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, guest) => {
        const selectedIndex = selected.indexOf(guest);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, guest);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (guest) => selected.indexOf(guest) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <App>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="guestsTable" size={'small'}>
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.guest);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.guest)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.guest}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                                    {row.guest}
                                                </TableCell>
                                                <TableCell align="right">{row.qrcode}</TableCell>
                                                <TableCell align="right">{row.host}</TableCell>
                                                <TableCell align="right">{row.confirmation}</TableCell>
                                                <TableCell align="right">{row.action}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        labelRowsPerPage="Convidados por página"
                        rowsPerPageOptions={[15, 25, 50]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                {/* <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" /> */}
            </Box>
        </App>
    );
}
