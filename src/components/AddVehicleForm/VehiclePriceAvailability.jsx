import React from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

export default function VehicleAvailability({ validateNumber }) {
  const dispatch = useDispatch();
  const [dates, setDates] = React.useState([]);
  const { vehicleFormInputs } = useSelector((store) => store.vehicle);

  console.log(dates.map((date) => date.format()));
  console.log(dates);
  return (
    <Grid container maxWidth="md" mx="auto" direction="column" mb={4}>
      <Grid item>
        <Typography component="h2" variant="h5">
          Price & Availability
        </Typography>
      </Grid>
      <Grid item alignSelf="center">
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography sx={{ mr: 1, my: 0 }}>$</Typography>
          <FormControl margin="normal">
            <TextField
              type="number"
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
            multiple
            numberOfMonths={3}
            value={vehicleFormInputs.availability?.map(
              (date) => new DateObject(date)
            )}
            onChange={setDates}
            onChange={(dates) => {
              setDates(dates);
              dispatch({
                type: "VEHICLE_FORM_ONCHANGE",
                payload: {
                  property: "availability",
                  value: dates?.map((date) => date.format()),
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
