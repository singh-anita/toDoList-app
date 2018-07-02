import React, { Component } from 'react';
import { ListGroupItem, Button, Checkbox } from "react-bootstrap";
import axios from 'axios';

class ImageListGroupItemComponent extends Component {

        render() {
            return (
                <ListGroupItem key={this.props.index}>
                    <div className="description">
                        <a href={'http://localhost:3001/images/' + this.props.singleImageEntry.savedName} download>
                            <img src={'http://localhost:3001/images/' + this.props.singleImageEntry.savedName} height={100} width={100} />
                        </a>
                    </div>
                </ListGroupItem>
            )
        }
    }
    export default ImageListGroupItemComponent;