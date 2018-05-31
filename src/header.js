import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Form, Col } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Todo
                    </Navbar.Brand>
            </Navbar.Header>
            </Navbar>
        )
    }
}
export default Header;