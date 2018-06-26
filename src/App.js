import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Signup from './signup';
import Login from './login';
import UserProfile from './useprofile';
import Dashboard from './dashboard';
import TodoTitle from './todotitle';

class App extends Component {
  render() {
    return (

      <Router>

        <Switch>

           {/* THE SIGN UP ROUTE */}
             <Route path='/signup'  render = {(props) => <Signup {...props} />} />
              {/* This is Dashboard ROUTE */}
             <Route  path = '/dashboard' render = {(props) => <Dashboard {...props} />} />
             <Route  path = '/dashboard' render = {(props) =><TodoTitle {...props} />} />
               {/* This is LOGIN ROUTE */}
             <Route  path='/login' render = {(props) => <Login {...props} />}  />
             <Route path ='/todoItem/:id' render = {(props) => <Dashboard {...props} />} />

          </Switch>
       </Router>
    );
  }
}

export default App;
