import React from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

export default function BookingForm({ availability }) {
  const dispatch = useDispatch();
  // const [dateInput, setDateInput] = React.useState('');
  // const { bookingInput } = useSelector((store) => store.rental);
  return (
    <FormControl margin="normal">
      <Calendar
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
              value: date.format(),
            },
          });
          console.log(date.format());
        }}
        mapDays={({ date }) => {
          const isAvailable = availability?.includes(date.format('YYYY-MM-DD'));
          if (!isAvailable)
            return {
              disabled: true,
              style: { color: '#ccc' },
            };
        }}
      />
    </FormControl>
  );
}
