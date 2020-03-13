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
    }

    guess = () => {
        this.setState({
            
        })
    }

    quit = () => {
        this.setState({
            quit: true
        })
    }
    


    render() {
        return (
            <div id='sidebar'>
                <button class='button' type='button' onClick={this.startGame}>Start</button>
                <button class='button' type='button'>Guess</button>
                <button class='button' type='button'>Quit</button>
            </div>
        )
    }
}

export default Sidebar;


