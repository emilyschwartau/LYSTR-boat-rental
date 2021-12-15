import { Box, Divider, Stack } from '@mui/material';
import { useState } from 'react';

function ListingsInfo({ row }) {

    const [imageIndex, setImageIndex] = useState(0);

    const handleNext = () => {
        if (imageIndex != (row.image_url.length - 1)) {
            setImageIndex(imageIndex + 1);
        }
        else {
            setImageIndex(0);
        }
    }

    const handleBack = () => {
        if (imageIndex == 0) {
            setImageIndex(row.image_url.length - 1)
        }
        else {
            setImageIndex(imageIndex - 1);
        }
    }


    console.log(imageIndex)
    return (<>
        <Box sx={{border: 'black solid 1px', margin: 'auto', padding: '1em', width: '80%'}}>
            <Stack direction={row} divider={<Divider orientation='vertical' flexItem />} justifyContent="space-around"
>
                <Box sx={{ border: 'black solid 1px', width: '30%' }}>
                    <button onClick={() => handleBack()}>left</button>
                    <img src={row.image_url[imageIndex]} />
                    <button onClick={() => handleNext()}>right</button>
                </Box>
                <Box sx={{border: 'black solid 1px', width: '60%', padding: '1em'}}>
                    <p>BOAT DETAIL WILL BE POPULATED HERE</p>
                    <p>Address: {`${row.street} ${row.city}, ${row.state} ${row.zip}`}</p>
                    
                    
                    <p>Features</p>
                    <ul> 
                        {row.features?.map(feature => (<>
                            <li>{feature}</li>
                        </>))}
                    </ul>
                   
                </Box>
            </Stack>
        </Box>
    </>)
}

export default ListingsInfo;