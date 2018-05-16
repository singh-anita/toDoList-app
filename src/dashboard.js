import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './dashboard.css';
class Dashboard extends Component {
    notesObjArray = [{ title: 'Shopping List', list: [{ content: 'Eggs are required for the body', isChecked: true }, 
    { content: 'Milk is white in color', isChecked: true }, { content: 'Cereals always require milk.', isChecked: false }, 
    { content: 'Bread and butter make a man\'s breakfast', isChecked: true },] }, { title: 'Word List', list: [{ content: 'Cornucopia means too many in number', isChecked: false }, { content: 'Abtruse means to interpret in a specific way', isChecked: false }, { content: 'Orwellian is a term associated with a dystopian world', isChecked: true }, { content: 'Obtuse means slow to understand', isChecked: false },] }, 
    { title: 'Villain List', list: [{ content: 'Joker', isChecked: false }, { content: 'Copperhead', isChecked: true }, { content: 'Prometheus', isChecked: false }, { content: 'Harley Quinn', isChecked: true }] }, { title: 'Shopping List', list: [{ content: '', isChecked: true }, { content: '', isChecked: true }, { content: '', isChecked: false }, { content: '', isChecked: true },] }, { title: 'Word List', list: [{ content: 'Cornucopia', isChecked: false }, 
    { content: 'Abtruse', isChecked: false }, { content: 'Orwellian', isChecked: true }, { content: 'Obtruse', isChecked: false },] }, { title: 'Villain List', list: [{ content: 'Joker', isChecked: false }, { content: 'Copperhead', isChecked: true }, { content: 'Prometheus', isChecked: false }, { content: 'Harley Quinn', isChecked: true }] }, { title: 'Shopping List', list: [{ content: 'Eggs', isChecked: true }, { content: 'Milk', isChecked: true }, { content: 'Cereals', isChecked: false }, { content: 'Bread', isChecked: true },] }, { title: 'Word List', list: [{ content: 'Cornucopia', isChecked: false }, 
    { content: 'Abtruse', isChecked: false }, 
    { content: 'Orwellian', isChecked: true }, { content: 'Obtruse', isChecked: false },] }, {
        title: 'Villain List', list: [{ content: 'Joker', isChecked: false }, { content: 'Copperhead', isChecked: true }, { content: 'Prometheus', isChecked: false },
        { content: 'Harley Quinn', isChecked: true }]
    }]
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            value: '',
            t_name: '',
            inputtxt: [],
            item: [],
            description: ''
        };
        //  this.title =  this.title.bind(this);
        // this.alertClicked =  this.alertClicked.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        /*  this.handleSubmit = this.handleSubmit.bind(this);*/
    }

    add() {
        //  alert(e.target.value)
        if (this.state.value.length > 0) {
            this.setState({
                list: this.state.list.concat([{ pro_name: this.state.value }]),
                value: '',
                t_name: ''
            });
        }
    }
    /* handleCheck() {
         alert(this.state.value);
         this.setState({
             list: this.state.list.concat([{ t_name: this.state.value}]), 
            
          });
          //alert("clicked"+list.t_name);
        // e.currentTarget.dataset.pro_name
      }*/
    addItem() {
        this.setState({
            inputtxt: this.state.inputtxt.concat({ input_box: this.state.description }),
            description: ''
        })
    }
    handleChange(e) {
        this.setState({
            description: e.target.value
        })
    }
    addContent() {
        this.setState({
            item: this.state.item.concat([{ content: this.state.description }]),
            description: ''
        })
    }
    title(e) {
        // alert(e.target.value);
        this.setState({
            t_name: e.target.value
        })
    }
    alertClicked() {
        alert('You clicked the ListGroupItem');
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
                                        <ListGroupItem onClick={this.title.bind(this)} value={curr.pro_name}>{curr.pro_name}</ListGroupItem>
                                    );
                                })
                            }
                        </ListGroup>
                    </div>
                    <div class="content_container">
                        <div>
                            {
                                this.state.t_name
                            }
                        </div>
                        <Button style={content} onClick={() => { this.addItem() }}>
                            <span class="glyphicon glyphicon-plus adder_icon" style={{ marginRight: '10px' }}></span>
                            Add Item
                    </Button>
                        {
                            this.state.inputtxt.map((curr, index) => {
                                return (
                                    <div>
                                        <input type="text" class="form-control add-todo" placeholder="Add items" onChange={(e) => { this.handleChange(e) }} value={this.state.description} />
                                        <Button onClick={() => { this.addContent() }} style={{ marginBottom: '20px' }}>Add Item</Button>
                                        <Button style={{ marginBottom: '20px' }}>Cancel</Button>
                                    </div>
                                )
                            })
                        }


                        <ListGroup componentClass="ul">
                            {
                                this.state.item.map((curr, index) => {
                                    return (
                                        <ListGroupItem>
                                            <div class="description">
                                                <Checkbox>{curr.content}</Checkbox>
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
                                    );
                                })
                            }
                        </ListGroup>
                    </div>
                </div>
            </div>


        );
    }
}
export default Dashboard;