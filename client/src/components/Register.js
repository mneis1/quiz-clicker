import React, {Component} from 'react';
import store from "../store";
import AppNavBar from "./AppNavbar";
import RegisterForm from "./forms/RegisterForm";
import Provider from "react-redux/es/components/Provider";

class Register extends Component {
    render () {
        return (
            <Provider store={store}>
                <div className="Register">
                    <AppNavBar/>
                    <RegisterForm/>
                </div>
            </Provider>
        );
    }
}

export default Register;