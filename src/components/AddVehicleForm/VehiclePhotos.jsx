import React from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export default function VehiclePhotos() {
  const dispatch = useDispatch();

  const { newVehicleInput } = useSelector((store) => store.vehicle);

  // const [files, setFiles] = React.useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open,
  } = useDropzone({
    accept: "image/*",
    // noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      const photos = acceptedFiles.map((photo) =>
        Object.assign(photo, {
          preview: URL.createObjectURL(photo),
        })
      );
      dispatch({
        type: "ADD_VEHICLE_ONCHANGE",
        payload: { property: "photos", value: photos },
      });
    },
  });
  React.useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      newVehicleInput.photos.forEach((photos) =>
        URL.revokeObjectURL(photos.preview)
      );
    },
    [newVehicleInput.photos]
  );

  const filepath = newVehicleInput.photos.map((photo) => (
    <li key={photo.path}>
      {photo.path} - {photo.size} bytes
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
        <Box
          component="form"
          enctype="multipart/form-data"
          noValidate
          autoComplete="off"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: isDragActive
                ? "2px dashed green"
                : "2px dashed lightgray",
              width: "600px",
              height: "100px",
              backgroundColor: "#ededed",
              mx: "auto",
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
