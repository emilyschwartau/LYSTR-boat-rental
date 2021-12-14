import * as React from 'react';
import LandingPageLayout from '../components/LandingPage/LandingPageLayout';
import LandingPageLocation from '../components/LandingPage/LandingPageLocation';
import LandingPageVehicleType from '../components/LandingPage/LandingPageVehicleType';
import * as Scroll from 'react-scroll';

const backgroundImage =
  '/images/landing_bg.jpg';

function LandingPage() {

  const ScrollLink = Scroll.Link;
  const ScrollButton = Scroll.Button;
  const ScrollElement = Scroll.Element;
  const ScrollEvents = Scroll.Events;
  const scroll = Scroll.animateScroll;
  const scrollSpy = Scroll.scrollSpy;

  const scrollTo = () => {
    console.log(`in scrollTo`)
    scroll.scrollTo('vehicleType', {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: 50});
  }


  return (<>
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
        alt='increase priority'
      />
      <LandingPageLocation scrollTo={scrollTo} ScrollButton={ScrollButton}/>
    </LandingPageLayout>
    <ScrollElement name="vehicleType">
      <LandingPageVehicleType />
    </ScrollElement>
  </>);
}

export default LandingPage;