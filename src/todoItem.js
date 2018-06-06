import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './dashboard.css';
import Headerhome from './logout';
import axios from 'axios';
import { set } from 'mongoose';
import ListGroupComp  from './listgroupComponent';
class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      description: ''
    };
    this.addContent = this.addContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
   // this.checkStateChanged=this.checkStateChanged.bind(this);
  }

  /*selecting checkbox on selection*/

  
   componentWillMount()
   {
     console.log("currprops",this.props.params.id)
    /* let {
        id
      } = this.props.params.id*/
      if(this.props.params.id){
      // call todoitems using id
      axios.get('http://localhost:3001/getnotecontent/' + this.props.params.id ,
    {
       headers: {
         "Authorization": localStorage.getItem('authtoken')
       }
     })
       .then((response) => {
       // this.props.x(response.data) 
            //Call the callback using this.props.[callback] in the child 
          this.setState({ list : response.data })
         }).catch(function (error) {
    console.log("error",error.response);
});
    }
 
   }
  /*contents display*/

  componentWillReceiveProps(nextProps) {
    // this.setState({ list:this.props.list })
    console.log("nextprops",nextProps.params)
    console.log("currprops",this.props.params.id)
    let {
      id
    } = nextProps.params 
    if(id && this.props.params.id !== id){
      
      // call todoitems using id
      axios.get('http://localhost:3001/getnotecontent/' + id ,
    {
       headers: {
         "Authorization": localStorage.getItem('authtoken')
       }
     })
       .then((response) => {
       // this.props.x(response.data) 
            //Call the callback using this.props.[callback] in the child 
console.log(response.data)
          this.setState({ list : response.data })
         }).catch(function (error) {
    console.log("error",error.response);
});
    }
  //  console.log("xcdfcth : ", this.props, this.props.keyz)
  }

  addContent() {
    var updatedContents;
    //console.log(this.props.noteObj)
    console.log("props", this.props)
    console.log(this.props.params)
    //  if (this.state.value.length > 0) {
   /* updatedContents = [...this.state.list, { content: this.state.description, isChecked: false }];
    this.setState({
      list: updatedContents,
      description: '',
      // selectedTitleContents: ''
    });*/
    var contentObj = {
      content: this.state.description, isChecked: false,
      titleid: this.props.params.id
    };
    console.log("OBJECT : ", contentObj)
    axios.post('http://localhost:3001/addnotecontent', contentObj, {
      headers: {
        "Authorization": localStorage.getItem('authtoken')
      }
    })
      .then((response) => {
        console.log("axios", response.data);
        const temp = this.state.list.slice()
        console.log(temp)
        temp.push({  content: response.data.content,isChecked: response.data.isChecked, id: response.data._id })
        this.setState({ list:temp ,description:''})
        // this.props.handleItems(this.props.noteObj.id,contentObj.content,contentObj.isChecked)
      })
      .catch(err => {
        console.error(err);
      });
    // }
  }
  /*adding content inputbox value change*/
  handleChange(e) {
    this.setState({
      description: e.target.value
    })
  }
  /*contents display*/

  render() {
    var edit = {
      marginRight: '15px',
      marginTop: '3px'
    }
    var delet = {
      marginTop: '3px'
    }
    var content = {
      marginBottom: '10px'
    }

    return (
      <div className="content_container">
        <div style={{ marginLeft: '6px', paddingTop: '3px', marginTop: '30px' }}>

          <h3>
            {this.props.titlename}
          </h3>

        </div>
        <div className="addcontent">
          <div className="col-md-9 addlist">
            <input type="text" className="form-control add-todo" value={this.state.description} onChange={(e) => { this.handleChange(e) }} placeholder="Add items" />
          </div><div className="col-md-3"> <Button onClick={this.addContent} style={{ marginBottom: '20px' }}>Add Item</Button>
          </div>
        </div>

        <div className="contentlist" style={{ marginTop: '105px' }}>
         in here 
          <ListGroupComp list={this.state.list}></ListGroupComp>
         
        </div>
      </div>
    );
  }
}
export default TodoItem;



