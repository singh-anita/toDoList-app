import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from 'react-router-dom';
//import TodoInput from './todoinput';
//import TodoItem from './todoItem';
   // <TodoInput todoText="" addTodo={this.addTodo} />
class Inputa extends Component{
  /*constructor(props) {
    super(props);
    this.state = {
      todos: [
        {id: 0, text: "Make dinner tonight!"},
        {id: 1, text: "Fold the laundry."},
        {id: 2, text: "Learn to make a React app!"}
      ],
      nextId: 3
    };*/

   // this.addTodo = this.addTodo.bind(this);
    //this.removeTodo = this.removeTodo.bind(this);
  //}

render() {
    return (
      <div className="App">
       <div className="todo-wrapper">
          <TodoInput todoText="" />
          <ul>
          </ul>
        </div>
      </div>
    );
  }
}
//export default Inputa;