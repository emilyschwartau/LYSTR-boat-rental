import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DateObject } from 'react-multi-date-picker';
// import { format } from 'date-fns';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const msg = {
  add: 'Vehicle added successfully!',
  update: 'Vehicle updated successfully!',
  book: 'Vehicle booked!',
};

export default function SuccessDialog({ pathname, reservationResult }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { success } = useSelector((store) => store.feedback);

  let title;
  if (pathname.includes('/add-vehicle')) {
    title = msg.add;
  } else if (pathname.includes('/update-vehicle')) {
    title = msg.update;
  } else if (pathname.includes('/vehicle-details')) {
    title = msg.book;
  } else {
    msg = 'Success!';
  }

  const handleDashboard = () => {
    dispatch({ type: 'CLOSE_SUCCESS' });
    history.push('/user');
  };

  const handleHome = () => {
    dispatch({ type: 'CLOSE_SUCCESS' });
    history.push('/home');
  };

  return (
    <Dialog open={success}>
      <DialogTitle>{title}</DialogTitle>
      {pathname.includes('/vehicle-details') && (
        <DialogContent>
          <Typography>
            {reservationResult?.year} {reservationResult?.make}{' '}
            {reservationResult?.model}
          </Typography>
          <br />
          <Typography>Owner Name: {reservationResult?.ownerFirst}</Typography>
          <Typography>Owner Email: {reservationResult?.email}</Typography>
          <br />
          {reservationResult && (
            <Typography>
              Date:{' '}
              {new DateObject(reservationResult.date).format('MMMM D, YYYY')}
            </Typography>
          )}
          <Typography>
            Estimated Cost: ${reservationResult?.dailyRate}
          </Typography>
          <br />
          <Typography>
            Please contact the owner to confirm reservation and discuss payment
          </Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleHome}>Home</Button>
        <Button onClick={handleDashboard}>Dashboard</Button>
      </DialogActions>
    </Dialog>
  );
}
