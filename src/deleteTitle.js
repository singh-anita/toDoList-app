import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './dashboard.css';
import axios from 'axios';
import { set } from 'mongoose';
class DeleteTitleComp extends Component {
    /*deleting content onclick content item deleted*/
    constructor(props) {
        super(props);
        console.log('deleted title --------------------', this.props);
    }

    deletetitle() {
        alert("clicked")
        console.log("OBJECT dete: ", this.props.item)
      /* axios.delete('http://localhost:3001/deletenotetitle/' + this.props.item, {
            headers: {
                "Authorization": localStorage.getItem('authtoken')
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("axios delete title", response.data);
                   // this.props.y(response.data)
                }
            })
            .catch(err => {
                console.error(err);
            });*/
    }
    render() {
        return (
            <Button style={{ marginTop: '3px' }} onClick={this.deletetitle.bind(this)}>
                <i className="glyphicon glyphicon-trash"></i>
            </Button>
        )
    }
}
export default DeleteTitleComp