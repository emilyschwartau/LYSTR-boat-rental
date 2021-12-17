import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

export default function VehicleInfo({ handleChange, validateNumber }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: 'FETCH_TYPE_LIST' });
  }, [dispatch]);

  const { vehicleFormInputs } = useSelector((store) => store.vehicle);
  const { types } = useSelector((store) => store.data);

  return (
    <Grid container maxWidth="md" mx="auto" direction="column" my={4}>
      <Grid item>
        <Typography component="h2" variant="h5">
          Vehicle Info
        </Typography>
      </Grid>
      <Grid item>
        <FormControl margin="normal" fullWidth>
          <TextField
            name="title"
            variant="standard"
            label="Title"
            required
            onChange={handleChange}
            value={vehicleFormInputs.title}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth margin="normal">
          <InputLabel id="type-selector">Type</InputLabel>
          <Select
            // defaultValue=""
            labelId="type-selector"
            label="Age"
            onChange={handleChange}
            value={vehicleFormInputs.type}
            name="type"
          >
            {types?.map((type) => (
              <MenuItem key={type.name} value={type.name}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item sm={4}>
          <FormControl margin="normal" fullWidth>
            <TextField
              name="make"
              variant="standard"
              label="Make"
              required
              onChange={handleChange}
              value={vehicleFormInputs.make}
            />
          </FormControl>
        </Grid>
        <Grid item sm={4}>
          <FormControl margin="normal" fullWidth>
            <TextField
              name="model"
              variant="standard"
              label="Model"
              required
              onChange={handleChange}
              value={vehicleFormInputs.model}
            />
          </FormControl>
        </Grid>
        <Grid item sm={4}>
          <FormControl margin="normal" fullWidth>
            <TextField
              name="year"
              variant="standard"
              label="Year"
              required
              onChange={handleChange}
              value={vehicleFormInputs.year}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item sm={4}>
          <FormControl margin="normal" fullWidth>
            <TextField
              name="length"
              type="number"
              variant="standard"
              label="Length (ft)"
              required
              onChange={validateNumber}
              min={0}
              value={vehicleFormInputs.length}
            />
          </FormControl>
        </Grid>
        <Grid item sm={4}>
          <FormControl margin="normal" fullWidth>
            <TextField
              type="number"
              name="capacity"
              variant="standard"
              label="Capacity"
              required
              onChange={validateNumber}
              min={0}
              value={vehicleFormInputs.capacity}
            />
          </FormControl>
        </Grid>
        <Grid item sm={4}>
          <FormControl margin="normal" fullWidth>
            <TextField
              type="number"
              name="horsepower"
              variant="standard"
              label="Horsepower"
              required
              onChange={validateNumber}
              min={0}
              value={vehicleFormInputs.horsepower}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
}
