import React from 'react';
import './footer.css';

class Footer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: 'Name',
            email: 'Email',
            message: 'message'
        }
    }


    render() {
        return (
            <div id='footer'>
                <div id='name' placeholder='Name'>
                    Name: {this.state.name}
                </div>
                <div id='email' placeholder='Email'>
                    Email: {this.state.email}
                </div>
                <div id='message' placeholder='Message'>
                    Message: {this.state.message}
                </div>
            </div >
        )
    }
}

export default Footer;