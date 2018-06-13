import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './css/dashboard.css';
import Headerhome from './logout';
import axios from 'axios';
import { set } from 'mongoose';
import ListGroupComp from './listgroupComponent';
class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      description: '',
      titlename:''
    };
    this.addContent = this.addContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /*selecting checkbox on selection*/


  componentWillMount() {
    console.log("currprops", this.props.params.id);
    if (this.props.params.id) {
      // call todoitems using id
      axios.get('http://localhost:3001/getnotecontent/' + this.props.params.id,
        {
          headers: {
            "Authorization": localStorage.getItem('authtoken')
          }
        })
        .then((response) => {
          console.log("what response",response.data)
          // this.props.x(response.data) 
          //Call the callback using this.props.[callback] in the child 
          if (response.status === 200) {
         //   console.log("what obj",response.data)
            this.setState({ list: response.data.entries,titlename:response.data.note_title })
          }
        }).catch(function (error) {
          console.log("error", error.response);
        });
    }

  }

  /*contents display*/
  componentWillReceiveProps(nextProps) {
    console.log("nextprops", nextProps.params)
    console.log("currprops", this.props.params.id)
    let {
      id
    } = nextProps.params
    if (id && this.props.params.id !== id) {

      // call todoitems using id
      axios.get('http://localhost:3001/getnotecontent/' + id,
        {
          headers: {
            "Authorization": localStorage.getItem('authtoken')
          }
        })
        .then((response) => {
          // this.props.x(response.data) 
          //Call the callback using this.props.[callback] in the child 
          console.log("for title check",response.data)
          if (response.status === 200) {
            this.setState({ list: response.data.entries ,titlename:response.data.note_title})
          }
        }).catch(function (error) {
          console.log("error", error.response);
        });
    }
  }
  /*adding contentlist items on button click*/
  addContent() {
    var updatedContents;
    console.log("props", this.props.params)
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
        if (response.status === 200) {
          const temp = this.state.list.slice()
          console.log(temp)
          temp.push({ content: response.data.content, isChecked: response.data.isChecked, id: response.data._id })
          if (this.state.description.length > 0) {
          this.setState({ list: temp, description: '' })
          // this.props.handleItems(this.props.noteObj.id,contentObj.content,contentObj.isChecked)
          }
        }
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

  /*Define a callback in my parent which takes the data I need in as a parameter.*/
  x(objFromupdatingcontent) {
    console.log("list", this.state.list)
    var templist = this.state.list.slice()
    // console.log("chhhh",templist)
    console.log("qq", objFromupdatingcontent)

    templist.map((c, idx) => {
      if (c.id === objFromupdatingcontent._id) {
        c.content = objFromupdatingcontent.content,
          c.isChecked = objFromupdatingcontent.isChecked
      }
    })
    this.setState({ list: templist })
    // this.setState({  list: objFromupdatingcontent})
  }
  y(objFromcontent) {
    // console.log("list", this.state.list)
    var templist = this.state.list.slice()
    console.log("chhhh", objFromcontent)

    // templist.map((c, idx) => {
    //   if (c.id != objFromcontent._id) {
    //     c.content = objFromcontent.content,
    //     c.isChecked = objFromcontent.isChecked
    //   }
     // return c.id != objFromcontent._id
    // })
    templist.map((c, idx) => {
    this.setState({ list:  objFromcontent })
    })
  }

  checkboxChange(objToChange){
    this.setState({ list: objToChange })
  }
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
            {this.state.titlename}
          </h3>
        </div>
      
        <div className="addcontent">
          <div className="col-md-9 addlist">
            <input type="text" className="form-control add-todo" value={this.state.description} onChange={(e) => { this.handleChange(e) }} placeholder="Add items" />
          </div>
          <div className="col-md-3">
            <Button onClick={this.addContent} style={{ marginBottom: '20px' }} disabled={!this.state.description}>Add Item</Button>
          </div>
        </div>
      
        
        <div className="contentlist" style={{ marginTop: '105px' }}>
          {/*this.selectedcontents()*/}
          
          <ListGroup componentClass="ul">
            {
              (this.state.list.length != 0)
                ? (

                  this.state.list.map((noteEntry, index) => {
                    return (
                      <ListGroupComp noteEntry={noteEntry} index={index} x={this.x.bind(this)} y={this.y.bind(this)} checkboxChange={this.checkboxChange.bind(this)} />
                    )
                  })
                )
                : null
            }
          </ListGroup>
        </div>
      </div>
          
    );
  }
}
export default TodoItem;



