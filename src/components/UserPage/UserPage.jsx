import {useState, useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import TabPanel from './TabPanel';
import ListingsTab from './ListingsTab';
import ReservationsTab from './ReservationsTab';
import { useSelector } from 'react-redux';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';

function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  
  useEffect(() => {
    dispatch({ type: `FETCH_LISTED_VEHICLES_BY_OWNER`, payload: user.id });
    dispatch({ type: `FETCH_ALL_RESERVATIONS_BY_ID`, payload: user.id });
  }, [user.id])
  
  // this component doesn't do much to start, just renders some user reducer info to the DOM



  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  };


  return (<>
    <Box sx={{ width: '90%', border: '1px solid black', margin: '2em auto'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example">
          <Tab label="My Reservations"/>
          <Tab label="My listings" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ReservationsTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListingsTab />
      </TabPanel>
    </Box>

  </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
