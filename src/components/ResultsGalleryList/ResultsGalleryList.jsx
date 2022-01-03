import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Card, CardActions, CardContent, Button, Box } from '@mui/material';

import { useHistory } from 'react-router-dom';

import ResultsGallerySearchBar from './ResultsGallerySearchBar'


function ResultsGalleryList () {

    const history = useHistory();

    const galleryItems = useSelector(store => store.search);
    let searchResultsList = galleryItems.searchResults.payload;
    //console.log(galleryItems);
    // console.log("search results list", searchResultsList);

    const handleSelectTask = (item) => {
        // store selected task object in Redux
        //dispatch({ type: 'SET_SELECTED_TASK', payload: item }); 
      
        // go to details view
        history.push(`/vehicle-details/${item.vehicleId}`);
        
    };

    return (
        <>
        <Box sx={{ width: '90%', margin: '1em auto'}}>
        <ResultsGallerySearchBar />
        {searchResultsList?.map(item => {
            return (
                <div id="resultsCard" key={item.vehicleId}>
                <Card >
                        <CardContent id="resultCardContent">
                            
                            <img id="resultCardImg"src={item.photos[0]} />
                            
                            <div id="resultCardDetails">
                            <h4 id="boatResultTitle">{item.title}</h4>
                            Daily Rate: ${item.dailyRate}<br></br>
                            {item.city}, {item.state}
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => handleSelectTask(item)}>Learn More</Button>
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