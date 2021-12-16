import { Box, Divider, Stack, Card, Button, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';

function ReservationsInfo({ row }) {

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
        <Box sx={{ margin: 'auto', padding: '1em', width: '80%' }}>
            <Stack direction={row} divider={<Divider orientation='vertical' flexItem />} justifyContent="space-around">
                <Box sx={{ width: '45%', textAlign: 'center' }}>
                    <Card><img src={row.image_url[imageIndex]} height={'200vh'} /></Card><br />
                    <IconButton variant='outlined' onClick={() => handleBack()}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography variant='caption' sx={{ margin: '0 1em' }}>Click to navigate through images</Typography>
                    <IconButton variant='outlined' onClick={() => handleNext()}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
                <Box sx={{ border: 'black solid 1px', width: '45%', padding: '1em' }}>
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

export default ReservationsInfo;