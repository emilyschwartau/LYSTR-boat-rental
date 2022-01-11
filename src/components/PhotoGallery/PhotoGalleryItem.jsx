import { useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function PhotoGalleryItem({ photo, amount }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (amount <= 1) {
      return;
    } else {
      dispatch({
        type: 'DELETE_PHOTO',
        payload: { photoId: photo.id, vehicleId: photo.vehicleId },
      });
    }
  };

  return (
    <Card>
      <CardMedia component="img" height={250} image={photo.path} />
      <CardActions>
        <Button
          size="small"
          color="error"
          startIcon={<DeleteForeverIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
