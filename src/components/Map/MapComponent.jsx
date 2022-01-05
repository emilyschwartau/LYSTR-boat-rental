import './MapComponent.css';
import { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'


function MapComponent({ vehicleList, searchQueryLocation, handleSelectTask }) {
    const [activeMarker, setActiveMarker] = useState(null);
    const [initialLocation, setInitialLocation] = useState({ lat: '', lng: '' });

    useEffect(() => {
        reverseGeocode();
    }, []);

    const reverseGeocode = () => {

        const params = {
            key: process.env.REACT_APP_OPENCAGE_API_KEY,
            q: `${searchQueryLocation}, MN`,
            limit: 1,
            pretty: 1,
            countrycode: 'us',
        }

        opencage.geocode({ ...params })
            .then(response => {
                const result = response.results[0];
                console.log(`this is geocode result`, result);
                setInitialLocation({lat: result.geometry.lat, lng: result.geometry.lng})
            });
    }

    //geocode location searching end

    return (<>
        <Map
            //center on [lat, lng]
            center={[initialLocation?.lat, initialLocation?.lng]}
            //set zoom level
            zoom={14}
        >
            {/* Grabbing actual map design*/}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>
        contributors'
            />

            {vehicleList?.map((vehicle) =>
                <Marker
                    key={vehicle?.vehicleId}
                    position={[vehicle?.lat, vehicle?.lng]}
                    onClick={() => setActiveMarker(vehicle)}
                    // icon={customIcon}
                />)}

            {/* If there is an active marker, show pop up */}
            {activeMarker &&
                <Popup
                    // position of pop up
                    position={[
                        activeMarker?.lat,
                        activeMarker?.lng
                    ]}
                    onClose={() => setActiveMarker(null)}
                >
                    {/* Message inside the popup */}
                    <div>
                        <h2>{activeMarker?.title}</h2>
                        <button onClick={() => handleSelectTask(activeMarker)}>click me</button>
                    </div>
                </Popup>
            }
        </Map>
    </>)
}

export default MapComponent;