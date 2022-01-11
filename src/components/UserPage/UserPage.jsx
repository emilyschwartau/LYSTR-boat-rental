import { useState, useEffect } from 'react';
import TabPanel from './TabPanel';
import ListingsTab from './ListingsTab';
import ReservationsTab from './ReservationsTab';
import ProfileTab from './ProfileTab';
import { useSelector } from 'react-redux';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';

function UserPage() {
  const [value, setValue] = useState(0);

  //handles tab selection
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ width: '90%', margin: '3rem auto' }} elevation={4}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab label="My Reservations" />
          <Tab label="My listings" />
          <Tab label="Profile" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ReservationsTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListingsTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProfileTab />
      </TabPanel>
    </Paper>
  );
}

export default UserPage;
