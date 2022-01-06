import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';

function VehicleGenerator({ handleChange, validateNumber }) {
  const dispatch = useDispatch()
  const { vehicleFormInputs } = useSelector((store) => store.vehicle);

  const generateVehicle = () => {
    dispatch({ type: 'FETCH_GENERATED_VEHICLE' })
    
    vehicleFormInputs.title = 'bass boat'
    console.log('generateVehicle', vehicleFormInputs.title)

  }

  return (
    <Typography component="h2" variant="h5" onClick={generateVehicle}
      onChange={handleChange}
      value={vehicleFormInputs.title}
    >
      Vehicle Info
    </Typography>
  )
}
export default VehicleGenerator