import './MapComponent.css';
import { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Typography } from '@mui/material';
import opencage from 'opencage-api-client';
import { useDispatch } from 'react-redux';

function MapComponent({ vehicleList, searchQuery, handleSelectTask }) {
    const dispatch = useDispatch();
    const [activeMarker, setActiveMarker] = useState(null);
    const [initialLocation, setInitialLocation] = useState({ lat: '', lng: '' });

    useEffect(() => {
        searchLocationGeocode();
        // dispatch({ type: `FETCH_SEARCH_CITY_COORDS`, payload: searchQuery.location });
    }, []);

  const searchLocationGeocode = () => {
    const params = {
      key: process.env.REACT_APP_OPENCAGE_API_KEY,
      q: `${searchQuery.location}, MN`,
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

    
    console.log(`this is vehicleList`, vehicleList);
  //geocode location searching end
    return (<>
        <Map
            //center on [lat, lng]
            center={[initialLocation?.lat, initialLocation?.lng]}
            //set zoom level
            zoom={9}
        >
            {/* Grabbing actual map design*/}
            <TileLayer
                url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
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
