import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

function SearchBarButton() {
  const history = useHistory();
  const dispatch = useDispatch();
  const vehicleType = useSelector(
    (store) => store.search.searchQuery.vehicleType
  );
  const startDate = useSelector((store) => store.search.searchQuery.startDate);
  const location = useSelector((store) => store.search.searchQuery.location);

  const handleSearch = () => {
    if (vehicleType) {
      // search parameters push to url
      // url query parsed on ResultsGalleryPage useQuery hook
      history.push(
        `/gallery?location=${location}&date=${
          startDate.toString().includes(':')
            ? format(startDate, 'MM-dd-yyyy')
            : startDate
        }&type=${vehicleType}`
      );
      dispatch({
        type: 'FETCH_VEHICLES',
        payload: {
          location,
          vehicleType,
          startDate: startDate.toString().includes(':')
            ? format(startDate, 'MM-dd-yyyy')
            : startDate,
        },
      });
    } else {
      alert('Please choose vehicle type');
    }
  };

  return (
    <Button
      variant="contained"
      sx={{
        m: 2.25,
      }}
      onClick={handleSearch}
    >
      Find Vehicle
    </Button>
  );
}
export default SearchBarButton;
