import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';



function LocationComboBox() {
    const dispatch = useDispatch()
    const { cities } = useSelector((store) => store.data);


    // removes all keys from cities table 
    // to use as labels for auto complete

    // const cityLabels = []

    // function removeKeys(obj) {
        
    //     let keyArr = [];
    //     let concatArr = [];
    //     for (let k of obj) {
    //         if (typeof (k) === 'number') {
    //             // convert zip codes to string
    //             keyArr.push(Object.values(k).toString())
    //         } else {
    //             // add each item to a new array without keys
    //             keyArr.push(Object.values(k))
    //         }
    //     }
    //     // concat all new arrays with no keys to one array
    //     for (let i of keyArr) {
    //         concatArr = concatArr.concat(i)
    //     }

    //     // check all instances and remove duplicates
    //     const removeDuplicates = concatArr.reduce(function (a, b) {
    //         if (a.indexOf(b) === -1) {
    //             a.push(b)
    //         }
    //         return a
    //     }, [])
        

    //     for (let i of removeDuplicates){
    //         cityLabels.push({"label": i})
    //     }

    //     return cityLabels
    // }


    // removeKeys(cities)
    // console.log('in remove keys combo box:',cityLabels)

    React.useEffect(() => {
        dispatch({ type: 'FETCH_CITY_LIST' });
    }, []);

    return (
        <div>
            <Autocomplete
                disablePortal
                autoComplete={true}
                // autoSelect={true}
                id="combo-box-demo"
                options={cities}
                sx={{ width: 300 }}
                renderInput={(params) =>
                    <TextField {...params} label="Cities" />
                }
            getOptionLabel={(option) => option.label}
            // returns text for search box
            // getOptionLabel={(option) => `${option.city} ${option.county}`}
            // renders options passed into getOptionLabel
            // renderOption={(option) => 
            //     {return (<h4>{option.label}</h4>)}
            // }
            />
            <br />
        </div>
    )

}

export default LocationComboBox;




