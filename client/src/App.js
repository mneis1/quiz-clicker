import React, { Component } from 'react';
import AppNavBar from './components/AppNavbar';
import UserList from './components/UserList';
import UserModal from './components/UserModal'
import {Container} from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <AppNavBar/>
                    <Container>
                        <UserModal/>
                        <UserList/>
                    </Container>
                </div>
            </Provider>
        );
    }
}

export default App;
