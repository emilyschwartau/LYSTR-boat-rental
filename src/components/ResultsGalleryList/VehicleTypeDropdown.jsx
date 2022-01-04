import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
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
      
            <Autocomplete
                disablePortal
                autoComplete={true}
                autoSelect={true}
                id="VehicleTypeDropdown"
                sx ={{
                    m: 1
                }}
                options={vehicleList ? vehicleLabel : 'none'}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, value) => handleDropDown(value)}
                disableClearable={true}
                renderInput={(params) =>
                    <TextField {...params}
                        label={vehicleSearch ? vehicleSearch : type}
                        helperText="Type of Vehicle"
                    />
                }
                getOptionLabel={(option) => option.label}
            />
      
    )
}

export default VehicleTypeDropdown