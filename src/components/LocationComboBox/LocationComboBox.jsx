import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';



function LocationComboBox() {
    const dispatch = useDispatch()
    const { cities } = useSelector((store) => store.data);
    const { searchQuery } = useSelector((store) => store.search)


    const handleLocationChange = (e) => {
        dispatch({ type: 'SET_SEARCH_LOCATION', payload: e.target.value });
    }

    const handleAutoComplete = (value) => {
        if (value.label) {
            dispatch({ type: 'SET_SEARCH_LOCATION', payload: value.label });
            console.log('handleAutoComplete:', value, value.label)
        } else {
            setSearch('')
        }
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
                onChange={(event, value) => handleAutoComplete(value)}

                disableClearable={true}
                // clearOnEscape={true}
                renderInput={(params) =>
                    <TextField {...params}
                        // value={search.location}
                        required={searchQuery.location ? false : true}
                        placeholder="City, State"
                        helperText="Search Location by City, State"
                        onChange={(e) => handleLocationChange(e)}

                        label={searchQuery.location ? searchQuery.location : `Location`}
                    />
                }
                getOptionLabel={(option) => option.label}
            />
            <br />
        </div>
    )

}

export default LocationComboBox;




