import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
//import { Link,Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TodoItem from './todoItem';
import './dashboard.css';
import axios from 'axios';
import DeleteTitleComp from './deleteTitle'
//import UpdateTitleComp from './updateTitle'


class TitleListGroupComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: true,
          updatevalue: ''
        }
        this.updateTitle = this.updateTitle .bind(this);
        this.updateChange= this.updateChange.bind(this);
      }
         /*editing note onclick inputbox comes with button*/
         editingtitle() {
            this.setState({ show: !this.state.show })
          }
            /*update list inputbox value change*/
  updateChange(e) {
    this.setState({
      updatevalue: e.target.value
    })
  }
  /*updating contentlist items on button click */
  updateTitle () {
    console.log("halo sree")
    alert("clicked")
   console.log("TITLEENTRY", this.props.titleEntry)
  var updateObj = {
       title: this.state.updatevalue,
            titleId:this.props.titleEntry._id
  };
  console.log("OBJECT : ", updateObj)
  axios.post('http://localhost:3001/updatenotetitle', updateObj, {
    headers: {
      "Authorization": localStorage.getItem('authtoken')
    }
  })
    .then((response) => {
      console.log("axios", response.data);
      if (response.status === 200) {
        this.props.t(response.data)   //Call the callback using this.props.[callback] in the child 
        this.setState({ show: true })
      /* this.setState({
          content:updateObj.content,
          isChecked: updateObj.isChecked,
          contentId:updateObj._id,
          show: true
        })*/
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  render() {
return (
    <Link to={'/todoItem/' + this.props.titleEntry._id}>
        <ListGroupItem key={this.props.titleEntry._id} bsStyle="success" value={this.props.titleEntry.title}>
        <div className="description">
        {
         (this.state.show)?
         <span>
        {this.props.titleEntry.title}</span>
        :<div className="edittitle col-md-10 col-lg-10" >
         <input type="text"  onChange={this.updateChange} value={this.state.updatevalue} className="form-control edit" placeholder="Edit Title" />
         </div>
        }
        </div>
         <div className="ttaction">
          {
            (this.state.show)?
              <span>
               <Button style={{ marginRight: '5px', marginTop: '0px' ,paddingBottom:'0px'}} onClick={this.editingtitle.bind(this)}>
                <i className="glyphicon glyphicon-pencil"></i>
            </Button>
            <DeleteTitleComp titleId={this.props.titleEntry._id} u={this.props.u}/>
            </span>:
              <Button style={{ float: 'left',marginTop: '-36px' }} onClick={this.updateTitle}>Save</Button>
          }
        </div>

        </ListGroupItem>
    </Link>
)
  }
}
export default TitleListGroupComp;

{/* <div className="description">
          {
            (this.state.show) ?
              <Checkbox onChange={this.checkStateChanged.bind(this, this.props.index)} checked={this.props.isChecked} value={this.props.noteEntry.content}>{this.props.noteEntry.content}</Checkbox>
              : <div className="editcontent col-md-12 col-lg-12" >
                <input type="text" onChange={this.updateChange} value={this.state.updatevalue} className="form-control edit" placeholder="Edit Content" />
              </div>
          }
        </div>
        <div className="action">
          {
            (this.state.show) ?
              <span>
                <Button style={{ marginRight: '15px', marginTop: '3px' }} onClick={this.editingcontent.bind(this)}>
                  <i className="glyphicon glyphicon-pencil"></i>
                </Button>
                <DeleteContentComp item={this.props.noteEntry.id} /></span> :
              <Button style={{ float: 'left' }} onClick={this.updateContent}>Save</Button>
          }
        </div> */}