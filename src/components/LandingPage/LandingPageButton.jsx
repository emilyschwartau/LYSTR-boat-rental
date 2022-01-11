import { Stack, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LandingPageButton({ vehicle }) {
  const history = useHistory();

  history.push('/gallery');

  return (
    <Stack spacing={2} direction="row">
      <Button variant="outlined">{vehicle}</Button>
    </Stack>
  );
}
export default LandingPageButton;
