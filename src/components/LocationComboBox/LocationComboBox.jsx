import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';

function LocationComboBox() {
  const dispatch = useDispatch();

  const { cities } = useSelector((store) => store.staticData);
  const { searchQuery } = useSelector((store) => store.search);

  // search input
  const [locationSearch, setSearch] = useState(null);

  const handleLocationChange = (e) => {
    dispatch({ type: 'SET_SEARCH_LOCATION', payload: e.target.value });
  };

  const handleAutoComplete = (value) => {
    if (value.label) {
      dispatch({ type: 'SET_SEARCH_LOCATION', payload: value.label });
    } else {
      setSearch('');
    }
  };

  // console.log('value should equal location combobox',searchQuery.location)

  React.useEffect(() => {
    dispatch({ type: 'FETCH_CITY_LIST' });
  }, []);

  return (
    <Autocomplete
      disablePortal
      autoComplete={true}
      autoSelect={true}
      id="locationComboBox"
      options={cities}
      onChange={(event, value) => handleAutoComplete(value)}
      sx={{
        m: 1,
      }}
      disableClearable={true}
      inputValue={searchQuery.location}
      renderInput={(params) => (
        <TextField
          {...params}
          required
          placeholder="City"
          helperText="Search Location by City in Minnesota"
          onChange={(e) => handleLocationChange(e)}
          label="Location"
        />
      )}
    />
  );
}

export default LocationComboBox;
