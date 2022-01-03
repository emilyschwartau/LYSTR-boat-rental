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
  CardActionArea,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


export default function VehicleDetailsPage() {
  const dispatch = useDispatch();
  const { vehicleId } = useParams();
  const location = useLocation();

  const { vehicleInfo, photos } = useSelector((store) => store.vehicle);
  const { reservationResult } = useSelector((store) => store.rental);

  console.log("photos", photos);
  console.log("vehicleInfo", vehicleInfo);

  React.useEffect(() => {
    dispatch({ type: 'FETCH_VEHICLE_BY_ID', payload: vehicleId });
    dispatch({ type: 'FETCH_VEHICLE_PHOTOS', payload: vehicleId });
  }, [dispatch]);

  const [imageIndex, setImageIndex] = useState(0);
  const history = useHistory();

  const handleNext = () => {
    if (imageIndex != photos?.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
  };

  const handleBack = () => {
    if (imageIndex == 0) {
      setImageIndex(photos?.length - 1);
    } else {
      setImageIndex(imageIndex - 1);
    }
  };
  console.log('listings info');
  

  return (
    <>

  
  <Box sx={{ margin: 'auto', padding: '1em', width: '80%' }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="space-around"
        >
          <Box sx={{ width: '45%', textAlign: 'center',
              width: '45%',
              padding: '1em',}}>
            <Card >
              <CardActionArea>
                <CardMedia className="detailImages"
                  component="img"
                  height={'200vh'}
                  image={photos[imageIndex]?.path}
                />
              </CardActionArea>
            </Card>
            <br />
            {(photos?.length > 1) ? <>
              <div id="carouselNav">
              <IconButton variant='outlined' onClick={() => handleBack()}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <Typography variant='caption' sx={{ margin: '0 1em' }}>Click to navigate through images</Typography>
              <IconButton variant='outlined' onClick={() => handleNext()}>
                <ArrowForwardIosIcon />
              </IconButton>
              </div>
            </>
              : ''}

            <Typography variant='body1'><u>Address:</u><br /> {`${vehicleInfo?.street} ${vehicleInfo?.city}, ${vehicleInfo?.state} ${vehicleInfo?.zip}`}</Typography><br />

            <Typography variant='body1' sx={{}}>
              <u>Vehicle Info</u><br />
              Capacity: {vehicleInfo?.capacity}<br />
              Length: {vehicleInfo?.length}ft <br />
              Horsepower: {vehicleInfo?.horsepower} hp <br />
              Cabins: {vehicleInfo?.cabins} <br />
              Heads: {vehicleInfo?.heads}<br />
            </Typography><br />

            <Typography variant='body1'><u>Features:</u></Typography>
            <ul style={{ columns: 2 }}>
              {vehicleInfo?.features?.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <Typography variant='body1'>
              <u>Instructions:</u><br />
              {vehicleInfo?.instructions}
            </Typography>

          </Box>
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



