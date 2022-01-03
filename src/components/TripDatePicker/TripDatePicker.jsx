import { useState } from 'react';
import { Box, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import useQuery from '../../hooks/useQuery'

function TripDatePicker() {
    const query = useQuery()
    const dispatch = useDispatch();
    const { searchQuery } = useSelector((store) => store.search);
    const date = query.get("date");
    const tripDate = searchQuery.date


    // search input
    const [startDate, setSearch] = useState(null)

    // handle date selection
    // setSearch with date format from calendar
    // send updated format of the same date to reducer
    const handleDateChange = (newValue) => {
        const formattedStartDate = format(newValue, "yyyy-MM-dd");
        setSearch(newValue);
        dispatch({ type: "SET_SEARCH_DATE", payload: formattedStartDate });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                required
                label="Date of Trip"
                helperText="Date of Trip"
                currentDate
                value={startDate}
                onChange={(newValue) => {
                    handleDateChange(newValue);
                }}
                renderInput={(params) => <TextField {...params}
                label={date ? date : tripDate}
                
                />}
            />
        </LocalizationProvider>
    )
}

export default TripDatePicker;

