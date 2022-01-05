import './MapComponent.css';
import { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'


function MapComponent({ searchResultsList, searchQueryLocation }) {
    const [activeMarker, setActiveMarker] = useState(null);
    const [initialLocation, setInitialLocation] = useState({ lat: '', lng: '' });

    useEffect(() => {
        reverseGeocode();
    }, []);


    //geocode location searching start
    const handleClick = () => {
        reverseGeocode();
    }

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
            center={[initialLocation.lat, initialLocation.lng]}
            //set zoom level
            zoom={15}
        >
            {/* Grabbing actual map */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>
        contributors'
            />

            {searchResultsList?.map((searchItem) =>
                <Marker
                    key={searchItem.vehicleId}
                    position={[searchItem.lat, searchItem.lng]}
                    onClick={() => setActiveMarker(searchItem)}
                    // icon={customIcon}
                />)}

            {/* If there is an active marker, show pop up */}
            {activeMarker &&
                <Popup
                    // position of pop up
                    position={[
                        activeMarker.lat,
                        activeMarker.lng
                    ]}
                    onClose={() => setActiveMarker(null)}
                >
                    {/* Message inside the popup */}
                    <div>
                        <h2>{activeMarker?.title}</h2>
                    </div>
                </Popup>
            }
        </Map>
    </>)
}

export default MapComponent;