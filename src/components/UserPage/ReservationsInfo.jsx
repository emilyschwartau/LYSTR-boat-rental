import {
  Box,
  Divider,
  Stack,
  Card,
  CardActionArea,
  CardMedia,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';

function ReservationsInfo({ rental }) {
  const [imageIndex, setImageIndex] = useState(0);

  const handleNext = () => {
    if (imageIndex != rental.photos.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
  };

  const handleBack = () => {
    if (imageIndex == 0) {
      setImageIndex(rental.photos.length - 1);
    } else {
      setImageIndex(imageIndex - 1);
    }
  };

  console.log('reservations info', rental);
  return (
    <>
      <Box sx={{ margin: 'auto', padding: '1em', width: '80%' }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="space-around"
        >
          <Box sx={{ width: '45%', textAlign: 'center' }}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height={'200vh'}
                  image={rental?.photos[imageIndex]}
                />
              </CardActionArea>
              {/* <img src={rental?.photos[imageIndex]} height={'200vh'} /> */}
            </Card>
            <br />
            {(rental?.photos.length > 1) ? <>
              <IconButton variant='outlined' onClick={() => handleBack()}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <Typography variant='caption' sx={{ margin: '0 1em' }}>Click to navigate through images</Typography>
              <IconButton variant='outlined' onClick={() => handleNext()}>
                <ArrowForwardIosIcon />
              </IconButton>
            </>
              : ''}
          </Box>
          <Box
            sx={{
              border: 'gray solid 1px',
              borderRadius: 2,
              width: '45%',
              padding: '1em',
            }}
          >
            <Typography variant='body1'><u>Address:</u><br /> {`${rental?.street} ${rental?.city}, ${rental?.state} ${rental?.zip}`}</Typography><br />

            <Typography variant='body1' sx={{}}>
              <u>rental Info</u><br />
              Capacity: {rental?.capacity}<br />
              Length: {rental?.length}ft <br />
              Horsepower: {rental?.horsepower} hp <br />
              Cabins: {rental?.cabins} <br />
              Heads: {rental?.heads}<br />
            </Typography><br />

            <Typography variant='body1'><u>Features:</u></Typography>
            <ul style={{ columns: 2 }}>
              {rental?.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <Typography variant='body1'>
              <u>Instructions:</u><br />
              {rental?.instructions}
            </Typography>

          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default ReservationsInfo;
