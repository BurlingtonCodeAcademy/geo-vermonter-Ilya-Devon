import React from 'react';
import StateMap from './Map.js';
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
          <StateMap />
          <Sidebar />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App