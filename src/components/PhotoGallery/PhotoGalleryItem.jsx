import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

export default function PhotoGalleryItem({ photo }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={photo.path} />
      <CardActions>
        {/* <Button size="small">Make Primary</Button> */}
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
