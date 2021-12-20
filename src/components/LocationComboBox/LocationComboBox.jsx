import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



function LocationComboBox() {


    const cities =
        // [
        //     { label: 'ADAMS', county: 'MOWER', zip: 55909 },
        //     { label: 'ADOLPH', county: 'SAINT LOUIS', zip: 55701 },
        //     { label: 'ADRIAN', county: 'NOBLES', zip: 56110 },
        //     { label: 'AFTON', county: 'WASHINGTON', zip: 55001 },
        //     { label: 'AITKIN', county: 'AITKIN', zip: 56431 }
        // ];

        [
            {label: 'ADAMS'},
            {label: 'ADOLPH'},
            {label: 'ADRIAN'},
            {label: 'AFTON'},
            {label: 'AITKIN'},
            {label: 'MOWER'},
            {label: 'SAINT LOUIS'},
            {label: 'NOBLES'},
            {label: 'WASHINGTON'},
            {label: 'AITKIN'},
            {label: 55909},
            {label: 55701},
            {label:	56110},
            {label:	55001},
            {label: 56431}
            ];


    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={cities}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Cities" />}
        />
    )

}

export default LocationComboBox;




