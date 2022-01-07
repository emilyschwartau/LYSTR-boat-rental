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
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

import PhotoGalleryModal from '../PhotoGallery/PhotoGalleryModal';
import CancelReservationButton from '../CancelReservation/CancelReservationButton';
import DeleteListingModal from '../DeleteListing/DeleteListingModal';

function ListingsInfo({ vehicle }) {
  const user = useSelector((store) => store.user);
  const [imageIndex, setImageIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [renderStatus, setRenderStatus] = useState(false); // for forcing re render
  const [confirmDelete, setConfirmDelete] = useState(false); // for opening the delete listing modal
  const history = useHistory();
  const dispatch = useDispatch();

  //reload vehicle info on page load and when render status change
  //render status changes when image delete/upload modal closes to force rerender of image list
  useEffect(() => {
    dispatch({ type: `FETCH_LISTED_VEHICLES_BY_OWNER`, payload: user.id });
    setImageIndex(0);
  }, [renderStatus]);

  //if image index is not the final index yet, +1 to index otherwise next btn restarts from index 0
  const handleNext = () => {
    if (imageIndex != vehicle?.photos.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
  };

  //if image index is not the first index, -1 to index otherwise back btn restarts the index to last index
  const handleBack = () => {
    if (imageIndex == 0) {
      setImageIndex(vehicle?.photos.length - 1);
    } else {
      setImageIndex(imageIndex - 1);
    }
  };

  const handleDeleteListing = () => {
    console.log(vehicle.vehicleId);
    dispatch({
      type: 'DELETE_VEHICLE',
      payload: {
        vehicleId: vehicle.vehicleId,
        photos: vehicle.photos,
        userId: user.id,
      },
    });
    setConfirmDelete(false);
  };

  return (
    <>
      <Box sx={{ margin: 'auto', padding: '1em', width: '90%' }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="space-around"
        >
          <Box sx={{ width: '40%', textAlign: 'center' }}>
            <Typography variant="caption" sx={{ margin: '0 1em' }}>
              Click on image to delete or upload new images
            </Typography>
            <Card>
              <CardActionArea onClick={() => setOpen(true)}>
                <CardMedia
                  component="img"
                  height={'200vh'}
                  image={vehicle?.photos[imageIndex]}
                />
              </CardActionArea>
            </Card>
            <br />
            {/* if there is more than 1 photo, display the image navigation toolbar */}
            {vehicle?.photos.length > 1 ? (
              <>
                <IconButton variant="outlined" onClick={() => handleBack()}>
                  <ArrowBackIosNewIcon />
                </IconButton>
                <Typography
                  variant="caption"
                  sx={{ margin: '0 1em' }}
                  className="navCaption"
                >
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
              {`${vehicle?.street} ${vehicle?.city}, ${vehicle?.state} ${vehicle?.zip}`}
            </Typography>
            <br />

            <Typography variant="body1" sx={{}}>
              <strong>Vehicle Info</strong>
              <br />
              Capacity: {vehicle?.capacity}
              <br />
              Length: {vehicle?.length}ft <br />
              Horsepower: {vehicle?.horsepower} hp <br />
              Cabins: {vehicle?.cabins} <br />
              Heads: {vehicle?.heads}
              <br />
            </Typography>
            <br />

            <Typography variant="body1">
              <strong>Features:</strong>
            </Typography>
            <ul style={{ columns: 2 }}>
              {vehicle.features?.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <Typography variant="body1">
              <strong>Description:</strong>
              <br />

              {vehicle?.description}
            </Typography>
          </Box>
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Stack direction="row" spacing={4}>
            <Button
              variant="contained"
              onClick={() =>
                history.push(`/update-vehicle/${vehicle.vehicleId}`)
              }
            >
              Update Listing
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setConfirmDelete(true)}
            >
              Remove Listing
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            width: '100%',
            padding: '1em',
          }}
        >
          <Typography variant="body1">
            {/* if there are future rental dates -> show upcoming rentals otherwise dont show upcoming rental text*/}
            {vehicle?.rentalData.filter(
              (data) => new Date(data.rentalDate) >= new Date()
            ).length > 0 ? (
              <>
                <strong>Upcoming Rentals:</strong>
                <br />
                {vehicle?.rentalData
                  //filter out dates past today
                  .filter((data) => new Date(data.rentalDate) >= new Date())
                  //map future dates
                  .map((data) => (
                    <li key={data.id}>
                      {format(new Date(data.rentalDate), 'MM/dd/yyyy')} -{' '}
                      {data.renterFirst} {data.renterLast} - {data.renterEmail}
                      <CancelReservationButton rentalData={data} user={user} />
                    </li>
                  ))}
              </>
            ) : (
              ''
            )}
          </Typography>
        </Box>
        <PhotoGalleryModal
          open={open}
          setOpen={setOpen}
          vehicleId={vehicle.vehicleId}
          setRenderStatus={setRenderStatus}
          renderStatus={renderStatus}
        />
        <DeleteListingModal
          rentalData={vehicle.rentalData}
          open={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          handleDeleteListing={handleDeleteListing}
        />
      </Box>
    </>
  );
}

export default ListingsInfo;
