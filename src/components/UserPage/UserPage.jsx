import {useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import TabPanel from './TabPanel';
import ListingsTab from './ListingsTab';
import ReservationsTab from './ReservationsTab';
import { useSelector } from 'react-redux';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);


  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  };


  return (<>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example">
          <Tab label="Item One"/>
          <Tab label="Item Two" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ListingsTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ReservationsTab />
      </TabPanel>
    </Box>

  </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
