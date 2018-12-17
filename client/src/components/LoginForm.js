import React, {Component} from "react";
import {
    Button,
    Container,
    Form,
    FormGroup,
    Input
} from 'reactstrap';

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

        console.log("Email: " + this.state.email);
        console.log("Password: " + this.state.password);

        this.props.login(this.state);
    };

    render() {
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Input
                            type="text"
                            style={{marginBottom: '2rem'}}
                            name="email"
                            placeholder="Email Address"
                            onChange={this.onChange}
                        />
                        <Input
                            type="password"
                            style={{marginBottom: '2rem'}}
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
    "email": state.email,
    "password": state.pass
});

export default connect(mapStateToProps, {login})(LoginForm);
