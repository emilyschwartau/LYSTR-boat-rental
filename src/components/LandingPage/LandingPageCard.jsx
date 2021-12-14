import React from 'react';
import { Box, Card, Typography, Button, TextField, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { format } from 'date-fns';

function LandingPageCard() {
    const [startDate, setStartDate] = React.useState(new Date());

    const handleChange = (newValue) => {
        const formattedStartDate = format(newValue, 'MM/dd/yy');
        console.log(`this is format`, formattedStartDate);
        setStartDate(formattedStartDate)
    };



    console.log(startDate);

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
                <FormControl
                    fullWidth={true}
                >
                    <TextField
                        placeholder='City, State'
                        helperText='Search Location by City, State'
                        label='Location'
                    />
                    <br />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label='Date of Trip'
                            helperText='Date of Trip'
                            value={startDate}
                            onChange={((newValue) => {
                                handleChange(newValue);
                            })}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <br />
                    <Button
                        variant='outlined'
                        endIcon={<SearchIcon />}
                        sx={{
                            width: '50%',
                            margin: 'auto'
                        }}
                    >
                        Search
                    </Button>
                </FormControl>
            </Card>
        </Box>
    </>)
}
export default LandingPageCard;