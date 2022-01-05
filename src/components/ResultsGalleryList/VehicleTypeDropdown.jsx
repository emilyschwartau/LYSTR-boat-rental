import Autocomplete from '@mui/material/Autocomplete';

import { FormControl, FormHelperText, TextField, InputLabel, Select, MenuItem } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import useQuery from '../../hooks/useQuery'



function VehicleTypeDropdown() {
    const query = useQuery()
    const dispatch = useDispatch()
    const vehicleList = useSelector((store) => store.data.types);
    const type = query.get("type");
    const { vehicleType } = useSelector(store => store.search.searchQuery)

    
    const vehicleLabel = vehicleList?.map(x => ({
        label: x.name
    }))

    console.log('before handleDropDown', vehicleType)

    const handleDropDown = (e) => {
        console.log('VehicleTypeDropdown', e.target.value)
        dispatch({ type: 'SET_SEARCH_VEHICLE_TYPE', payload: e.target.value });
    }

    

    return (

        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Vehicle</InputLabel>
            <Select
                labelId="VehicleTypeDropdown"
                id="VehicleTypeDropdown"
                value={ vehicleType }
                label="Vehicle"
                onChange={handleDropDown}
            >
                {vehicleLabel?.map((type) => (
                    <MenuItem key={type.label} value={type.label}>
                        {type.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>Choose a Vehicle Type</FormHelperText>
        </FormControl>
    )
}

export default VehicleTypeDropdown