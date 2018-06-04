import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { Link,Redirect,Route} from 'react-router-dom';
import TodoItem from './todoItem';
import TodoTitle from './todotitle';
import './dashboard.css';
import  HeaderLogout from './logout';
import axios from 'axios';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false  
        };

    }
    renderRedirect(){
        if (this.state.redirect) {
            this.props.history.push("/login")
            //return <Redirect to='/dashboard'/>
        }
    }
render() {

    return (
        <div className="container">
                <header className="page-title">
                <HeaderLogout/>
                {this.renderRedirect()}
                </header>
            <TodoTitle/>
             
    </div>
    )
}
}
export default Dashboard;

// <Route path='/todoItem' render = {(props) => <TodoItem {...props} />} />
//<TodoTitle/>