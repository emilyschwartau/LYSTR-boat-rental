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


function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

function ListingsTab() {
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
            image_url: ['/images/kayak.jpeg', '/images/jetski.png', '/images/fishingboat.jpeg', '/images/pontoon.jpeg', '/images/runabout.png']
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
            image_url: ['/images/jetski.png']
        },
    ];



    return (<>
        <Typography variant='h2'>My Vehicle Listings</Typography>
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>TITLE</TableCell>
                        <TableCell align="right">Year,&nbsp; Make,&nbsp; Model</TableCell>
                        <TableCell align="right">Vehicle Type</TableCell>
                        <TableCell align="right">Currently Rented By</TableCell>
                        <TableCell align="right">Daily Rate</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dummyOwnerListingList?.map((row) => (
                        <ListingsRow key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}

export default ListingsTab;