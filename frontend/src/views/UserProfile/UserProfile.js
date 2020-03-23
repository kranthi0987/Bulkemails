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
import {BASEURL} from "../../Constants";
import toaster from "toasted-notes";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            fullname: '',
            phone: '',
            username: '',
            email: '',
            lastlogin: ''
        };
    }

    componentDidMount() {
         let currentComponent = this;
        var token = localStorage.getItem('token');
        console.log(token);
        let url = BASEURL + 'api/auth/userdetails';
        fetch(url, {
            method: "GET",
            headers: ({
                "Accept": "application/json",
                "Authorization": 'Token ' + token,
                "Content-Type": "application/json"
            })
        }).then(response => {
            if (response.status === 200) {
                // toaster.notify("Sucessfull logged in", {
                //     duration: 2000, type: "success"
                // });
                return response.json()
            } else if (response.status === 400) {
                // toaster.notify("failed login", {
                //     duration: 2000, type: "error"
                // });
            } else {
                toaster.notify("server error", {
                    duration: 2000, type: "error"
                });
            }
        }).then(function (data) {
            // if (data != null) {
            //     localStorage.setItem("token", data.token);
            // }

            currentComponent.setState({id: data.id});
            currentComponent.setState({fullname: data.fullname});
            currentComponent.setState({username: data.username});
            currentComponent.setState({email: data.email});
            currentComponent.setState({phone: data.phone});
            currentComponent.setState({lastlogin: data.lastlogin});
            console.log('request succeeded with JSON response', data)
        })
    }

    render() {
        const {
            id,
            fullname,
            phone,
            username,
            email,
            lastlogin
        } = this.state;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                User Profile
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post">
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>User ID</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="number"  value={id} disabled />
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>Full Name</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="name" value={fullname} autoComplete="name" disabled/>
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>Username</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" value={username} autoComplete="name" disabled/>
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>Mobile Number</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="number" value={phone} autoComplete="name" disabled/>
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText><i className="fa fa-mobile-phone"></i></InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>Email</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="email" value={email} autoComplete="username" disabled/>
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText><i className="fa fa-mail-forward"></i></InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>Last Login Activity</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" value={lastlogin} autoComplete="name" disabled/>
                                            <InputGroupAddon addonType="append">
                                                <InputGroupText><i className="fa fa-calendar"></i></InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                    {/*<FormGroup>*/}
                                    {/*    <InputGroup>*/}
                                    {/*        <InputGroupAddon addonType="prepend">*/}
                                    {/*            <InputGroupText>Password</InputGroupText>*/}
                                    {/*        </InputGroupAddon>*/}
                                    {/*        <Input type="password" id="password3" name="password3"*/}
                                    {/*               autoComplete="current-password"/>*/}
                                    {/*        <InputGroupAddon addonType="append">*/}
                                    {/*            <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>*/}
                                    {/*        </InputGroupAddon>*/}
                                    {/*    </InputGroup>*/}
                                    {/*</FormGroup>*/}
                                    <FormGroup className="form-actions">
                                        <Button type="submit" size="sm" disabled color="primary">Submit</Button>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default UserProfile;
