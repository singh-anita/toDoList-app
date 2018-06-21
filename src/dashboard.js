import React, { Component } from 'react';
import TodoItem from './todoItem';
import TodoTitle from './todotitle';
import './css/dashboard.css';
import HeaderLogout from './logout';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            isInitialRender: true,
            currentlySelected: null,
            noteTitleId: null
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
    // initialRender(value){
    //     console.log("calling update state")
    //     this.setState({isInitialRender: value})
    // }

    render() {
        return (
            <div className="container">
                <header className="page-title">
                    <HeaderLogout />
                    {this.renderRedirect()}
                </header>
                <TodoTitle checkStateChanged={this.checkStateChanged.bind(this)} updateState={this.updateState.bind(this)} />
                { this.state.isInitialRender 
                    ? null 
                    : <TodoItem params={this.props.match.params} />
                }
             
                </div>
        )
    }
}
export default Dashboard;


//updateState={this.updateState.bind(this)}
// initialRender= {this.initialRender.bind(this)}