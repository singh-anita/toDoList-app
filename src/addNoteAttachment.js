import React, { Component } from 'react';
import { Button, Form, Col, FormGroup, FormControl, ListGroup, Glyphicon } from "react-bootstrap";
import axios from 'axios';
import ImageListGroupItemComponent from './ImageListGroupComponent';
class AddNoteAttachmentsComponent extends Component {
	/*	componentDidMount() {
			("hello")
			axios.get('http://localhost:3001/getFilesImg/' + this.props.notesId)
				.then((response) => {
					('imageid response', response.data.message.length);
					this.setState({ imageSavedName: response.data.message ,selectedFile:''}, () => {
						('name check', this.state.imageSavedName)
					});
					//this.props.sendImage(this.state.imageSavedName)
				});
	
		}*/
	componentWillReceiveProps(nextProps) {
		console.log("imagerecieveprops", nextProps.notesId)
		console.log("currenyt props", this.props.notesId)
		let {
			notesId
		} = nextProps.notesId
		if (this.props.notesId !== notesId) {
			axios.get('http://localhost:3001/getFilesImg/' + this.props.notesId)
				.then((response) => {
					('imageid response', response.data.message.length);
					this.setState({ imageSavedName: response.data.message, selectedFile: '' }, () => {
						('name check', this.state.imageSavedName)
					});
					//this.props.sendImage(this.state.imageSavedName)
				});
		}
	}
	state = {
		selectedFile: [],
		imageSavedName: []
		//fileUploadList: []
	}

	uploadFile(e) {
		console.log("selectedFile", this.state.selectedFile)
		let formData = new FormData();//create a new FormData() object 
		if (this.state.selectedFile.length > 0) {
			for (var i in this.state.selectedFile) {
				if (!isNaN(i)) {//to exclude length field which is a number so used NaN
					formData.append('imgUploader', this.state.selectedFile[i])	//append our field values.
				}
			}
		}
		/*
			let formData = new FormData();//create a new FormData() object 
			for (var i in this.state.selectedFile) {
				if (!isNaN(i)) {//to exclude length field which is a number so used NaN
					formData.append('imgUploader', this.state.selectedFile[i]);//append our field values.
					//fileUploadList.push(this.state.selectedFile[i])
				}
			}*/
		console.log('selectes file here : -----  ', formData)

		axios.post('http://localhost:3001/fileupload/' + this.props.notesId, formData,
			{
				headers: {
					"Authorization": localStorage.getItem('authtoken')
				}
			})
			.then((response) => {
				console.log('image result', response.data.message)
				if (response.status === 200) {
					("imageslist", this.state.imageSavedName)
					const temp = this.state.imageSavedName.slice();
					response.data.message.map((singleImg) => {
						temp.push({ id: singleImg.id, imageId: singleImg.imageId, savedName: singleImg.savedName,originalName:singleImg.originalName })
						//  ("imgsend",imgSend)
					})
					console.log("tempobharray", temp);
					//   temp.push({id: response.data.message.id,imageId:response.data.message.imageId,savedName: response.data.message.savedName });
					//   ("tempy", temp);
					if (this.state.selectedFile.length > 0) {
						this.setState({ imageSavedName: temp, selectedFile: '' })
					}
				}
			});

	}

	handleGetFiles(e) {
	/*	if(target.value.length > 0){
			callback(target.files)
		} else {
			target.reset();
		}*/
		let fileUploadList = [];
		for (var i in e.target.files) {
			if (!isNaN(i)) {
				fileUploadList.push(e.target.files[i])
			}
		}
		this.setState({ selectedFile: fileUploadList }, () => {
			console.log('GETHAN=DEL check', this.state.selectedFile)
		})

	}
	callBackaddNoteAttachment(objofImages) {
		var templist = this.state.imageSavedName.slice();
		console.log("objofImages for delete", objofImages);
		// this.setState({ list: objofnotestitle })
		templist.map((singleImg, idx) => {
			if (singleImg.imageId !== objofImages.imageId) {

				this.setState({ imageSavedName: objofImages })
			}
		})
	}
	render() {
		return (
			<div className="img" style={{ marginTop: '50px' }}>
				<Form encType="multipart/form-data" style={{ display: 'inline-block', justifyContent: 'center' }}>
					<FormGroup controlId="uploadimage"  >
						<Col md={2} sm={4} md={2} lg={3}>Select Image:
				</Col>
						<Col md={4} sm={4} md={4} lg={5}>
							<FormControl type="file" accept='image/*' name="imgUploader" onChange={this.handleGetFiles.bind(this)} multiple='multiple' />
						</Col>
						<Col md={6} sm={4} md={6} lg={4} style={{ marginTop: '-7px' }}>
							<Button bsStyle="success" onClick={this.uploadFile.bind(this)} disabled={!this.state.selectedFile}>
								<Glyphicon glyph="upload" />Upload
							</Button>
						</Col>
					</FormGroup>
				</Form>
				<div id="t1" className="imageList" style={{ marginTop: '40px' }}>
					<ListGroup componentClass="ul">
						{
							(this.state.imageSavedName.length > 0)
								? (
									this.state.imageSavedName.map((singleImageContent, index) => {
										{console.log("sigleimg",singleImageContent)}
										return (
											<ImageListGroupItemComponent key={index} singleImageEntry={singleImageContent} callBackaddNoteAttachment={this.callBackaddNoteAttachment.bind(this)} />
										);
									})
								) : null
						}
					</ListGroup>
				</div>
			</div>
		)

	}
}
export default AddNoteAttachmentsComponent;
