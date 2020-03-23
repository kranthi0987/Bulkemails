import React, {Component} from 'react';
import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table
} from 'reactstrap';
import axios from 'axios';
import {BASEURL} from "../../../Constants";
// function getvals(){
//     return fetch('http://localhost:8000/message/listallmessages/',
//     {
//     	method: "GET",
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//     })
//     .then((response) => response.json())
//     .then((responseData) => {
//       //console.log(responseData);
//       return responseData;
//     })
//     .catch(error => console.warn(error));

//   }
class Tables extends Component {
    tableData;
    next_page;

    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            results: null,
            next_page: null,
            prev_page: null,
            count: null
        }
    }

    makeHttpRequestWithPage = async url => {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log(data);
        this.setState({
            results: data.results,
            next_page: data.next,
            prev_page: data.previous,
            count: data.count
        });
    }

    componentDidMount() {
        this.makeHttpRequestWithPage(BASEURL+"message/listallmessages/");

    }

    handlenextChange(nextpage) {
        console.log(nextpage);
        this.makeHttpRequestWithPage(nextpage);
    }

    handleprevpage(prevpage) {
        console.log(prevpage);
        this.makeHttpRequestWithPage(prevpage);
    }

    //firstmethod to get the list message data
    //   componentDidMount() {
    //       axios.get(BASEURL + 'message/listallmessages/', {
    //           responseType: 'json'
    //       }).then(response => {
    //           this.state.tableData = response.data;
    //           console.log(this.state.tableData)
    //           // this.generateTableData()
    //       });
    //   }

    // getallmessages = (data) => {
    //     // make API call
    //     let tablesHTML = [];
    //     // this.setState({loading: true});
    //     let url = 'http://localhost:8000/message/listallmessages/';
    //     fetch(url, {
    //         method: "GET"
    //     }).then(response => {
    //         if (response.status === 200) {
    //               console.log(response);
    //             return response.json()
    //         } else {
    //                console.log("oh no!", response.status === 404)
    //         }
    //     }).then(function (data) {
    //         console.log('request succeeded with JSON response', data)
    //         return data
    //     })
    // }
    //
    // generateTableData() {
    //     let res = [];
    //     // let tableData1 = this.tableData;
    //     console.log(this.state.tableData);
    //
    //     this.state.tableData.map(message => (
    //         res.push(
    //             <tr>
    //                 <td key={message.from_who}>{message.from_who}</td>
    //                 <td key={message.to_who}>{message.to_who}</td>
    //                 <td key={message.message}>{message.message}</td>
    //                 <td key={message.id}>{message.id}</td>
    //                 <td key={message.message_status}>{message.message_status}</td>
    //             </tr>
    //         )
    //     ));
    //     // for (let tableData2 of tableData1) {
    //     //     res.push(
    //     //         <tr>
    //     //             <td key={tableData2.from_who}>{tableData2.from_who}</td>
    //     //             <td key={tableData2.to_who}>{tableData2.to_who}</td>
    //     //             <td key={tableData2.message}>{tableData2.message}</td>
    //     //             <td key={tableData2.id}>{tableData2.id}</td>
    //     //             <td key={tableData2.message_status}>{tableData2.message_status}</td>
    //     //         </tr>
    //     //     )
    //     // }
    //     console.log(res)
    //     return res;
    // }

    render() {
        // if (!this.state.tableData.length)
        //     return null;
        // let res = [];
        // this.state.tableData.map(message => (
        //     res.push(
        //         <tr key={message.message_uuid}>
        //             <td>{message.from_who}</td>
        //             <td>{message.phone}</td>
        //             <td>{message.body}</td>
        //             <td>{message.message_date_time}</td>
        //             <td>{message.id}</td>
        //             <td>
        //                 if {message.sent_status}{
        //                 <Badge color="success">Active</Badge>
        //             }else{
        //                 <Badge color="danger">Failed</Badge>
        //             }
        //             </td>
        //         </tr>
        //     )
        // ));

        let results;
        console.log(this.state.next_page);
        console.log(this.state.prev_page);
        if (this.state.results !== null) {
            results = this.state.results.map(user => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.from_whom}</td>
                    <td>{user.to_whom}</td>
                    <td>{user.body}</td>
                    <td>{user.file_url}</td>
                    <td>{user.content_type}</td>
                    <td>{user.message_type}</td>
                    <td>{user.message_date_time}</td>
                    <td>{user.sent_status}</td>
                </tr>

            ));
        }
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> List All messages
                            </CardHeader>
                            <CardBody>
                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                    <tr>
                                        <th>S No</th>
                                        <th>from</th>
                                        <th>to</th>
                                        <th>Message</th>
                                        <th>file_url</th>
                                        <th>content type</th>
                                        <th>message type</th>
                                        <th>Message Date time</th>
                                        <th>Message Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {results}
                                    </tbody>
                                </Table>
                                <nav>
                                    <Pagination>
                                        {/*<button type='submit' onClick={() => { this.handleprevpage(this.state.prev_page) }}>Prev</button>*/}
                                        {/*<button type='submit' onClick={() => { this.handlenextChange(this.state.next_page) }}>Next</button>*/}
                                        {/*<button type='submit' onClick = {this.handlenextChange(this.state.next_page)}>Next</button>*/}
                                        <PaginationItem><PaginationLink previous
                                                                        tag="button"
                                                                        onClick={() => {
                                                                            this.handleprevpage(this.state.prev_page)
                                                                        }}>Prev</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink next
                                                                        tag="button"
                                                                        onClick={() => {
                                                                            this.handlenextChange(this.state.next_page)
                                                                        }}>Next</PaginationLink></PaginationItem>
                                    </Pagination>
                                </nav>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default Tables;
