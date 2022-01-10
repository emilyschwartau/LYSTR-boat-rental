import React from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ListingCalendar({ vehicle }) {
  // calendar to show when vehicle is available on my listings tab
  // vehicle is the mapped available vehicle from listedVehiclesByOwner array
  const availability = vehicle.availability.sort();
  const today = new DateObject();

  // find the next available rental date after today
  const findEarliest = () => {
    for (let date of availability) {
      let dateObj = new DateObject(date)
        .set('year', date.split('-')[2])
        .set('month', date.split('-')[0])
        .set('day', date.split('-')[1]);
      if (dateObj.dayOfYear >= today.dayOfYear) {
        return dateObj;
      }
    }
    return today;
  };

  return (
    <Box>
      <Typography variant="h6">Availability</Typography>
      <FormControl margin="normal">
        <Calendar
          currentDate={findEarliest()}
          numberOfMonths={2}
          mapDays={({ date, today }) => {
            const isAvailable = availability?.includes(
              date.format('MM-DD-YYYY')
            );
            if (!isAvailable || date.dayOfYear < today.dayOfYear)
              return {
                disabled: true,
                style: { color: '#ccc' },
              };
          }}
        />
      </FormControl>
    </Box>
  );
}

export default ListingCalendar;
