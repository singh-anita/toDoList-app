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
        this.updateTitle = this.updateTitle.bind(this);
        this.linkOnClick = this.linkOnClick.bind(this);
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
   console.log("TITLEENTRY", this.props.titleEntry)
  var updateObj = {
       title: this.state.updatevalue,
            titleId:this.props.titleEntry._id
  };
  console.log("OBJECT : ", updateObj)
  axios.put('http://localhost:3001/updatenotetitle', updateObj, {
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

  linkOnClick(){
    this.props.updateState(false)
  }

  render() {
return (
        <ListGroupItem bsStyle="success" >
        <div  className="row">
        <div className="descript col-md-7 col-lg-7">
        {
         (this.state.show)?
       <Link onClick={ this.linkOnClick } to={'/todoItem/' + this.props.titleEntry._id} value={this.props.titleEntry.title} key={this.props.titleEntry._id}> {this.props.titleEntry.title}</Link>
        :
         <input type="text"  onChange={this.updateChange} value={this.state.updatevalue} className="form-control edit" placeholder="Edit Title" />
        
        }
        </div>
         <div className="ttaction col-md-5 col-lg-5">
          {
            (this.state.show)?
              <span>
               <Button bsStyle="info" style={{ marginRight: '6px', marginTop: '0px'}} onClick={this.editingtitle.bind(this)}>
                <i className="glyphicon glyphicon-pencil"></i>
            </Button>
            <DeleteTitleComp titleId={this.props.titleEntry._id} u={this.props.u} updateState={this.props.updateState}/>
            </span>:
            <span>
              <Button  bsStyle="success" style={{ marginRight: '6px' }} onClick={this.updateTitle} disabled={!this.state.updatevalue}>
              <i className="glyphicon glyphicon-ok"></i>
             </Button>
              <Button bsStyle="warning"  onClick={this.resetForm}>
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
