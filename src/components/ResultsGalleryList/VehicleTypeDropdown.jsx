import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
        <>

       

            <Autocomplete
                disablePortal
                autoComplete={true}
                autoSelect={true}
                id="VehicleTypeDropdown"
                options={vehicleLabel}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, value) => handleDropDown(value)}
                sx={{
                    m: 1
                }}
                disableClearable={true}
                inputValue={vehicleSearch ? vehicleSearch : type}

                renderInput={(params) =>
                    <TextField {...params}
                        placeholder='Choose Vehicle Type'
                        helperText="Type of Vehicle"
                        label="Vehicle"
                    />
                }
                // getOptionLabel={(option) => option.label}
            />

        </>



        // <Select
        //     labelId="VehicleTypeDropdown"
        //     label="Vehicle"
        //     onChange={handleDropDown}
        //     value={vehicleSearch}
        //     name="type"
        //     sx ={{m:1}}

        // >
        //     {vehicleLabel?.map((type) => (
        //         <MenuItem key={type.label} value={type.label}>
        //             {type.label}
        //         </MenuItem>
        //     ))}
        // </Select>
        // <>
        // <InputLabel id="type-selector">Type</InputLabel>
        // <Select
        // // defaultValue=""
        // labelId="type-selector"
        // label="Age"
        // onChange={handleDropDown}
        // value={vehicleFormInputs.type}
        // name="type"
        // >
        // {types?.map((type) => (
        //     <MenuItem key={type.name} value={type.name}>
        //     {type.name}
        //     </MenuItem>
        // ))}
        // </Select>
        // </>
    )
}

export default VehicleTypeDropdown