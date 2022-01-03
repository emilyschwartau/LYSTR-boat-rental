import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';


function ResultsGalleryList () {

    const history = useHistory();

    const galleryItems = useSelector(store => store.search);
    let searchResultsList = galleryItems.searchResults.payload;
    //console.log(galleryItems);
    console.log("search results list", searchResultsList);

    const handleSelectTask = (item) => {
        // store selected task object in Redux
        //dispatch({ type: 'SET_SELECTED_TASK', payload: item }); 
      
        // go to details view
        history.push(`/vehicle-details/${item.vehicleId}`);
        
    };

    return (
        <>
        {searchResultsList?.map(item => {
            return (
                <div id="resultsCard" key={item.vehicleId}>
                <Card >
                        <CardContent id="resultCardContent">
                            
                            <img id="resultCardImg"src={item.photos[0]} />
                            
                            <div id="resultCardDetails">
                            <h5 id="boatResultTitle">{item.title}</h5>
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
        </>
    );
}

export default ResultsGalleryList;