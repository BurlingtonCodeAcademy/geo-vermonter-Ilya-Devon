import React from 'react';
import { Map, TileLayer, GeoJSON, } from "react-leaflet";
import "./map.css";
import borderData from './Border.js';


class StateMap extends React.Component {
    constructor(props){
        super(props) 

        this.state = {
            lat: this.randomLat(),
            long: this.randomLong()
        }
    }

    randomLat = (min, max) => {
        let lat = Math.random() * (45.005419 - 42.730315) + 42.730315
        return lat
    }

    randomLong = (min, max) => {
        let long = (Math.random() * (71.510225 - 73.35218) + 73.35218) * - 1
        return long
    }

    componentDidMount() {
        console.log(this.state.lat, this.state.long)
    }

    render() {
        return (
            <Map center={[43.8988, -72.5778]} zoom={8} zoomControl={false} boxZoom={false} doubleClickZoom={false} dragging={false} keyboard={false} scrollWheelZoom={false} touchZoom={false}>
                <TileLayer
                    url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                />
                <GeoJSON key='my-geoJson' data={borderData} />
            </Map>
        );
    }
}

export default StateMap