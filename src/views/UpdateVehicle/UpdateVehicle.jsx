import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import VehicleInfo from "../../components/AddVehicleForm/VehicleInfo";
import VehicleAddress from "../../components/AddVehicleForm/VehicleAddress";
import VehicleFeatures from "../../components/AddVehicleForm/VehicleFeatures";
import VehiclePhotos from "../../components/AddVehicleForm/VehiclePhotos";
import VehiclePriceAvailability from "../../components/AddVehicleForm/VehiclePriceAvailability";

export default function UpdateVehicle() {
  const dispatch = useDispatch();
  const { vehicleId } = useParams();

  React.useEffect(() => {
    dispatch({ type: "FETCH_VECHICLE_TO_EDIT", payload: vehicleId });
  }, [vehicleId]);

  const { vehicleFormInputs } = useSelector((store) => store.vehicle);

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    dispatch({
      type: "VEHICLE_FORM_ONCHANGE",
      payload: { property: name, value: value },
    });
  };

  // set a min for number inputs
  const validateNumber = (e) => {
    const { name, value } = e.target;
    //if the input value is less than 0 then don't change the input value (empty string allowed for backspacing)
    const validValue =
      value >= 0 || value === "" ? value : vehicleFormInputs[name];
    dispatch({
      type: "VEHICLE_FORM_ONCHANGE",
      payload: { property: name, value: validValue },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(vehicleFormInputs);
    dispatch({ type: "UPDATE_VEHICLE", payload: vehicleFormInputs });
  };

  return (
    <Container component="main">
      <Box component="form" onSubmit={handleSubmit}>
        <VehicleInfo
          handleChange={handleChange}
          validateNumber={validateNumber}
        />
        <VehicleAddress handleChange={handleChange} />
        <VehicleFeatures
          handleChange={handleChange}
          validateNumber={validateNumber}
        />
        {/* <VehiclePhotos /> */}
        <VehiclePriceAvailability validateNumber={validateNumber} />
        <Box display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" size="large">
            Update Vehicle
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
