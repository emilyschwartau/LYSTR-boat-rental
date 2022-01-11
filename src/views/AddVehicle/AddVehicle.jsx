import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import AddIcon from '@mui/icons-material/Add';

import VehicleInfoForm from '../../components/AddVehicleForm/VehicleInfoForm';
import VehicleAddressForm from '../../components/AddVehicleForm/VehicleAddressForm';
import VehicleFeaturesForm from '../../components/AddVehicleForm/VehicleFeaturesForm';
import VehiclePhotoUploadForm from '../../components/AddVehicleForm/VehiclePhotoUploadForm';
import VehiclePriceAvailabilityForm from '../../components/AddVehicleForm/VehiclePriceAvailabilityForm';
import SuccessDialog from '../../components/SuccessDialog/SuccessDialog';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export default function AddVehicle() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { vehicleFormInputs } = useSelector((store) => store.vehicle);

  // for requiring at least one image upload
  const [noImage, setNoImage] = React.useState(false);

  React.useEffect(() => dispatch({ type: 'CLEAR_VEHICLE_FORM' }), [dispatch]);

  const handleChange = (e) => {
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
    if (vehicleFormInputs.photos.length == 0) {
      setNoImage(true);
    } else {
      dispatch({ type: 'ADD_VEHICLE', payload: vehicleFormInputs });
    }
  };

  return (
    <Container component="main">
      <Box component="form" onSubmit={handleSubmit}>
        <VehicleInfoForm
          handleChange={handleChange}
          validateNumber={validateNumber}
        />
        <VehicleAddressForm handleChange={handleChange} />
        <VehicleFeaturesForm
          handleChange={handleChange}
          validateNumber={validateNumber}
        />
        <VehiclePhotoUploadForm />
        <VehiclePriceAvailabilityForm validateNumber={validateNumber} />
        <Box display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
          >
            Add Vehicle
          </Button>
        </Box>
      </Box>
      <LoadingSpinner />
      <SuccessDialog pathname={location.pathname} />
      <Dialog open={noImage} onClose={() => setNoImage(false)}>
        <DialogTitle>Vehicle Image Required</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add at least one photo of your vehicle.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoImage(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
