import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';



function LocationComboBox() {
    const dispatch = useDispatch()
    const { cities } = useSelector((store) => store.data);

    const [search, setSearch] = useState({
        location: ''
    })

    const handleLocationChange = (e) => {
        setSearch({ ...search, location: e.target.value })
        dispatch({ type: 'SET_SEARCH_LOCATION', payload: e.target.value });
    }

    const handleAutoComplete = (event) => {
        setSearch({ ...search, location: event.label })
        dispatch({ type: 'SET_SEARCH_LOCATION', payload: event.label });
        
        console.log('handleAutoComplete:', event.label)
    }



    React.useEffect(() => {
        dispatch({ type: 'FETCH_CITY_LIST' });
    }, []);

    return (
        <div>
            <Autocomplete
                disablePortal
                autoComplete={true}
                autoSelect={true}
                id="combo-box-demo"
                options={cities}
                // onChange={(event, value) => console.log(value)}
                onChange={(event, value) => handleAutoComplete(value)}
                renderInput={(params) =>
                    <TextField {...params}
                        // value={search.location}
                        required
                        placeholder="City, State"
                        helperText="Search Location by City, State"
                        onChange={(e) => handleLocationChange(e)}
                        label="Location"
                    />
                }
                getOptionLabel={(option) => option.label}
                // getOptionSelected={(option,value) => option.label === value.label}
            />
            <br />
        </div>
    )

}

export default LocationComboBox;




