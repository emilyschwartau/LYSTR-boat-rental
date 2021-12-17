import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import PhotoGallery from './PhotoGallery';
import VehiclePhotoUpload from '../AddVehicleForm/VehiclePhotoUpload';

export default function PhotoGalleryModal({ open, setOpen, vehicleId }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    dispatch({ type: 'CLEAR_PHOTO_GALLERY_INPUT' });
  });

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
      <DialogContent>
        <VehiclePhotoUpload galleryMode vehicleId={vehicleId} />
        {/* <DialogActions sx={{ justifyContent: 'center', mb: 2 }}>
          <Button variant="contained" onClick={handleClose}>
            Upload
          </Button>
        </DialogActions> */}
        <PhotoGallery vehicleId={vehicleId} />
      </DialogContent>
    </Dialog>
  );
}
