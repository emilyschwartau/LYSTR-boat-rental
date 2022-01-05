import { useSelector } from 'react-redux';
import { Card, CardActions, CardContent, Button, Box } from '@mui/material';
import useQuery from '../../hooks/useQuery';
import { useHistory } from 'react-router-dom';
import ResultsGallerySearchBar from './ResultsGallerySearchBar';
import MapComponent from '../Map/MapComponent';

//gallery of search result cards
function ResultsGalleryList() {

  const history = useHistory();
  const query = useQuery();
  const date = query.get('date');

  const galleryItems = useSelector((store) => store.search);
  let searchResultsList = galleryItems.searchResults.payload;

  const handleSelectTask = (item) => {
    // go to details view
    history.push(`/vehicle-details/${item.vehicleId}?date=${date}`);
  };

  return (
    <>
      <Box sx={{ width: '90%', margin: '1em auto' }}>

        {/* search bar */}
        <ResultsGallerySearchBar />
        <Box sx={{width: '40%'}}>
          <MapComponent vehicleList={searchResultsList} searchQueryLocation={galleryItems.searchQuery.location} handleSelectTask={handleSelectTask} />
        </Box>
        {searchResultsList?.map((item) => {
          return (
            <div id="resultsCard" key={item.vehicleId}>
              <Card>
                <CardContent id="resultCardContent">

                  {/* returns first image for card */}
                  <img id="resultCardImg" src={item.photos[0]} />

                  {/* title, daily rate, location */}
                  <div id="resultCardDetails">
                    <h4 id="boatResultTitle">{item.title}</h4>
                    Daily Rate: ${item.dailyRate}
                    <br></br>
                    {item.city}, {item.state}
                  </div>

                </CardContent>
                <CardActions>

                  {/* button to details page */}
                  <Button size="small" onClick={() => handleSelectTask(item)}>
                    Learn More
                  </Button>
                  
                </CardActions>
              </Card>
            </div>
          );
        })}
      </Box>
    </>
  );
}

export default ResultsGalleryList;
