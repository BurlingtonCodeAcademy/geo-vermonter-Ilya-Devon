// ----------------------// Imports \\------------------------------

import React from 'react';
import StateMap from '../Map/Map.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import leafletPip from 'leaflet-pip'
import borderData from '../Border/Border.js'
import L from 'leaflet'
import './app.css';

// ----------------// Creating React Component \\--------------------

class App extends React.Component {
  constructor(props) {
    super(props)

    // -----------// Defining what starting State is \\------------------

    this.state = {
      gameStart: false,
      guess: false,
      quit: false,
      lat: null,
      long: null,
      startLat: null,
      startLong: null,
      county: null,
      town: null,
      zoom: 8,
      score: 100,
      name: 'User',
      moves: [],
      modal: false,
      info: false
    }
  }

  // -----------------// Creating Random Lat/Long \\-------------------

  randomLat = (min, max) => {
    let lat = Math.random() * (45.005419 - 42.730315) + 42.730315
    return lat
  }

  randomLong = (min, max) => {
    let long = (Math.random() * (71.510225 - 73.35218) + 73.35218) * - 1
    return long
  }

  // ------// Using Random Lat/Long to drop a random Point \\--------- 

  randomPoint = () => {
    let randomLat = this.randomLat()
    let randomLong = this.randomLong()
    // Using Array of border data to create state of VT
    let stateLayer = L.geoJson(borderData)
    // Drop a pin using Leaflet Pip
    let results = leafletPip.pointInLayer([randomLong, randomLat], stateLayer)
    // Loop that tries a new point if starting point is outside Pip 
    while (results.length === 0) {
      randomLat = this.randomLat()
      randomLong = this.randomLong()
      results = leafletPip.pointInLayer([randomLong, randomLat], stateLayer)
    }
    // Return point inside State of VT
    return [randomLat, randomLong]
  }

  // ---------------------// Directional Controls \\----------------------

  north = () => {
    // Take Moves out of this.state 
    const { moves } = this.state
    // Assign new Point and create a new Array 
    let newLat = this.state.lat + .002
    const newMoves = moves.concat([[newLat, this.state.long]])
    // Set State 
    this.setState({
      lat: newLat,
      score: this.state.score - 1,
      moves: newMoves
    })
  }


  east = () => {
    // Take moves out of this.state
    const { moves } = this.state
    // Assign new point and create a new array
    let newLong = this.state.long + .0025
    const newMoves = moves.concat([[this.state.lat, newLong]])
    // set state
    this.setState({
      long: newLong,
      score: this.state.score - 1,
      moves: newMoves
    }
    )
  }

  south = () => {
    // Take moves out of this.state
    const { moves } = this.state
    // Assign new point and create a new array
    let newLat = this.state.lat - .002
    const newMoves = moves.concat([[newLat, this.state.long]])
    // Set state
    this.setState({
      lat: newLat,
      score: this.state.score - 1,
      moves: newMoves
    }
    )
  }

  west = () => {
    // Take moves out of this.state
    const { moves } = this.state
    // Assign new point and create a new array
    let newLong = this.state.long - .0025
    const newMoves = moves.concat([[this.state.lat, newLong]])
    // Set state
    this.setState({
      long: newLong,
      score: this.state.score - 1,
      moves: newMoves
    }
    )
  }

  returnButton = () => {
    // Take moves out of this.state
    const { moves } = this.state
    // Assign new point and create a new array
    let startPoint = moves[0]
    let newMoves = moves.concat([startPoint])
    // Set state
    this.setState({
      lat: startPoint[0],
      long: startPoint[1],
      moves: newMoves
    })
  }

  // ---------------------// Start Game Function \\----------------------

