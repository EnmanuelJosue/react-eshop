import React,{useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import '../styles/components/Map.css';


const Map = () => {
    const [state, setState] = useState({
        currentLocation: {lat: 38.71, lng: -0.48},
        zoom: 12
    });

    const {currentLocation, zoom} = state;

    const handleClick = (e) => {
        console.log(e);
        setState({
            ...state, 
            currentLocation: e.latlng
        })
    }
    // const map = useMapEvents({
    //     click() {
    //       map.locate()
    //     },
    //     locationfound(e) {
    //       console.log(e);
    //       setState(e.latlng)
    //       map.flyTo(e.latlng, map.getZoom())
    //     },
    //   })

    return (
        <MapContainer center={currentLocation} zoom={zoom} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker  position={currentLocation} >
                <Popup >
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>

            </Marker>
        </MapContainer>
    )
}

export default Map;