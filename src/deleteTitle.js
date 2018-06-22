import React, { Component } from 'react';
import { Button} from "react-bootstrap";
import './css/dashboard.css';
import axios from 'axios';

class DeleteTitleComp extends Component {
    /*deleting content onclick content item deleted*/
    constructor(props) {
        super(props);
       // console.log('deleted title --------------------', this.props);
    }

    deletetitle() {
        console.log("OBJECT check: ", this.props.titleId)
       axios.delete('http://localhost:3001/deletenotetitle/' + this.props.titleId, {
            headers: {
                "Authorization": localStorage.getItem('authtoken')
            }
        })
            .then((response) => {
                console.log("daass",response.data)
               if (response.status === 200) {
                    console.log("axios delete title", response.data);
                   this.props.callBackFromtodoTitle(response.data)
                   if(Object.keys(response.data).length ==0)
                   this.props.updateState(true);
                //}*/
               }
            })
            .catch(err => {
                console.error(err);
            });
    }
    render() {
        return (
            <Button  bsStyle="danger" style={{ marginTop: '0px'}} onClick={this.deletetitle.bind(this)}>
                <i className="glyphicon glyphicon-trash"></i>
            </Button>
        )
    }
}
export default DeleteTitleComp