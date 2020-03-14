import React from 'react';
import { Map, TileLayer, GeoJSON, Marker, Polyline } from "react-leaflet";
import "./map.css";
import borderData from './Border.js';
// import { Polyline } from 'leaflet';


class StateMap extends React.Component {
    constructor(props){
        super(props) 

        this.state = {
            
        }
    }

    render() {
        return (
            <Map center={[this.props.lat || 43.8988, this.props.long || -72.5778]} zoom={this.props.zoom} zoomControl={false} boxZoom={false} doubleClickZoom={false} dragging={false} keyboard={false} scrollWheelZoom={false} touchZoom={false}>
                <TileLayer
                    url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                />
                <GeoJSON key='my-geoJson' data={borderData} />
                <Polyline key='DrawLine' positions={[this.props.moves]} color={'red'} />
                { this.props.gameStart ?  <Marker position={[this.props.lat, this.props.long]} /> : null }
            </Map>
        );
    }
}

export default StateMap