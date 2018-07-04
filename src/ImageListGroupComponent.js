import React, { Component } from 'react';
import { ListGroupItem, Button, Checkbox } from "react-bootstrap";
import axios from 'axios';

class ImageListGroupItemComponent extends Component {
    deleteClicked() {
        //  console.log("id",id)
        alert("cccc")
        console.log("OBJECT check: ", this.props.singleImageEntry.imageId)
        axios.delete('http://localhost:3001/deleteImage/' + this.props.singleImageEntry.imageId, {
            headers: {
                "Authorization": localStorage.getItem('authtoken')
            }
        })
            .then((response) => {
                console.log("daass", response.data)
                if (response.status === 200) {
                    console.log("axios delete img", response.data);
                    this.props.callBackaddNoteAttachment(response.data)
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
    render() {
        return (
            <ListGroupItem key={this.props.singleImageEntry.notesID}>
                <div className="description">
                    <a href={'http://localhost:3001/images/' + this.props.singleImageEntry.savedName} download>
                        <img src={'http://localhost:3001/images/' + this.props.singleImageEntry.savedName} height={75} width={75} />
                        <span style={{ marginLeft: '15px' }}> {this.props.singleImageEntry.savedName}</span>
                    </a>
                </div>
                <div className="deleteaction" style={{ float: 'right' }}>
                    <Button bsStyle="danger" style={{ marginTop: '19px' }} onClick={this.deleteClicked.bind(this)} >
                        <i className="glyphicon glyphicon-trash"></i>
                    </Button>
                </div>
            </ListGroupItem>
        )
    }
}
export default ImageListGroupItemComponent;