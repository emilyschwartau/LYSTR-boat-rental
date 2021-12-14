import { useState } from 'react';
import { Box, Card, Typography, Button, TextField, FormControl } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';

function LandingPageLocation() {
    const dispatch = useDispatch();

    //search input
    const [search, setSearch] = useState({
        location: '',
        //initial search 
        startDate: (format(new Date(), 'MM/dd/yy')),
    })

    //handle date selection
    const handleChange = (newValue) => {
        const formattedStartDate = format(newValue, 'MM/dd/yy');
        console.log(`this is format`, formattedStartDate);
        setSearch({ ...search, startDate: formattedStartDate })
    };

    const handleSubmit = () => {
        console.log(search)
    }

    return (<>
        <Box sx={{
            width: '50%'
        }}>
            <Card sx={{
                border: '1px solid black',
                width: '100%',
                padding: '1em',
                textAlign: 'center'
            }}>
                <Typography variant='h4'>Find A Boat To Rent Near You!</Typography>
                <br />
                <form onSubmit={() => dispatch({ type: 'SET_SEARCH', payload: search })}>
                    <FormControl
                        fullWidth={true}
                    >
                        <TextField
                            placeholder='City, State'
                            helperText='Search Location by City, State'
                            label='Location'
                            value={search.location}
                            onChange={(e) => setSearch({ ...search, location: e.target.value })}
                        />
                        <br />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label='Date of Trip'
                                helperText='Date of Trip'
                                value={search.startDate}
                                onChange={((newValue) => {
                                    handleChange(newValue);
                                })}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <br />
                            <Button
                            type='submit'
                            variant='outlined'
                            sx={{
                                width: '50%',
                                margin: 'auto'
                            }}
                        >
                            Select Vehicle Type
                        </Button>
                    </FormControl>
                </form>
            </Card>
        </Box>
    </>)
}
export default LandingPageLocation;