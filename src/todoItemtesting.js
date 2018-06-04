import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './dashboard.css';
import Headerhome from './logout';
import axios from 'axios';

class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      description: ''
    };
    this.addContent = this.addContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /*selecting checkbox on selection*/

  checkStateChanged(index, e) {

    console.log("CHECKBOX CHANGED : ", this.props.noteObj.list[index].isChecked);
    var objToChange = this.props.noteObj;
    objToChange.list[index].isChecked = !this.props.noteObj.list[index].isChecked
    this.props.checkStateChange(objToChange);
  }

  handleChange(e) {
    this.setState({
      description: e.target.value
    })
  }

  /*contents display*/
  addContent() {
    var updatedContents;
    console.log(this.props.noteObj)
    //  if (this.state.value.length > 0) {
    updatedContents = [...this.state.list, { content: this.state.description, isChecked: false }];
    this.setState({
      list: updatedContents,
      description: '',
      // selectedTitleContents: ''
    });
    var contentObj = {
      content: this.state.description, isChecked: false,
      titleid: this.props.noteObj.id
    };
    console.log("OBJECT : ", { content: this.state.description, isChecked: false, titleid: this.props.noteObj.id })
    axios.post('http://localhost:3001/addnotecontent', contentObj, {
      headers: {
        "Authorization": localStorage.getItem('authtoken')
      }
    })
      .then((response) => {
        console.log("axios", response);
        this.props.handleItems(this.props.noteObj.id,contentObj.content,contentObj.isChecked)
      })
      .catch(err => {
        console.error(err);
      });
    // }
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
    var content = {
      marginBottom: '10px'
    }
    return (
      <div className="content_container">
        <div style={{ marginLeft: '6px', paddingTop: '3px', marginTop: '30px' }}>

          <h3>
            {this.props.noteObj.title}
          </h3>

        </div>
        <div className="addcontent">
          <div className="col-md-9 addlist">
            <input type="text" className="form-control  add-todo" value={this.state.description} onChange={(e) => { this.handleChange(e) }} placeholder="Add items" />
          </div><div className="col-md-3"> <Button onClick={this.addContent} style={{ marginBottom: '20px' }}>Add Item</Button>
          </div>

        </div>
        <div className="contentlist" style={{ marginTop: '105px' }}>
          <ListGroup componentClass="ul">
            {/*this.selectedcontents()*/}

            {
              (this.props.noteObj.length != 0) 
              ? (
                this.props.noteObj.list.map((noteEntry, index) => {
                  return (
                    <ListGroupItem key={noteEntry.notesID}>
                      <div className="description">
                        <Checkbox checked={noteEntry.isChecked} value={noteEntry.content}>{noteEntry.content}</Checkbox>
                      </div>
                      <div className="action">
                        <Button style={{
                          marginRight: '15px',
                          marginTop: '3px'
                        }}>
                          <i className="glyphicon glyphicon-pencil"></i>
                        </Button>
                        <Button style={{ marginTop: '3px' }}>
                          <i className="glyphicon glyphicon-trash"></i>
                        </Button>
                      </div>
                    </ListGroupItem>
                  )
                })
              )
              : null 
            }
          </ListGroup>
        </div>
      </div>
    );
  }
}
export default TodoItem;



