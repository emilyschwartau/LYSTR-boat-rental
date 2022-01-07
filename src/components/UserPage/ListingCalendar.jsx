import React from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import useQuery from '../../hooks/useQuery';
import FormControl from '@mui/material/FormControl';



function ListingCalendar ({vehicle}) {

    const dispatch = useDispatch();
    const { bookingInput } = useSelector((store) => store.rental);
    const { vehicleInfo } = useSelector((store) => store.vehicle);

    const { allReservationsById } = useSelector((store) => store.vehicle);

    const availability = vehicleInfo.availability
    const date = vehicle.rentalData[0].rentalDate

    console.log(date, availability, bookingInput, allReservationsById)
    // const date = vehicle.allReservationsById[0].dateRented
 

    // console.log( date, date.split('-'))
    // const query = useQuery();
    // const date = query.get('date');

    // date = '02-03-2022'
  
    // const user = useSelector((store) => store.user);
    // const [dateInput, setDateInput] = React.useState('');
  
    // for requiring a date selection
    // const [noDate, setNoDate] = React.useState(false);
  
    React.useEffect(() => dispatch({ type: 'CLEAR_BOOKING_INPUT' }), []);


    return (
        <FormControl margin="normal">
        <Calendar
          currentDate={new DateObject()
            .set('year', date.split('-')[2])
            .set('month', date.split('-')[0])
            .set('day', date.split('-')[1])}
        //   value={new DateObject()
        //     .set('year', bookingInput.date.split('-')[2])
        //     .set('month', bookingInput.date.split('-')[0])
        //     .set('day', bookingInput.date.split('-')[1])}
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