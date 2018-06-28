import React, { Component } from 'react';
import { Button, Form, Col, FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import axios from 'axios';

class AddNoteAttachmentsComponent extends Component {
/*	 componentDidMount() {
		 console.log("hello")
		axios.get('http://localhost:3001/getFilesImg/'+this.props.notesId,
        {
          headers: {
            "Authorization": localStorage.getItem('authtoken')
          }
        })
			.then((response) => {
				console.log('imageid response', response.data)
			});

	}*/
		// this.setState({ fileUploadList: this.props.fileUploadList, previewImageList: this.props.previewImageList })
	 
	state = {
		selectedFile: '',
			//fileUploadList: [],
		//	previewImageList: []
	}

	uploadFile(e) {
		alert("clicked" +this.props.notesId)
		console.log("selectedFile", this.state.selectedFile)
		let formData = new FormData();//create a new FormData() object 

		for (var i in this.state.selectedFile) {
			if (!isNaN(i)) {//to exclude length field which is a number so used NaN
				formData.append('selectedFile', this.state.selectedFile[i]);//append our field values.
				//fileUploadList.push(this.state.selectedFile[i])
			}
		}
		console.log('selectes file here : -----  ', formData)

		axios.post('http://localhost:3001/fileupload/'+this.props.notesId, formData,
        {
          headers: {
            "Authorization": localStorage.getItem('authtoken')
          }
        })
			.then((response) => {
				console.log('imageid result', response.data)
			//	if (response.status === 200) {
                   // var fileUploadObjArray = this.state.fileUploadList.slice();
                     //  console.log(fileUploadObjArray)
				/*	fileUploadObjArray.push({ _id: response.data._id, title: response.data.title })
            
                    if (this.state.value.length > 0) {
                        this.setState({ list: titleObjArray, value: '' })
                        console.log(this.state.list)
                     //   this.props.updateState(false)
                    }*/

                //}
			});

	}

	handleGetFiles(e) {
		this.setState({ selectedFile: e.target.files })
	}


	render() {
		return (

			<Form encType="multipart/form-data">
				<FormGroup controlId="uploadimage" style={{ marginBottom: 25 }} >
					<Col md={2} sm={4} md={2} lg={2}>Select Image:
				</Col>
					<Col md={4} sm={4} md={4} lg={4}>
						<FormControl type="file" name="imgUploader" onChange={this.handleGetFiles.bind(this)} multiple />
					</Col>
					<Col md={6} sm={4} md={6} lg={6}>
						<Button bsStyle="success" onClick={this.uploadFile.bind(this)}><Glyphicon glyph="upload" />Upload</Button>
					</Col>
				</FormGroup>
			</Form>

		)
	}
}
export default AddNoteAttachmentsComponent;
