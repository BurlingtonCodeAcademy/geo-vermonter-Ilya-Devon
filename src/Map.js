import React from 'react';
import { Map, TileLayer, GeoJSON, Marker } from "react-leaflet";
import "./map.css";
import borderData from './Border.js';


class StateMap extends React.Component {
    constructor(props){
        super(props) 

        this.state = {
            
        }
    }

    

    componentDidMount() {
        
    }

    render() {
        return (
            <Map center={[this.props.lat, this.props.long]} zoom={this.props.zoom} zoomControl={false} boxZoom={false} doubleClickZoom={false} dragging={false} keyboard={false} scrollWheelZoom={false} touchZoom={false}>
                <TileLayer
                    url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                />
                <GeoJSON key='my-geoJson' data={borderData} />

                { this.props.gameStart ?  <Marker position={[this.props.lat, this.props.long]}/> : <div></div> }

               
            </Map>
        );
    }
}

export default StateMap