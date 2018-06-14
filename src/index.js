import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
/*import 'bootstrap/dist/css/bootstrap.css';*/
/*import Bootstrap from 'bootstrap/dist/css/bootstrap.css';*/
import Signup from './signup';
import Login from './login';
import UserProfile from './useprofile';
import Dashboard from './dashboard';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';



//ReactDOM.render(<Dashboard/>, document.getElementById('root'));
//ReactDOM.render(<App/>, document.getElementById('root'));
/*registerServiceWorker();*/
ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root'));