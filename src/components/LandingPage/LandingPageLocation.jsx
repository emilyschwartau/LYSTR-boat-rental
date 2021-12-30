import { useState } from 'react';
import { Box, Card, Typography, Button, TextField, FormControl } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import * as Scroll from 'react-scroll';
import LocationComboBox from '../LocationComboBox/LocationComboBox'


function LandingPageLocation() {
  const ScrollLink = Scroll.Link;

  const dispatch = useDispatch();
  const { searchQuery } = useSelector((store) => store.search)

  // search input
  const [startDate, setSearch] = useState(null)

  //handle date selection
  const handleDateChange = (newValue) => {
    const formattedStartDate = format(newValue, "yyyy-MM-dd");
    setSearch( newValue );
    dispatch({ type: "SET_SEARCH_DATE", payload: formattedStartDate });
  };

  console.log('landing page search startDate', searchQuery.startDate)

  return (
    <>
      <Box
        sx={{
          width: "50%",
        }}
      >
        <Card
          sx={{
            border: "1px solid black",
            width: "100%",
            padding: "1em",
            textAlign: "center",
          }}
        >
          <Typography variant="h4">Find A Boat To Rent Near You!</Typography>
          <br />
          {/* <form onSubmit={() => handleSubmit()}> */}
          <form>
            <FormControl fullWidth={true}>
              <LocationComboBox />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  required
                  label="Date of Trip"
                  helperText="Date of Trip"
                  value={startDate}
                  onChange={(newValue) => {
                    handleDateChange(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <br />
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  width: "50%",
                  margin: "auto",
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