import { Box, Divider, Stack, Card, CardActionArea, CardMedia, Typography, IconButton,} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';

function ReservationsInfo({ rental }) {
  const [imageIndex, setImageIndex] = useState(0);

  //if image index is not the final index yet, +1 to index otherwise next btn restarts from index 0
  const handleNext = () => {
    if (imageIndex != rental.photos.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
  };

  //if image index is not the first index, -1 to index otherwise back btn restarts the index to last index
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
      <Box sx={{ margin: 'auto', padding: '1em', width: '90%'}}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="space-around"
        >
          <Box sx={{ width: '40%', textAlign: 'center' }}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height={'250vh'}
                  image={rental?.photos[imageIndex]}
                />
              </CardActionArea>
            </Card>
            <br />
            {/* if there is more than 1 photo, display the image navigation toolbar */}
            {rental?.photos.length > 1 ? (
              <>
                <IconButton variant="outlined" onClick={() => handleBack()}>
                  <ArrowBackIosNewIcon />
                </IconButton>
                <Typography variant="caption" sx={{ margin: '0 1em' }} className="navCaption">
                  Click to navigate through images
                </Typography>
                <IconButton variant="outlined" onClick={() => handleNext()}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </>
            ) : (
              ''
            )}
          </Box>
          <Box
            sx={{
              border: 'gray solid 1px',
              borderRadius: 2,
              width: '40%',
              padding: '1em',
            }}
          >
            <Typography variant="body1">
              <strong>Address:</strong>
              <br />{' '}
              {`${rental?.street} ${rental?.city}, ${rental?.state} ${rental?.zip}`}
            </Typography>
            <br />

            <Typography variant="body1" sx={{}}>
              <strong>Vehicle Info</strong>
              <br />
              Capacity: {rental?.capacity}
              <br />
              Length: {rental?.length}ft <br />
              Horsepower: {rental?.horsepower} hp <br />
              Cabins: {rental?.cabins} <br />
              Heads: {rental?.heads}
              <br />
            </Typography>
            <br />

            <Typography variant="body1">
              <strong>Features:</strong>
            </Typography>
            <ul style={{ columns: 2 }}>
              {rental?.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <Typography variant='body1'>
              <strong>Description:</strong><br />

              {rental?.description}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default ReservationsInfo;
