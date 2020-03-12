import React from 'react'

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: 'User',
            score: '100'
        }
    }



//header bar that includes name and score bar
    render() {
        return (
            <div id='header'>
                <div id='name'>
                   Name: {this.state.name}
                </div>
                <div id='score'>
                    Score: {this.state.score}
                </div>
            </div>
        )
    }

}

export default Header;

