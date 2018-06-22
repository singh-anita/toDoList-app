import React, { Component } from 'react';
import { ListGroupItem, Button} from "react-bootstrap";
//import { Link,Redirect } from 'react-router-dom';
import {  Link } from 'react-router-dom';
import './css/dashboard.css';
import axios from 'axios';
import DeleteTitleComp from './deleteTitle'
//import UpdateTitleComp from './updateTitle'


class TitleListGroupComp extends Component {
  componentDidMount(){
    this.setState({ updatevalue : this.props.titleEntry.title })
  }
    constructor(props) {
        super(props);
        this.state = {
          show: true,
          updatevalue: ''
        }
        this.resetForm =this.resetForm.bind(this)
        this.updateSubmitTitle = this.updateSubmitTitle.bind(this);
//        this.linkOnClick = this.linkOnClick.bind(this);
        this.updateHandleChange= this.updateHandleChange.bind(this);
      }
      // resetForm(){
      //   this.setState(this.baseState)
      // }
         /*editing note onclick inputbox comes with button*/
         editTitleClick() {
         // this.props.updateTitleCallback(response.data)
            this.setState({ show: !this.state.show })
          }
           /*editing note onclick inputbox comes with button*/
           resetForm() {
          // this.props.updateTitleCallback(response.data)
             this.setState({ show: !this.state.show,updatevalue : this.props.titleEntry.title })
           }
            /*update list inputbox value change*/
  updateHandleChange(e) {
    //this.props.updateTitleCallback(this.state.updatevalue) 
    this.setState({
      updatevalue: e.target.value
    })
  }
  /*updating contentlist items on button click */
  updateSubmitTitle () {
   console.log("TITLEENTRY", this.props.titleEntry)
  var updateObj = {
       title: this.state.updatevalue,
            titleId:this.props.titleEntry._id
  };
  console.log("update OBJECT  : ", updateObj)
  axios.put('http://localhost:3001/updatenotetitle', updateObj, {
    headers: {
      "Authorization": localStorage.getItem('authtoken')
    }
  })
    .then((response) => {
      console.log("axios update note title", response.data);
      if (response.status === 200) {
        this.props.updateTitleCallback(response.data)   //Call the callback using this.props.[callback] in the child 
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

  /*linkOnClick(){
    this.props.updateState(false)
  }*/
  //onClick={ this.linkOnClick } 
  render() {
return (
        <ListGroupItem bsStyle="success" >
        <div  className="row">
        <div className="descript col-md-7 col-lg-7">
        {
         (this.state.show)?
       <Link to={'/todoItem/' + this.props.titleEntry._id} value={this.props.titleEntry.title} key={this.props.titleEntry._id}> {this.props.titleEntry.title}</Link>
        :
         <input type="text"  onChange={this.updateHandleChange} value={this.state.updatevalue} className="form-control edit" placeholder="Edit Title" />
        
        }
        </div>
         <div className="ttaction col-md-5 col-lg-5">
          {
            (this.state.show)?
              <span>
               <Button bsStyle="info" style={{ marginRight: '6px', marginTop: '0px'}} onClick={this.editTitleClick.bind(this)}>
                <i className="glyphicon glyphicon-pencil"></i>
            </Button>
            <DeleteTitleComp titleId={this.props.titleEntry._id} callBackFromtodoTitle={this.props.callBackFromtodoTitle} updateState={this.props.updateState}/>
            </span>:
            <span>
              <Button  bsStyle="success" style={{ marginRight: '6px' }} onClick={this.updateSubmitTitle} disabled={!this.state.updatevalue}>
              <i className="glyphicon glyphicon-ok"></i>
             </Button>
              <Button bsStyle="warning"  onClick={this.resetForm} >
              <i className="glyphicon glyphicon-remove"></i>
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
