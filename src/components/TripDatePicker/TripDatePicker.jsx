import { useState } from 'react';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import useQuery from '../../hooks/useQuery';

function TripDatePicker() {
  const dispatch = useDispatch();
  // hook to check url query string
  const query = useQuery();
  const date = query.get('date');

  // search input
  const [startDate, setSearch] = useState(null);

  // handle date selection
  // setSearch with date format from calendar
  // send updated format of the same date to reducer
  const handleDateChange = (newValue) => {
    setSearch(newValue);
    dispatch({ type: 'SET_SEARCH_DATE', payload: newValue });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        required
        label="Date of Trip"
        currentDate
        // checks value from state then url, updates when changed
        value={startDate ? startDate : date}
        onChange={(newValue) => {
          handleDateChange(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              m: 1,
            }}
            helperText="Date of Trip"
            label={'Date'}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default TripDatePicker;
