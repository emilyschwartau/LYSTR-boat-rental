import React from 'react';
import { Box, Stack, Card, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';

function LandingPageVehicleType() {
  const dispatch = useDispatch();
  const history = useHistory();
  const vehicleList = useSelector((store) => store.data.types);
  const vehicleType = useSelector((store) => store.search.searchQuery.vehicleType);
  const startDate = useSelector((store) => store.search.startDate);
  const location = useSelector((store) => store.search.location);

  let buttonText = '';

  const handleSearch = () => {
    if (vehicleType) {
      dispatch({
        type: 'FETCH_VEHICLES',
        payload: {
          location: location,
          startDate: startDate,
          vehicleType: vehicleType,
        },
      });
      history.push('/gallery');
    } else {
      alert('Please choose vehicle type');
    }
  };

  const checkId = () => {
    if (vehicleType === undefined) {
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
  console.log('vehicle type:' , vehicleType)

  React.useEffect(() => {
    dispatch({
      type: 'FETCH_TYPE_LIST',
    });
  }, []);

  return (
    <>
      {/* page border */}
      <Box sx={{ height: '100vh', width: '100vw', border: 'solid black 1px' }}>
        <h1>SELECT VEHICLE TYPE</h1>

        {/* type selection */}
        <Box
          sx={{
            margin: 'auto',
            border: 'solid black 1px',
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
            {/* Will eventually map over table from database */}
            {vehicleList?.map((vehicle) => (
              <Card
                key={vehicle.id}
                onClick={() =>
                  dispatch({
                    type: 'SET_SEARCH_VEHICLE_TYPE',
                    payload: vehicle.name,
                  })
                }
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
              margin: 'auto',
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
