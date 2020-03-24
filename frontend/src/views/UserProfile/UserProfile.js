import React, {Component} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
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
            lastlogin: '',
            gender: '',
        };
    }

    componentDidMount() {
        let currentComponent = this;
        var token = localStorage.getItem('token');
        console.log(token);
        let url = BASEURL + 'api/profile/';
        fetch(url, {
            method: "GET",
            headers: ({
                "Accept": "application/json",
                "Authorization": 'Bearer ' + token,
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

            currentComponent.setState({id: data.data[0].id});
            currentComponent.setState({gender: data.data[0].gender});
            currentComponent.setState({fullname: data.data[0].first_name + data.data[0].last_name});
            currentComponent.setState({username: data.data[0].email});
            currentComponent.setState({email: data.data[0].email});
            currentComponent.setState({phone: data.data[0].phone_number});
            currentComponent.setState({lastlogin: data.data[0].last_login_date_time});
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
            lastlogin,
            gender
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
                                            <Input type="text" value={id} disabled/>
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
                                                <InputGroupText>GENDER</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" value={gender} autoComplete="name" disabled/>
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
                                        <Button type="submit" size="sm" disabled color="primary">ok</Button>
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
