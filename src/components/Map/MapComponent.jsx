import './MapComponent.css';
import { useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Typography } from '@mui/material';

function MapComponent({ vehicleList, handleSelectTask, coords }) {
  const [activeMarker, setActiveMarker] = useState(null);

  console.log(`this is vehicleList`, vehicleList);
  //geocode location searching end
  return (
    <>
      <Map
        //center on [lat, lng]
        center={[coords?.lat, coords?.lng]}
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
