import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import UpdateIcon from '@mui/icons-material/Update';
import UploadIcon from '@mui/icons-material/Upload';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

export default function ProfileTab() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [editMode, setEditMode] = React.useState(false);
  const [profilePic, setProfilePic] = React.useState(null);
  const [profileUpdates, setProfileUpdates] = React.useState({
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });

  const handleChange = (e) => {
    setProfileUpdates({ ...profileUpdates, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profileUpdates });
    toggleInfoEdit();
  };

  const toggleInfoEdit = () => {
    setEditMode(!editMode);
  };

  const handleProfilePic = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleUpload = () => {
    dispatch({
      type: 'UPDATE_PROFILE_PIC',
      payload: { newPic: profilePic, oldPic: user.profile_picture },
    });
    setProfilePic(null);
  };

  return (
    <Box>
      <Grid container flexDirection="column">
        <Grid container item>
          <Grid item mr={3}>
            <Typography variant="h2" mb={2}>
              Profile
            </Typography>
          </Grid>
          <Grid item alignSelf="center">
            {!editMode ? (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={toggleInfoEdit}
              >
                Edit
              </Button>
            ) : (
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={toggleInfoEdit}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleUpdate}>
                  Submit Changes
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>

        {!editMode ? (
          <Grid item>
            <Typography variant="body1" mb={2}>
              <b>Username:</b> {user.username}
            </Typography>
            <Typography variant="body1" mb={2}>
              <b>First Name:</b> {user.first_name}
            </Typography>
            <Typography variant="body1" mb={2}>
              <b>Last Name:</b> {user.last_name}
            </Typography>
            <Typography variant="body1" mb={2}>
              <b>Email:</b> {user.email}
            </Typography>
          </Grid>
        ) : (
          <Grid container item flexDirection="column">
            <Grid item>
              <FormControl margin="normal">
                <TextField
                  variant="standard"
                  label="Username"
                  type="text"
                  name="username"
                  value={profileUpdates.username}
                  required
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl margin="normal">
                <TextField
                  variant="standard"
                  label="First Name"
                  type="text"
                  name="first_name"
                  value={profileUpdates.first_name}
                  required
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl margin="normal">
                <TextField
                  variant="standard"
                  label="Last Name"
                  type="text"
                  name="last_name"
                  value={profileUpdates.last_name}
                  required
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl margin="normal">
                <TextField
                  variant="standard"
                  label="Email"
                  type="text"
                  name="email"
                  value={profileUpdates.email}
                  required
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        )}
        <Grid container item flexDirection="column">
          <Grid item width="fit-content">
            <FormControl fullWidth margin="normal">
              <label htmlFor="contained-upload-button">
                <Input
                  id="contained-upload-button"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleProfilePic}
                />
                <Button
                  variant="outlined"
                  startIcon={<UpdateIcon />}
                  component="span"
                >
                  Update Profile Picture
                </Button>
                <Typography variant="body2" mt={1}>
                  {profilePic ? profilePic.name : ''}
                </Typography>
              </label>
            </FormControl>
          </Grid>

          {profilePic && (
            <Grid item>
              <Button
                variant="contained"
                startIcon={<UploadIcon />}
                onClick={handleUpload}
              >
                Upload
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <LoadingSpinner />
    </Box>
  );
}
