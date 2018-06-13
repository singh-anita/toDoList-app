import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
//import { Link,Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TodoItem from './todoItem';
import './css/dashboard.css';
import axios from 'axios';
import DeleteTitleComp from './deleteTitle'
//import UpdateTitleComp from './updateTitle'


class TitleListGroupComp extends Component {
  componentDidMount(){
    this.setState({ updatevalue : this.props.titleEntry.title },
    () =>{
      this.baseState = this.state
    })
  }
    constructor(props) {
        super(props);
        this.state = {
          show: true,
          updatevalue: ''
        }
        this.resetForm =this.resetForm.bind(this)
        this.updateTitle = this.updateTitle .bind(this);
        this.updateChange= this.updateChange.bind(this);
      }
      resetForm(){
        this.setState(this.baseState)
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
        <ListGroupItem bsStyle="success" >
        <div  className="row">
        <div className="descript col-md-7 col-lg-7">
        {
         (this.state.show)?
       <Link to={'/todoItem/' + this.props.titleEntry._id} value={this.props.titleEntry.title} key={this.props.titleEntry._id}> {this.props.titleEntry.title}</Link>
        :
         <input type="text"  onChange={this.updateChange} value={this.state.updatevalue} className="form-control edit" placeholder="Edit Title" />
        
        }
        </div>
         <div className="ttaction col-md-5 col-lg-5">
          {
            (this.state.show)?
              <span>
               <Button style={{ marginRight: '6px', marginTop: '0px'}} onClick={this.editingtitle.bind(this)}>
                <i className="glyphicon glyphicon-pencil"></i>
            </Button>
            <DeleteTitleComp titleId={this.props.titleEntry._id} u={this.props.u}/>
            </span>:
            <span>
              <Button style={{ marginRight: '6px' }} onClick={this.updateTitle}>
              <i class="glyphicon glyphicon-ok"></i>
             </Button>
              <Button onClick={this.resetForm}>
              <i class="glyphicon glyphicon-remove"></i>
              </Button>
              </span>
          }
        </div>
     </div>
        </ListGroupItem>
   
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