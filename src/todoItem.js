import React, { Component } from 'react';
import { ListGroup,ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './dashboard.css';
  //  <button className="removeTodo" onClick={(e)=> this.removeTodo(this.props.id) }>remove</button>{this.props.todo.text}

 class TodoItem extends Component {
  render() {
    var content = {
      marginBottom: '10px'
  }
    return (

      <Button style={content} >
                            <span class="glyphicon glyphicon-plus adder_icon" style={{ marginRight: '10px' }}></span>
                            Add Item
                    </Button>
    );
  }
}
export default TodoItem;