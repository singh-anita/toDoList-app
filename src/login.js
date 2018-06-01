import React, { Component } from 'react';
import { Button, Form, Col, FormGroup, FormControl, InputGroup, ControlLabel, Glyphicon } from "react-bootstrap";
import { Link,Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {

    componentWillMount(){
        axios.post('http://localhost:3001/login',{}, {
            headers: {
                "Authorization": localStorage.getItem('authtoken')
            }
      }
    ).then((response) =>{
      if(response.status == 200 ){
      this.setState({  redirect : true })
      }
    })
    }
    constructor(props) {
        super(props);

        this.state = {
            loginEmail: "",
            loginPassword: "",
            redirect: false  
        };
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    renderRedirect(){
        if(this.state.redirect){
            return <Redirect to='/dashboard'/>
        }
    }

    login(e) {
        console.log(e)
        e.preventDefault();
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
                     if(response.status == 200){
                           // console.log(response.data.authtoken);
                        localStorage.setItem('authtoken', (response.data.authtoken));
                this.setState({
                    redirect: true
                  })
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
                            <div><a href="#">Forgot password?</a></div>
                        </div>
                        
                        <div style={{ paddingTop: 30 }} className="panel-body" >
                            <Form horizontal>
                                <FormGroup controlId="loginEmail" style={{ marginBottom: 25 }} >
                                    <Col md={12}>
                                        <InputGroup>
                                            <InputGroup.Addon><Glyphicon glyph="user" /></InputGroup.Addon>
                                            <FormControl type="text" placeholder="username or email" value={this.state.loginEmail} onChange={(e) => { this.handleChange(e) }} />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="loginPassword" style={{ marginBottom: 25 }} >
                                    <Col md={12}>
                                        <InputGroup>
                                            <InputGroup.Addon><Glyphicon glyph="lock" /></InputGroup.Addon>
                                            <FormControl type="password" placeholder="password" value={this.state.loginPassword} onChange={(e) => { this.handleChange(e) }} />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup style={{ marginTop: 10 }}>
                                    <Col sm={12} md={12}>
                                   {this.renderRedirect()}
                                        <Button id="btn-login" bsStyle="success" onClick={(e) => this.login(e)}>Login</Button>
                                        <span style={{ marginLeft: 8 }}>OR</span>
                                        <Button style={{ marginLeft: 8 }} id="btn-flogin" bsStyle="primary">Login with Stackoverflow</Button>
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