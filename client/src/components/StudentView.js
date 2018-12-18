import React, {Component} from 'react';
import ToggleModeButton from "./ToggleModeButton";
import {connect} from 'react-redux';

import {verifyStudent} from '../actions/userActions'
import {Container} from "reactstrap";
import {Redirect} from "react-router";

class StudentView extends Component {

    state = {
        redirect: false
    };

    componentDidMount() {
        this.props.verifyStudent();
        if (!this.props.token) {
            this.setState({redirect: true});
        }
    }


    render () {
        if (this.state.redirect) {
            return <Redirect to='/'/>;
        }

        return(
            <Container>
                    <ToggleModeButton/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.users.token
});

export default connect(mapStateToProps, {verifyStudent})(StudentView);
