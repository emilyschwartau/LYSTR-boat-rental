import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

import ReservationsRow from './ReservationsRow';

function ReservationsTab() {
  const dummyOwnerListingList = [
    {
      id: 1,
      type: 'Kayak',
      title: 'Come kayak pls',
      make: 'make $0',
      model: 'instagram',
      year: '2021',
      capacity: 'minimal',
      length: 'metric or imperial',
      horsepower: 'yes',
      dailyRate: '$9999',
      cabins: 'would be nice',
      heads: 'wat is this attribute',
      instructions: 'send halp',
      street: '1600 Pennsylvania Ave',
      city: 'Minneapolis',
      state: 'MN',
      zip: '90210',
      // add column to table REF user_id. JOIN ON user.id and get first Name
      currentlyRentedBy: 'jackie',
      // features
      features: ['no seatbelt', 'you break you buy'],
      // JOIN image at id
      image_url: [
        '/images/kayak.jpeg',
        '/images/jetski.png',
        '/images/fishingboat.jpeg',
        '/images/pontoon.jpeg',
        '/images/runabout.png',
      ],
    },
    {
      id: 2,
      type: 'Jetski',
      title: 'Jetskrrrrr',
      make: 'make $0',
      model: 'instagram',
      year: '2021',
      capacity: 'minimal',
      length: 'metric or imperial',
      horsepower: 'yes',
      dailyRate: '$9999',
      cabins: 'would be nice',
      heads: 'wat is this attribute',
      instructions: 'send halp',
      street: 'smart',
      city: 'twin cities',
      state: 'depression',
      zip: 'shhhh',
      // add column to table REF user_id. JOIN ON user.id and get first Name
      currentlyRentedBy: 'jackie',
      // JOIN image at id
      image_url: ['/images/jetski.png'],
    },
  ];
  console.log('reservations mounted');
  return (
    <>
      <Typography variant="h2">My Current Reservations</Typography>
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
            {dummyOwnerListingList?.map((row) => (
              <ReservationsRow key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ReservationsTab;
