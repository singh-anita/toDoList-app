import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './css/dashboard.css';
import Headerhome from './logout';
import axios from 'axios';
import { set } from 'mongoose';
import './css/todoItem.css';
import  DeleteContentComp from './deleteContent';
// import TodoItem from './todoItem';

class ListGroupComp extends Component {

  componentDidMount(){
    this.setState({ updatevalue : this.props.noteEntry.content },
    () =>{
      this.baseState = this.state
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      show: true,
     updatevalue: ''
    }
       // preserve the initial state in a new object
       
       this.resetForm =this.resetForm.bind(this)
    this.updateChange = this.updateChange.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  //componentWillMount() {
  //  console.log("-------------THIS PROPS : ", this.props.noteEntry, this.props.index)
 // }
 resetForm(){
  this.setState(this.baseState)
}
  /*editing content onclick inputbox comes with button*/
  editingcontent() {
    this.setState({ show: !this.state.show })
  }
  /*update list inputbox value change*/
  updateChange(e) {
//    updatevalue()
    this.setState({
      updatevalue: e.target.value
    })
  }
  checkStateChanged(index, e) {
   console.log("CHECKBOX CHANGED :",this.props.noteEntry)
  // this.props.checkboxChange(this.props.noteEntry[index].isChecked)
   /*axios.delete('http://localhost:3001/checkStateChange/',{
    headers: {
      "Authorization": localStorage.getItem('authtoken')
    }
  })
    .then((response) => {
      if (response.status === 200) {
                console.log("chkaa", response.data);
       //  this.props.y(response.data)
      }
   })
   .catch(err => {
     console.error(err);
   });*/
    //this.props.chkboxupdate(this.props.noteEntry)
     var objToChange = this.props.list.slice();
    //console.log("checkbox", index)
    // console.log("CHECKBOX CHANGED : ", this.props.list[index].isChecked);
   // var objToChange = this.props.list.slice();
    // console.log( "changevar",objToChange)
    objToChange[index].isChecked = !this.props.list[index].isChecked;
    this.props.checkboxChange( objToChange)
    //this.setState({ list: objToChange })
  }
  /*updating contentlist items on button click */
  updateContent() {
    console.log("helo ani")
    console.log("idcheck", this.props.noteEntry.id)
    var updateObj = {
      content: this.state.updatevalue, isChecked: this.props.noteEntry.isChecked,
      contentId: this.props.noteEntry.id
    };
    console.log("OBJECT : ", updateObj)
    axios.post('http://localhost:3001/updatenotecontent', updateObj, {
      headers: {
        "Authorization": localStorage.getItem('authtoken')
      }
    })
      .then((response) => {
        console.log("axios", response.data);
        if (response.status === 200) {
          this.props.x(response.data)   //Call the callback using this.props.[callback] in the child 
          this.setState({ show: true })
        }
      })
      .catch(err => {
        console.error(err);
      });
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
      <ListGroupItem key={this.props.noteEntry.notesID}>
        <div className="description">
          {
            (this.state.show) ?
              <Checkbox onChange={this.checkStateChanged.bind(this, this.props.index)} checked={this.props.isChecked} value={this.props.noteEntry.content}>{this.props.noteEntry.content}</Checkbox>
              : <div className="editcontent col-md-12 col-lg-12" >
                <input type="text" onChange={this.updateChange} value={this.state.updatevalue} className="form-control edit" placeholder="Edit Content" />
              </div>
          }
        </div>
        <div className="action">
          {
            (this.state.show) ?
              <span>
                <Button style={{ marginRight: '15px', marginTop: '3px' }} onClick={this.editingcontent.bind(this)}>
                  <i className="glyphicon glyphicon-pencil"></i>
                </Button>
                <DeleteContentComp item={this.props.noteEntry.id} y={this.props.y}/></span> :
             <span> <Button style={{ float: 'left' }} onClick={this.updateContent}>Save</Button>
              <Button style={{ marginBottom: '20px' ,marginLeft:'5px'}} onClick={this.resetForm}>Cancel</Button></span>
          }
        </div>
      </ListGroupItem>
    )
  }
}

export default ListGroupComp