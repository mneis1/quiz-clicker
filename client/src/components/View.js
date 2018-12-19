import React, {Component} from 'react';
import store from "../store";
import Provider from "react-redux/es/components/Provider";
import StudentView from "./StudentView";
import AppNavBar from "./AppNavbar";
import TeacherView from "./TeacherView";
import ToggleModeButton from "./ToggleModeButton";

class View extends Component {
    state = {
        redirect: false,
        teacher: false
    };


    render () {
        return (
            <Provider store={store}>
                <div className="View">

                    <AppNavBar/>
                    <StudentView/>
                    <TeacherView/>
                </div>
            </Provider>
        );
    }
}

export default View;
