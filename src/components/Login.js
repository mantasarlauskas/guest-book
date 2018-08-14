import React, { Component } from 'react';
import { browserHistory } from 'react-router';
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
        this.logout = this.logout.bind(this);
    }

    submitLogin(password) {
        sessionStorage.setItem('userLoggedIn', true);
        browserHistory.push('/');
    }

    logout() {
        console.log("a");
    }

    render() {
        return (
            <div className="app-login">
                <Menu onLogout={this.logout}/>
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