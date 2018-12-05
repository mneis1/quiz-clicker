import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

import {connect} from 'react-redux';
import {addUser} from '../actions/userActions'


class UserModal extends Component {
    state = {
        modal: false,
        name: ''
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };

        console.log("Test");
        this.props.addUser(newUser);
        this.toggle();
    };

    render() {
        return (
            <div className={styles.center}>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >Create User
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Create a new user
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="user">
                                    User
                                </Label>
                                <Input
                                    type="text"
                                    style={{marginBottom: '2rem'}}
                                    name="name"
                                    id="user"
                                    placeholder="Name"
                                    onChange={this.onChange}
                                />
                                <Input
                                    type="text"
                                    style={{marginBottom: '2rem'}}
                                    name="email"
                                    id="user"
                                    placeholder="Email Address"
                                    onChange={this.onChange}
                                />
                                <Input
                                    type="text"
                                    style={{marginBottom: '2rem'}}
                                    name="password"
                                    id="user"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                />

                                <Button
                                    color = "dark"
                                    style = {{marginTop: '2rem'}}
                                    block
                                >
                                    Create
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }


}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, {addUser})(UserModal);