import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { Link,Redirect } from 'react-router-dom';
import TodoItem from './todoItem';
import './dashboard.css';
import  HeaderLogout from './logout';
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
            selectedTitleContents: [],
           /* selectedTitleContents: [{
                title: 'Shopping List',
                list: [
                    { content: 'xdzsgvxdrfgb', isChecked: true },
                    { content: 'xdrfgb', isChecked: true },
                    { content: 'xdtrh', isChecked: false },
                    { content: 'xdrtfh', isChecked: true }
                ]
            }],*/
           // item: [],
            description: '',
            redirect: false  
        };
        // this.handleChange = this.handleChange.bind(this);
        /*  this.handleSubmit = this.handleSubmit.bind(this);*/
        this.addTitle = this.addTitle.bind(this);
    }

/*-----get all the titles for that specific user--*/
    componentWillMount(){
    axios.get('http://localhost:3001/gettitles',
    {
       headers: {
         "Authorization": localStorage.getItem('authtoken')
       }
     })
    .then(response => {
        console.log("CONSOLE DATA : ", response.data)
       this.setState({ list : response.data })
    })
    .catch((err) => {
        // if (err.response.status == 401) {
            console.log("error : ", err)
        // }
    })
}

/*on add click will add the title*/ 
    addTitle(e) {
        var updatedList;
        if (this.state.value.length > 0) {
         updatedList = [...this.state.list, { title: this.state.value, list: [] }]
            this.setState({
                list: updatedList,
                value: '',

                //selectedTitleContents:  [{ title: this.state.value, list: [] }]
            });
        }
        var obj = {
            title : this.state.value,
            list: []
        };
        console.log("OBJECT : ", { title : this.state.value, list : [] })
        // console.log(""obj)
        axios.post('http://localhost:3001/addnotetitle', obj,{
            headers: {
              "Authorization": localStorage.getItem('authtoken')
            }
        })
        .then((response) => {
            console.log("axios", response.data);
        })
        .catch(err => {
                console.error(err);
            });
        // }
    }
    handleChange(e) {
        this.setState({
            description: e.target.value
        })
    }
    /*form the listgroup slecting title*/
    title(key, e) {
          console.log("IN TITLE : ", key)
         /* this.setState({
            //selectedTitleContents:  [{ title: this.state.value, list: [] }]
          selectedTitleContents: this.state.list.find((arr, idx) => {
                console.log("arr HERE : ", arr)
                return arr.title == e.target.value
            })
       })*/
          axios.get('http://localhost:3001/getnotecontent/' + key ,
          {
             headers: {
               "Authorization": localStorage.getItem('authtoken')
             }
           })
             .then( (response) => {
                      console.log("loginresponse",response.data);
                              // if (!localStorage.authtoken) {
                      if(response.status == 200){
             /*on selection of title changing state and get the selected title*/
        this.setState({
            //selectedTitleContents:  [{ title: this.state.value, list: [] }]
          selectedTitleContents: [{ content: response.data, isChecked: false  }]
               // console.log("arr HERE : ", arr)
               // return arr.title == e.target.value
            })
     //  })
               }
             })
             .catch(function (error) {
                 console.log(error.response);
             });
    
    }
    /*title inputbox value changes */
    update(e) {
        // alert(e.target.value)
        this.setState({
            value: e.target.value
        })
       // console.log("VALUE : ", this.state.value)
    }

    checkStateChanged(obj) {
        // alert('SHOWING HERE')
        this.setState({ selectedTitleContents: obj })
    }
 /*   renderRedirect(){
        if (this.state.redirect) {
          //  this.props.history.push("/login")
            return <Redirect to='/login'/>
        }
    }*/
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
                <HeaderLogout/>
                {/*this.renderRedirect()*/}
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
                                        <ListGroupItem key = { curr._id } bsStyle="success" onClick={this.title.bind(this,curr._id)} value={curr.title}>{curr.title}</ListGroupItem>
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
//<TodoItem checkStateChange={this.checkStateChanged.bind(this)} noteObj={this.state.selectedTitleContents} />
