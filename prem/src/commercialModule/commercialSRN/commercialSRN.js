import _ from "lodash";
import { PropTypes } from "prop-types";
import React from "react";
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { ImDownload2 } from "react-icons/im";
import Footer from "../../components/footer";
import Header1 from "../../components/header1";
import Pagination from "../../pagination/pagination";
import Commercialsidemenu from "../../components/sidemenu/Commercialsidemenu"



class commercialSRN extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [
                {
                    srnNO: "SRN001",
                    invoiceNO: "INV001",
                    reqDate: "xxxx",
                    status: "Waiting for Approval",
                    updateAt: "xxxx",
                },
                {
                    srnNO: "SRN002",
                    invoiceNO: "INV002",
                    reqDate: "xxxx",
                    status: "Approved",
                    updateAt: "xxxx",
                },
                {
                    srnNO: "SRN003",
                    invoiceNO: "INV003",
                    reqDate: "xxxx",
                    status: "Rejected",
                    updateAt: "xxxx",
                },
                {
                    srnNO: "SRN004",
                    invoiceNO: "INV004",
                    reqDate: "xxxx",
                    status: "Approved",
                    updateAt: "xxxx",
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

    filter = (evt) => {
        const val = evt.target.value;
        const requestlist = _.cloneDeep(this.state.tableData);
        console.log("d------->", val, requestlist);

        if (val !== "All") {
            this.setState({ requestlist: [] }, () => {
                const results = _.filter(requestlist, (item) => {
                    return (
                        item.status.indexOf(val) > -1
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

    handleSearch = (evt) => {
        const val = evt.target.value.toLowerCase();
        const requestlist = _.cloneDeep(this.state.tableData);
        console.log("search ---->" + val);
        if (val) {
            this.setState({ requestlist: [] }, () => {
                const results = _.filter(requestlist, (item) => {
                    return (
                        item.srnNO.toLowerCase().indexOf(val) > -1

                    );
                });
                this.setState({ datalist1: results });
            });
        } else {
            this.setState({ datalist1: [] }, () => {
                this.setState({ datalist1: this.state.tableData });
            });
        }
    };
    filterclear = () => {
        window.location.reload();
    };
    navigate = (url) => {
        this.props.history.push(url);
    };
    componentDidMount() {
        this.setState({
            tableData1: this.state.tableData,
        });
        console.log("--------in mount------------");
        // this.props.dataSRN();
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
    selected="SRN"/>

    </Col>
    <Col md={9}>
    <Container className="shadow p-40 bg-light">
                        <Row>
                            <Col md="1">
                                <label>
                                    Search
                                </label>
                            </Col>
                            <Col md="4">
                                <input
                                    className="form-control"
                                    placeholder="SRN number"
                                    onChange={(evt) => this.handleSearch(evt)}
                                    id="searchby"
                                    type="text"
                                />
                            </Col>
                            <Col md="1">
                                <label>
                                    Filter by status
                                </label>
                            </Col>
                            <Col md="4">
                                <select

                                    className="form-control "
                                    onChange={(evt) => this.filter(evt)}
                                >
                                    <option value="All">All</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Waiting for Approval">Waiting for Approval</option>

                                </select>



                            </Col>
                        </Row>
                        <br />
                        <table class=" table table-hover   ">
                            <thead class="table-primary">
                                <tr>
                                    <td>SRN number</td>
                                    <td>Invoice number</td>
                                    <td>Requested Date</td>
                                    <td>Status</td>
                                    <td>Updated At</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.datalist1 &&
                                    this.state.datalist1.length > 0 &&
                                    this.state.datalist1.map((user, userkey) => (
                                        <tr key={userkey}>
                                            <td>{user.srnNO}</td>
                                            <td>{user.invoiceNO}</td>
                                            <td>{user.reqDate}</td>
                                            <td>{user.status}</td>
                                            <td>{user.updateAt}</td>
                                            <td>
                                                <div>
                                                    <OverlayTrigger  placement="top"  overlay={<Tooltip >Download</Tooltip>}>
                                                        <span className="d-inline-block">
                                                        <button className="btn border border-primary">
                                                    <ImDownload2 />
                                                </button>
                                                        </span>
                                                    </OverlayTrigger>
                                                </div>


                                                {/* <button className="btn border border-primary">
                                                    <ImDownload2 />
                                                </button> */}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>

                        </table>
                        <div className="row">
                            <div className="cs-align-center" >
                                <div className="col-12" style={{ margin: "auto" }}>
                                    {this.state.tableData && (

                                        <Pagination
                                            parentCallback={this.callbackFunction}
                                            customer={this.state.tableData}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </Container>
    </Col>
</Row>
                    


                </main>
                <Footer />
            </div>
        );
    }

}
commercialSRN.propTypes = {
    dataSRN: PropTypes.func,
}
// const mapStateToProps = (state) =>{
//     return{
//         data:state.commercialSRNReducer.data
//     };
// };
// const mapDispatchToProps=(dispatch)=>({
//     dataSRN:(data)=>dispatch(dataSRN(data)),
// })

export default
    // connect(mapStateToProps,mapDispatchToProps)
    (commercialSRN);