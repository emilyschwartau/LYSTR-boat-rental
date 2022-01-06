import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CancelReservationModal({
  open,
  rentalData,
  cancelReservation,
  setConfirmCancel,
}) {
  return (
    <Dialog open={open} onClose={() => setConfirmCancel(false)}>
      <DialogTitle>Confirm Cancellation</DialogTitle>
      <DialogContent>
        <Typography>
          Please notify the renter of cancellation of their reservation.
        </Typography>
        <br />
        <Typography>
          Renter Name: {rentalData.renterFirst} {rentalData.renterLast}
        </Typography>
        <Typography>Renter Email: {rentalData.renterEmail}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmCancel(false)}>Go Back</Button>
        <Button onClick={cancelReservation}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
