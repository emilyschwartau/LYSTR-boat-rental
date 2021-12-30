import { Box, Card, Typography, Button, TextField, FormControl } from '@mui/material';
import * as Scroll from 'react-scroll';
import LocationComboBox from '../LocationComboBox/LocationComboBox'
import TripDatePicker from '../TripDatePicker/TripDatePicker'


function LandingPageLocation() {
  const ScrollLink = Scroll.Link;

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
              <TripDatePicker />
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