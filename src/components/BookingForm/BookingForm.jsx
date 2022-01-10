import React from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import useQuery from '../../hooks/useQuery';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';
import LoginIcon from '@mui/icons-material/Login';

export default function BookingForm({ availability, dailyRate, vehicleId }) {
  const dispatch = useDispatch();
  const { bookingInput } = useSelector((store) => store.rental);
  const user = useSelector((store) => store.user);

  const query = useQuery();
  const date = query.get('date');

  // const user = useSelector((store) => store.user);
  // const [dateInput, setDateInput] = React.useState('');

  // for requiring a date selection
  const [noDate, setNoDate] = React.useState(false);

  React.useEffect(() => dispatch({ type: 'CLEAR_BOOKING_INPUT' }), []);

  const handleBook = () => {
    console.log(bookingInput.date, dailyRate);
    if (bookingInput.date === '') {
      setNoDate(true);
    } else {
      dispatch({
        type: 'BOOK_VEHICLE',
        payload: { vehicleId, date: bookingInput.date },
      });
    }
  };

  console.log(date)

  return (
    <Box>
      <Typography variant="h5" align="center">
        Select a Date to Rent
      </Typography>
      <FormControl margin="normal">
        <Calendar
          currentDate={new DateObject()
            .set('year', date.split('-')[2])
            .set('month', date.split('-')[0])
            .set('day', date.split('-')[1])}
          value={new DateObject()
            .set('year', bookingInput.date.split('-')[2])
            .set('month', bookingInput.date.split('-')[0])
            .set('day', bookingInput.date.split('-')[1])}
          numberOfMonths={1}
          onChange={(date) => {
            dispatch({
              type: 'BOOKING_FORM_ONCHANGE',
              payload: {
                property: 'date',
                value: date.format('MM-DD-YYYY'),
              },
            });
            console.log(date);
          }}
          mapDays={({ date, today }) => {
            const isAvailable = availability?.includes(
              date.format('MM-DD-YYYY')
            );
            if (!isAvailable || date.dayOfYear < today.dayOfYear)
              return {
                disabled: true,
                style: { color: '#ccc' },
              };
          }}
        />
      </FormControl>
      <Typography>
        <b>Daily Rate:</b> ${dailyRate}
      </Typography>
      <Typography>
        <b>Rental Date:</b>{' '}
        {bookingInput.date
          ? new DateObject()
              .set('year', bookingInput.date.split('-')[2])
              .set('month', bookingInput.date.split('-')[0])
              .set('day', bookingInput.date.split('-')[1])
              .format('MMMM D, YYYY')
          : ''}
      </Typography>
      <Typography>
        <b>Estimated Cost:</b> ${bookingInput.date ? dailyRate * 1 : 0}
      </Typography>
      <Button variant="contained" onClick={handleBook} disabled={!user.id} startIcon={user.id ? <CheckIcon /> : <LoginIcon />}>
        {user.id ? 'Book' : 'Login to Book'}
      </Button>
      <Dialog open={noDate} onClose={() => setNoDate(false)}>
        <DialogTitle>Please Select a Date to Rent</DialogTitle>
        <DialogActions>
          <Button onClick={() => setNoDate(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
