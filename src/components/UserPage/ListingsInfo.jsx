import {
  Box,
  Divider,
  Stack,
  Card,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';

function ListingsInfo({ vehicle }) {
  const [imageIndex, setImageIndex] = useState(0);

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
              <img src={vehicle?.photos[imageIndex]} height={'200vh'} />
            </Card>
            <br />
            <IconButton variant="outlined" onClick={() => handleBack()}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography variant="caption" sx={{ margin: '0 1em' }}>
              Click to navigate through images
            </Typography>
            <IconButton variant="outlined" onClick={() => handleNext()}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
          <Box sx={{ border: 'black solid 1px', width: '45%', padding: '1em' }}>
            <p>
              Address:{' '}
              {`${vehicle?.street} ${vehicle?.city}, ${vehicle?.state} ${vehicle?.zip}`}
            </p>

            <p>Features:</p>
            <ul>
              {vehicle?.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default ListingsInfo;
