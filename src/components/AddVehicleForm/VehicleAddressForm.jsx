import React from 'react';
import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

export default function VehicleAddressForm({ handleChange }) {
  const { vehicleFormInputs } = useSelector((store) => store.vehicle);

  return (
    <Grid container maxWidth="md" mx="auto" direction="column" mb={4}>
      <Grid item>
        <Typography component="h2" variant="h5">
          Location
        </Typography>
      </Grid>
      <Grid item>
        <FormControl margin="normal" fullWidth>
          <TextField
            name="street"
            variant="standard"
            label="Address"
            required
            onChange={handleChange}
            value={vehicleFormInputs.street}
          />
        </FormControl>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item sm={4}>
          <FormControl margin="normal" fullWidth>
            <TextField
              name="city"
              variant="standard"
              label="City"
              required
              onChange={handleChange}
              value={vehicleFormInputs.city}
            />
          </FormControl>
        </Grid>
        <Grid item sm={4}>
          <FormControl margin="normal" fullWidth>
            <TextField
              name="state"
              variant="standard"
              label="State"
              required
              onChange={handleChange}
              value={vehicleFormInputs.state}
            />
          </FormControl>
        </Grid>
        <Grid item sm={4}>
          <FormControl margin="normal" fullWidth>
            <TextField
              name="zip"
              variant="standard"
              label="Zipcode"
              required
              onChange={handleChange}
              value={vehicleFormInputs.zip}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
}
