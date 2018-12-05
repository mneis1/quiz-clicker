import React, { Component } from 'react';
import AppNavBar from './components/AppNavbar';
import LoginForm from './components/LoginForm';
import {Container} from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
    render() {
        console.log("Try \"nehman1@umbc.edu\" \"passsword\"");
        console.log("or \"kyle.nehman@cybercrucible.com\" \"passsword\"");
        console.log("For teacher and student login responses.");


        return (
            <Provider store={store}>
                <div className="App">
                    <AppNavBar/>
                    <Container>
                        <LoginForm/>
                    </Container>
                </div>
            </Provider>
        );
    }
}

export default App;
