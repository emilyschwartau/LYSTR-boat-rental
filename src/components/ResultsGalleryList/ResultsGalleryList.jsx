import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Box,
  Stack,
  CardActionArea,
  Typography
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
  let searchResultsList = galleryItems.searchResults.searchResults;

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
            <Box minWidth="70%">
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

                            <Typography id="boatResultTitle" 
                            variant='h6'
                            sx={{ 
                              fontSize: 16,
                              fontWeight: 700,
                             }}
                            
                            >{item.title} </Typography>

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
            <Box maxWidth="30%" sx={{ width: '100%', paddingLeft: '1em' }}>
              <MapComponent
                vehicleList={searchResultsList}
                searchQuery={galleryItems.searchQuery}
                handleSelectTask={handleSelectTask}
                coords={galleryItems.searchResults.coords}
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
