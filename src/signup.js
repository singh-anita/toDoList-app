import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
/*import {
    HelpBlock,
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";*/
/*import LoaderButton from "../components/LoaderButton";*/
/* <span style={{ marginLeft: 8 }}>or</span>  <div style={{borderTop:'1 solid #999',paddingTop:20}} class="form-group">*/
class Signup extends Component {
    /* constructor(props) {
         super(props);
 
         this.state = {
             isLoading: false,
             email: "",
             password: "",
             confirmPassword: "",
             confirmationCode: "",
             newUser: null
         };
     }*/

    /* validateForm() {
         return (
             this.state.email.length > 0 &&
             this.state.password.length > 0 &&
             this.state.password === this.state.confirmPassword
         );
     }
 
     validateConfirmationForm() {
         return this.state.confirmationCode.length > 0;
     }
 
     handleChange = event => {
         this.setState({
             [event.target.id]: event.target.value
         });
     }
 
     handleSubmit = async event => {
         event.preventDefault();
 
         this.setState({ isLoading: true });
 
         this.setState({ newUser: "test" });
 
         this.setState({ isLoading: false });
     }
 
     handleConfirmationSubmit = async event => {
         event.preventDefault();
 
         this.setState({ isLoading: true });
     }
 
     renderConfirmationForm() {
         return (
             <form onSubmit={this.handleConfirmationSubmit}>
                 <FormGroup controlId="confirmationCode" bsSize="large">
                     <ControlLabel>Confirmation Code</ControlLabel>
                     <FormControl
                         autoFocus
                         type="tel"
                         value={this.state.confirmationCode}
                         onChange={this.handleChange}
                     />
                     <HelpBlock>Please check your email for the code.</HelpBlock>
                 </FormGroup>
             </form>
         );
     }*/

    render() {
        return (
            <div class="container">
              
        <div id="signupbox" style={{marginTop:50}} class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <div class="panel-title">Sign Up</div>
                            <div><a id="signinlink" href="#" onclick="$('#signupbox').hide(); $('#loginbox').show()">Sign In</a></div>
                        </div>  
                        <div class="panel-body" >
                            <form id="signupform" style={{ marginTop: 50 }} class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label for="email" class="col-md-3 control-label">Email</label>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" name="email" placeholder="Email Address" value={this.state.value}/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="firstname" class="col-md-3 control-label">User Name</label>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" name="firstname" placeholder="First Name" value={this.state.value}/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="password" class="col-md-3 control-label">Password</label>
                                    <div class="col-md-6">
                                        <input type="password" class="form-control" name="passwd" placeholder="Password" value={this.state.value}/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="confirm-password" class="col-md-3 control-label">Confirm Password</label>
                                    <div class="col-md-6">
                                        <input type="confirm-password" class="form-control" name="conpasswd" placeholder="Confirm Password" value={this.state.value}/>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-md-offset-3 col-md-9">
                                        <button id="btn-signup" type="button" class="btn btn-info"><i class="icon-hand-right"></i> Sign Up</button>
                                        <span style={{ marginLeft: 8 }}> OR   </span>
                                        <button id="btn-fbsignup" type="button" class="btn btn-primary"><i class="icon-facebook"></i> Sign Up with Stackoverflow</button>
                                    </div>

                                </div>
                            </form>
                        </div>

</div>
</div>
</div>
                        );
                    }

                }
                
export default Signup;