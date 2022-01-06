import './MapComponent.css';
import { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Typography } from '@mui/material';
import opencage from 'opencage-api-client';

function MapComponent({ vehicleList, searchQueryLocation, handleSelectTask }) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [initialLocation, setInitialLocation] = useState({ lat: '', lng: '' });

  useEffect(() => {
    searchLocationGeocode();
  }, []);

  const searchLocationGeocode = () => {
    const params = {
      key: process.env.REACT_APP_OPENCAGE_API_KEY,
      q: `${searchQueryLocation}, MN`,
      limit: 1,
      pretty: 1,
      countrycode: 'us',
    };

    opencage.geocode({ ...params }).then((response) => {
      const result = response.results[0];
      setInitialLocation({
        lat: result.geometry.lat,
        lng: result.geometry.lng,
      });
    });
  };

  //geocode location searching end

  return (
    <>
      <Map
        //center on [lat, lng]
        center={[initialLocation?.lat, initialLocation?.lng]}
        //set zoom level
        zoom={10}
      >
        {/* Grabbing actual map design*/}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>
        contributors'
        />

        {vehicleList?.map((vehicle) => (
          <Marker
            key={vehicle?.vehicleId}
            position={[vehicle?.lat, vehicle?.lng]}
            onClick={() => setActiveMarker(vehicle)}
            // icon={customIcon}
          />
        ))}

        {/* If there is an active marker, show pop up */}
        {activeMarker && (
          <Popup
            // position of pop up
            position={[activeMarker?.lat, activeMarker?.lng]}
            onClose={() => setActiveMarker(null)}
          >
            {/* Message inside the popup */}
            <div>
              <Typography variant="h6">{activeMarker?.title}</Typography>
              <Typography variant="body2">
                {activeMarker.year} {activeMarker.make} {activeMarker.model}
              </Typography>
              <Typography variant="body2">
                Daily Rate: ${activeMarker.dailyRate}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => handleSelectTask(activeMarker)}
              >
                learn more
              </Button>
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
}

export default MapComponent;
