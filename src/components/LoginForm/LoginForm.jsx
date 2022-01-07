import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form onSubmit={login}>
      <Typography component="h2" variant="h4" align="center" mt={2}>
        Login
      </Typography>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Grid container maxWidth="sm" mx="auto" direction="column" my={4}>
        <Grid item>
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
        <Grid item>
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
        <Grid container item xs={6} justifyContent="center">
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <Button type="submit" variant="contained" size="large">
                Login
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;
