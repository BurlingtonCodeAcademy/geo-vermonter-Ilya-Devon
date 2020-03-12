import React from 'react'
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./main.css";
import ReactDOM from 'react-dom'

class Mapping extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (

            <Map center={[44.492569, -73.2966882]} zoom={8}>
                <TileLayer
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
            </Map>

        )
    }
}

ReactDOM.render(<Mapping />, document.getElementById('root'))
