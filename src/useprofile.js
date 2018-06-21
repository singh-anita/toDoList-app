import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './css/userprofile.css';

class UserProfile extends Component {
    render() {
        return (
            <div className="container">
                <div id="userbox" style={{ marginTop: 50 }} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                    <div className="panel panel-info" >
                        <div className="panel-heading">
                            <div className="panel-title">User Profile</div>
                        </div>
                        <div style={{ paddingTop: 30 }} className="panel-body" >
                            <form id="signupform" style={{ marginTop: 20 }} className="form-horizontal" role="form">
                                <div className="form-group">
                                    <div className="col-sm-6" style={{ width: '100%' }}>
                                        <div align="center"> <img alt="User Pic" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" id="profile-image1" className="img-circle img-responsive" />

                                            <input id="profile-image-upload" className="hidden" type="file" />
                                            <div style={{ color: 'blue' }} >click here to change profile image</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="email" className="col-md-3 control-label">Email</label>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="email" placeholder="Email Address" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="firstname" className="col-md-3 control-label">User Name</label>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" name="firstname" placeholder="First Name" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="password" className="col-md-3 control-label">Password</label>
                                    <div className="col-md-6">
                                        <input type="password" className="form-control" name="passwd" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="confirm-password" className="col-md-3 control-label">Confirm Password</label>
                                    <div className="col-md-6">
                                        <input type="confirm-password" className="form-control" name="conpasswd" placeholder="Confirm Password" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-offset-3 col-md-9">
                                        <button id="btn-signup" type="button" className="btn btn-info"><i className="icon-hand-right"></i> Update</button>
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
export default UserProfile;