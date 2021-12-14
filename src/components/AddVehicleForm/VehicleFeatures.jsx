import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";

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
  };

  return (
    <Grid container maxWidth="md" mx="auto">
      <Grid item xs={12}>
        <Typography component="h2" variant="h5">
          Features
        </Typography>
      </Grid>
      <Formik
        initialValues={{
          checked: [],
        }}
      >
        {({ values }) => (
          <Form>
            <div role="group">
              {features?.map((feature) => (
                <Grid item key={feature.id}>
                  <label>
                    <Field
                      type="checkbox"
                      name="checked"
                      value={feature.name}
                    />
                    {feature.name}
                  </label>
                </Grid>
              ))}
            </div>
          </Form>
        )}
      </Formik>
    </Grid>
  );
}
