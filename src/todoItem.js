import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './dashboard.css';
import Headerhome from './logout';
import axios from 'axios';

class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      description: ''
    };
    this.addContent = this.addContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /*selecting checkbox on selection*/

  /* checkStateChanged(index, e) {
 
     console.log("CHECKBOX CHANGED : ", this.props.noteObj.list[index].isChecked);
     var objToChange = this.props.noteObj;
     objToChange.list[index].isChecked = !this.props.noteObj.list[index].isChecked
     this.props.checkStateChange(objToChange);
   }*/
  /*contents display*/

  componentWillReceiveProps(nextProps) {
    // this.setState({ list:this.props.list })
    console.log(nextProps)
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
    console.log("list", this.props)
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
        temp.push({ isChecked: response.data.isChecked, content: response.data.content, id: response.data._id })
        this.setState({ list:temp ,description:''})
        // this.props.handleItems(this.props.noteObj.id,contentObj.content,contentObj.isChecked)
      })
      .catch(err => {
        console.error(err);
      });
    // }
  }
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
            {/*this.props.noteObj*/}
          </h3>

        </div>
        <div className="addcontent">
          <div className="col-md-9 addlist">
            <input type="text" className="form-control add-todo" value={this.state.description} onChange={(e) => { this.handleChange(e) }} placeholder="Add items" />
          </div><div className="col-md-3"> <Button onClick={this.addContent} style={{ marginBottom: '20px' }}>Add Item</Button>
          </div>
        </div>

        <div className="contentlist" style={{ marginTop: '105px' }}>
          <ListGroup componentClass="ul">
            {/*this.selectedcontents()*/}
            {
              (this.state.list.length != 0)
                ? (
                  this.state.list.map((noteEntry, index) => {
                    return (
                      <ListGroupItem key={noteEntry.notesID}>
                        <div className="description">
                          <Checkbox checked={noteEntry.isChecked} value={noteEntry.content}>{noteEntry.content}</Checkbox>
                        </div>
                        <div className="action">
                          <Button style={{
                            marginRight: '15px',
                            marginTop: '3px'
                          }}>
                            <i className="glyphicon glyphicon-pencil"></i>
                          </Button>
                          <Button style={{ marginTop: '3px' }}>
                            <i className="glyphicon glyphicon-trash"></i>
                          </Button>
                        </div>
                      </ListGroupItem>
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



