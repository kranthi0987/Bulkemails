import React, {Component} from 'react';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';
// Import React FilePond
import {FilePond, registerPlugin} from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import {BASEURL} from "../../../Constants";

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: true,
            fadeIn: true,
            timeout: 30
        };
        this.state = {
            from_who: localStorage.getItem('phone'),
            to_who: '',
            message_status: '',
            message: '',
            submitted: false,
            loading: false,
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {from_who = ['9989015918'], to_who, message_status, message} = this.state;

        // stop here if form is invalid
        if (!(to_who && message)) {
            return;
        }
        console.log(to_who, message);

        this.setState({loading: true});

        let url = BASEURL+'message/singlemessage/';


        let formData = new FormData();
        formData.append('from_who', localStorage.getItem('phone'));
        formData.append('phone', '91'+to_who);
        formData.append('body', message);
        formData.append('sent_status', 'true');

        fetch(url, {
            method: "POST",
            headers: ({}),
            body: formData
        }).then(response => {
            if (response.status === 200) {
                console.log(response);
                toaster.notify("Sucessfull message sent", {
                    duration: 2000, type: "success"
                });
                this.clearForm();
                return response.json()
            } else {
                console.log("oh no!", response.status === 404)
            }
        }).then(function (data) {
            console.log('request succeeded with JSON response', data)
        })


    }

    clearForm() {
        this.setState({submitted: false});
        this.setState({to_who: '', message: ''}) // <= here
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {
        const {from_who, to_who, message_status, submitted, message} = this.state;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Single Message</strong> Whatsapp
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label>From </Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <p className="form-control-static"><strong>{localStorage.getItem('phone')}</strong></p>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Mobile Number</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="text-input" name="to_who" value={to_who}
                                                   onChange={this.handleChange}
                                                   placeholder="Mobile number"/>
                                            {submitted && !to_who &&
                                            <div className="help-block">Mobilenumber is required</div>
                                            }
                                            <FormText color="muted">Enter Mobile Number with Country Code</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="textarea-input">Message</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="textarea" name="message" id="textarea-input" rows="9"
                                                   value={message} onChange={this.handleChange}
                                                   placeholder="Message Content..."/>
                                            {submitted && !message &&
                                            <div className="help-block">message is required</div>
                                            }
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}><i
                                    className="fa fa-dot-circle-o"></i> Submit</Button>
                                <Button type="reset" size="sm" color="danger"><i
                                    className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Messages;
