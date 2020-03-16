// Items being imported to be used
import React from 'react'
import './header.css'

// Creating the React Component
class Header extends React.Component {
    //header bar that includes name and score bar
    render() {
        return (
            // Using props to fill in Name and Score
            <div id='header'>
                <div id='name'>
                    Name: {this.props.name}
                </div>
                <div id='score'>
                    Score: {this.props.score}
                </div>
            </div>
        )
    }
}

export default Header;

