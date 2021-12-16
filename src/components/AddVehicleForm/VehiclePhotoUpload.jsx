import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export default function VehiclePhotoUpload() {
  const dispatch = useDispatch();

  const { vehicleFormInputs } = useSelector((store) => store.vehicle);

  const [files, setFiles] = React.useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open,
  } = useDropzone({
    accept: 'image/*',
    // noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      dispatch({
        type: 'VEHICLE_FORM_ONCHANGE',
        payload: { property: 'photos', value: files },
      });
    },
  });

  React.useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const filepath = files.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <Grid container maxWidth="md" mx="auto" direction="column" mb={4}>
      <Grid item>
        <Typography component="h2" variant="h5">
          Photos
        </Typography>
      </Grid>
      <Grid item>
        <Box>
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
            }}
            {...getRootProps()}
          >
            <input required {...getInputProps()} />
            <Typography component="p" variant="body1" align="center">
              Drag 'n' drop some files here, or click to select files
            </Typography>
            {/* <button type="button" onClick={open}>
                Open File Dialog
              </button> */}
          </Box>
          <aside>
            <ul>{filepath}</ul>
          </aside>
          {/* {loading && <LinearProgress />} */}

          {/* <Button variant="contained" onClick={handleUpload}>Upload</Button> */}
        </Box>
      </Grid>
    </Grid>
  );
}
