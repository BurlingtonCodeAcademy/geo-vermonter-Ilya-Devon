import React from 'react';
import { Map, TileLayer } from "react-leaflet";
import "./app.css";

export default function Maps() {
    return (
        <Map center={[44.476218, -73.211893]} zoom={8}>
            <TileLayer
                url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' 
                attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            
            />
        </Map>
    );
}