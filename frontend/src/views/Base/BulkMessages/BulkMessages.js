import React, {Component} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label, Row,} from 'reactstrap';
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import {BASEURL} from '../../../Constants'
import EmailEditor from 'react-email-editor'
import {ReactMultiEmail} from "react-multi-email";
import "react-multi-email/style.css";

const styles = {
    fontFamily: "sans-serif",
    width: "500px",
    border: "1px solid #eee",
    background: "#f3f3f3",
    padding: "25px",
    margin: "20px"
};


class BulkMessages extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleFade = this.toggleFade.bind(this);
        this.state = {
            collapse: true,
            fadeIn: true,
            timeout: 300
        };
        this.state = {
            from_who: localStorage.getItem('email'),
            to_who: '',
            message_status: '',
            message: '',
            submitted: false,
            loading: false,
            error: '',
            vcardfile: '',
            buttonState: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    toggle() {
        this.setState({collapse: !this.state.collapse});
    }

    toggleFade() {
        this.setState((prevState) => {
            return {fadeIn: !prevState}
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({buttonState: 'loading'});
        this.setState({submitted: true});
        const {to_who, message_status, message} = this.state;
        this.exportHtml();
        // stop here if form is invalid
        if (!(message)) {
            return;
        }
        console.log(to_who, message);

        this.setState({loading: true});

        let url = BASEURL + 'api/sendsms';

        const inputFiles = document.querySelectorAll('input[type="file"]');


        let formData = new FormData();
        for (const file of inputFiles) {
            formData.append('vcardfile', file.files[0]);
        }
        formData.append('message', message);
        // formData.append('sent_status', 'true');
        // // formData.append('vcardfile',inputFiles);

        fetch(url, {
            method: "POST",
            headers: ({
                "Accept": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem('token'),
            }),
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

// Call this function to reset input
    clearForm() {
        this.setState({
            message: '',
            to_who: '',
            vcardfile: '',
            submitted: false
        })
    }

    exportHtml = () => {
        this.editor.exportHtml(data => {
            const {design, html} = data;
            console.log('exportHtml', html)
        })
    };

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {
        const {from_who, to_who, message_status, submitted, message, vcardfile, emails} = this.state;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Bulk Message</strong> Whatsapp
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label>From </Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <p className="form-control-static">
                                                <strong>{localStorage.getItem('email')}</strong></p>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <div style={styles}>
                                            <h3>Enter emails</h3>
                                            <ReactMultiEmail
                                                placeholder="Input your Email Address"
                                                emails={emails}
                                                onChange={(_emails: string[]) => {
                                                    this.setState({emails: _emails});
                                                }}
                                                getLabel={(
                                                    email: string,
                                                    index: number,
                                                    removeEmail: (index: number) => void
                                                ) => {
                                                    return (
                                                        <div data-tag key={index}>
                                                            {email}
                                                            <span data-tag-handle
                                                                  onClick={() => removeEmail(index)}>×</span>
                                                        </div>
                                                    );
                                                }}
                                            />
                                            <br/>
                                            {/*<h4>react-multi-email value</h4>*/}
                                            {/*<p>{emails.join(", ") || "empty"}</p>*/}
                                        </div>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="file-input">Vcard </Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="file" id="file-input" accept=".csv"
                                                   name="vcardfile"/>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <a href={BASEURL + 'media/samplecsv/excel.csv'} download>Click to download
                                                samplecsv</a>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="textarea-input">Design Your Own Message</Label>
                                        </Col>
                                        <Col xs="12">
                                            <EmailEditor
                                                ref={editor => this.editor = editor}
                                            />
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

export default BulkMessages;
