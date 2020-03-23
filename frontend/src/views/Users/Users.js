import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';

// import usersData from './UsersData'
import axios from "axios";
import {BASEURL} from "../../Constants";

// import usersData from "./UsersData";

function UserRow(props) {
    const user = props.user
    const userLink = `/users/${user.id}`
    console.log("userrow" + user)
    const getBadge = (status) => {
        return status === 'Active' ? 'success' :
            status === 'Inactive' ? 'secondary' :
                status === 'Pending' ? 'warning' :
                    status === 'Banned' ? 'danger' :
                        'primary'
    }

    return (
        <tr key={user.id.toString()}>
            <th scope="row"><Link to={userLink}>{user.id}</Link></th>
            <td><Link to={userLink}>{user.fullname}</Link></td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>User</td>
            <td>{user.lastlogin}</td>
            <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
        </tr>
    )
}

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersData: [],
            userList: []
        }
    }

    componentDidMount() {
        var {usersData, userList} = this.state;
        axios.get(BASEURL + 'api/auth/getallusers', {
            responseType: 'json'
        }).then(response => {
            // this.state.tableData = response.data;
            console.log(response.data);
            // this.generateTableData()
            usersData = response.data;
            userList = usersData
            this.setState({userList: userList})
            console.log(userList);
        });
    }

    render() {

        // const userList = usersData.filter((user) => user.id < 10)
        const {userList} = this.state;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Users <small
                                className="text-muted">Registered</small>
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover>
                                    <thead>
                                    <tr>
                                        <th scope="col">id</th>
                                        <th scope="col">name</th>
                                        <th scope="col">username</th>
                                        <th scope="col">email</th>
                                        <th scope="col">phone number</th>
                                        <th scope="col">role</th>
                                        <th scope="col">last login</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userList.map((user, index) =>
                                        <UserRow key={index} user={user}/>
                                    )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Users;
