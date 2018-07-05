import React, { Component } from 'react';
import { ListGroupItem, Button, Checkbox } from "react-bootstrap";
import './css/dashboard.css';
import axios from 'axios';
import './css/todoItem.css';
import DeleteContentComp from './deleteContent';

class ListGroupComp extends Component {

  componentDidMount() {
    this.setState({ updatevalue: this.props.noteEntry.content })
  }
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      updatevalue: ''
      // updatevalueLengthZero: false,
    }
    this.resetForm = this.resetForm.bind(this)
    this.updateChange = this.updateChange.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  resetForm() {
    this.setState({show: !this.state.show ,updatevalue : this.props.noteEntry.content })
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
    axios.put('http://localhost:3001/checkStateChange/'+this.props.noteEntry.id,{},
    {
      headers: {
        "Authorization": localStorage.getItem('authtoken')
      }
    })
     .then((response) => {
       if (response.status === 200) {
                 console.log("chkaa", response.data);
                 this.props.checkboxChange(index);
       }
    })
    .catch(err => {
      console.error(err);
    }); 

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
    axios.put('http://localhost:3001/updatenotecontent', updateObj, {
      headers: {
        "Authorization": localStorage.getItem('authtoken')
      }
    })
      .then((response) => {
        console.log("axios", response.data);
        if (response.status === 200) {
          this.props.updateContentCallback(response.data)   //Call the callback using this.props.[callback] in the child 
          this.setState({ show: true })
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    return (
      <ListGroupItem key={this.props.noteEntry.notesID}>
        <div className="description">
          {
            (this.state.show) ?
              <Checkbox onChange={this.checkStateChanged.bind(this, this.props.index)} checked={this.props.noteEntry.isChecked} value={this.props.noteEntry.content}>
              <span style={{ textDecorationLine: this.props.noteEntry.isChecked ? 'line-through' : 'none' }} >{this.props.noteEntry.content}</span></Checkbox>
              : <div className="editcontent col-md-12 col-lg-12" >
                <input type="text" onChange={this.updateChange} value={this.state.updatevalue} className="form-control edit" placeholder="Edit Content" />
              </div>
          }
        </div>
        <div className="action">
          {
            (this.state.show) ?
              <span>
                <Button  bsStyle="info" style={{ marginRight: '15px', marginTop: '3px' }} onClick={this.editingcontent.bind(this)}>
                  <i className="glyphicon glyphicon-pencil"></i>
                </Button>
                <DeleteContentComp item={this.props.noteEntry.id} callBackFromtodoItem={this.props.callBackFromtodoItem} /></span> :
              <span> <Button bsStyle="success"  style={{ float: 'left' }} onClick={this.updateContent} disabled={!this.state.updatevalue}>Save</Button>
                <Button  bsStyle="warning" style={{ marginBottom: '20px', marginLeft: '5px' }} onClick={this.resetForm}>Cancel</Button></span>
          }
        </div>
      </ListGroupItem>
    )
  }
}

export default ListGroupComp