import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import  HeaderLogout from './logout';
import Signup from './signup';
import Login from './login';
import UserProfile from './useprofile';
import MaterialIcon from 'react-google-material-icons'
import Dashboard from './dashboard';
import TodoItem from './todoItem';

class App extends Component {
  render() {
    return (

      <Router>

        <Switch>

           {/* THE SIGN UP ROUTE */}
             <Route path='/signup'  render = {(props) => <Signup {...props} />} />
              {/* This is Dashboard ROUTE */}
             <Route  path = '/dashboard' render = {(props) => <Dashboard {...props} />} />
               {/* This is LOGIN ROUTE */}
             <Route  path='/login' render = {(props) => <Login {...props} />}  />
             <Route path ='/todoItem/:id' render = {(props) => <Dashboard {...props} />} />

          </Switch>
       </Router>
    );
  }
}

export default App;
