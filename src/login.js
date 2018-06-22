import React, { Component } from 'react';
import { Button, Form, Col, FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

class Login extends Component {

    // componentWillMount(){
    //     axios.post('http://localhost:3001/login',{}, {
    //         headers: {
    //             "Authorization": localStorage.getItem('authtoken')
    //         }
    //   }
    // ).then((response) =>{
    //   if(response.status == 200 ){
    //   this.setState({  redirect : true })
    //   }
    // })
    // }
    constructor(props) {
        super(props);

        this.state = {
            loginEmail: "",
            loginPassword: "",
            touched: false,
            isInvalidEmail: true,
            passwordLengthZero: true,
            disabled: true,
            loading: false
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.login = this.login.bind(this);
    }
    // handleChange(e) {
    //     this.setState({
    //         [e.target.id]: e.target.value
    //     });
    // }
    handleEmailChange(event) {
        this.setState({ loginEmail: event.target.value, touched: true },
            () => {
                console.log("IN HERE")
                this.validateEmail();
            })
    }
    handlePassword(event) {
        this.setState({  loginPassword: event.target.value, touched: true },
            () => {
                this.validatePassword();
            })
    }
    validateEmail() {
        if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test((this.state.loginEmail))) {
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
    validatePassword()
    {
        if (this.state.loginPassword.length === 0) {
            this.setState({ passwordLengthZero: true },
                () => {
                    this.allSet()
                })
        }
        else {
            this.setState({ passwordLengthZero: false },
                () => {
                    this.allSet()
                })
        }
    }
    // renderRedirect(){
    //     if(this.state.redirect){
    //         //return <Redirect to='/dashboard'/>
            
    //     }
    // }
    /* WHEN EVERYTHING IS RIGHT, EXECUTE THIS.... */
    allSet() {
        console.log("invalidEmail : ", this.state.isInvalidEmail,
            "passwordLengthZero : ", this.state.passwordLengthZero);

        if (!this.state.isInvalidEmail && !this.state.passwordLengthZero) {
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

    login(e) {
        this.setState({loading: true})
        if (!this.allSet) {
            e.preventDefault();
            return;
        }
        var userobj = {
            loginEmail: this.state.loginEmail,
            loginPassword: this.state.loginPassword
        };
         console.log(userobj)
        /*Posting Data From React to the Node Service*/
        axios.post('http://localhost:3001/login', userobj,
         {
            headers: {
              "Authorization": localStorage.getItem('authtoken')
            }
          })
            .then( (response) => {
                     console.log("loginresponse",response);
                             // if (!localStorage.authtoken) {
                     if(response.status === 200){
                           // console.log(response.data.authtoken);
                        localStorage.setItem('authtoken', (response.data.authtoken));
                        this.props.history.push('/dashboard')
                }
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }
    render() {
        return (
            <div className="container">
                <div id="loginbox" style={{ marginTop: 50 }} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                    <div className="panel panel-info" >
                        <div className="panel-heading">
                            <div className="panel-title">Sign In</div>
                            {/* <div><a href="#">Forgot password?</a></div> */}
                        </div>
                        
                        <div style={{ paddingTop: 30 }} className="panel-body" >
                            <Form horizontal>
                                <FormGroup controlId="loginEmail" style={{ marginBottom: 25 }} >
                                    <Col md={12}>
                                        <InputGroup>
                                            <InputGroup.Addon><Glyphicon glyph="user" /></InputGroup.Addon>
                                            <FormControl type="text" placeholder="Enter Email" value={this.state.loginEmail} onChange={(e) => { this.handleEmailChange(e) }} />
                                        </InputGroup>
                                        {(this.state.isInvalidEmail && this.state.touched) ? <div>Invalid email format!</div> : null}
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="loginPassword" style={{ marginBottom: 25 }} >
                                    <Col md={12}>
                                        <InputGroup>
                                            <InputGroup.Addon><Glyphicon glyph="lock" /></InputGroup.Addon>
                                            <FormControl type="password" placeholder="Enter Password" value={this.state.loginPassword} onChange={(e) => { this.handlePassword(e) }} />
                                        </InputGroup>
                                        {(this.state.passwordLengthZero && this.state.touched) ? <div>Password cannot be empty...</div> : null}
                                    </Col>
                                </FormGroup>
                                <FormGroup style={{ marginTop: 10 }}>
                                    <Col sm={12} md={12}>
                                  
                                        <Button id="btn-login" bsStyle="success" onClick={(e) => this.login(e)} disabled={this.state.disabled}>
                                        {(this.state.loading) ? <span><ClipLoader size={17} color={'#123abc'}/><span style={{marginLeft:'8px'}}>Loading</span></span>:<span>Login</span>} 
                                        </Button>
                                        <span style={{ marginLeft: 8 }}>OR</span>
                                        <Button style={{ marginLeft: 8 }} id="btn-flogin" bsStyle="primary" >Login with Stackoverflow</Button>
                                    </Col>
                                </FormGroup>
                                <FormGroup style={{ marginTop: 10 }}>
                                    <Col sm={12} md={12}>
                                        <div style={{ borderTop: '1 solid#888', paddingTop: 15 }} >
                                            Don't have an account!
                           <Link to="/signup">
                                                Sign Up Here
                            </Link>
                                        </div>
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
export default Login;