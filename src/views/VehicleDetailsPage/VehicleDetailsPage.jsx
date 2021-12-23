// holds details and booking components
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import BookingForm from '../../components/BookingForm/BookingForm';
import SuccessDialog from '../../components/SuccessDialog/SuccessDialog';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function VehicleDetailsPage() {
  const dispatch = useDispatch();
  const { vehicleId } = useParams();
  const location = useLocation();

  const { vehicleInfo, photos } = useSelector((store) => store.vehicle);
  const { loading, success } = useSelector((store) => store.loading);

  React.useEffect(() => {
    dispatch({ type: 'FETCH_VEHICLE_BY_ID', payload: vehicleId });
    dispatch({ type: 'FETCH_VEHICLE_PHOTOS', payload: vehicleId });
  }, [dispatch]);
  return (
    <Container component="main">
      <Grid container>
        <Grid item md={6}>
          <BookingForm
            vehicleId={vehicleId}
            availability={vehicleInfo.availability}
            dailyRate={vehicleInfo.dailyRate}
          />
        </Grid>
      </Grid>
      <SuccessDialog success={success} pathname={location.pathname} />
    </Container>
  );
}
