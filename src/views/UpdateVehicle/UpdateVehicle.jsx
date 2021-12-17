import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import VehicleInfo from '../../components/AddVehicleForm/VehicleInfo';
import VehicleAddress from '../../components/AddVehicleForm/VehicleAddress';
import VehicleFeatures from '../../components/AddVehicleForm/VehicleFeatures';
// import VehiclePhotoUpload from '../../components/AddVehicleForm/VehiclePhotoUpload';
import VehiclePriceAvailability from '../../components/AddVehicleForm/VehiclePriceAvailability';
// import PhotoGallery from '../../components/PhotoGallery/PhotoGallery';
import SuccessDialog from '../../components/SuccessDialog/SuccessDialog';

export default function UpdateVehicle() {
  const dispatch = useDispatch();
  const { vehicleId } = useParams();
  const location = useLocation();

  React.useEffect(() => {
    dispatch({ type: 'FETCH_VEHICLE_TO_EDIT', payload: vehicleId });
  }, [vehicleId]);

  const { vehicleFormInputs } = useSelector((store) => store.vehicle);
  const { loading, success } = useSelector((store) => store.loading);

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    dispatch({
      type: 'VEHICLE_FORM_ONCHANGE',
      payload: { property: name, value: value },
    });
  };

  // set a min for number inputs
  const validateNumber = (e) => {
    const { name, value } = e.target;
    //if the input value is less than 0 then don't change the input value (empty string allowed for backspacing)
    const validValue =
      value >= 0 || value === '' ? value : vehicleFormInputs[name];
    dispatch({
      type: 'VEHICLE_FORM_ONCHANGE',
      payload: { property: name, value: validValue },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(vehicleFormInputs);
    dispatch({ type: 'UPDATE_VEHICLE', payload: vehicleFormInputs });
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
        {/* <VehiclePhotoUpload /> */}
        {/* <PhotoGallery vehicleId={vehicleId} /> */}
        <VehiclePriceAvailability validateNumber={validateNumber} />
        <Box display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" size="large">
            Update Vehicle
          </Button>
        </Box>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SuccessDialog success={success} pathname={location.pathname} />
    </Container>
  );
}
