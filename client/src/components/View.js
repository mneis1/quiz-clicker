import React, {Component} from 'react';
import store from "../store";
import Provider from "react-redux/es/components/Provider";
import StudentView from "./StudentView";
import AppNavBar from "./AppNavbar";
import TeacherView from "./TeacherView";
import {verifyStudent, verifyTeacher} from "../actions/userActions";
import connect from "react-redux/es/connect/connect";

class View extends Component {
    state = {
        redirect: false,
        teacher: false
    };

    componentDidMount() {
        this.props.verifyStudent(this.props.token);
        this.props.verifyTeacher(this.props.token);
        if (!this.props.token) {
            this.setState({redirect: true});
        }
        this.props.getCourses(this.props.token);
    }

    render () {
        return (
            <Provider store={store}>
                <div className="View">

                    <AppNavBar/>
                    <StudentView/>
                    {this.state.teacher ? <TeacherView/> : <div/>}
                </div>
            </Provider>
        );
    }
}

const mapStateToProps = (state) =>({
    token: state.users.token,
    teacher: state.users.teacher
});

export default connect(mapStateToProps)(View);
