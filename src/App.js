import React from 'react';
import StateMap from './Map.js';
import Header from './Header.js';
import Footer from './Footer.js';
import './app.css';
import leafletPip from 'leaflet-pip'
import borderData from './Border.js'
import L from 'leaflet'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gameStart: false,
      guess: false,
      quit: false,
      lat: null,
      long: null,
      zoom: 8
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

  startGame = () => {
    let latLong = this.randomPoint()

    this.setState({
      gameStart: true,
      lat: latLong[0],
      long: latLong[1],
      zoom: 18,

    })
  }

  randomPoint = () => {
    let randomLat = this.randomLat()
    let randomLong = this.randomLong()
    let stateLayer = L.geoJson(borderData)
    let results = leafletPip.pointInLayer([randomLong, randomLat], stateLayer)
    while (results.length === 0) {
      randomLat = this.randomLat()
      randomLong = this.randomLong()
      results = leafletPip.pointInLayer([randomLong, randomLat], stateLayer)
    }

    return [randomLat, randomLong]
  }

  guess = () => {
    this.setState({

    })
  }

  quit = () => {
    this.setState({
      gameStart: false,
      guess: false,
      quit: false,
      lat: null,
      long: null,
      zoom: 8
    })
  }


  render() {
    return (
      <div id='container'>
        <Header />
        <div id='midWrapper'>
          <StateMap gameStart={this.state.gameStart} lat={this.state.lat} long={this.state.long} zoom={this.state.zoom} />
          <div id='sidebar'>
            <button className='button' disabled={this.state.gameStart} type='button' onClick={this.startGame}>Start</button>
            <button className='button' disabled={!this.props.gameStart} type='button'>Guess</button>
            <button className='button' disabled={!this.state.gameStart} type='button' onClick={this.quit}>Quit</button>
            <div id="informationContainter">
              <div id="county" className="information">County: {this.state.county}</div>
              <div id="town" className="information">Town: {this.state.town}</div>
              <div id="lat" className="information">Latitude: {this.state.lat}
              </div>
              <div id="long" className="information">Longtitude: {this.state.long}</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App