import React from 'react'
import './header.css'


class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }



//header bar that includes name and score bar
    render() {
        return (
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

