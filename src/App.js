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
      county: null,
      town: null,
      zoom: 8,
      score: 100,
      name: 'User',
      moves: [],
      modal: false
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

  north = () => {
    const { moves } = this.state
    let newLat = this.state.lat + .002
    const newMoves = moves.concat([[newLat, this.state.long]])
    this.setState({
      lat: newLat,
      score: this.state.score - 1,
      moves: newMoves
    })
  }

  east = () => {
    const { moves } = this.state
    let newLong = this.state.long + .0025
    const newMoves = moves.concat([[this.state.lat, newLong]])
    this.setState({
      long: newLong,
      score: this.state.score -1,
      moves: newMoves
    }
    )
  }

  south = () => {
    const { moves } = this.state
    let newLat = this.state.lat - .002
    const newMoves = moves.concat([[newLat, this.state.long]])
    this.setState({
      lat: newLat,
      score: this.state.score -1,
      moves: newMoves
    }
    )
  }

  west = () => {
    const { moves } = this.state
    let newLong = this.state.long - .0025
    const newMoves = moves.concat([[this.state.lat, newLong]])
    this.setState({
      long: newLong,
      score: this.state.score -1,
      moves: newMoves
    }
    )
  }

  returnButton = () => {
    let theMoves = this.state.moves
    let startLatLong = theMoves[0]
    this.setState({
      lat: startLatLong[0],
      long: startLatLong[1]
    })
  }

  startGame = async () => {
    let latLong = this.randomPoint()
    console.log({latLong})
    const { moves } = this.state
    console.log({moves})
    const newMoves = moves.concat(latLong)
    console.log({newMoves})
    let info = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latLong[0]}&lon=${latLong[1]}`)
      .then(response => response.json())
      .then(jsonObj => jsonObj)
    console.log({info})
    this.setState({
      moves: [newMoves],
      gameStart: true,
      lat: latLong[0],
      long: latLong[1],
      zoom: 18,
      county: info.address.county,
      town: info.address.hamlet || info.address.village || info.address.town || info.address.city
    })
    console.log("STATE: ", this.state)
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
      county: this.state.county,
      town: this.state.town,
      zoom: 8,
      moves: []
    })
  }

  render() {
    return (
      <div id='container'>
        <Header score={this.state.score} name={this.state.name} />
        <div id='midWrapper'>
          <StateMap gameStart={this.state.gameStart} lat={this.state.lat} long={this.state.long} zoom={this.state.zoom} moves={this.state.moves} />
          <div id='sidebar'>
            <div id='buttons'>
              <button className='button' disabled={this.state.gameStart} type='button' onClick={this.startGame}>Start</button>
              <button className='button' disabled={!this.state.gameStart} type='button'>Guess</button>
              <button className='button' disabled={!this.state.gameStart} type='button' onClick={this.quit}>Give Up</button>
            </div>
            <div id="informationContainter">
              <div id="county" className="information">County: {this.state.gameStart ? '???' : this.state.county}</div>
              <div id="town" className="information">Town: {this.state.gameStart ? '???' : this.state.town}</div>
              <div id="lat" className="information">Latitude: {this.state.gameStart ? '???' : this.state.lat}
              </div>
              <div id="long" className="information">Longtitude: {this.state.gameStart ? '???' : this.state.long}</div>
            </div>

            <div id="controllers">

              <button type="button" disabled={!this.state.gameStart} className="button" onClick={this.north}>North</button>

              <div id="middlecontrols">

                <button type="button" disabled={!this.state.gameStart} className="button" onClick={this.west}>West</button>

                <button type="button" disabled={!this.state.gameStart} className="smallButton" onClick={this.returnButton}>Return</button>

                <button type="button" disabled={!this.state.gameStart} className="button" onClick={this.east}>East</button>

              </div>

              <button type="button" disabled={!this.state.gameStart} className="button" onClick={this.south}>South</button>

            </div>

          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App