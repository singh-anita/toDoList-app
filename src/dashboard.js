import React, { Component } from 'react';
import TodoItem from './todoItem';
import TodoTitle from './todotitle';
import './css/dashboard.css';
import HeaderLogout from './logout';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInitialRender: true,
            currentlySelected: null,
            noteTitleId: null
        };

    }

    checkStateChanged(obj) {
        this.setState({ noteTitle: obj })
    }


    updateState(value){
        console.log("calling update state")
        this.setState({isInitialRender: value})
    }
  

    render() {
        let {
            id
        } = this.props.match.params
        return (
            <div className="container">
                <header className="page-title">
                    <HeaderLogout />
                </header>
                <TodoTitle history={this.props.history} checkStateChanged={this.checkStateChanged.bind(this)}  />
                { id 
                    ? <TodoItem params={this.props.match.params} /> 
                    : null
                }
             
                </div>
        )
    }
}
export default Dashboard;


