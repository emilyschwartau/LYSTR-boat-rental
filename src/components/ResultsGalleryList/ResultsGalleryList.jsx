import { useSelector } from 'react-redux';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Box,
  Stack,
  CardActionArea,
} from '@mui/material';
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
        <Stack direction="row" justifyContent="space-around">
          {searchResultsList?.length > 0 ? (
            <Box>
              {searchResultsList?.map((item) => {
                return (
                  <div id="resultsCard" key={item.vehicleId}>
                    <Card>
                      <CardActionArea onClick={() => handleSelectTask(item)}>
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
                      </CardActionArea>
                      <CardActions>
                        {/* button to details page */}
                        <Button
                          size="small"
                          onClick={() => handleSelectTask(item)}
                        >
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                );
              })}
            </Box>
          ) : (
            <p>No Rentals Found</p>
          )}

          {searchResultsList?.length > 0 ? (
            <Box maxWidth="25vw" sx={{ width: '100%', paddingLeft: '1em' }}>
              <MapComponent
                vehicleList={searchResultsList}
                searchQueryLocation={galleryItems.searchQuery.location}
                handleSelectTask={handleSelectTask}
              />
            </Box>
          ) : (
            ''
          )}
        </Stack>
      </Box>
    </>
  );
}

export default ResultsGalleryList;
