import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './dashboard.css';
import axios from 'axios';
import { set } from 'mongoose';

class UpdateTitleComp extends Component {
   
      updatetitle(){
       alert("edit")
      // this.props.e()
       //this.setState({ show: !this.state.show })
    }
 
    render() {
        return (
            <Button style={{ marginRight: '5px', marginTop: '3px' }} onClick={this.updatetitle.bind(this)}>
                <i className="glyphicon glyphicon-pencil"></i>
            </Button>
        )
    }
}
export default UpdateTitleComp;

// <div>
// {
// // : <div className="editcontent col-md-12 col-lg-12" >
// <input type="text" value={this.state.updatevalue} className="form-control edit" placeholder="Edit Title" />
// </div>

//   }