import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Input = styled('input')({
  display: 'none',
});

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        profilePic: profilePic,
      },
    });
  }; // end registerUser

  return (
    <form onSubmit={registerUser}>
      <Typography component="h2" variant="h4" align="center" mt={2}>
        Register User
      </Typography>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <Grid container maxWidth="md" mx="auto" direction="column" my={4}>
        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Username"
                type="text"
                name="username"
                value={username}
                required
                onChange={(event) => setUsername(event.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Password"
                type="password"
                name="password"
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="First Name"
                type="text"
                name="firstName"
                value={firstName}
                required
                onChange={(event) => setFirstName(event.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Last Name"
                type="text"
                name="lastName"
                value={lastName}
                required
                onChange={(event) => setLastName(event.target.value)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Email"
                type="email"
                name="email"
                value={email}
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} display="inline-block">
            <FormControl fullWidth margin="normal">
              <label htmlFor="contained-upload-button">
                <Input
                  id="contained-upload-button"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(event) => setProfilePic(event.target.files[0])}
                />
                <Button variant="outlined" component="span">
                  Choose Profile Picture
                </Button>
                <Typography variant="body2" mt={1}>
                  {profilePic ? profilePic.name : ''}
                </Typography>
              </label>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container item xs={6} justifyContent="center">
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <Button type="submit" variant="contained" size="large" startIcon={<PersonAddIcon />}>
                Register
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default RegisterForm;
