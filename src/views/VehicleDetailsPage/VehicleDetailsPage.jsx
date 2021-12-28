// holds details and booking components
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BookingForm from '../../components/BookingForm/BookingForm';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Carousel from 'react-material-ui-carousel';



export default function VehicleDetailsPage() {
  const dispatch = useDispatch();
  const { vehicleId } = useParams();

  const { vehicleInfo, photos } = useSelector((store) => store.vehicle);

  console.log("photos", photos);
  console.log("vehicleInfo", vehicleInfo);

  React.useEffect(() => {
    dispatch({ type: 'FETCH_VEHICLE_BY_ID', payload: vehicleId });
    dispatch({ type: 'FETCH_VEHICLE_PHOTOS', payload: vehicleId });
  }, [dispatch]);

  return (
    <>
    <Container component="main">
      <Grid container>
        <Grid item md={6}>
          <BookingForm availability={vehicleInfo.availability} />
        </Grid>
      </Grid>
    </Container>
    <p>boat details: {vehicleInfo.title}</p>
    
    <div id="detailsImage">
    <Carousel autoPlay={false} navButtonsAlwaysVisible={true} indicators={false} >
      {
        photos?.map(item => {
          return (
            <img  src={item.path} key={item.vehicleId}/> 
          );
        })
      } 
    </Carousel>
    </div>
    </>
  );
}
