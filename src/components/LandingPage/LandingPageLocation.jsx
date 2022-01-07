import { useState } from 'react';
import { Box, Card, Typography, Button, FormControl } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as Scroll from 'react-scroll';
import LocationComboBox from '../LocationComboBox/LocationComboBox';
import TripDatePicker from '../TripDatePicker/TripDatePicker';

function LandingPageLocation() {
  const ScrollLink = Scroll.Link;

  return (
    <>
      <Box
        sx={{
          width: '50%',
        }}
      >
        <Card
          sx={{
            border: '1px solid black',
            width: '100%',
            padding: '1em',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4">Find a Rental Near You!</Typography>
          <br />
          {/* <form onSubmit={() => handleSubmit()}> */}
          <form>
            <FormControl fullWidth={true}>
              <LocationComboBox />
              <TripDatePicker />

              <Button
                // type="submit"
                variant="outlined"
                sx={{
                  width: '50%',
                  margin: 'auto',
                }}
              >
                <ScrollLink
                  // type="submit"
                  to="vehicleType"
                  spy={true}
                  smooth={true}
                >
                  Select Vehicle Type
                </ScrollLink>
              </Button>
            </FormControl>
          </form>
        </Card>
      </Box>
    </>
  );
}
export default LandingPageLocation;
