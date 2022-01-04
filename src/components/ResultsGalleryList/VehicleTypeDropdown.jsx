import Autocomplete from '@mui/material/Autocomplete';

import { FormControl, FormHelperText, TextField, InputLabel, Select, MenuItem } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import useQuery from '../../hooks/useQuery'



function VehicleTypeDropdown() {
    const query = useQuery()
    const dispatch = useDispatch()
    const vehicleList = useSelector((store) => store.data.types);
    const type = query.get("type");
    const vehicleSearch = useSelector(store => store.search.vehicleType)

    const vehicleLabel = vehicleList?.map(x => ({
        label: x.name
    }))

    const handleDropDown = (value) => {
        console.log('VehicleTypeDropdown', value.label)
        dispatch({ type: 'SET_SEARCH_VEHICLE_TYPE', payload: value.label });
    }

    return (

        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
            <Select
                labelId="VehicleTypeDropdown"
                id="VehicleTypeDropdown"
                value={type}
                label="type"
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