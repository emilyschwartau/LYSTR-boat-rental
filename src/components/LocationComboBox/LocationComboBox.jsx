import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';



function LocationComboBox() {
    const dispatch = useDispatch()
    const { cities } = useSelector((store) => store.data);

    const handleLocationChange = (e) => {
        setSearch({ ...search, location: e.target.value })
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
                required
                // value={search.location}
                id="combo-box-demo"
                options={cities}
                renderInput={(params) =>
                    <TextField {...params} label="Location" />
                }
                getOptionLabel={(option) => option.label}

            />
            <br />
        </div>
    )

}

export default LocationComboBox;




