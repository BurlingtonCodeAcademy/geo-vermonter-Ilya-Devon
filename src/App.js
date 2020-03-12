import React from 'react';
import Map from './Map.js';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import Footer from './Footer.js';
import './app.css';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <div id='container'>
        <Header />
        <div id='midWrapper'>
        <Map />
        <Sidebar />
        </div>
        <div id="footer-container">
          <Footer />
        </div>
      </div>
    )
  }
}

export default App