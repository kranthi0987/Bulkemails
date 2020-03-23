import React, {Component} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
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
import {setOptions} from "filepond";
import {BASEURL} from '../../../Constants'

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

class MultiMediaMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from_who: localStorage.getItem('phone'),
            to_who: '',
            message_status: '',
            message: '',
            submitted: false,
            loading: false,
            error: '',
            tmpArray: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);
        setOptions({
            server: {
                url: BASEURL,
                timeout: 7000,
                process: {
                    url: 'mediaupload/fileupload/',
                    method: 'POST',
                    headers: {},
                    withCredentials: false,
                    onload: (response) => {
                        this.state.tmpArray.push(response);
                        console.log(response);
                        console.log(this.state.tmpArray);
                        this.checkandsend()
                    },
                    onerror: (response) => console.log(response.data),
                    // ondata: (formData) => {
                    //     formData.append('Hello', 'World');
                    //     return formData;
                    // }
                },
                // revert: './revert',
                // restore: './restore/',
                // load: './load/',
                // fetch: './fetch/'
            }
        });
    }

    checkandsend() {
        console.log(this.state.tmpArray + 'inside check and send');
        if (this.state.submitted) {
            let arraydata = this.state.tmpArray
            for (var i = 0; i <= arraydata.length; i++) {
                var json_oject = JSON.parse(arraydata[i])
                this.Apicalling(json_oject);
            }
        }
    }

    Apicalling(json_oject) {
        const {to_who, message} = this.state;

        let url = BASEURL + 'mediaupload/multimediamessages/';
        const inputFiles = document.querySelectorAll('input[type="file"]');

        console.log(json_oject)
        let formData = new FormData();
        for (const file of inputFiles) {
            formData.append('vcardfile', file.files[0]);
        }
        var fileName = json_oject.filepond;
        console.log(fileName);
        var body_url = fileName.substr(fileName.indexOf('/') + 1);
        console.log(body_url);
        formData.append('from_who', localStorage.getItem('phone'));
        formData.append('phone', '91' + to_who);
        formData.append('body', BASEURL + body_url);
        // formData.append('body', 'https://i.ibb.co/5vv5V8s/asunabg.png');
        formData.append('filename', json_oject.filepond.split('/').pop());
        formData.append('caption', message);
        formData.append('content_type', 'image');
        formData.append('sent_status', 'true');

        fetch(url, {
            method: "POST",
            headers: ({}),
            body: formData
        }).then(response => {
            if (response.status === 200) {
                console.log(response);
                toaster.notify("Successfull message sent", {
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

    handleSubmit(e) {
        e.preventDefault();
	     const {from_who = ['9391007969'], to_who, message_status, submitted, message} = this.state;
        // stop here if form is invalid
        if (!(message)) {
            return;
        }
        this.setState({submitted: true});
        console.log(to_who, message);
        this.checkandsend();
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
                                <strong>Multi Media Message</strong> Whatsapp
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
                                            <Label htmlFor="file-input">Vcard </Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="file" id="file-input" accept=".csv" name="vcardfile"/>
                                          <a href={BASEURL + 'media/samplecsv/excel.csv'} download>Click to download
                                            samplecsv</a>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="file-multiple-input">Multiple File input</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            {/*<Input type="file" id="file-multiple-input" name="file-multiple-input"*/}
                                            {/*       multiple/>*/}
                                            <FilePond allowMultiple={true} maxFiles={3}/>
                                            <p>Max Files:<strong>3</strong></p>
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
                                            <div className="help-block">Text under the file</div>
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

export default MultiMediaMessages;
