import React, { Component } from "react";
import { Button, Form, Col, FormGroup, FormControl, HelpBlock, ControlLabel } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import Header from './header';
import axios from 'axios';
import validator from 'validator';
import {Loading }from 'react-loading-spinner';
/*import LoaderButton from "../components/LoaderButton";*/
/* <span style={{ marginLeft: 8 }}>or</span>  <div style={{borderTop:'1 solid #999',paddingTop:20}} className="form-group">*/

// function validate(email,username, password,confpsswd) {
//       return
//       (
//                 this.state.email.length === 0 &&
//                 this.state.username.length === 0 &&
//                 this.state.password.length === 0 &&
//                 this.state.confpsswd !== this.state.confpsswd
//             );
//           }
class Signup extends Component {

    componentWillMount() {

        axios.post('http://localhost:3001/signup', {}, {
            headers: {
                "Authorization": localStorage.getItem('authtoken')
            }
        }).then(
            (response) => {
                if (response.status == 200) {
                    this.setState({ redirect: true })
                }
            }
        )
    }


    state = {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        touched: false,

        isInvalidEmail: true,
        usernameLengthZero: true,
        passwordLengthZero: true,
        isPasswordMatching: false,
        disabled: true,
        canBeSubmitted: false,
        loading: false
    };

    handleEmailChange(event) {
        this.setState({ email: event.target.value, touched: true },
            () => {
                console.log("IN HERE")
                this.validateEmail();
            })
    }

    handleUserNameChange(event) {
        this.setState({ username: event.target.value, touched: true },
            () => {
                this.isUsernameLengthZero();
            })
    }

    handlePassword(event) {
        this.setState({ password: event.target.value, touched: true },
            () => {
                if (this.state.password.length === 0) {
                    this.setState({ passwordLengthZero: true })
                }
                else {
                    this.setState({ passwordLengthZero: false })
                }

                this.comparePasswords()
            })
    }

    handleConfirmPassword(event) {
        this.setState({ confirmPassword: event.target.value, touched: true },
            () => {
                this.comparePasswords()
            })
    }

    isUsernameLengthZero() {
        var alphaExp = /^[a-zA-Z]+$/;
        if (!(this.state.username.length === 0) && (this.state.username.match(alphaExp))) {
            this.setState({ usernameLengthZero: false },
                () => {
                    this.allSet()
                })
        }
        else {

            this.setState({ usernameLengthZero: true },
                () => {
                    this.allSet()
                })
        }
    }

    comparePasswords() {
        // validator.equals(this.state.password, this.state.confirmPassword)
        if (validator.equals(this.state.password, this.state.confirmPassword)) {
            console.log("same")
            this.setState({ isPasswordMatching: true },
                () => {
                    this.allSet()
                })
        }
        else {
            console.log("different")
            this.setState({ isPasswordMatching: false },
                () => {
                    this.allSet()
                })
        }
    }

    validateEmail() {
        if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test((this.state.email))) {
            this.setState({ isInvalidEmail: false },
                () => {
                    this.allSet()
                })
        }
        else {
            this.setState({ isInvalidEmail: true },
                () => {
                    this.allSet()
                })
        }
    }


    /* WHEN EVERYTHING IS RIGHT, EXECUTE THIS.... */
    allSet() {
        console.log("invalidEmail : ", this.state.isInvalidEmail,
            "passwordLengthZero : ", this.state.passwordLengthZero,
            "username:", this.state.usernameLengthZero,
            "match? : ", this.state.isPasswordMatching);

        if (!this.state.isInvalidEmail && !this.state.passwordLengthZero && !this.state.usernameLengthZero &&
            this.state.isPasswordMatching) {
            this.setState({ disabled: false }, function () {
                console.log('callbacked ', this.state)

            })
        }
        else {
            console.log("all matched else ", this.state);
            this.setState({ disabled: true }, function () {
                console.log('callbacked ', this.state)

            })
        }
    }

    renderRedirect() {
        if (this.state.redirect) {
            this.props.history.push('/dashboard')
        }
    }

    handleSubmit(e) {

      //  alert("huhuhu")

        if (!this.allSet) {
            e.preventDefault();
            return;
        }


        var obj = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        };
        // console.log("TOKEN IN SIGNUP : ", localStorage.getItem("authtoken"))
        /*Posting Data From React to the Node Service*/
        axios.post('http://localhost:3001/signup', obj, {
            headers: {
                "Authorization": localStorage.getItem('authtoken')
            }
        })
            .then((response) => {
                console.log(response.data.authtoken);
                // if(response.status == 200){

                if (!localStorage.getItem('authtoken')) {
                    //save it in localStorage
                    localStorage.setItem('authtoken', (response.data.authtoken));
                    console.log("Saved in localStorage ");
                    console.log("RESPONSE : ", response)
                    setTimeout(() => {
                        this.setState
                        ({
                            loading: true,
                            redirect: true
                        })
                    }, 5000)

                    // this.setState({
                    //     redirect: true,
                    //     loading:true
                    // })
                }
            })
            .catch(function (error) {
                console.log(error.response)
            });
    }

    render() {
        return (
            <div className="container">
                <Header />
                {/* { this.allSet() } */}
                <div id="signupbox" style={{ marginTop: 50 }} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="panel-title">Sign Up</div>
                            <div><Link to="/login">Sign In</Link></div>
                        </div>
                        <div className="panel-body" >
                            <Form horizontal style={{ marginTop: 50 }}>
                                <FormGroup controlId="email">
                                    <Col componentClass={ControlLabel} md={3}>
                                        Email
                                    </Col>
                                    <Col md={9}>
                                        <FormControl onChange={this.handleEmailChange.bind(this)} name="email" type="email" placeholder="Email" value={this.state.email} />
                                        {(this.state.isInvalidEmail && this.state.touched) ? <div>Invalid email format!</div> : null}
                                    </Col>

                                </FormGroup>
                                <FormGroup controlId="username">
                                    <Col componentClass={ControlLabel} md={3}>
                                        User Name
                                    </Col>
                                    <Col md={9}>
                                        <FormControl onChange={this.handleUserNameChange.bind(this)} name="username" type="text" placeholder="Username" value={this.state.username} />
                                        {(this.state.usernameLengthZero && this.state.touched) ? <div>Set some username...</div> : null}
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="password">
                                    <Col componentClass={ControlLabel} md={3}>
                                        Password
                                    </Col>
                                    <Col md={9}>
                                        <FormControl onChange={this.handlePassword.bind(this)} name="password" type="password" placeholder="Password" value={this.state.password} />
                                        {(this.state.passwordLengthZero && this.state.touched) ? <div>Password cannot be empty...</div> : null}
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="confpsswd">
                                    <Col componentClass={ControlLabel} md={3}>
                                        Confirm Password
                                    </Col>
                                    <Col md={9}>
                                        <FormControl onChange={this.handleConfirmPassword.bind(this)} name="confpsswd" type="password" placeholder="Confirm Password" value={this.state.confpsswd} />
                                        {(!this.state.isPasswordMatching && this.state.touched) ? <div>Passwords donot match!</div> : null}
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col smOffset={3} mdOffset={3} sm={9} md={6}>
                                        {this.renderRedirect()}
                                        <Button type="button" bsStyle="success" disabled={this.state.disabled} onClick={(e) => this.handleSubmit(e)}>
                                            <i class="fa fa-circle-o-notch fa-spin"></i>Sign Up</Button>
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