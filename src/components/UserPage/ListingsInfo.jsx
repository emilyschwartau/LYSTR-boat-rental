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

import PhotoGalleryModal from '../PhotoGallery/PhotoGalleryModal';

function ListingsInfo({ vehicle }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleNext = () => {
    if (imageIndex != vehicle?.photos.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
  };

  const handleBack = () => {
    if (imageIndex == 0) {
      setImageIndex(vehicle?.photos.length - 1);
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
          <Box sx={{ width: '45%', textAlign: 'center' }}>
            <Card>
              <CardActionArea onClick={() => setOpen(true)}>
                <CardMedia
                  component="img"
                  height={'200vh'}
                  image={vehicle?.photos[imageIndex]}
                />
              </CardActionArea>
              {/* <img src={vehicle?.photos[imageIndex]} height={'200vh'} /> */}
            </Card>
            <br />
            {(vehicle?.photos.length > 1) ? <>
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
            <Typography variant='body1'><u>Address:</u><br /> {`${vehicle?.street} ${vehicle?.city}, ${vehicle?.state} ${vehicle?.zip}`}</Typography><br />

            <Typography variant='body1' sx={{}}>
              <u>Vehicle Info:</u><br />
              Capacity: {vehicle?.capacity}<br />
              Length: {vehicle?.length}ft <br />
              Horsepower: {vehicle?.horsepower} hp <br />
              Cabins: {vehicle?.cabins} <br />
              Heads: {vehicle?.heads}<br />
            </Typography><br />

            <Typography variant='body1'><u>Features:</u></Typography>
            <ul style={{ columns: 2 }}>
              {vehicle?.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <Typography variant='body1'>
              <u>Description:</u><br />
              {vehicle?.description}
            </Typography>

          </Box>
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => history.push(`/update-vehicle/${vehicle.vehicleId}`)}
          >
            Update
          </Button>
        </Box>
        <PhotoGalleryModal
          open={open}
          setOpen={setOpen}
          vehicleId={vehicle.vehicleId}
        />
      </Box>
    </>
  );
}

export default ListingsInfo;
