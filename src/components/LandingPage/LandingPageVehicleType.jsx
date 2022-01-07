import React from 'react';
import { Box, Stack, Card, Button, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { format } from 'date-fns';

function LandingPageVehicleType() {
  const dispatch = useDispatch();
  const history = useHistory();
  const vehicleList = useSelector((store) => store.data.types);
  const vehicleType = useSelector(
    (store) => store.search.searchQuery.vehicleType
  );
  const startDate = useSelector((store) => store.search.searchQuery.startDate);
  const location = useSelector((store) => store.search.searchQuery.location);

  let buttonText = '';

  const handleSearch = () => {
    if (vehicleType) {
      // search parameters push to url
      // url query parsed on ResultsGalleryPage useQuery hook
      history.push(
        `/gallery?location=${location}&date=${format(
          startDate,
          'yyyy-MM-dd'
        )}&type=${vehicleType}`
      );
    } else {
      alert('Please choose vehicle type');
    }
  };

  const checkId = () => {
    if (vehicleType === '') {
      buttonText = 'Boats';
    } else if (vehicleType === 'Fishing') {
      buttonText = 'Fishing Boats';
    } else {
      buttonText = vehicleType + 's';
    }
  };

  // changes value of button text
  // checks store reducer value after boat type is selected
  checkId();

  React.useEffect(() => {
    dispatch({
      type: 'FETCH_TYPE_LIST',
    });
  }, []);

  return (
    <>
      {/* page border */}
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            mt: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              m: 2,
            }}
          >
            Select a Vehicle
          </Typography>
        </Box>
        {/* type selection */}
        <Box
          sx={{
            margin: 'auto',
            // border: 'solid black 1px',
            textAlign: 'center',
            width: '80%',
            padding: '1em',
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ flexWrap: 'wrap' }}
          >
            {vehicleList?.map((vehicle) => (
              <Card
                className="cardHover"
                key={vehicle.id}
                elevation={vehicleType === vehicle.name ? 8 : 2}
                onClick={() => {
                  console.log(vehicle);
                  dispatch({
                    type: 'SET_SEARCH_VEHICLE_TYPE',
                    payload: vehicle.name,
                  });
                }}
                sx={{ margin: '1em', height: '20vh', width: '20vw' }}
              >
                <img src={vehicle.image} height="70%" />
                <p>{vehicle.name}</p>
              </Card>
            ))}
          </Stack>
          <Button
            variant="outlined"
            sx={{
              width: '20%',
              m: 2,
            }}
            onClick={handleSearch}
          >
            Find {buttonText} to Rent
          </Button>
        </Box>
      </Box>
    </>
  );
}
export default LandingPageVehicleType;
