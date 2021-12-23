import React from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

export default function BookingForm({ availability, dailyRate, vehicleId }) {
  const dispatch = useDispatch();
  const { bookingInput } = useSelector((store) => store.rental);

  // const user = useSelector((store) => store.user);
  // const [dateInput, setDateInput] = React.useState('');

  const handleBook = () => {
    console.log(bookingInput.date, dailyRate);
    dispatch({
      type: 'BOOK_VEHICLE',
      payload: { vehicleId, date: bookingInput.date },
    });
  };
  return (
    <Box>
      <FormControl margin="normal">
        <Calendar
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
      <Typography>Daily Rate: ${dailyRate}</Typography>
      <Typography>
        Rental Date:{' '}
        {bookingInput.date
          ? new DateObject(bookingInput.date).format('MMMM D, YYYY')
          : ''}
      </Typography>
      <Typography>
        Estimated Cost: ${bookingInput.date ? dailyRate * 1 : 0}
      </Typography>
      <Button onClick={handleBook}>Book</Button>
    </Box>
  );
}
