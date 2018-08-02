import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';


class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            user: null,
            signupFormVisible: false,
        };
    }
    render() {
        return (
        <div className="login-form">
            {this.state.user ? (
                <div className="user">
                    <span className="username">User: {this.state.user.username}</span>
                    <button onClick={this.logout}>Log Out</button>
                </div>
            ) : (
                <aside className="aside aside-2">
                    <button className="Login-tab" onClick={this.showSignupForm} disabled={this.state.signupFormVisible}>Login</button>
                    <button className="Login-tab" onClick={this.showLoginForm} disabled={!this.state.signupFormVisible}>Register</button>
                    {this.state.signupFormVisible ? (
                        <form id="registerForm" onSubmit={this.register}>
                            <div className="field">
                                <input name="registerUsername" type="text" placeholder="User Name" required />
                            </div>
                            <div className="field">
                                <input name="registerPassword" type="password" placeholder="Password" required />
                            </div>
                            <button className="loginButton" type="submit">Register</button>
                        </form>
                    ) : (
                        <form id="loginForm" onSubmit={this.login}>
                            <div className="field">
                                <input name="username" type="text" placeholder="User Name" required />
                            </div>
                            <div className="field">
                                <input name="password" type="text" placeholder="Password" required />
                            </div>
                            <button className="loginButton" type="submit">Login</button>
                        </form>
                    )}
                </aside>
            )
            }
        </div>
        );
    }
    showLoginForm = (event) => {
        this.setState({
            signupFormVisible: false,
        })
    }
    showSignupForm = (event) => {
        this.setState({
            signupFormVisible: true,
        })
    }
    register = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: '/auth/signup',
            data: {
                username: event.target.registerUsername.value,
                password: event.target.registerPassword.value,
            }
        })
        .then((res) => {
            this.setState({
                user: res.data.user,
                showSignupForm: false,
            })
            console.log(res);
        })
            .catch((res) => {
                console.log(res);
            });
    }
    login = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: '/auth/login',
            data: {
                username: event.target.username.value,
                password: event.target.password.value,
            }
        })
        .then((res) => {
            this.setState({
                user: res.data.user,
                showSignupForm: false,
            })
            console.log(res);
        })
        .catch((res) => {
            console.log(res);
        });
    }
    logout = () => {
        axios({
            method: 'get',
            url: '/auth/logout'
        })
        .then(() => {
            this.setState({
                user: null,
            })
        })
        .catch((res) => {
            console.log(res);
        });
    }
}
export default Login;