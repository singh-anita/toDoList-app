import React, { Component } from 'react';
import { ListGroup,ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

            list: [
                
            ], value: ''
        };

    // this.handleChange = this.handleChange.bind(this);
        /*  this.handleSubmit = this.handleSubmit.bind(this);*/
    }
    add() {
        //  alert(e.target.value)
        this.setState({
           list: this.state.list.concat([{ pro_name: this.state.value }]),
            value: ''
        });
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    /*handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }*/
    /*  state = {
          add : null
      }
      addTodo = () =>
            {
          this.setState({ add : <ListGroupItem bsStyle="success">Success</ListGroupItem> })
      }*/
    update(e) {
        // alert(e.target.value)
        this.setState({
            value: e.target.value
        })
    }

    render() {

        var edit = {
            marginRight: '15px',
            marginTop: '3px'
        }
        var delet = {
            marginTop: '3px'
        }
        var content = {
            marginBottom: '10px'
        }
        return (
            <div class="container">
                <header class="page-title">
                </header>
                <div class="todo-in-progress">
                    <h2> Working tasks</h2>
                    <div class="left_menu">
                        <div class="cont">
                            <h3 style={{ marginLeft: '6px', paddingTop: '3px' }}>
                                TO DO
                            </h3>
                            <div class="addlist">
                                <input type="text" onChange={(e) => { this.update(e) }} class="form-control add-todo" placeholder="Add todo" value={this.state.value} />
                            </div>
                            <Button onClick={() => { this.add() }}>
                                <span>Add Project</span>
                            </Button>
                        </div>
                           <ListGroup>
                            {
                                this.state.list.map((curr, index) => {
                                        return (
                                            <ListGroupItem>{curr.pro_name}</ListGroupItem>
                                        );
                                })
                            }   
                            </ListGroup>       
                    </div>
                    <div class="content_container">
                        <Button style={content}  >
                            <span class="glyphicon glyphicon-plus adder_icon" style={{ marginRight: '10px' }}></span>
                            Add Item
                    </Button>

                        <ListGroup componentClass="ul">
                            <ListGroupItem>
                                <div class="description">
                                    <Checkbox>Item 1</Checkbox>
                                </div>
                                <div class="action">
                                    <Button style={edit}>
                                        <i class="glyphicon glyphicon-pencil"></i>
                                    </Button>
                                    <Button style={delet}>
                                        <i class="glyphicon glyphicon-trash"></i>
                                    </Button>
                                </div>
                            </ListGroupItem>

                        </ListGroup>
                    </div>
                </div>
            </div>


        );
    }
}
export default Dashboard;