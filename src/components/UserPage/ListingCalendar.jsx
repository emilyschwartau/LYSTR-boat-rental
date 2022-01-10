import React from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import FormControl from '@mui/material/FormControl';


function ListingCalendar ({vehicle}) {

    // calendar to show when vehicle is available on my listings tab
    // vehicle is the mapped available vehicle from listedVehiclesByOwner array

    const availability = vehicle.availability
    const date =  vehicle.availability[0]
  
    return (
        <FormControl margin="normal">
        <Calendar
          currentDate={new DateObject()
            .set('year', date.split('-')[2])
            .set('month', date.split('-')[0])
            .set('day', date.split('-')[1])}
          numberOfMonths={1}
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
    )
}

export default ListingCalendar