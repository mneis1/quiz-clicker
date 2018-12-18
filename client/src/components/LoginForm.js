import React, {Component} from "react";
import {
    Alert,
    Button,
    Container,
    Form,
    FormGroup,
    Input
} from 'reactstrap';

import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {login} from '../actions/userActions'

class LoginForm extends Component {

    state = {
        email: null,
        password: null
    };

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    onSubmit = (event) => {
        event.preventDefault();

        this.props.login(this.state);
    };

    render() {
        if (this.props.success) {
            return <Redirect to='/view'/>
        }

        return (
            <Container>
                {
                    this.props.registered ?
                        <Alert color="success">Registered successfully, please log in</Alert>
                        :
                        <div></div>
                }
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Input
                            type="text"
                            style={{marginBottom: '2rem', width: "75%"}}
                            name="email"
                            placeholder="Email Address"
                            onChange={this.onChange}
                        />
                        <Input
                            type="password"
                            style={{marginBottom: '2rem', width: "75%"}}
                            name="password"
                            placeholder="Password"
                            onChange={this.onChange}
                        />

                        <Button
                            color = "dark"
                            style = {{marginTop: '2rem'}}
                            block
                        >
                            Login
                        </Button>
                    </FormGroup>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    success: state.users.loginSuccess,
    registered: state.users.registerSuccess
});

export default connect(mapStateToProps, {login})(LoginForm);
