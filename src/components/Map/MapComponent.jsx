import './MapComponent.css';
import { useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'


function MapComponent() {
    const [activeMarker, setActiveMarker] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    const current = {
        lat: 44.978429,
        lng: -93.263523
    }

    //geocode location searching start
    const handleClick = () => {
        reverseGeocode();
    }

    const reverseGeocode = () => {

        const params = {
            key: '23b13dee192a480db9509915a88bc50a',
            q: searchInput,
            limit: 1,
            pretty: 1,
            countrycode: 'us',
        }

        opencage.geocode({ ...params })
            .then(response => {
                const result = response;
                console.log(result);
                setSuggestions(response.results);
            });
    }

    //geocode location searching end


    console.log(suggestions)

    return (<>
        <p>map</p>

        <Map
            //center on [lat, lng]
            center={[44.978429, -93.263523]}
            //set zoom level
            zoom={15}
        >
            {/* Grabbing actual map */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>
        contributors'
            />

            <Marker
                //position=[lat, lng]
                position={[
                    current.lat,
                    current.lng
                ]}
                //onclick function
                onclick={() => setActiveMarker(current)}
                //change icon to object
                // icon={boatIcon}
            />

            {/* If there is an active marker, show pop up */}
            {activeMarker &&
                <Popup
                    // position of pop up
                    position={[
                        current.lat,
                        current.lng
                    ]}
                    onClose={() => setActiveMarker(null)}
                >
                    {/* Message inside the popup */}
                    <div>
                        <h2>POPUP?</h2>
                    </div>
                </Popup>
            }
        </Map>
    </>)
}

export default MapComponent;