import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import TodoItem from './todoItem';
import TodoTitle from './todotitle';
import './css/dashboard.css';
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
    // x() {
    //  //   console.log(noteTitleId)
    //  console.log(this.props.match.params)
    //     this.setState({ currentlySelected: this.props.match.params, isInitialRender: false})
    // }

    updateState(value){
        console.log("calling update state")

        this.setState({isInitialRender: value})
    }
    

    render() {
        //console.log('rendering dashboard')
        return (
            <div className="container">
                <header className="page-title">
                    <HeaderLogout />
                    {this.renderRedirect()}
                </header>
                <TodoTitle checkStateChanged={this.checkStateChanged.bind(this)} updateState={this.updateState.bind(this)}/>
                { this.state.isInitialRender 
                    ? null 
                    : <TodoItem params={this.props.match.params} initialRender= {this.state.isInitialRender}/>
                }
             
                </div>
        )
    }
}
export default Dashboard;

// <Route path='/todoItem' render = {(props) => <TodoItem {...props} />} />
//<TodoTitle/>