import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import LocationComboBox from '../LocationComboBox/LocationComboBox'
import TripDatePicker from '../TripDatePicker/TripDatePicker';



function ResultsGallerySearchBar() {

    return (

        <Box sx={{
            display: "flex",
            flexGrow: 1,
            width: '90%',
            border: '1px solid black',
            margin: '1em auto'
        }}>
            <Grid item xs={5}>
                <LocationComboBox />
            </Grid>
            <Grid item xs={4}>
                <TripDatePicker />
            </Grid>

        </Box>

    )
};

export default ResultsGallerySearchBar