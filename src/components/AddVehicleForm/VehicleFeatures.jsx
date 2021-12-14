import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

export default function VehicleFeatures({ handleChange }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: "FETCH_FEATURES_LIST" });
  }, [dispatch]);

  const { features, newVehicleInput } = useSelector((store) => store.vehicle);

  const handleSwitch = (e) => {
    console.log(e.target.checked);
    console.log(e.target.value);
    const featureId = e.target.value;
    if (e.target.checked) {
      dispatch({ type: "ADD_FEATURE", payload: featureId });
    } else if (!e.target.checked) {
      dispatch({ type: "REMOVE_FEATURE", payload: featureId });
    }
  };

  return (
    <Grid container maxWidth="md" mx="auto">
      <Grid item xs={12}>
        <Typography component="h2" variant="h5">
          Features
        </Typography>
      </Grid>
      {features?.map((feature) => (
        <Grid item key={feature.id}>
          <FormControl>
            <FormControlLabel
              control={
                <Switch
                  name={feature.name}
                  onChange={handleSwitch}
                  value={feature.id}
                />
              }
              label={feature.name}
            />
          </FormControl>
        </Grid>
      ))}
    </Grid>
  );
}
