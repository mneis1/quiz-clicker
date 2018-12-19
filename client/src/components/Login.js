import React, {Component} from 'react';
import store from "../store";
import AppNavBar from "./AppNavbar";
import LoginForm from "./forms/LoginForm";
import Provider from "react-redux/es/components/Provider";

class Login extends Component {
    render () {
        return (
            <Provider store={store}>
                <div className="Login">
                    <AppNavBar/>
                    <LoginForm/>
                </div>
            </Provider>
        );
    }
}

export default Login;