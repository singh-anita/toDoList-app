import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './dashboard.css';
import axios from 'axios';
import { set } from 'mongoose';

class UpdateTitleComp extends Component {
    editingtitle(){
        alert("edit")
    }
    render() {
        return (
            <Button style={{ marginRight: '5px', marginTop: '3px' }} onClick={this.editingtitle.bind(this)}>
                <i className="glyphicon glyphicon-pencil"></i>
            </Button>

        )
    }
}
export default UpdateTitleComp;