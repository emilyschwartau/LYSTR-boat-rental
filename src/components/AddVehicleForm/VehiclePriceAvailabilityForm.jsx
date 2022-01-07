import React from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

export default function VehicleAvailabilityForm({
  validateNumber,
  updateMode,
}) {
  const dispatch = useDispatch();
  const { vehicleFormInputs } = useSelector((store) => store.vehicle);
  const { vehicleReservations } = useSelector((store) => store.rental);

  const handleMapDays = ({ date, today }) => {
    const isNotAvailable = vehicleReservations
      .map((res) => res.rentalDate)
      .includes(date.format('MM-DD-YYYY'));
    // only look at reservation dates when updating a vehicle
    if (updateMode) {
      if (isNotAvailable || date.dayOfYear < today.dayOfYear)
        return {
          disabled: true,
          style: { color: '#ccc' },
        };
    } else {
      if (date.dayOfYear < today.dayOfYear)
        return {
          disabled: true,
          style: { color: '#ccc' },
        };
    }
  };

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
            value={vehicleFormInputs.availability?.map((date) =>
              new DateObject()
                .set('year', date.split('-')[2])
                .set('month', date.split('-')[0])
                .set('day', date.split('-')[1])
            )}
            // disable dates of reservations so owner may not overwrite reservations when updating availability
            mapDays={handleMapDays}
            onChange={(dates) => {
              dispatch({
                type: 'VEHICLE_FORM_ONCHANGE',
                payload: {
                  property: 'availability',
                  value: dates.map((date) => date.format('MM-DD-YYYY')),
                },
              });
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
