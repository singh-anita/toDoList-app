import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { Link } from 'react-router-dom';
import TodoItem from './todoItem';
import './dashboard.css';
import axios from 'axios';
class Dashboard extends Component {
    notesObjArray = [
        {
            title: 'Shopping List',
            list: [
                { content: 'Eggs are required for the body', isChecked: true },
                { content: 'Milk is white in color', isChecked: true },
                { content: 'Cereals always require milk.', isChecked: false },
                { content: 'Bread and butter make a man\'s breakfast', isChecked: true }
            ]
        },

        {
            title: 'Word List',
            list: [
                { content: 'Cornucopia means too many in number', isChecked: false },
                { content: 'Abtruse means to interpret in a specific way', isChecked: false },
                { content: 'Orwellian is a term associated with a dystopian world', isChecked: true },
                { content: 'Obtuse means slow to understand', isChecked: false }
            ]
        },

        {
            title: 'Villain List',
            list: [
                { content: 'Joker', isChecked: false },
                { content: 'Copperhead', isChecked: true },
                { content: 'Prometheus', isChecked: false },
                { content: 'Harley Quinn', isChecked: true }
            ]
        },

        {
            title: 'Shopping List',
            list: [
                { content: '', isChecked: true },
                { content: '', isChecked: true },
                { content: '', isChecked: false },
                { content: '', isChecked: true }
            ]
        },

        {
            title: 'Word List',
            list: [
                { content: 'Cornucopia', isChecked: false },
                { content: 'Abtruse', isChecked: false },
                { content: 'Orwellian', isChecked: true },
                { content: 'Obtruse', isChecked: false }
            ]
        },

        {
            title: 'Villain List', list: [
                { content: 'Joker', isChecked: false },
                { content: 'Copperhead', isChecked: true },
                { content: 'Prometheus', isChecked: false },
                { content: 'Harley Quinn', isChecked: true }
            ]
        },

        {
            title: 'Shopping List', list: [
                { content: 'Eggs', isChecked: true },
                { content: 'Milk', isChecked: true },
                { content: 'Cereals', isChecked: false },
                { content: 'Bread', isChecked: true }
            ]
        },

        {
            title: 'Word List', list: [
                { content: 'Cornucopia', isChecked: false },
                { content: 'Abtruse', isChecked: false },
                { content: 'Orwellian', isChecked: true },
                { content: 'Obtruse', isChecked: false }
            ]
        },

        {
            title: 'Villain List', list: [
                { content: 'Joker', isChecked: false },
                { content: 'Copperhead', isChecked: true },
                { content: 'Prometheus', isChecked: false },
                { content: 'Harley Quinn', isChecked: true }
            ]
        }]





    constructor(props) {
        super(props);
        this.state = {

            list: [],
            value: '',
            selectedTitleContents: [{
                title: 'Shopping List',
                list: [
                    { content: 'xdzsgvxdrfgb', isChecked: true },
                    { content: 'xdrfgb', isChecked: true },
                    { content: 'xdtrh', isChecked: false },
                    { content: 'xdrtfh', isChecked: true }
                ]
            }],
           
           // item: [],
            description: ''
        };
        //  this.title =  this.title.bind(this);
        // this.alertClicked =  this.alertClicked.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        /*  this.handleSubmit = this.handleSubmit.bind(this);*/
        this.addTitle = this.addTitle.bind(this);
    }

    addTitle(e) {
        var updatedList;
        //  console.log()
        if (this.state.value.length > 0) {
         updatedList = [...this.state.list, { title: this.state.value, list: [] }]
            this.setState({
                list: updatedList,
                value: '',
                // selectedTitleContents: ''
            });
        }
        var obj = {
            list: updatedList
        };
        console.log("OBJECT : ", obj)
        // console.log(""obj)
        axios.post('http://localhost:3001/addnotetitle', obj).then((response) => {
            console.log("axios", response.data);
        })
            .catch(err => {
                console.error(err);
            });
        // }
    }
    /*addItem() {
        this.setState({
            inputtxt: this.state.inputtxt.concat({ input_box: this.state.description }),
            description: ''
        })
    }*/
    handleChange(e) {
        this.setState({
            description: e.target.value
        })
    }
    /* addContent() {
         console.log("this state : ",  this.state.selectedTitleContents)
          this.setState({
              selectedTitleContents: this.state.selectedTitleContents[0].list.concat([{ content : this.state.description, isChecked: false }]),
              description: ''
          })
      }*/
    title(e) {
        /*  console.log("IN TITLE : ", e.target.value)*/

        /*on selection of title changing state and get the selected title*/
        this.setState({
            selectedTitleContents: this.state.list.filter((arr, idx) => {
                console.log("arr HERE : ", arr)
                return arr.title == e.target.value
            })
        })
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
        console.log("VALUE : ", this.state.value)
    }

    checkStateChanged(obj) {
        // alert('SHOWING HERE')
        this.setState({ selectedTitleContents: obj })
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
            <div className="container">
                <header className="page-title">
                </header>
                <div className="todo-in-progress">
                    <h2> Working tasks</h2>
                    <div className="left_menu">
                        <div className="cont">
                            <h3 style={{ marginLeft: '6px', paddingTop: '3px' }}>
                                TO DO
                            </h3>
                            <div className="addlist">
                                <input type="text" onChange={(e) => { this.update(e) }} className="form-control add-todo" placeholder="Add todo" value={this.state.value} />
                            </div>
                            <Button onClick={this.addTitle}>
                                <span>Add Project</span>
                            </Button>
                        </div>
                        <ListGroup>
                            {
                                this.state.list.map((curr, index) => {
                                    return (
                                        <ListGroupItem bsStyle="success" onClick={this.title.bind(this)} value={curr.title}>{curr.title}</ListGroupItem>
                                    );
                                })
                            }
                        </ListGroup>
                    </div>
                    <TodoItem checkStateChange={this.checkStateChanged.bind(this)} noteObj={this.state.selectedTitleContents} />
                </div>
            </div>
        );
    }
}

export default Dashboard;
// <TodoItem noteObj = {this.state.selectedTitleContents} />