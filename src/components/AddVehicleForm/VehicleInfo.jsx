import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

export default function VehicleInfo() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: "FETCH_VEHICLE_TYPES" });
  }, [dispatch]);

  const { types } = useSelector((store) => store.vehicle);

  const [vehicle, setVehicle] = React.useState({
    title: "",
    type: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setVehicle((prevState) => ({ ...prevState, [name]: value }));
  };
  console.log(vehicle);
  return (
    <Grid container maxWidth="md" mx="auto" direction="column">
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
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl fullWidth margin="normal">
          <InputLabel id="type-selector">Type</InputLabel>
          <Select
            labelId="type-selector"
            label="Age"
            onChange={handleChange}
            value={vehicle.type}
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
        <Grid item sm={6}>
          <FormControl margin="normal" fullWidth>
            <TextField
              name="make"
              variant="standard"
              label="Make"
              required
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          <FormControl margin="normal" fullWidth>
            <TextField
              name="model"
              variant="standard"
              label="Model"
              required
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item sm={6}>
          <FormControl margin="normal" fullWidth>
            <TextField
              name="year"
              variant="standard"
              label="Year"
              required
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          <FormControl margin="normal" fullWidth>
            <TextField
              name="length"
              variant="standard"
              label="Length (ft)"
              required
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item sm={6}>
          <FormControl margin="normal" fullWidth>
            <TextField
              name="capacity"
              variant="standard"
              label="Capacity"
              required
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          <FormControl margin="normal" fullWidth>
            <TextField
              name="horsepower"
              variant="standard"
              label="Horsepower"
              required
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
}
