import React, { Component } from 'react';
import Menu from './Menu';
import Form from './Form';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formInputs: [
                {
                    input: "normal",
                    id: "password",
                    name: "Slaptažodis",
                    type: "password",
                    value: ''
                }
            ]
        }
        this.submitLogin = this.submitLogin.bind(this);
    }

    submitLogin(ha) {
        console.log(ha);
    }

    render() {
        return (
            <div className="app-login">
                <Menu />
                <div className="app-login-container">
                    <div className="section-title">Prisijungimas</div>
                    <Form grid={false}
                          inputs={this.state.formInputs} 
                          onSubmit={this.submitLogin} />
                </div>
            </div>
        )
    }
}

export default Login;