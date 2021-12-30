import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

const msg = {
  add: 'Vehicle added successfully!',
  update: 'Vehicle updated successfully!',
  book: 'Vehicle booked!',
};

export default function SuccessDialoge(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  let title;
  if (props.pathname.includes('/add-vehicle')) {
    title = msg.add;
  } else if (props.pathname.includes('/update-vehicle')) {
    title = msg.add;
  } else if (props.pathname.includes('/vehicle-details')) {
    title = msg.book;
  } else {
    msg = 'Success!';
  }

  const handleClick = () => {
    dispatch({ type: 'CLOSE_SUCCESS' });
    history.push('/user');
  };

  return (
    <Dialog open={props.success}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={handleClick}>Dashboard</Button>
      </DialogActions>
    </Dialog>
  );
}
