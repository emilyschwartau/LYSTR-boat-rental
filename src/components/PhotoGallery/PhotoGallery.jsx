import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PhotoGalleryItem from './PhotoGalleryItem';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function PhotoGallery({ vehicleId }) {
  const dispatch = useDispatch();

  React.useEffect(
    () => dispatch({ type: 'FETCH_VEHICLE_PHOTOS', payload: vehicleId }),
    []
  );

  const { photos } = useSelector((store) => store.vehicle);
  const { loading } = useSelector((store) => store.loading);

  return (
    <>
      <Grid container maxWidth="lg" mx="auto" mb={4}>
        {photos?.map((photo) => (
          <Grid item key={photo.id}>
            <PhotoGalleryItem photo={photo} amount={photos.length} />
          </Grid>
        ))}
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
