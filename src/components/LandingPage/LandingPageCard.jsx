import { Box, Card, Typography, Button, TextField, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function LandingPageCard() {
    return (<>
        <Box sx={{
            width: '50%'
        }}>
            <Card sx={{
                border: '1px solid black',
                width: '100%',
                padding: '1em',
                textAlign: 'center'
            }}>
                <Typography variant='h4'>Find A Boat Near You!</Typography>
                <br />
                <FormControl
                    fullWidth={true}
                >
                    <TextField
                        placeholder='City, State'
                        helperText='Search Location by City, State'
                        label='Location'
                    />
                    <Button
                        variant='outlined'
                        endIcon={<SearchIcon />}
                        sx={{
                            width: '50%',
                            margin: 'auto'
                        }}
                    >
                        Search
                    </Button>
                </FormControl>
            </Card>
        </Box>
    </>)
}
export default LandingPageCard;