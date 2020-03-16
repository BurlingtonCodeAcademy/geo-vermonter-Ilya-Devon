// Items being imported to be used
import { Map, TileLayer, GeoJSON, Marker, Polyline } from "react-leaflet";
import borderData from '../Border/Border.js';
import React from 'react';
import "./map.css";

// Creating the React compontent for Map

class StateMap extends React.Component {
  // What gets rendered to the page
  render() {
    return (
      // Error Boundry to help trouble shooting
      <ErrorBoundary>
        {/* Map being imported from Leaflet */}
        <Map center={[this.props.lat || 43.8988, this.props.long || -72.5778]} zoom={this.props.zoom} zoomControl={false} boxZoom={false} doubleClickZoom={false} dragging={false} keyboard={false} scrollWheelZoom={false} touchZoom={false}>
          {/* Tile layer that is used on the map */}
          <TileLayer
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          />
          {/* GeoJSON to help create the shape of VT */}
          <GeoJSON key='my-geoJson' data={borderData} />
          {/* Polyline for drawing movements */}
          <Polyline key='DrawLine' positions={[this.props.moves]} color={'red'} />
          {/* Ternary operator for dropping marker at start of game */}
          {this.props.gameStart ? <Marker position={[this.props.startLat, this.props.startLong]} /> : null}
        </Map>
      </ErrorBoundary>
    );
  }
}

// Creating React component for Error Boundry
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