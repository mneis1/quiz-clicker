import React, {Component} from 'react';
import store from "../store";
import Provider from "react-redux/es/components/Provider";
import StudentView from "./StudentView";
import AppNavBar from "./AppNavbar";

class View extends Component {
    render () {
        return (
            <Provider store={store}>
                <div className="View">
                    <AppNavBar/>
                    <StudentView/>
                </div>
            </Provider>
        );
    }
}

export default View;
