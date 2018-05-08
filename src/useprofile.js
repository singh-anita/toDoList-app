import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './userprofile.css';

class UserProfile extends Component {
    render() {
        return (
            <div class="container">
                <div id="userbox" style={{ marginTop: 50 }} class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                    <div class="panel panel-info" >
                        <div class="panel-heading">
                            <div class="panel-title">User Profile</div>
                        </div>
                        <div style={{ paddingTop: 30 }} class="panel-body" >
                            <form id="signupform" style={{ marginTop: 20 }} class="form-horizontal" role="form">
                                <div class="form-group">
                                    <div class="col-sm-6" style={{ width: '100%' }}>
                                        <div align="center"> <img alt="User Pic" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" id="profile-image1" class="img-circle img-responsive" />

                                            <input id="profile-image-upload" class="hidden" type="file" />
                                            <div style={{ color: 'blue' }} >click here to change profile image</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class="col-md-3 control-label">Email</label>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" name="email" placeholder="Email Address" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="firstname" class="col-md-3 control-label">User Name</label>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" name="firstname" placeholder="First Name" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="password" class="col-md-3 control-label">Password</label>
                                    <div class="col-md-6">
                                        <input type="password" class="form-control" name="passwd" placeholder="Password" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="confirm-password" class="col-md-3 control-label">Confirm Password</label>
                                    <div class="col-md-6">
                                        <input type="confirm-password" class="form-control" name="conpasswd" placeholder="Confirm Password" />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-md-offset-3 col-md-9">
                                        <button id="btn-signup" type="button" class="btn btn-info"><i class="icon-hand-right"></i> Update</button>
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