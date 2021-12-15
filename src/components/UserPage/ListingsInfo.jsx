import { Box, Divider, Stack } from '@mui/material';

function ListingsInfo({ row }) {
    return (<>
        <Box sx={{border: 'black solid 1px', margin: 'auto', padding: '1em', width: '80%'}}>
            <Stack direction={row} divider={<Divider orientation='vertical' flexItem />} justifyContent="space-around"
>
                <Box sx={{ border: 'black solid 1px', width: '30%' }}>
                    <img src={row.image_url} />

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