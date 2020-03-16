import React from 'react';
import StateMap from '../Map/Map.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import './app.css';
import leafletPip from 'leaflet-pip'
import borderData from '../Border/Border.js'
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
      startLat: null,
      startLong: null,
      county: null,
      town: null,
      zoom: 8,
      score: 100,
      name: 'User',
      moves: [],
      modal: false,
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
      score: this.state.score - 1,
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
      score: this.state.score - 1,
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
      score: this.state.score - 1,
      moves: newMoves
    }
    )
  }

  returnButton = () => {
    const { moves } = this.state
    let startPoint = moves[0]
    let newMoves = moves.concat([startPoint])
    this.setState({
      lat: startPoint[0],
      long: startPoint[1],
      moves: newMoves
    })
  }

  startGame = async () => {
    let latLong = this.randomPoint()
    const { moves } = this.state
    const newMoves = moves.concat(latLong)
    let info = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latLong[0]}&lon=${latLong[1]}`)
      .then(response => response.json())
      .then(jsonObj => jsonObj)
    this.setState({
      moves: [newMoves],
      gameStart: true,
      lat: latLong[0],
      long: latLong[1],
      startLat: latLong[0],
      startLong: latLong[1],
      zoom: 18,
      county: info.address.county,
      town: info.address.hamlet || info.address.village || info.address.town || info.address.city
    })
    console.log(this.state.county)
  }

  quit = () => {
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

  guess = () => {
    this.setState({
      modal: true,
    })
  }

  cancel = () => {
    this.setState({
      modal: false,
    })
  }

  winning = () => {
    let winMessage = document.getElementById("winMessage")
    winMessage.textContent = "You Win!"
    this.setState({
      score: this.state.score + 50,
      county: this.state.county,
    })
  }

  losing = () => {
    let winMessage = document.getElementById("winMessage")
    winMessage.textContent = "Try Again"
    this.setState({
      score: this.state.score - 10,
      modal: false
    })
  }

  submit = () => {
    let dropdownOptions = document.getElementById("dropbutton")

    this.state.county === dropdownOptions.value ?
      this.winning() : this.losing()
  }

  render() {
    return (
      <div id='container'>
        <Header score={this.state.score} name={this.state.name} />
        <div id='midWrapper'>
          <StateMap gameStart={this.state.gameStart} lat={this.state.lat} long={this.state.long} startLat={this.state.startLat} startLong={this.state.startLong} zoom={this.state.zoom} moves={this.state.moves} />
          <div id="modalContainer" hidden={!this.state.modal}>
            <div id='modalWrapper'>
              <div id="modalHeader">What county are we in?</div>
              <div id="winMessage"></div>
              <div className="dropdown">
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
            <button className="button" type="button" onClick={this.submit}>Guess</button>
            <button className="button" type="button" onClick={this.cancel}>Cancel</button>
          </div>
          <div id='sidebar'>
            <div id='buttons'>
              <button className='button' disabled={this.state.gameStart} type='button' onClick={this.startGame}>Start</button>
              <button className='button' disabled={!this.state.gameStart} type='button' onClick={this.guess}>Guess</button>
              <button className='button' disabled={!this.state.gameStart} type='button' onClick={this.quit}>Give Up</button>
            </div>
            <div id="informationContainter">
              <div id="county" className="information">County: {this.state.gameStart ? '???' : this.state.county}</div>
              <div id="town" className="information">Town: {this.state.gameStart ? '???' : this.state.town}</div>
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