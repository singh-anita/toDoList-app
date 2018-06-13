import React, { Component } from "react";
import { Button, Form, Col, FormGroup, FormControl, HelpBlock, ControlLabel } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import Header from './header';
import axios from 'axios';
import validator from 'validator';
//import validator from 'validator';
//disabled={!this.validateForm()}
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
    //  isLoading: false,  newUser: null
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            username: "",
            password: "",
            confpsswd: "",
            redirect: false,
            emailmsg:'',
            usermsg:'',
            passwordmsg:'',
            confirmsg:''
           // isDisabled:false
            // errors: []
            // touched: {
            //     email: false,
            //     username:false,
            //     password: false,
            //     confpsswd: false
            //   },
        };
        
        this.handleChange = this.handleChange.bind(this);
       // this.validate=this.validate.bind(this);
    }

    //   formIsValid() {
    //     var state = this.state;

    //     if (!validator.isEmail(state.email.value)) {
    //     //   state.email.isValid = false;
    //     //   state.email.message = 'Not a valid email address';

    //       this.setState(state);
    //       return false;
    //     }

    //     //additional validation checks here...

    //     return true;
    //   }

   validateForm(email,username,password,confpsswd) {
    let formIsValid = true;
   /* var x = 
    (
        this.state.email.length > 0 &&
        this.state.username.length > 0 &&
        this.state.password.length > 0 &&
        (this.state.password === this.state.confpsswd)
     );
     
     console.log("RUNNING..... : ", x)
     return x*/
     if (!validator.isEmail(email)) {
       // var state = this.state;
       formIsValid =false;
       // state.email.isValid = false;
       email = 'Not a valid email address';
        
       // this.setState(state);
       // return false;
      }
      if(!validator.isAlpha(username)){
       // var state = this.state;
        formIsValid =false;
        username='Username must be in alphabets only';
         // this.setState(state);
           //return false;
      }
      if(!validator.isAlphanumeric(password)){
      //  var state = this.state;
        formIsValid =false;
        password ='Password must contain alphabets and numbers';
    // this.setState(state);
       // return false;
      }
      if(!validator.equals(password,confpsswd))
      {
        //var state = this.state;
        formIsValid =false;
        confpsswd='confirm Password must match with password';
        //this.setState(state);
       // return false;
      }

        return  formIsValid; 
        //   this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
      }
    
    renderRedirect() {
        if(this.state.redirect){
           // return <Redirect to='/dashboard'/>
           this.props.history.push('/dashboard')
        }
    }
    canBeSubmitted() {
        const errors = validateForm(this.state.email,this.state.username, this.state.password, this.state.confpsswd);
        const isEnabled = Object.keys(errors).some(x => errors[x]);
        return !isEnabled;
      }
    handleSubmit(e) {
    // const { email, username, password ,confpsswd} = this.state;
    // const errors = validate(email,username, password,confpsswd);
    // if (errors.length > 0) {
    //   this.setState({ errors });
    //   return;
    // }
    // if (!this.validateForm()) {
    //     e.preventDefault();
    //     return;
    //   }
      if (!this.canBeSubmitted()) {
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
                    this.setState({
                        redirect: true
                    })
              }
             /*  else {
                    if (response.data.redirect == '/')
                        this.setState({
                            redirect: true
                        })
                 }*/
            })
            .catch(function (error) {
                console.log(error.response)
               // console.log(error);
            });
    }

    render() {
    //     const errors = validate(this.state.email,this.state.username, this.state.password, this.state.confpsswd);
    //     const isDisabled = Object.keys(errors).some(x => errors[x]);
    //    // const { errors } = this.state;

    const errors = validateForm(this.state.email,this.state.username, this.state.password, this.state.confpsswd);
    const isEnabled = Object.keys(errors).some(x => errors[x]);
    const errorMsg = (field) => {
        const hasError = errors[field];
        const shouldShow = this.state.touched[field];
        
        return hasError ? shouldShow : false;
      };
      
    //const isEnabled = this.validateForm();
        return (
            <div className="container">
 <Header/>
 
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
                                        <FormControl name="email" type="email" placeholder="Email" value={this.state.email} onChange={(e) => { this.handleChange(e) }} onBlur={this.handleBlur('email')}/>
                                        <div className={errorMsg('email') ? "error" : ""}>{this.state.emailmsg}</div>
                                    </Col>
                                  
                                </FormGroup>
                                <FormGroup controlId="username">
                                    <Col componentClass={ControlLabel} md={3}>
                                        User Name
                                    </Col>
                                    <Col md={9}>
                                        <FormControl name="username" type="text" placeholder="Username" value={this.state.username} onChange={(e) => { this.handleChange(e) }} onBlur={this.handleBlur('username')}/>
                                        <div className={errorMsg('username') ? "error" : ""}>{this.state.usermsg}</div>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="password">
                                    <Col componentClass={ControlLabel} md={3}>
                                        Password
                                    </Col>
                                    <Col md={9}>
                                        <FormControl name="password" type="password" placeholder="Password" value={this.state.password} onChange={(e) => { this.handleChange(e) }} onBlur={this.handleBlur('password')}/>
                                        <div className={errorMsg('password') ? "error" : ""}>{this.state.passwordmsg}</div>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="confpsswd">
                                    <Col componentClass={ControlLabel} md={3}>
                                        Confirm Password
                                    </Col>
                                    <Col md={9}>
                                        <FormControl name="confpsswd" type="password" placeholder="Confirm Password" value={this.state.confpsswd} onChange={(e) => { this.handleChange(e) }} onBlur={this.handleBlur('confpsswd')}/>
                                        <div className={errorMsg('confpsswd') ? "error" : ""}>{this.state.confirmsg}</div>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col smOffset={3} mdOffset={3} sm={9} md={6}>
                                        {this.renderRedirect()}
                                        <Button type="button" bsStyle="success" onClick={(e) => this.handleSubmit(e)} disabled={!isEnabled}><i className="icon-hand-right"></i>Sign Up</Button>
                                        <span style={{ marginLeft: 8 }}> OR </span>
                                        <Button type="submit" bsStyle="primary">Sign Up with Stackoverflow</Button>
                                    </Col>
                                    {/* {errors.map(error => (
          <p key={error}>Error: {error}</p>
        ))} */}
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