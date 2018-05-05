import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from 'react-router-dom';
//import './todoInput.css';

class TodoInput extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            value: this.props.todoText
        };
        this.handleChange=this.handleChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }
    handleChange(e)
    {
    this.setState({value: e.target.value});
    }
    addTodo(todoText) {
        let todos = this.state.todos.slice();
        todos.push({id: this.state.nextId, text: todoText});
        this.setState({
          todos: todos,
          nextId: ++this.state.nextId
        });
      }
    
      removeTodo(id) {
        this.setState({
            todos: this.state.todos.filter((todo, index) => todo.id !== id)
          });
      }
    render(){
       return (
        <div>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <button className="btn btn-primary" onClick={() => this.addTodo(this.state.value)}>Add</button>
        </div>
        );
           
       }
}
export default TodoInput;