import React from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import useQuery from '../../hooks/useQuery';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function BookingForm({ availability, dailyRate, vehicleId }) {
  const dispatch = useDispatch();
  const { bookingInput } = useSelector((store) => store.rental);

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
  return (
    <Box>
      <FormControl margin="normal">
        <Calendar
          currentDate={new DateObject(date)}
          value={bookingInput.date}
          numberOfMonths={1}
          // value={vehicleFormInputs.availability?.map(
          //   (date) => new DateObject(date)
          // )}
          // onChange={setDateInput}
          onChange={(date) => {
            // setDateInput(date);
            dispatch({
              type: 'BOOKING_FORM_ONCHANGE',
              payload: {
                property: 'date',
                value: date.format('YYYY-MM-DD'),
              },
            });
            console.log(date);
          }}
          mapDays={({ date }) => {
            const isAvailable = availability?.includes(
              date.format('YYYY-MM-DD')
            );
            if (!isAvailable)
              return {
                disabled: true,
                style: { color: '#ccc' },
              };
          }}
        />
      </FormControl>
      <Typography id="dailyRate">Daily Rate: ${dailyRate}</Typography>
      <Typography>
        Rental Date:{' '}
        {bookingInput.date
          ? new DateObject(bookingInput.date).format('MMMM D, YYYY')
          : ''}
      </Typography>
      <Typography id="estimatedCost">
        Estimated Cost: ${bookingInput.date ? dailyRate * 1 : 0}
      </Typography>
      <Button variant="contained" onClick={handleBook}>
        Book
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
