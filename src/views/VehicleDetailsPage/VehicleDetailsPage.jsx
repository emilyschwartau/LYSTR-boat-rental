// holds details and booking components
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import BookingForm from '../../components/BookingForm/BookingForm';
import SuccessDialog from '../../components/SuccessDialog/SuccessDialog';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {
  Box,
  Divider,
  Stack,
  Card,
  CardMedia,
  //CardActionArea,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

//vehicle details page including boat details & booking calendar
export default function VehicleDetailsPage() {

  const dispatch = useDispatch();
  const { vehicleId } = useParams();
  const location = useLocation();

  const { vehicleInfo, photos } = useSelector((store) => store.vehicle);
  const { reservationResult } = useSelector((store) => store.rental);

  // console.log('photos', photos);
  // console.log('vehicleInfo', vehicleInfo);

  //dispatches actions to sagas that set vehicle info in reducer
  React.useEffect(() => {
    dispatch({ type: 'FETCH_VEHICLE_BY_ID', payload: vehicleId });
    dispatch({ type: 'FETCH_VEHICLE_PHOTOS', payload: vehicleId });
  }, [dispatch]);

  const [imageIndex, setImageIndex] = useState(0);
  const history = useHistory();

  //next button on image carousel
  const handleNext = () => {
    if (imageIndex != photos?.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
  };

  //back button on image carousel
  const handleBack = () => {
    if (imageIndex == 0) {
      setImageIndex(photos?.length - 1);
    } else {
      setImageIndex(imageIndex - 1);
    }
  };

  return (
    <>
      {/* go back to search gallery button */}
      <Button
        id="backToGalleryBtn"
        variant="contained"
        onClick={() => history.goBack()}
      >
        Back to Search Results
      </Button>

      {/* vehicle details section */}
      <div id="detailHeaderContainer">
        <div id="vehicleDetailsHeader"><h2>Vehicle Details</h2></div>
        <div id="bookingCalendarHeader"><h2>Booking Calendar</h2></div>
      </div>
      
      <Box sx={{ margin: 'auto', padding: '1em', width: '80%' }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="space-around"
        >
          {/* image carousel */}
          <Box sx={{ width: '45%', width: '45%', padding: '1em' }}>
            <Card>
              <CardMedia
                className="detailImages"
                component="img"
                height={'200vh'}
                image={photos[imageIndex]?.path}
              />
            </Card>
            <br />

            {/* conditional render of back/next navigation buttons & caption */}
            {photos?.length > 1 ? (
              <>
                <div id="carouselNav">

                  <IconButton variant="outlined" onClick={() => handleBack()}>
                    <ArrowBackIosNewIcon />
                  </IconButton>

                  <Typography variant="caption" sx={{ margin: '0 1em' }}>
                    Click to navigate through images
                  </Typography>

                  <IconButton variant="outlined" onClick={() => handleNext()}>
                    <ArrowForwardIosIcon />
                  </IconButton>

                </div>
              </>
            ) : (
              ''
            )}

            {/* boat title */}
            <Typography
              id="detailsBoatTitle"
              variant="body1"
            >{`${vehicleInfo.title}`}
            </Typography>
            <br />

            {/* boat address */}
            <Typography variant="body1">
              <span className="sectionTitle">
                Address:
              </span>
              <br />
              {`${vehicleInfo?.street} ${vehicleInfo?.city}, ${vehicleInfo?.state} ${vehicleInfo?.zip}`}
            </Typography>
            <br />

            {/* boat info/details */}
            <Typography variant="body1" sx={{}}>
              <span className="sectionTitle">
                Vehicle Info:
              </span>
              <br />

              Capacity: {vehicleInfo?.capacity}
              <br />

              Length: {vehicleInfo?.length}ft
              <br />

              Horsepower: {vehicleInfo?.horsepower} hp 
              <br />

              Cabins: {vehicleInfo?.cabins} 
              <br />

              Heads: {vehicleInfo?.heads}
              <br />

            </Typography>
            <br />

            {/* boat features */}
            <Typography variant="body1">
              <span className="sectionTitle">
                Features:
              </span>
            </Typography>

            <ul style={{ columns: 2 }}>
              {vehicleInfo?.features?.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            {/* boat description */}
            <Typography variant="body1">
              <span className="sectionTitle">
                Description:
                </span>
              <br />
              {vehicleInfo?.description}
            </Typography>

          </Box>
          
          {/* booking calendar section */}
          <Box>
            <Container component="main">
              <Grid container>
                <Grid item md={6}>
                  <BookingForm
                    vehicleId={vehicleId}
                    availability={vehicleInfo.availability}
                    dailyRate={vehicleInfo.dailyRate}
                  />
                </Grid>
              </Grid>
              <SuccessDialog
                pathname={location.pathname}
                reservationResult={reservationResult}
              />
            </Container>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
