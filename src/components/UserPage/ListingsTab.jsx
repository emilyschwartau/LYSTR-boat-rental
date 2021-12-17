import ListingsRow from './ListingsRow';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux';

function ListingsTab() {
    const ownerListingList = useSelector(store => store.vehicle.listedVehiclesByOwner);


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
                        {/* <TableCell align="right">Currently Rented By</TableCell> */}
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