import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Form, Col, FormGroup } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';

class HeaderLogout extends Component {

    loggingOutFunction() {
        console.log("Logging out function");
        localStorage.removeItem('authtoken')
        //   this.setState({ redirectVar: true }) 
        //  console.log("this.state : ", this.state)

    }
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Todo
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <Link onClick={this.loggingOutFunction}
                        className="btn btn-info btn-lg" to="/">
                        <span class="glyphicon glyphicon-log-out"></span> Logout
          </Link>
                    {/*  <a href="#" class="btn btn-info btn-lg">
                        <span class="glyphicon glyphicon-log-out"></span> Log out
        </a>*/}
                </Nav>
            </Navbar>
        )
    }
}
export default HeaderLogout;