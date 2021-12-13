import * as React from 'react';
import LandingPageLayout from '../components/LandingPage/LandingPageLayout';
import LandingPageCard from '../components/LandingPage/LandingPageCard';

const backgroundImage =
  '/images/landing_bg.jpg';

function LandingPage() {
  return (
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
    <LandingPageCard />
    </LandingPageLayout>
  );
}

export default LandingPage;