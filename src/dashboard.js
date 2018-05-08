import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Panel, Button, FormGroup, FormControl, ControlLabel,Checkbox } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './dashboard.css';

class Dashboard extends Component {
    render() {
        var material = {
            marginRight: 10
        }
        return (
            <div class="container">
                <header class="page-title">
                    <h1><i class="material-icons" style={material}>view_list</i>TODO</h1>

                    <div class="tag"> An easy way to manage your work</div>
                </header>
                <div class="addlist col-md-6">
                    <input type="text" class="form-control add-todo" placeholder="Add todo" />
                </div>
                <div class="cont_add_titulo_cont"><a href="#e" onclick="add_new()"><i class="material-icons"></i></a>
                </div>
                <div class="todo-in-progress">
                    <h2> Working tasks</h2>
                    <div class="left_menu">
                        <ListGroup>
                            <ListGroupItem bsStyle="success">Success</ListGroupItem>
                            <ListGroupItem bsStyle="info">Info</ListGroupItem>
                            <ListGroupItem bsStyle="warning">Warning</ListGroupItem>
                            <ListGroupItem bsStyle="danger">Danger</ListGroupItem>
                        </ListGroup>
                    </div>
                    <div class="content_container">
                        <Panel bsStyle="primary">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Panel heading<i class="material-icons md-36-title icon-delete">delete</i></Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                            <div class="description">
                                 <Checkbox>Panel content</Checkbox>
                                </div>
                                <div class="action"> <i class="material-icons md-36-con icon-edit">mode_edit</i>
                                <i class="material-icons md-36-con icon-delete">delete</i>
                                </div>
                           
                            </Panel.Body>
                        </Panel>

                        <Panel bsStyle="success">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Panel heading<i class="material-icons md-36-title icon-delete">delete</i></Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                            <div class="description">
                                 <Checkbox>Panel content</Checkbox>
                                </div>
                                <div class="action">
                                <i class="material-icons md-36-con">mode_edit</i>
                                <i class="material-icons md-36-con icon-delete">delete</i>
                                </div>
                                </Panel.Body>
                        </Panel>

                        <Panel bsStyle="info">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Panel heading<i class="material-icons md-36-title icon-delete">delete</i></Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                            <div class="description">
                                 <Checkbox>Panel content</Checkbox>
                                </div>
                            <div class="action">
                            <i class="material-icons md-36-con icon-edit">mode_edit</i>
                                <i class="material-icons md-36-con icon-delete">delete</i>
                                </div>
                                </Panel.Body>
                        </Panel>

                        <Panel bsStyle="warning">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Panel heading<i class="material-icons md-36-title icon-delete">delete</i></Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                            <div class="description">
                                 <Checkbox>Panel content</Checkbox>
                                </div>
                            <div class="action">
                                <i class="material-icons md-36-con">mode_edit</i>
                                <i class="material-icons md-36-con icon-delete">delete</i>
                                </div>
                                </Panel.Body>
                        </Panel>

                        <Panel bsStyle="danger">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Panel heading<i class="material-icons md-36-title icon-delete">delete</i></Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                            <div class="description">
                                 <Checkbox>Panel content</Checkbox>
                                </div>
                            <div class="action">
                                <i class="material-icons md-36-con">mode_edit</i>
                                <i class="material-icons md-36-con icon-delete">delete</i>
                            </div>
                                </Panel.Body>
                        </Panel>
                    </div>
                </div>
            </div>


        );
    }
}
export default Dashboard;