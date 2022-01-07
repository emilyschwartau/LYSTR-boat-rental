import React from 'react';
import { useDispatch } from 'react-redux';

import CancelReservationModal from './CancelReservationModal';

import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

const CustomLink = styled(Link)(({ theme }) => ({
  '&.MuiLink-root': {
    color: 'gray',
    fontStyle: 'italic',
    textDecorationColor: 'gray',
  },
  marginLeft: '2rem',
}));

export default function CancelReservationButton({ rentalData, user }) {
  const dispatch = useDispatch();
  const [confirmCancel, setConfirmCancel] = React.useState(false);

  const cancelReservation = () => {
    dispatch({
      type: 'CANCEL_RESERVATION',
      payload: { rentalId: rentalData.id, userId: user.id },
    });
    setConfirmCancel(false);
  };

  return (
    <>
      <CustomLink
        component="button"
        variant="body2"
        onClick={() => setConfirmCancel(true)}
      >
        Cancel Reservation
      </CustomLink>
      <CancelReservationModal
        rentalData={rentalData}
        open={confirmCancel}
        setConfirmCancel={setConfirmCancel}
        cancelReservation={cancelReservation}
      />
    </>
  );
}
