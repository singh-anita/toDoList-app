import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import TodoItem from './todoItem';
import TodoTitle from './todotitle';
import './dashboard.css';
import HeaderLogout from './logout';
import axios from 'axios';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            isInitialRender: true,
            currentlySelected: null,
            noteTitleId: null
            // selectedTitleContents
        };

    }

    checkStateChanged(obj) {
        // alert('SHOWING HERE')
        this.setState({ noteTitle: obj })
    }

    renderRedirect() {
        if (this.state.redirect) {
            this.props.history.push("/login")
            //return <Redirect to='/dashboard'/>
        }
    }
    /*Define a callback in my parent which takes the data I need in as a parameter.*/
  /*  x(objFromtitleselect) {
     //   console.log(noteTitleId)
     console.log(this.props.match.params)
        this.setState({ currentlySelected: objFromtitleselect, isInitialRender: false})
    }*/


    render() {

        return (
            <div className="container">
                <header className="page-title">
                    <HeaderLogout />
                    {this.renderRedirect()}
                </header>
                <TodoTitle checkStateChanged={this.checkStateChanged.bind(this)} />
                <TodoItem titlename={this.state.noteTitle} params={this.props.match.params} />
            </div>
        )
    }
}
export default Dashboard;

// <Route path='/todoItem' render = {(props) => <TodoItem {...props} />} />
//<TodoTitle/>