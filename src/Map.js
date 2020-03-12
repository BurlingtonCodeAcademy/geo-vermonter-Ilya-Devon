import React from 'react';
import { Map, TileLayer } from "react-leaflet";
import "./app.css";

export default function Maps() {
    return (
        <Map center={[44.476218, -73.211893]} zoom={16}>
            <TileLayer
                url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
        </Map>
    );
}