import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import UploadIcon from '@mui/icons-material/Upload';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

export default function VehiclePhotoUploadForm(props) {
  const dispatch = useDispatch();

  // vehicleFormInputs is used when a vehicle is being added (AddVehicle)
  // photoGalleryInput is used when photos are added to an existing vehicle (PhotoGallery)
  const { vehicleFormInputs, photoGalleryInput } = useSelector(
    (store) => store.vehicle
  );

  // const [files, setFiles] = React.useState([]);

  const thumbs = props.galleryMode
    ? photoGalleryInput.photos?.map((photo) => (
        <div style={thumb} key={photo.name}>
          <div style={thumbInner}>
            <img src={photo.preview} style={img} />
          </div>
        </div>
      ))
    : vehicleFormInputs.photos?.map((photo) => (
        <div style={thumb} key={photo.name}>
          <div style={thumbInner}>
            <img src={photo.preview} style={img} />
          </div>
        </div>
      ));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    // noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      const photos = acceptedFiles.map((photo) =>
        Object.assign(photo, {
          preview: URL.createObjectURL(photo),
        })
      );
      if (props.galleryMode) {
        dispatch({
          type: 'ADD_PHOTOS',
          payload: photos,
        });
      } else {
        dispatch({
          type: 'VEHICLE_FORM_ONCHANGE',
          payload: { property: 'photos', value: photos },
        });
      }
    },
  });
  React.useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      props.galleryMode
        ? photoGalleryInput.photos?.forEach((photos) =>
            URL.revokeObjectURL(photos.preview)
          )
        : vehicleFormInputs.photos?.forEach((photos) =>
            URL.revokeObjectURL(photos.preview)
          );
    },
    [vehicleFormInputs.photos, photoGalleryInput.photos]
  );

  const filepath = props.galleryMode
    ? photoGalleryInput.photos?.map((photo) => (
        <li key={photo.path}>
          {photo.path} - {photo.size} bytes
        </li>
      ))
    : vehicleFormInputs.photos?.map((photo) => (
        <li key={photo.path}>
          {photo.path} - {photo.size} bytes
        </li>
      ));

  const handleGalleryModeUpload = () => {
    if (photoGalleryInput.photos.length == 0) {
      props.setNoImage(true);
    } else {
      dispatch({
        type: 'UPLOAD_IMAGES_FROM_GALLERY',
        payload: {
          photos: photoGalleryInput.photos,
          vehicleId: props.vehicleId,
        },
      });
    }
  };

  return (
    <Grid container maxWidth="md" mx="auto" direction="column" mb={4}>
      <Grid item>
        <Typography component="h2" variant="h5">
          Photo Upload
        </Typography>
      </Grid>
      <Grid container item>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: isDragActive
                ? '2px dashed green'
                : '2px dashed lightgray',
              width: '600px',
              height: '100px',
              backgroundColor: '#ededed',
              mx: 'auto',
              mt: 2,
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Typography component="p" variant="body1" align="center">
              Drag 'n' drop some files here, or click to select files
            </Typography>
            {/* <button type="button" onClick={open}>
                Open File Dialog
              </button> */}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <aside style={thumbsContainer}>{thumbs}</aside>
        </Grid>

        {props.galleryMode && (
          <Grid container item justifyContent="flex-end">
            <Button variant="contained" startIcon={<UploadIcon />} onClick={handleGalleryModeUpload}>
              Upload
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
