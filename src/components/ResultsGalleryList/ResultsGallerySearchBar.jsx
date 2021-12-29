import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocationComboBox from '../LocationComboBox/LocationComboBox'
import Box from '@mui/material/Box';



function ResultsGallerySearchBar() {

    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    

    return (
        <div>
            <Box sx={{ width: '100%', border: '1px solid black', margin: '1em auto'}}>
                <LocationComboBox />
            </Box>
        </div>
    )
};

export default ResultsGallerySearchBar