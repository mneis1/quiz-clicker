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
import {register} from '../../actions/userActions'

class RegisterForm extends Component {

    state = {
        name: null,
        email: null,
        password: null,
        password2: null,

        showPasswordError: false,
        showExistsError: false
    };

    onChange = (event) => {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        }, () => {
            if (target.name.includes("password")) {
                this.setState({
                    showPasswordError: this.state.password &&
                        this.state.password2 &&
                       (this.state.password !== this.state.password2)
                });
            }
        });
    };

    onSubmit = (event) => {
        event.preventDefault();

        if (!this.allFields()) {
            return;
        }
        this.props.register(this.state);
    };

    allFields() {
        return this.state.name && this.state.email && this.state.password & this.state.password2;
    }

    render() {
        if (this.props.success) {
            return <Redirect to='/'/>
        }

        return (
            <Container>
                {
                    this.props.showExistsError ?
                        <Alert color="warning">A user with that email already exists</Alert>
                        :
                        <div></div>
                }
                {
                    this.state.showPasswordError ?
                        <Alert color="danger">Passwords don't match!</Alert>
                        :
                        <div></div>
                }

                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Input
                            type="text"
                            style={{marginBottom: '2rem', width: "50%"}}
                            name="name"
                            placeholder="Name"
                            onChange={this.onChange}
                        />
                        <Input
                            type="text"
                            style={{marginBottom: '2rem', width: "50%"}}
                            name="email"
                            placeholder="Email Address"
                            onChange={this.onChange}
                        />
                        <Input
                            type="password"
                            style={{marginBottom: '2rem', width: "50%"}}
                            name="password"
                            placeholder="Password"
                            onChange={this.onChange}
                        />
                        <Input
                            type="password"
                            style={{marginBottom: '2rem', width: "50%"}}
                            name="password2"
                            placeholder="Confirm Password"
                            onChange={this.onChange}
                        />

                        <Button
                            color = "dark"
                            style={{marginBottom: '2rem', width: "25%"}}
                            block
                        >
                            Register
                        </Button>
                    </FormGroup>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    success: state.users.registerSuccess,
    showExistsError: state.users.userExists
});

export default connect(mapStateToProps, {register})(RegisterForm);
