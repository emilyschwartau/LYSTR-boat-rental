import * as React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useSelector } from 'react-redux';

import ReservationsRow from './ReservationsRow';

function ReservationsTab() {
  const reservationsList = useSelector(
    (store) => store.vehicle.allReservationsById
  );
  console.log('reservations mounted');
  return (
    <>
      <Typography variant="h2">My Reservations</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>TITLE</TableCell>
              <TableCell align="right">Year,&nbsp; Make,&nbsp; Model</TableCell>
              <TableCell align="right">Vehicle Type</TableCell>
              <TableCell align="right">Date Rented</TableCell>
              <TableCell align="right">Vehicle Owner</TableCell>
              <TableCell align="right">Daily Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservationsList?.map((rental) => (
              <ReservationsRow key={rental.id} rental={rental} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ReservationsTab;
