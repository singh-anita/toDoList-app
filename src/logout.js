import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Form, Col, FormGroup } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
class HeaderLogout extends Component {
    constructor(props) {
        super(props);
        this.state = {

        redirect: false  
        }
    }
    loggingOutFunction() {
       // console.log("Logging out function");
        // localStorage.removeItem('authtoken');
       axios.post('http://localhost:3001/logout', {},
        {
           headers: {
             "Authorization": localStorage.getItem('authtoken')
           }
         })
           .then( (response) => {
                    console.log("loginresponse",response.data);
                            // if (!localStorage.authtoken) {
                    if(response.status == 200){
                        console.log("Logging out function");
                          // console.log(response.data.authtoken);
                          localStorage.removeItem('authtoken');
              this.setState({
                   redirect: true
                 })
               }
           })
           .catch(function (error) {
               console.log(error.response);
           });
   }
       // localStorage.removeItem('authtoken');
        //   this.setState({ redirect: true }) 
   /* renderRedirect(){
            if (this.state.redirect) {
                this.props.history.push("/login")
                //return <Redirect to='/dashboard'/>
            }
        }*/
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