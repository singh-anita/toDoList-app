import React, { Component } from 'react';
import { Row, Button, Form, Col, FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';

class AddNoteAttachmentsComponent extends Component {
	render() {
		return (

			<Form enctype="multipart/form-data">
				<FormGroup controlId="loginEmail" style={{ marginBottom: 25 }} >

						<Col md={6} sm={12} md={6} lg={6}>
							<FormControl type="file" />
						</Col>
						<Col  md={6} sm={12} md={6} lg={6}>
							<Button id="btn-login" bsStyle="success btn-lg" >
								<Glyphicon glyph="upload" />
							</Button>
						</Col>

					{/* {(this.state.isInvalidEmail && this.state.touched) ? <div>Invalid email format!</div> : null} */}

				</FormGroup>
			</Form>

		)
	}
}
export default AddNoteAttachmentsComponent;