import React, { Component } from 'react';

import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

import {connect} from 'react-redux';
import {logout} from '../actions/userActions'

class AppNavBar extends Component {
    render() {
        let navLink = (
            <NavLink href="/register">
                Signup
            </NavLink>
        );
        console.log("Rendering");
        if (this.props.token) {
            navLink = (
                <NavLink href="/">
                    Logout
                </NavLink>
            );
        }

        return (
            <div>
                <Navbar color="dark" dark expands="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Click Ease</NavbarBrand>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {navLink}
                            </NavItem>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.users.token
});

export default connect(mapStateToProps, {logout})(AppNavBar);
