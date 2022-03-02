import React from "react";
import _ from "lodash";
import { Col, Container, Row } from "react-bootstrap";
import Header1 from "../../components/header1";
import Footer from "../../components/footer";
import Commercialsidemenu from "../../components/sidemenu/Commercialsidemenu";
import Pagination from "../../pagination/pagination";

class commercialTickets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [
                {
                    ticketId: "#123456",
                    subject: "email issue",
                    requester: "sssss",
                    group: "NAC",
                    assignee: "Eng1",
                    reqDate: "12-12-2022",
                    status: "Inprogress",
                    priority: "Low",
                    dueBy: "13-12-2022,"

                },
                {
                    ticketId: "#67890",
                    subject: "AD issue",
                    requester: "eeeeee",
                    group: "Diya",
                    assignee: "Eng2",
                    reqDate: "12-1-2022",
                    status: "closed",
                    priority: "High",
                    dueBy: "13-2-2022,"
                },


            ],
            tableData1: [],
            searchString: "",

        }
    }

    callbackFunction = (childData) => {
        if (this.state.tableData) {
            this.setState({ datalist1: childData });
        } else {
            this.setState({ datalist1: childData });
        }
    };

    // filter = (evt) => {
    //     const val = evt.target.value;
    //     const requestlist = _.cloneDeep(this.state.tableData);
    //     console.log("d------->", val, requestlist);

    //     if (val !== "All") {
    //         this.setState({requestlist:[]})
    //             const results=_.filter(requestlist,(user))
    //                 if(user.group.indexOf(val) > -1){
    //                     this.setState({ datalist1: results });
    //                     if(user.assignee.indexOf(val) > -1){
    //                         this.setState({ datalist1: results });
    //                         if(user.status.indexOf(val) > -1){
    //                             this.setState({ datalist1: results });
    //                             if(user.priority.indexOf(val) > -1){
    //                                 this.setState({ datalist1: results });
    //                             }
    //                         }
    //                     }
    //                 }


    // this.setState({ requestlist: [] }, () =>
    //  {
    //     const results = _.filter(requestlist, (item) => {

    //     }

    // item.group.indexOf(val) > -1 ||
    // // item.assignee.indexOf(val) > -1||
    // // item.status.indexOf(val) > -1||
    // // item.priority.indexOf(val) > -1





    // this.setState({ datalist1: results });
    // });
    //     } else {
    //         this.setState({ datalist1: [] }, () => {
    //             this.setState({ datalist1: this.state.tableData });
    //         });
    //     }
    // }




    filter = (evt) => {
        const val = evt.target.value;
        const requestlist = _.cloneDeep(this.state.tableData);
        if (val !== "All") {
            this.setState({ requestlist: [] }, () => {
                const results = _.filter(requestlist, (item) => {
                    return (
                        item.group.indexOf(val) > -1||
                        item.assignee.indexOf(val) > -1||
                        item.status.indexOf(val) > -1||
                        item.priority.indexOf(val) > -1

                    );
                });
                this.setState({ datalist1: results });
            });
        } else {
            this.setState({ datalist1: [] }, () => {
                this.setState({ datalist1: this.state.tableData });
            });
        }
    }


    navigate = (url) => {
        this.props.history.push(url);
      };
    componentDidMount() {

    }
    render() {

        // const{search}=this.state;
        return (
            <div>
                <header>
                    <Header1 />
                </header>
                <main>
                <Row>
    <Col md={3}>
    <Commercialsidemenu

    navigate={(url) => this.navigate(url)}
    selected="tickets"/>

    </Col>
    <Col md={9}>

    <Container className="shadow p-40 bg-light">
                        <div>
                            <Row>
                                <Col md="1" className="mt-2">Group</Col>
                                <Col md="2">

                                    <select

                                        className="form-control "
                                        onChange={(evt) => this.filter(evt)}
                                    >
                                        <option value="All">All</option>
                                        <option value="NAC">NAC</option>
                                        <option value="Diya">Diya</option>


                                    </select>
                                </Col>
                                <Col md="1" className="mt-2">Assignee</Col>
                                <Col md="2">
                                    <select

                                        className="form-control "
                                        onChange={(evt) => this.filter(evt)}
                                    >
                                        <option value="All">All</option>
                                        <option value="Eng1">Eng1</option>
                                        <option value="Eng2">Eng2</option>


                                    </select>
                                </Col>

                                <Col md="1" className="mt-2">status</Col>
                                <Col md="2">
                                    <select

                                        className="form-control "
                                        onChange={(evt) => this.filter(evt)}
                                    >
                                        <option value="All">All</option>
                                        <option value="Inprogress">Inprogress</option>
                                        <option value="Closed">Closed</option>


                                    </select>
                                </Col>

                                <Col md="1" className="mt-2">priority</Col>
                                <Col md="2">
                                    <select

                                        className="form-control "
                                        onChange={(evt) => this.filter (evt)}
                                    >
                                        <option value="All">All</option>
                                        <option value="High">High</option>
                                        <option value="Low">Low</option>


                                    </select>
                                </Col>


                            </Row>
                        </div>
                        <br /> <br />

                        <table class=" table table-hover   ">
                            <thead class="table-primary">
                                <tr>
                                    <td>Ticket ID</td>
                                    <td>Subject</td>
                                    <td>Requester</td>
                                    <td>Group</td>
                                    <td>Assignee</td>
                                    <td>Requested Date</td>
                                    <td>Status</td>
                                    <td>Priority</td>
                                    <td>Due by</td>

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.datalist1 &&
                                    this.state.datalist1.length > 0 &&
                                    this.state.datalist1.map((user, userkey) => (
                                        <tr key={userkey}>
                                            <td>{user.ticketId}</td>
                                            <td>{user.subject}</td>
                                            <td>{user.requester}</td>
                                            <td>{user.group}</td>
                                            <td>{user.assignee}</td>
                                            <td>{user.reqDate}</td>
                                            <td>{user.status}</td>
                                            <td>{user.priority}</td>
                                            <td>{user.dueBy}</td>

                                        </tr>
                                    ))}
                            </tbody>

                        </table>
                        <Row>
                            <Col md="5"></Col>
                            <Col md="4">
                                {this.state.tableData && (

                                    <Pagination
                                        parentCallback={this.callbackFunction}
                                        customer={this.state.tableData}
                                    />
                                )}

                            </Col>
                        </Row>

                    </Container>
        </Col>
</Row>


                </main>
                <Footer />
            </div>
        );
    }

}

export default commercialTickets;