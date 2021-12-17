import ReservationsInfo from './ReservationsInfo';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function ReservationsRow({ row }) {
  // const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ACTUAL TABLE ROW START */}
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
          {row.title}
        </TableCell>
        <TableCell align="right">{`${row.year} ${row.make} ${row.model}`}</TableCell>
        <TableCell align="right">{row.type}</TableCell>
        <TableCell align="right">{row.currentlyRentedBy}</TableCell>
        <TableCell align="right">{row.currentlyRentedBy}</TableCell>
        <TableCell align="right">{row.dailyRate}</TableCell>
      </TableRow>
      {/* ACTUAL TABLE ROW END */}
      {/* INFO ROW START */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ReservationsInfo row={row} />
          </Collapse>
        </TableCell>
      </TableRow>
      {/* INFO ROW END */}
    </>
  );
}

export default ReservationsRow;
