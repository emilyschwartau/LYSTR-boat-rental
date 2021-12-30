<<<<<<< HEAD
import { Box, Card, Typography, Button, TextField, FormControl } from '@mui/material';
import * as Scroll from 'react-scroll';
import LocationComboBox from '../LocationComboBox/LocationComboBox'
import TripDatePicker from '../TripDatePicker/TripDatePicker'

=======
import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  TextField,
  FormControl,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import * as Scroll from 'react-scroll';
import LocationComboBox from '../LocationComboBox/LocationComboBox';
>>>>>>> master

function LandingPageLocation() {
  const ScrollLink = Scroll.Link;

<<<<<<< HEAD
=======
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((store) => store.search);

  // search input
  const [search, setSearch] = useState({
    startDate: null,
  });

  //handle date selection
  const handleDateChange = (newValue) => {
    const formattedStartDate = format(newValue, 'yyyy-MM-dd');
    setSearch({ ...search, startDate: newValue });
    dispatch({ type: 'SET_SEARCH_DATE', payload: formattedStartDate });
  };

  console.log('landing page search startDate', searchQuery.startDate);

>>>>>>> master
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
          <Typography variant="h4">Find A Boat To Rent Near You!</Typography>
          <br />
          {/* <form onSubmit={() => handleSubmit()}> */}
          <form>
            <FormControl fullWidth={true}>
              <LocationComboBox />
              <TripDatePicker />
              <br />
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  width: '50%',
                  margin: 'auto',
                }}
              >
                <ScrollLink
                  type="submit"
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
