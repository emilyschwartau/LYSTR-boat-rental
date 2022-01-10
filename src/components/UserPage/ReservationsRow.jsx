import ReservationsInfo from './ReservationsInfo';

import { useState } from 'react';
import { Collapse, IconButton, TableRow, TableCell } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { format } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function ReservationsRow({ rental }) {
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
          {rental?.title}
        </TableCell>
        <TableCell align="right">{`${rental?.year} ${rental?.make} ${rental?.model}`}</TableCell>
        <TableCell align="right">{rental?.vehicleType}</TableCell>
        <TableCell align="right">
          {format(new Date(rental?.dateRented), 'MM/dd/yyyy')}
        </TableCell>
        <TableCell align="right">
          <Stack direction="row" justifyContent="flex-end">
            <Avatar
              src={`/api/user/pic/${rental?.ownerPic}`}
              alt={rental?.ownerFirstName}
              sx={{ mr: 1 }}
            />
            <Typography align="left" variant="body">
              {rental?.ownerFirstName} {rental?.ownerLastName}
              <br />
              {rental?.ownerEmail}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="right">${rental?.dailyRate}</TableCell>
      </TableRow>
      {/* ACTUAL TABLE ROW END */}
      {/* INFO ROW START */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ReservationsInfo rental={rental} />
          </Collapse>
        </TableCell>
      </TableRow>
      {/* INFO ROW END */}
    </>
  );
}

export default ReservationsRow;
