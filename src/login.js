import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from 'react-router-dom';

/*import "./Login.css";*/

class Login extends Component {
    // constructor(props) {
    //  super(props);
    // this.onSubmit = this.onSubmit.bind(this);

    /*this.state = {
      email: "",
      emailError: "",
      password: "",
      passwordError:""
    };*/
    // }
    /*  onSubmit = (e)=> {
        e.preventDefault();
       // console.log(this.props);
        //this.props.history.push('/signup');
       // console.log('Click happened');
       // this.setState({query: e.target.value});
      // <Redirect to={{pathname: './signup', state: {from: props.location}}}
      //<Redirect to='./signup' />
       // window.location ='./signup';
    }*/

    /*  handleChange = e => {
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
      }*/
    // onSubmit = e => {
    //   console.log('Click happened');
    // e.preventDefault();
    // this.props.onSubmit(this.state);
    // const err = this.validateForm();
    /* if (!err) {
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
     }*/
    // }

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
                        <Form  horizontal>
                                <div style={{ marginBottom: 25 }} className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                    <input id="login-username" type="text" className="form-control" name="email" placeholder="username or email" />
                                </div>

                                <div style={{ marginBottom: 25 }} className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                    <input id="login-password" type="password" className="form-control" name="password" placeholder="password" />
                                </div>
                                <div className="input-group">
                                    <div className="checkbox">
                                        <label>
                                            <input id="login-remember" type="checkbox" name="remember" value="1" /> Remember me
                            </label>
                                    </div>
                                </div>
                                <div style={{ marginTop: 10 }} className="form-group">

                                    <div className="col-sm-12 controls">
                                        <button id="btn-login" type="submit" className="btn btn-success"  >Login</button>
                                        <button id="btn-fblogin" className="btn btn-primary" >Login with Stackoverflow</button>

                                    </div>
                                </div>


                                <div className="form-group">
                                    <div className="col-md-12 control">
                                        <div style={{ borderTop: '1 solid#888', paddingTop: 15 }} >
                                            Don't have an account!
                           <Link to="./signup">

                                                Sign Up Here

                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Form>



                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;