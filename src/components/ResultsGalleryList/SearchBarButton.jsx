import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';


function SearchBarButton() {
    const history = useHistory();
    const vehicleList = useSelector((store) => store.data.types);
    const vehicleType = useSelector((store) => store.search.searchQuery.vehicleType);
    const startDate = useSelector((store) => store.search.searchQuery.startDate);
    const location = useSelector((store) => store.search.searchQuery.location);

    const handleSearch = () => {
        if (vehicleType) {
          // search parameters push to url
          // url query parsed on ResultsGalleryPage useQuery hook
          history.push(`/gallery?location=${location}&date=${startDate}&type=${vehicleType}`);
        } else {
          alert('Please choose vehicle type');
        }
      };

    return <Button
        variant="outlined"
        sx={{
            width: '20%',
            margin: 'auto',
        }}
        onClick={handleSearch}

    >Find Vehicle</Button>
}
export default SearchBarButton;