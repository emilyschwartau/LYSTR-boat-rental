import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';



function VehicleTypeDropdown() {

    const vehicleList = useSelector((store) => store.data.types);
    const vehicleSearch = useSelector(store => store.search.vehicleType)
    const vehicleLabel = vehicleList?.map( x => ({
        label:x.name
    }))

    return (
        <div>
            <Autocomplete
                disablePortal
                autoComplete={true}
                autoSelect={true}
                id="VehicleTypeDropdown"
                options={vehicleList? vehicleLabel : 'none'}
                onClick={() => {
                    console.log(vehicle);
                    dispatch({
                      type: 'SET_SEARCH_VEHICLE_TYPE',
                      payload: vehicle.name,
                    });
                  }}
                disableClearable={true}
                renderInput={(params) =>
                    <TextField {...params}
                        label={vehicleSearch ? vehicleSearch : `Vehicle Type`}
                    />
                }
                getOptionLabel={(option) => option.label}
            />
            <br />
        </div>
    )
}

export default VehicleTypeDropdown