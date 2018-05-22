import React, { Component } from "react";
import { Button, Form, Col, FormGroup, FormControl, HelpBlock, ControlLabel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';
//disabled={!this.validateForm()}
/*import LoaderButton from "../components/LoaderButton";*/
/* <span style={{ marginLeft: 8 }}>or</span>  <div style={{borderTop:'1 solid #999',paddingTop:20}} className="form-group">*/
class Signup extends Component {
    //  isLoading: false,  newUser: null
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            username: "",
            password: "",
            confpsswd: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    validateForm() {
        return
        (
            this.state.email.length > 0 &&
            this.state.username.length > 0 &&
            this.state.password.length === this.state.confpsswd.length
        );
        //   this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }
    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

     handleSubmit(e){
        // console.log(e)
        var obj = {
            "email":this.state.email,
            "username":this.state.username,
            "password":this.state.password
         };
       // console.log(obj)
        /*Posting Data From React to the Node Service*/
        axios.post('http://localhost:3001/signup', obj)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return (
            <div className="container">

                <div id="signupbox" style={{ marginTop: 50 }} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="panel-title">Sign Up</div>
                            <div><Link to="./">Sign In</Link></div>
                        </div>
                        <div className="panel-body" >
                            <Form horizontal style={{ marginTop: 50 }}>
                                <FormGroup controlId="email">
                                    <Col componentClass={ControlLabel} md={3}>
                                        Email
                                    </Col>
                                    <Col md={6}>
                                        <FormControl type="email" placeholder="Email" value={this.state.email} onChange={(e) => { this.handleChange(e) }} />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="username">
                                    <Col componentClass={ControlLabel} md={3}>
                                        User Name
                                    </Col>
                                    <Col md={6}>
                                        <FormControl type="text" placeholder="Username" value={this.state.username} onChange={(e) => { this.handleChange(e) }} />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="password">
                                    <Col componentClass={ControlLabel} md={3}>
                                        Password
                                    </Col>
                                    <Col md={6}>
                                        <FormControl type="password" placeholder="Password" value={this.state.password} onChange={(e) => { this.handleChange(e) }} />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="confpsswd">
                                    <Col componentClass={ControlLabel} md={3}>
                                        Confirm Password
                                    </Col>
                                    <Col md={6}>
                                        <FormControl type="password" placeholder="Confirm Password" value={this.state.confpsswd} onChange={(e) => { this.handleChange(e) }} />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col smOffset={3} mdOffset={3} sm={9} md={9}>
                                        <Button type="button" bsStyle="success" onClick={ (e) =>this.handleSubmit(e) }><i className="icon-hand-right"></i>Sign Up</Button>
                                        <span style={{ marginLeft: 8 }}> OR </span>
                                        <Button type="submit" bsStyle="primary">Sign Up with Stackoverflow</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

export default Signup;