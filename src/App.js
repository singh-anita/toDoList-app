import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Signup from './signup';
import Login from './login';
import Inputa from './input';
import TodoItem from './todoItem';
import TodoInput from './todoinput';
class App extends Component {
  render() {
    return (
      <Router>

        <Switch>
             <Route exact path='/signup' component={Signup} />
             <Route exact path='/' component={Login} />
          </Switch>
       </Router>
    );
  }
}

export default App;
