import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PhotoGalleryItem from './PhotoGalleryItem';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function PhotoGallery({ vehicleId }) {
  const dispatch = useDispatch();

  React.useEffect(
    () => dispatch({ type: 'FETCH_VEHICLE_PHOTOS', payload: vehicleId }),
    [dispatch]
  );

  const { photos } = useSelector((store) => store.vehicle);

  return (
    <Grid container maxWidth="md" mx="auto" mb={4}>
      {photos?.map((photo) => (
        <Grid item key={photo.id}>
          <PhotoGalleryItem photo={photo} />
        </Grid>
      ))}
    </Grid>
  );
}
