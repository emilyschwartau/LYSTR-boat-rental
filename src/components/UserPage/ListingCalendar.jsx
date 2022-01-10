import React from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import FormControl from '@mui/material/FormControl';


function ListingCalendar ({vehicle}) {

    // calendar to show when vehicle is available on my listings tab
    // vehicle is the mapped available vehicle from listedVehiclesByOwner array
    const availability = vehicle.availability;
    const date =  vehicle.availability[0];
    const today = new DateObject();

    // this is the current month
    const { month } = today;

    // use date object and set the value to the first available rental day
    const firstAvailable = 
    
    today
    .set('year', date.split('-')[2])
    .set('month', date.split('-')[0])
    .set('day', date.split('-')[1]);

    // currentDate compares the number of current month to first month listed as available
    // the current date on the calendar will be the greater of these
    // current date sets the month the calendar opens when initially displayed
  
    return (
        <FormControl margin="normal">
        <Calendar
          currentDate={
            firstAvailable.month.number > month.number? 
            firstAvailable
            :
            firstAvailable.month
        }
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
    )
}

export default ListingCalendar