import React from 'react';
import LandingPageLayout from '../components/LandingPage/LandingPageLayout';
import LandingPageLocation from '../components/LandingPage/LandingPageLocation';
import LandingPageVehicleType from '../components/LandingPage/LandingPageVehicleType';
import * as Scroll from 'react-scroll';
import { useDispatch } from 'react-redux';

//give name to element to scroll to

function LandingPage() {
  const dispatch = useDispatch();
  const ScrollElement = Scroll.Element;

  const backgroundImage = '/images/landing_bg.jpg';

  React.useEffect(() => {
    dispatch({ type: 'CLEAR_SEARCH_QUERY' });
  }, []);

  return (
    <>
      <LandingPageLayout
        sxBackground={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: '#7fc7d9', // Average color of the background image.
          backgroundPosition: 'center',
        }}
      >
        {/* Increase the network loading priority of the background image. */}
        <img
          style={{ display: 'none' }}
          src={backgroundImage}
          alt="increase priority"
        />
        <LandingPageLocation />
      </LandingPageLayout>
      <ScrollElement name="vehicleType">
        <LandingPageVehicleType />
      </ScrollElement>
    </>
  );
}

export default LandingPage;
