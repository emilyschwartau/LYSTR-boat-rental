import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

export default function VehicleAddress({ handleChange }) {
  return (
    <Grid container maxWidth="md" mx="auto" direction="column" mb={2}>
      <Grid item>
        <Typography component="h2" variant="h5">
          Address
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
            />
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
}