  startGame = async () => {
    // Define your random starting point
    let latLong = this.randomPoint()
    // Take moves out of this.state
    const { moves } = this.state
    // Create a new array with random starting point in it
    const newMoves = moves.concat(latLong)
    // Do a fetch to get the town information
    let info = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latLong[0]}&lon=${latLong[1]}`)
      .then(response => response.json())
      .then(jsonObj => jsonObj)
    // Set the state using this information
    this.setState({
      moves: [newMoves],
      gameStart: true,
      lat: latLong[0],
      long: latLong[1],
      startLat: latLong[0],
      startLong: latLong[1],
      zoom: 18,
      county: info.address.county,
      town: info.address.hamlet || info.address.village || info.address.town || info.address.city,
      info: false
    })
  }
  // Method for Quit game
  quit = () => {
    // Setting the state
    this.setState({
      gameStart: false,
      guess: false,
      quit: false,
      lat: null,
      long: null,
      startLat: null,
      startLong: null,
      county: this.state.county,
      town: this.state.town,
      zoom: 8,
      moves: [],
      modal: false,
    })
  }

  // Method for guess button
  guess = () => {
    this.setState({
      modal: true,
    })
  }

  // Method for Cancel button
  cancel = () => {
    this.setState({
      modal: false,
    })
  }

  // Method for a Winning guess
  winning = () => {
    let winMessage = document.getElementById("winMessage")
    winMessage.textContent = "You Win!"
    this.setState({
      score: this.state.score + 50,
      county: this.state.county,
      info: true
    })
  }

  // Method for an incorrect guess
  losing = () => {
    let winMessage = document.getElementById("winMessage")
    winMessage.textContent = "Try Again"
    this.setState({
      score: this.state.score - 10,
      modal: false
    })
  }

  // Submitting your guess
  submit = () => {
    let dropdownOptions = document.getElementById("dropbutton")
    // Ternary operator that compares your guess to the state
    this.state.county === dropdownOptions.value ?
      this.winning() : this.losing()
  }

  // ----------------------// What gets Rendered \\-------------------
  render() {
    return (
      // Outer container for everything
      <div id='container'>
        {/* Importing Header */}
        <Header score={this.state.score} name={this.state.name} />
        <div id='midWrapper'>
          {/* Importing State map and sending this.state info to Map */}
          <StateMap gameStart={this.state.gameStart} lat={this.state.lat} long={this.state.long} startLat={this.state.startLat} startLong={this.state.startLong} zoom={this.state.zoom} moves={this.state.moves} />
          {/* Container for the Modal */}
          <div id="modalContainer" hidden={!this.state.modal}>
            <div id='modalWrapper'>
              <div id="modalHeader">What county are we in?</div>
              <div id="winMessage"></div>
              <div className="dropdown">
                {/* Dropdown menu with Options */}
                <select id="dropbutton">
                  <option value="Addison County">Addison County</option>
                  <option value="Bennington County">Bennington County</option>
                  <option value="Caledonia County">Caledonia County</option>
                  <option value="Chittenden County">Chittenden County</option>
                  <option value="Essex County">Essex County</option>
                  <option value="Franklin County">Franklin County</option>
                  <option value="Grand Isle County">Grand Isle County</option>
                  <option value="Lamoille County">Lamoille County</option>
                  <option value="Orange County">Orange County</option>
                  <option value="Orleans County">Orleans County</option>
                  <option value="Rutland County">Rutland County</option>
                  <option value="Washington County">Washington County</option>
                  <option value="Windham County">Windham County</option>
                  <option value="Windsor County">Windsor County</option>
                </select>
              </div>
            </div>
            {/* Buttons for Guessing or Canceling */}
            <button className="button" type="button" onClick={this.submit}>Guess</button>
            <button className="button" type="button" onClick={this.cancel}>Cancel</button>
          </div>
          {/* Side Bar Information */}
          <div id='sidebar'>
            <div id='buttons'>
              {/* Buttons for controlling the start of game */}
              <button className='button' disabled={this.state.gameStart} type='button' onClick={this.startGame}>Start</button>
              <button className='button' disabled={!this.state.gameStart} type='button' onClick={this.guess}>Guess</button>
              <button className='button' disabled={!this.state.gameStart} type='button' onClick={this.quit}>Give Up</button>
            </div>
            {/* Information section of the Sidebar */}
            <div id="informationContainter">
              <div id="county" className="information">County: {this.state.info ?  this.state.county : '???'}</div>
              <div id="town" className="information">Town: {this.state.info ? this.state.town : '???'}</div>
              <div id="Lat" className="information">Lat: {this.state.info ? this.state.startLat : '???'}</div>
              <div id="Long" className="information">Long: {this.state.info ? this.state.startLong : '???'}</div>
            </div>
            {/* Buttons for Controlling Map movements */}
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
        {/* Importing the Footer */}
        <Footer />
      </div>
    )
  }
}

export default App