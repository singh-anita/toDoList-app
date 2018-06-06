import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './dashboard.css';
import Headerhome from './logout';
import axios from 'axios';
import { set } from 'mongoose';
import TodoItem from './todoItem';

class listGroupCom extends Component {

    componentWillMount(){
        console.log("THIS PROPS : ", this.props.list)
    }

    // constructor(props) {
    //     super(props);
        
     
    //   }

    state = {
      show:true
  };
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
          return(
            <ListGroup componentClass="ul">
         
            {/*this.selectedcontents()*/}
            {
              (this.props.list.length != 0)
                ? (
                  this.props.list.map((noteEntry, index) => {
                    return (
                      <ListGroupItem key={noteEntry.notesID}>
                        <div className="description">
                       
                     <Checkbox onChange={this.checkStateChanged.bind(this,index)} checked={noteEntry.isChecked} value={noteEntry.content}>{noteEntry.content}</Checkbox>
                       
                      </div>
                     
                        <div className="action">
                     
                          <Button style={{
                            marginRight: '15px',
                            marginTop: '3px'
                          }} onClick={this.editingcontent.bind(this,index)}>
                            <i className="glyphicon glyphicon-pencil"></i>
                          </Button>
                       
                          <Button style={{ marginTop: '3px' }} >
                            <i className="glyphicon glyphicon-trash"></i>
                          </Button>
                      
                        }
                        </div>
                      </ListGroupItem>
                    )
                  })
                )
                : null
            }
          </ListGroup>
          )
          }
        
    
}
export default listGroupCom;