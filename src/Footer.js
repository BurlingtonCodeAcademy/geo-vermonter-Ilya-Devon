import React from 'react';
import './footer.css';

class Footer extends React.Component {
    render() {
        return (
            <div id='footer'>
                <div id='name' placeholder='Name'>
                    Name: Billy Bob Joe
                </div>
                <div id='email' placeholder='Email'>
                    Email: BillyBobJoe@Email.com
                </div>
                <div id='message' placeholder='Message'>
                    Message: Thanks for playing!
                </div>
            </div >
        )
    }
}

export default Footer;