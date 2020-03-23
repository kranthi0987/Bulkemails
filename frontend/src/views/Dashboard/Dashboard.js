import React, {Component} from 'react';
import {Button, Card, CardBody, CardGroup, Col, Row} from "reactstrap";
import Widget04 from "../Widgets/Widget04";
import axios from "axios";
import {BASEURL} from "../../Constants";


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textmessages: 0,
            multimediamessages: 0,
            totalmessages: 0,
            systemtime:0,
        };
    }

    componentDidMount() {
        var {
            textmessages,
            multimediamessages,
            totalmessages,
            systemtime
        } = this.state
        axios.get(BASEURL + 'mediaupload/messagecount/', {
            responseType: 'json'
        }).then(response => {
            // this.state.tableData = response.data;
            console.log(response.data);
            // this.generateTableData()
            this.setState({textmessages: response.data.messagecount})
        });
        axios.get(BASEURL + 'message/messagecount/', {
            responseType: 'json'
        }).then(response => {
            // this.state.tableData = response.data;
            console.log(response.data);
            // this.generateTableData()
            this.setState({multimediamessages: response.data.messagecount})
        });
         axios.get(BASEURL + 'api/auth/getrunningtime', {
            responseType: 'json'
        }).then(response => {
            // this.state.tableData = response.data;
            console.log(response.data);
            // this.generateTableData()
            this.setState({systemtime: response.data.messagecount})
        });
    }

    // getwallpapers(e) {
    //     // make API call
    //     this.setState({loading: true});
    //     let url = 'http://127.0.0.1:8000/wallpapers/listwallpapers/';
    //     fetch(url, {
    //         method: "GET",
    //         headers: ({
    //             "Authorization": "Token ".concat(localStorage.getItem('token'))
    //         })
    //     }).then(response => {
    //         if (response.status === 200) {
    //             console.log(response);
    //             return response.json()
    //         } else {
    //             console.log("oh no!", response.status === 404)
    //         }
    //     }).then(function (data) {
    //         console.log('request succeeded with JSON response', data)
    //     })
    // }

    render() {
        var {
            textmessages,
            multimediamessages,
            totalmessages,
            systemtime
        } = this.state
        return (
            <div className="animated fadeIn">
                {/*<CardGroup className="mb-4">*/}
                {/*    <Widget04 icon="icon-people" color="info" header="87.500" value="25">Visitors</Widget04>*/}
                {/*    <Widget04 icon="icon-user-follow" color="success" header="385" value="25">New Clients</Widget04>*/}
                {/*    <Widget04 icon="icon-basket-loaded" color="warning" header="1238" value="25">Products*/}
                {/*        sold</Widget04>*/}
                {/*    <Widget04 icon="icon-pie-chart" color="primary" header="28%" value="25">Returning*/}
                {/*        Visitors</Widget04>*/}
                {/*    <Widget04 icon="icon-speedometer" color="danger" header="5:34:11" value="25">Avg. Time</Widget04>*/}
                {/*</CardGroup>*/}
                <Row>
                    <Col sm="6" md="3">
                        <Widget04 icon="icon-speech" color="info" header={textmessages} value={textmessages} invert>Text
                            Messages</Widget04>
                    </Col>
                    <Col sm="6" md="3">
                        <Widget04 icon="icon-speech" color="success" header={multimediamessages}
                                  value={multimediamessages} invert>Multi Media
                            Messages</Widget04>
                    </Col>
                    <Col sm="6" md="3">
                        <Widget04 icon="icon-pie-chart" color="warning" header={textmessages+multimediamessages} value={textmessages+multimediamessages} invert>Total
                            Messages</Widget04>
                    </Col>
                    {/*<Col sm="6" md="2">*/}
                    {/*    <Widget04 icon="icon-pie-chart" color="primary" header="28%" value="25" invert>Returning*/}
                    {/*        Visitors</Widget04>*/}
                    {/*</Col>*/}
                    <Col sm="6" md="3">
                        <Widget04 icon="icon-speedometer" color="danger" header={systemtime} value="25" invert>Avg.
                            Time</Widget04>
                    </Col>
                    {/*<Col sm="6" md="2">*/}
                    {/*    <Widget04 icon="icon-speech" color="info" header="972" value="25" invert>Comments</Widget04>*/}
                    {/*</Col>*/}
                </Row>
            </div>
        );
    }
}

export default Dashboard;
