import ListingsRow from './ListingsRow';
import * as React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useSelector } from 'react-redux';


function ListingsTab() {
  const ownerListingList = useSelector(
    (store) => store.vehicle.listedVehiclesByOwner
  );

    return (<>
        <Typography variant='h2'>My Vehicle Listings</Typography>
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Listing Title</TableCell>
                        <TableCell align="right">Year,&nbsp; Make,&nbsp; Model</TableCell>
                        <TableCell align="right">Vehicle Type</TableCell>
                        <TableCell align="right">Daily Rate</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ownerListingList?.map((vehicle) => (
                        <ListingsRow key={vehicle?.vehicleId} vehicle={vehicle} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}

export default ListingsTab;
