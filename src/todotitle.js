import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
//import { Link,Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TodoItem from './todoItem';
import './dashboard.css';
import axios from 'axios';
import TitleListGroupComp from './titlelistgroup'
//import UpdateTitleComp from './updateTitle'
class TodoTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            value: ''
            //  titleObjArray:[]
        };
        this.addTitle = this.addTitle.bind(this);
    }

    /*-----get all the titles for that specific user--*/
    componentWillMount() {
        axios.get('http://localhost:3001/gettitles',
            {
                headers: {
                    "Authorization": localStorage.getItem('authtoken')
                }
            })
            .then(response => {
                console.log("CONSOLE DATA : ", response.data)

                this.setState({ list: response.data })
            })
            .catch((err) => {
                // if (err.response.status == 401) {
                console.log("error : ", err)
                // }
            })
    }

    /*on add click will add the title*/
    addTitle(e) {
        /*  var updatedList;
           if (this.state.value.length > 0) {
           updatedList = [...this.state.list, { title: this.state.value, list: [] }]
               this.setState({
                  list: updatedList,
                   value: ''
               });
           }*/
        var obj = {
            title: this.state.value,
            list: []
        };
        console.log("OBJECT : ", { title: this.state.value, list: [] })
        axios.post('http://localhost:3001/addnotetitle', obj, {
            headers: {
                "Authorization": localStorage.getItem('authtoken')
            }
        })
            .then((response) => {
                this.props.checkStateChanged(response.data.title)
                console.log("axios", response.data);
                if (response.status === 200) {
                    var titleObjArray = this.state.list.slice();
                    console.log(titleObjArray)
                    titleObjArray.push({ _id: response.data._id, title: response.data.title })
                    this.setState({ list: titleObjArray, value: '' })
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
    /*title inputbox value changes */
    update(e) {
        this.setState({
            value: e.target.value
        })
        // console.log("VALUE : ", this.state.value)
    }
/*Define a callback in my parent which takes the data I need in as a parameter.*/
t(objFromupdatingTitle) {
    console.log("list", this.state.list)
    var templist = this.state.list.slice()
    // console.log("chhhh",templist)
    console.log("qq", objFromupdatingTitle)

    templist.map((tO, idx) => {
      if (tO.id === objFromupdatingTitle._id) {
        tO.title = objFromupdatingTitle.title
      }
    })
    this.setState({ list: templist })
    // this.setState({  list: objFromupdatingcontent})
  }
    /*titleselected(key, e) {
        axios.get('http://localhost:3001/getnotecontent/' + key ,
        {
           headers: {
             "Authorization": localStorage.getItem('authtoken')
           }
         })
           .then((response) => {
               this.props.x(response.data, key) //Call the callback using this.props.[callback] in the child 
    
               console.log("responsedata",response.data,key)
             }).catch(function (error) {
        console.log("error",error.response);
    });*/

    // }

    render() {
        return (
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
                    <div className="allTitlelists">
                    <ListGroup >
                        {
                            this.state.list.map((currentTitle, index) => {
                                return (
                                  
                         <TitleListGroupComp titleEntry={currentTitle} index={index} t={this.t.bind(this)} />
                                 
                               
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

export default TodoTitle;