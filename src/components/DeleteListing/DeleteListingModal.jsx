import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

export default function DeleteListingModal({
  rentalData,
  open,
  setConfirmDelete,
  handleDeleteListing,
}) {
  return (
    <Dialog open={open} onClose={() => setConfirmDelete(false)} scroll="paper">
      <DialogTitle>{'Permanently Delete Your Listing?'}</DialogTitle>
      <DialogContent>
        <Typography>
          Deleting this listing will cancel all of its rental reservations.
          Please confirm this with users with reservations!
        </Typography>
        <br />
        <Typography>Reservations:</Typography>
        <br />
        {rentalData?.map((rental) => (
          <Box key={rental.id}>
            <Typography>{rental.rentalDate}</Typography>
            <Typography>
              {rental.renterFirst} {rental.renterLast}
            </Typography>
            <Typography>{rental.renterEmail}</Typography>
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setConfirmDelete(false)}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteListing}>
          Delete Listing
        </Button>
      </DialogActions>
    </Dialog>
  );
}
