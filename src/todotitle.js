import React, { Component } from 'react';
import { ListGroup, Button} from "react-bootstrap";
import './css/dashboard.css';
import axios from 'axios';
import TitleListGroupComp from './titlelistgroup';

class TodoTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            value: ''
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
                console.log(this.state.list);
            })
            .catch((err) => {
                // console.log("error : ", err)
            this.props.history.push('/login')
            })
    }

    /*on add click will add the title*/
    addTitle(e) {
  
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
                console.log("axios", response.data);
                if (response.status === 200) {
                    var titleObjArray = this.state.list.slice();

                    titleObjArray.push({ _id: response.data._id, title: response.data.title })
            
                    if (this.state.value.length > 0) {
                        this.setState({ list: titleObjArray, value: '' })
                        console.log(this.state.list)
                     //   this.props.updateState(false)
                    }

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
    }
    /*Define a callback in my parent which takes the data I need in as a parameter.*/
    updateTitleCallback(objFromupdatingTitle) {
        console.log("list", this.state.list)
        var templist = this.state.list.slice()
        // console.log("chhhh",templist)
        console.log("qq", objFromupdatingTitle)

        templist.map((tO, idx) => {
            if (tO._id === objFromupdatingTitle._id) {
                tO.title = objFromupdatingTitle.title
            }
        })
        this.setState({ list: templist })
        // this.setState({  list: objFromupdatingcontent})
    }
    todoTitlecallBack(objofnotestitle) {
        var templist = this.state.list.slice()
        console.log("chhhh", objofnotestitle)
       // this.setState({ list: objofnotestitle })
        templist.map((c, idx) => {
            this.setState({ list:  objofnotestitle })
            })
    }
   

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
                        <Button bsStyle="success" onClick={this.addTitle} disabled={!this.state.value}>
                            <span>Add Title</span>
                        </Button>
                    </div>
                    <div className="allTitlelists">
                        <ListGroup >
                            {
                                this.state.list.map((currentTitle, index) => {
                                    return (
                                        <TitleListGroupComp history={this.props.history} key ={index} titleEntry={currentTitle} index={index} updateTitleCallback={this.updateTitleCallback.bind(this)} callBackFromtodoTitle={this.todoTitlecallBack.bind(this)} />
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