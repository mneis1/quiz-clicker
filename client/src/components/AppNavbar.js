import React, { Component } from 'react';

import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

class AppNavBar extends Component {
    render() {
        return (
            <div>
                <Navbar color="dark" dark expands="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Click Ease</NavbarBrand>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/register">
                                    Signup
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default AppNavBar;