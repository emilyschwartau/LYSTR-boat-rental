import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  TextField,
  FormControl,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import * as Scroll from "react-scroll";

function LandingPageLocation() {
  const ScrollLink = Scroll.Link;

  const dispatch = useDispatch();

  //search input
  const [search, setSearch] = useState({
    location: "",
    //initial search
    startDate: null,
  });

  //handle date selection
  const handleDateChange = (newValue) => {
    const formattedStartDate = format(newValue, "MM-dd-yy");
    console.log(`this is format`, formattedStartDate);
    setSearch({ ...search, startDate: formattedStartDate });
    dispatch({ type: "SET_SEARCH_DATE", payload: formattedStartDate });
  };

  const handleLocationChange = (e) => {
    setSearch({ ...search, location: e.target.value });
    dispatch({ type: "SET_SEARCH_LOCATION", payload: e.target.value });
  };

  // const handleSubmit = () => {
  //   dispatch({ type: "SET_SEARCH", payload: search });
  // };

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
              <TextField
                placeholder="City, State"
                helperText="Search Location by City, State"
                label="Location"
                // value={search.location}
                onChange={(e) => handleLocationChange(e)}
              />
              <br />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Trip"
                  helperText="Date of Trip"
                  value={search.startDate}
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
