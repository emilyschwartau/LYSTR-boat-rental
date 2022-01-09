import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import PhotoGallery from './PhotoGallery';
import VehiclePhotoUploadForm from '../AddVehicleForm/VehiclePhotoUploadForm';

export default function PhotoGalleryModal({
  open,
  setOpen,
  vehicleId,
  renderStatus,
  setRenderStatus,
}) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  // for requiring at least one image upload
  const [noImage, setNoImage] = React.useState(false);

  const handleClose = () => {
    setRenderStatus(!renderStatus);
    setOpen(false);
  };

  React.useEffect(() => {
    dispatch({ type: 'CLEAR_PHOTO_GALLERY_INPUT' });
  });

  return (
    <>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <DialogActions>
          <Button startIcon={<CloseIcon />} onClick={handleClose}>Close</Button>
        </DialogActions>
        <DialogContent>
          <VehiclePhotoUploadForm
            galleryMode
            vehicleId={vehicleId}
            setNoImage={setNoImage}
          />
          {/* <DialogActions sx={{ justifyContent: 'center', mb: 2 }}>
          <Button variant="contained" onClick={handleClose}>
            Upload
          </Button>
        </DialogActions> */}
          <PhotoGallery vehicleId={vehicleId} />
        </DialogContent>
      </Dialog>
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
    </>
  );
}
