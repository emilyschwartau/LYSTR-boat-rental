import React from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

export default function VehicleAvailability({ validateNumber }) {
  const dispatch = useDispatch();
  // const [dates, setDates] = React.useState([]);
  const { vehicleFormInputs } = useSelector((store) => store.vehicle);
  const { vehicleReservations } = useSelector((store) => store.rental);

  return (
    <Grid container maxWidth="md" mx="auto" direction="column" mb={4}>
      <Grid item>
        <Typography component="h2" variant="h5">
          Price & Availability
        </Typography>
      </Grid>
      <Grid item alignSelf="center">
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
          <Typography sx={{ mr: 1, my: 0 }}>$</Typography>
          <FormControl margin="normal">
            <TextField
              type="number"
              value={vehicleFormInputs.dailyRate}
              name="dailyRate"
              variant="standard"
              label="Daily Rate"
              required
              onChange={validateNumber}
            />
          </FormControl>
        </Box>
      </Grid>
      <Grid item alignSelf="center">
        <FormControl margin="normal">
          <Calendar
            currentDate={new DateObject()}
            multiple
            numberOfMonths={3}
            value={vehicleFormInputs.availability?.map(
              (date) => new DateObject(date)
            )}
            // disable dates of reservations so owner may not overwrite reservations when updating availability
            mapDays={({ date, today }) => {
              const isNotAvailable = vehicleReservations
                .map((res) => res.rentalDate.split('T')[0])
                .includes(date.format('YYYY-MM-DD'));
              if (
                isNotAvailable ||
                date.format('YYYY-MM-DD') < today.format('YYYY-MM-DD')
              )
                return {
                  disabled: true,
                  style: { color: '#ccc' },
                };
            }}
            // onChange={setDates}
            onChange={(dates) => {
              // setDates(dates);
              dispatch({
                type: 'VEHICLE_FORM_ONCHANGE',
                payload: {
                  property: 'availability',
                  value: dates?.map((date) => date.format('YYYY-MM-DD')),
                },
              });
            }}
            // mapDays={({ date }) => {
            //   const isBooked = examples.includes(date.format());
            //   if (isBooked)
            //     return {
            //       disabled: true,
            //       style: { color: "#ccc" },
            //     };
            // }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
