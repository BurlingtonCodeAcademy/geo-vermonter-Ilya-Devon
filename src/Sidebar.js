import React from 'react';
import './sidebar.css';


class Sidebar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            gameStart: false,
            guess: false,
            quit: false
        }
    }

    startGame = () => {
        this.setState({
            gameStart: true
        })
        console.log(this.state.gameStart)
    }

    guess = () => {
        this.setState({
            
        })
    }

    quit = () => {
        this.setState({
            gameStart: false
        })
    }
    


    render() {
        return (
            // this.state.gameStart ? 
            // (<div>

            // </div>) 
            // : (<div>

            // </div>)

            <div id='sidebar'>
                <button className='button' disabled={this.state.gameStart} type='button' onClick={this.startGame}>Start</button>
                <button className='button' disabled={!this.state.gameStart} type='button'>Guess</button>
                <button className='button' disabled ={!this.state.gameStart} type='button' onClick={this.quit}>Quit</button>
            </div>
        )
    }
}

export default Sidebar;


