import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';
class HeaderLogout extends Component {
    constructor(props) {
        super(props);
    }
    loggingOutFunction() {

        axios.post('http://localhost:3001/logout', {},
            {
                headers: {
                    "Authorization": localStorage.getItem('authtoken')
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem('authtoken');
                    console.log("Logging out function");
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });
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
                        className="btn btn-info btn-lg" to="/login">
                        <span className="glyphicon glyphicon-log-out"></span>Logout
                    </Link>
                </Nav>
            </Navbar>
        )
    }
}
export default HeaderLogout;