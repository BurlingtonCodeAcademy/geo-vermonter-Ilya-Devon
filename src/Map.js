import React from 'react';
import { Map, TileLayer, GeoJSON, } from "react-leaflet";
import "./map.css";
import borderData from './Border.js'


export default function Maps() {



    return (
        <Map center={[43.8988, -72.5778]} zoom={8} zoomControl= {false} boxZoom={false} doubleClickZoom={false} dragging={false} keyboard={false} scrollWheelZoom={false} touchZoom={false}>
            <TileLayer
                url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' 
                attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            />
            <GeoJSON key='my-geoJson' data = {borderData}/>
        </Map>
    );
}