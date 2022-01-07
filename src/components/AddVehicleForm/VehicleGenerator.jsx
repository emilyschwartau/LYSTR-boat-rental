import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import './generatorData'

function VehicleGenerator({ handleChange, validateNumber }) {
  const dispatch = useDispatch()
  const { vehicleFormInputs } = useSelector((store) => store.vehicle);

  const generateVehicle = () => {
    // gets a random choice from generatorData object containing pre populated boat info
    dispatch({ type: 'SET_VEHICLE_FORM_INPUTS', payload : vehicleExamples[Math.floor(Math.random() * vehicleExamples.length)] })

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