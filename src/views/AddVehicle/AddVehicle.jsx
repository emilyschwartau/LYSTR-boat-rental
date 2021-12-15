// import {
//   HashRouter as Router,
//   Redirect,
//   Route,
//   Switch,
// } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import VehicleInfo from "../../components/AddVehicleForm/VehicleInfo";
import VehicleAddress from "../../components/AddVehicleForm/VehicleAddress";
import VehicleFeatures from "../../components/AddVehicleForm/VehicleFeatures";
import VehiclePhotos from "../../components/AddVehicleForm/VehiclePhotos";
import VehiclePriceAvailability from "../../components/AddVehicleForm/VehiclePriceAvailability";

export default function AddVehicle() {
  const dispatch = useDispatch();

  const { newVehicleInput } = useSelector((store) => store.vehicle);

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    dispatch({
      type: "ADD_VEHICLE_ONCHANGE",
      payload: { property: name, value: value },
    });
  };

  // // set a min and max for the input (not used with rating input)
  // const validateNumber = (e) => {
  //   const value = e.target.value;
  //   //if the input value is less than 1 or greater than 6, then don't change the input value (empty string allowed for backspacing)
  //   const setValue =
  //     (value >= 1 && value <= 6) || value === "" ? value : feelingFeedback;
  //   setFeelingFeedback(setValue);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newVehicleInput);
    dispatch({ type: "ADD_VEHICLE", payload: newVehicleInput });
  };

  return (
    <Container component="main">
      <Box component="form" onSubmit={handleSubmit}>
        <VehicleInfo handleChange={handleChange} />
        <VehicleAddress handleChange={handleChange} />
        <VehicleFeatures handleChange={handleChange} />
        <VehiclePhotos />
        <VehiclePriceAvailability handleChange={handleChange} />
        <Box display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" size="large">
            Add Vehicle
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
