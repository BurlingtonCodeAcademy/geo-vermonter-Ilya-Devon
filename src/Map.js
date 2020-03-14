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
<<<<<<< HEAD
=======
            <ErrorBoundary>
>>>>>>> 5ff8f51cb0c3edde840a49e3b9074d238ffcc40f
            <Map center={[this.props.lat || 43.8988, this.props.long || -72.5778]} zoom={this.props.zoom} zoomControl={true} boxZoom={true} doubleClickZoom={true} dragging={true} keyboard={true} scrollWheelZoom={true} touchZoom={true}>
                <TileLayer
                    url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                />
                <GeoJSON key='my-geoJson' data={borderData} />
                <Polyline key='DrawLine' positions={[this.props.moves]} color={'red'} />
                { this.props.gameStart ?  <Marker position={[this.props.lat, this.props.long]} /> : null }
            </Map>
            </ErrorBoundary>
        );
    }
}

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.error(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
  }

export default StateMap