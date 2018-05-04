import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
/*import "./Login.css";*/

class Login extends Component {
   /* constructor(props) {
        super(props);
    
        this.*/
        state = {
          email: "",
          emailError: "",
          password: "",
          passwordError:""
        };
      //}

      handleChange = e => {
        this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
          [e.target.name]: e.target.value
        });
      };
      validateForm = () => {
          let isError = false;
          const errors = {
            emailError: "",
            passwordError: ""
          };

         /* if(this.state.username.length <5)
          {
              isError =true;
              errors.us
          }*/
          if (this.state.email.indexOf("@") === -1) {
            isError = true;
            errors.emailError = "Requires valid email";
          }
          if(isError){
              this.setState({
                  ...this.state,
                  ...errors
              });
          }
          return isError;
       /* return this.state.email.length > 0 && this.state.password.length > 0;*/
      }
      onSubmit = e => {
        e.preventDefault();
        // this.props.onSubmit(this.state);
        const err = this.validateForm();
        if (!err) {
          // clear form
          this.setState({
            email: "",
            emailError: "",
            password: "",
            passwordError: ""
          });
          this.props.onChange({
            email: "",
            password: ""
          });
        }
    }
    
render() {
    return (
        <div class="container">
        <div id="loginbox" style={{marginTop:50}} class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <div class="panel panel-info" >
            <div class="panel-heading">
                <div class="panel-title">Sign In</div>
                <div><a href="#">Forgot password?</a></div>
            </div>

            <div style={{paddingTop:30}} class="panel-body" >

                <form id="loginform" class="form-horizontal" role="form">

                    <div style={{marginBottom: 25}} class="input-group">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                        <input id="login-username" type="text" class="form-control" name="email" value={this.state.value} onChange={this.handleChange(e)} errorText={this.state.emailError} placeholder="username or email"/>                                        
                        </div>

                        <div style={{marginBottom: 25}} class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                            <input id="login-password" type="password" class="form-control" name="password" value={this.state.value} onChange={this.handleChange(e)} errorText={this.state.passwordError}placeholder="password"/>
                        </div>
                            <div class="input-group">
                                <div class="checkbox">
                                    <label>
                                        <input id="login-remember" type="checkbox" name="remember" value="1"/> Remember me
                            </label>
                          </div>
                                </div>
                        <div style={{marginTop:10}} class="form-group">

                        <div class="col-sm-12 controls">
                          <button id="btn-login" type="submit" class="btn btn-success" onClick= {(e)=>this.onSubmit(e)} >Login</button>
                            <button id="btn-fblogin" class="btn btn-primary" >Login with Stackoverflow</button>

                                    </div>
                                </div>


                                <div class="form-group">
                                    <div class="col-md-12 control">
                                        <div style={{borderTop:'1 solid#888',paddingTop:15}} >
                                            Don't have an account!
                            <a href="#" onClick="$('#loginbox').hide(); $('#signupbox').show()">
                                                Sign Up Here
                            </a>
                                        </div>
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
export default Login;