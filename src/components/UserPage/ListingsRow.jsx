import ListingsInfo from './ListingsInfo';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function ListingsRow({vehicle}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* ACTUAL TABLE ROW START */}
            <TableRow sx={{ '& > *': { borderBottom: 'unset'} }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {vehicle?.title}
                </TableCell>
                <TableCell align="right">{`${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`}</TableCell>
                <TableCell align="right">{vehicle?.type}</TableCell>
                {/* <TableCell align="right">{row.currentlyRentedBy}</TableCell> */}
                <TableCell align="right">${vehicle?.dailyRate}</TableCell>
            </TableRow>
            {/* ACTUAL TABLE ROW END */}
            {/* INFO ROW START */}
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <ListingsInfo vehicle={vehicle}/>
                    </Collapse>
                </TableCell>
            </TableRow>
            {/* INFO ROW END */}
        </>
    );
}

export default ListingsRow;
