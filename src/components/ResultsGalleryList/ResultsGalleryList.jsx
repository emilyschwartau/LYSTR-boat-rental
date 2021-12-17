import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


function ResultsGalleryList () {

    const galleryItems = useSelector(store => store.search);
    let searchResultsList = galleryItems.searchResults.payload;
    //console.log(galleryItems);
    //console.log("search results list", searchResultsList);

    return (
        <>
        <p>Results Gallery List</p>
        {searchResultsList?.map(item => {
            return (
                <div id="resultsCard">
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
                            <Button size="small">Learn More</Button>
                        </CardActions>
                </Card>
                </div>
            );
        })} 
        </>
    );
}

export default ResultsGalleryList;