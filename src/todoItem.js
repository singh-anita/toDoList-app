import React, { Component } from 'react';
import { ListGroup, Button } from "react-bootstrap";
import './css/dashboard.css';
import axios from 'axios';
import ListGroupComp from './listgroupComponent';
import AddNoteAttachmentsComponent from './addNoteAttachment';

class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      description: '',
      titlename: ''
    };
    this.addContent = this.addContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

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
          if (response.status === 200) {
            this.setState({ list: response.data.entries, titlename: response.data.note_title })
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

      axios.get('http://localhost:3001/getnotecontent/' + id,
        {
          headers: {
            "Authorization": localStorage.getItem('authtoken')
          }
        })
        .then((response) => {
          if (response.status === 200) {
            this.setState({ list: response.data.entries, titlename: response.data.note_title })

          }
        }).catch(function (error) {
          console.log("error", error.response);
        });
    }
  }
  /*adding contentlist items on button click*/
  addContent() {

    var contentObj = {
      content: this.state.description, isChecked: false,
      titleid: this.props.params.id
    };
    console.log("OBJECT : ", contentObj);
    axios.post('http://localhost:3001/addnotecontent', contentObj, {
      headers: {
        "Authorization": localStorage.getItem('authtoken')
      }
    })
      .then((response) => {
        if (response.status === 200) {
          const temp = this.state.list.slice();
          // console.log(temp);
          temp.push({ content: response.data.content, isChecked: response.data.isChecked, id: response.data._id });
          if (this.state.description.length > 0) {
            this.setState({ list: temp, description: '' })
          }
        }
      })
      .catch(err => {
        console.error(err);
      });

  }
  /*adding content inputbox value change*/
  handleChange(e) {
    this.setState({
      description: e.target.value
    })
  }

  /*Define a callback in my parent which takes the data I need in as a parameter.*/
  updateContentCallback(objFromupdatingcontent) {
    console.log("list", this.state.list)
    var templist = this.state.list.slice()
    // console.log("chhhh",templist)

    templist.map((c, idx) => {
      if (c.id === objFromupdatingcontent._id) {
        return (
          c.content = objFromupdatingcontent.content,
          c.isChecked = objFromupdatingcontent.isChecked
        )
      }
    })
    this.setState({ list: templist })
  }
  todoContentcallBack(objFromcontent) {

    var templist = this.state.list.slice();
    // templist.map((c, idx) => {
    //   if (c.id != objFromcontent._id) {
    //     c.content = objFromcontent.content,
    //     c.isChecked = objFromcontent.isChecked
    //   }
    // return c.id != objFromcontent._id
    // })
    templist.map((c, idx) => {
      this.setState({ list: objFromcontent })
    })
  }

  checkboxChange(idx) {

    var temp = this.state.list.slice();

    temp.map((n, i) => {
      if (i == idx) {
        n.isChecked = !n.isChecked
      }
    })

    this.setState({ list: temp })
  }
  render() {


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
            <Button bsStyle="success" onClick={this.addContent} style={{ marginBottom: '20px' }} disabled={!this.state.description}>Add Item</Button>
          </div>
        </div>


        <div className="contentlist" style={{ marginTop: '105px' }}>

          <ListGroup componentClass="ul">
            {
              (this.state.list.length !== 0)
                ? (

                  this.state.list.map((noteEntry, index) => {
                    { console.log("noteentry:", noteEntry) }
                    return (
                      <ListGroupComp key={index} noteEntry={noteEntry} index={index} updateContentCallback={this.updateContentCallback.bind(this)} callBackFromtodoItem={this.todoContentcallBack.bind(this)} checkboxChange={this.checkboxChange.bind(this)} />
                    )
                  })
                )
                : null
            }
          </ListGroup>
        
        </div>
        <AddNoteAttachmentsComponent/>
      </div>

    );
  }
}
export default TodoItem;



