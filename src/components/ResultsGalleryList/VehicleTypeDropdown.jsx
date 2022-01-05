import { FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useQuery from '../../hooks/useQuery'



function VehicleTypeDropdown() {
    const query = useQuery()
    const dispatch = useDispatch()
    const vehicleList = useSelector((store) => store.data.types);
    const type = query.get("type");
    const { vehicleType } = useSelector(store => store.search.searchQuery)

    // maps over vehicle list, removes keys, renames name to label.
    const vehicleLabel = vehicleList?.map(x => ({
        label: x.name
    }))

    // submits value from select change event to search reducer
    const handleDropDown = (e) => {
        dispatch({ type: 'SET_SEARCH_VEHICLE_TYPE', payload: e.target.value });
    }


    return (

        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Vehicle</InputLabel>
            <Select
                labelId="VehicleTypeDropdown"
                id="VehicleTypeDropdown"
                // checks for reducer for search string, then url
                value={vehicleType ? vehicleType : type}
                label="Vehicle"
                onChange={handleDropDown}
            >
                {vehicleLabel?.map((type) => (
                    // maps over array for select options
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