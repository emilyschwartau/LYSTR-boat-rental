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

    const handleLocationChange = (e, newValue) => {
        setSearch({ ...search, location: e.target.value, location:newValue })
        dispatch({ type: 'SET_SEARCH_LOCATION', payload: e.target.value });
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
                renderInput={(params) =>
                    <TextField {...params}
                        value={search.location}
                        required
                        placeholder="City, State"
                        helperText="Search Location by City, State"
                        onChange={(e) => handleLocationChange(e)}
                        // onInputChange={(newValue)=> handleLocationChange(newValue)}
                        label="Location"
                    />
                }
                getOptionLabel={(option) => option.label}
            />
            <br />
        </div>
    )

}

export default LocationComboBox;




