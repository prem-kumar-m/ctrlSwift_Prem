import _ from "lodash";
import { func } from "prop-types";
import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Modal, Row, Col } from 'react-bootstrap';
import Footer from "../../components/footer";
import Header1 from "../../components/header1";
import Partnersidemenu from "../../components/partnersidemenu/partnerSidemenu";
import Pagination from "../../pagination/pagination";
import {requestticketslist} from"./action";

class Tickets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketsstatus: "",
            viewdata: false,
            ticketslist: [
                { ticketid: "2001", subject: "email issues", cretion: "22-2-2022", status: "open", registername: "xxxxxx", assignedto: "Open" },
                { ticketid: "2001", subject: "email issues", cretion: "22-2-2022", status: "open", registername: "xxxxxx", assignedto: "Close" },
                { ticketid: "2001", subject: "email issues", cretion: "22-2-2022", status: "open", registername: "xxxxxx", assignedto: "Pending" },
                { ticketid: "2001", subject: "email issues", cretion: "22-2-2022", status: "open", registername: "xxxxxx", assignedto: "Open" },
                { ticketid: "2001", subject: "email issues", cretion: "22-2-2022", status: "open", registername: "xxxxxx", assignedto: "Completed" }

            ],

        }

    }
    opedetails = () => {
        this.setState({
            viewdata: true,
        });
    }
    closemodal = () => {
        this.setState({
            viewdata: false,
        });
    }
    handleCountryChange = (event) => {
        const { ticketsstatus, value } = event.target;
        this.setState({
            ticketsstatus: value,
        });


    }
    filter = (evt) => {
        const val = evt.target.value;
        const requestlist = _.cloneDeep(this.state.ticketslist);
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
                this.setState({ datalist1: this.state.ticketslist });
            });
        }
    }
    callbackFunction = (childData) => {
        if (this.state.ticketslist) {
            this.setState({ datalist1: childData });
        } else {
            this.setState({ datalist1: childData });
        }
    };
    componentDidMount() {
           // this.props.requestticketslist();
    }
    componentDidUpdate() {

    }
    navigate = (url) => {
        this.props.history.push(url);
      };
    render() {
        const { ticketsstatus, viewdata } = this.state;
        return (
            <div className="page-container" style={{ paddingLeft: "0px" }}>
                <Header1 />
                <main className="main-content bgc-grey-100">
                    <div id="mainContent container ">
                        <div className="row p-2">
                            <Partnersidemenu
                                navigate={(url) => this.navigate(url)}
                                selected="tickets"
                            />

                            <div className="col-md-9">
                                <div className="row ">
                                    <div className="col-md-12">
                                        <div
                                            className="bgc-white p-20"
                                            style={{ paddingBottom: "0px" }}
                                        >
                                            <div className="row">
                                                <h4 className="c-grey-900 f700 col-md-9">Totla Tickets</h4>
                                                <div className="col-md-3">
                                                    <div className="d-flex justify-content-end">
                                                        <select
                                                            type="dropdown"
                                                            className="form-control"
                                                            name="ticketsstatus"
                                                            value={ticketsstatus}
                                                            id="cs-rs-country"

                                                            placeholder="select"
                                                            onChange={(evt) => this.filter(evt)}
                                                        >
                                                            <option value="All">All</option>
                                                            <option value="Open">Open</option>
                                                            <option value="Close">Close</option>
                                                            <option value="Cancel">Cancel</option>
                                                            <option value="in Progress">in Progress</option>
                                                            <option value="On Hold">On Hold</option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                        <br /><br />
                                        <div className="bgc-white bd bdrs-3 p-20">

                                            <table className="table table-hover text-nowrap"
                                                style={{ textAlign: "center" }}
                                            >
                                                <thead className="table-primary">
                                                    <tr>
                                                        <th scope="col">Ticket id</th>
                                                        <th scope="col">Subject</th>
                                                        <th scope="col">Creation on</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Requester Name</th>
                                                        <th scope="col">Assigne To</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.datalist1 && this.state.datalist1.length > 0 &&
                                                        this.state.datalist1.map((listdata, datakey) => (
                                                            <tr key={datakey}>
                                                                <td className=" text-primary" role="button" onClick={this.opedetails}>{listdata.ticketid}</td>
                                                                <td>{listdata.subject}</td>
                                                                <td>{listdata.cretion}</td>
                                                                <td>{listdata.status}</td>
                                                                <td>{listdata.registername}</td>
                                                                <td>{listdata.assignedto}  </td>
                                                            </tr>
                                                        ))
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="row">
                                            <div className="cs-align-center" >
                                                <div className="col-12" style={{ margin: "auto" }}>
                                                    {this.state.ticketslist && (

                                                        <Pagination
                                                            parentCallback={this.callbackFunction}
                                                            customer={this.state.ticketslist}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </main>
                <Footer />
                <Modal
                    show={viewdata}
                    onHide={this.closemodal}
                    size="lg"
                    style={{ width: "100%" }}
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Ticket Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="container">
                            <div className="d-flex justify-content-end">
                                <span><h5>Creation Date&Time: 24-02-2022</h5>  </span> </div>
                            <form>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group row">
                                            <label for="inputEmail3" className="col-sm-3 col-form-label">Category:</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" id="inputEmail3" placeholder="Email" readOnly />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputEmail3" className="col-sm-3 col-form-label">Service window:</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" id="inputEmail3" placeholder="Email" readOnly />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputEmail3" className="col-sm-3 col-form-label">Prority:</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" id="inputEmail3" placeholder="Email" readOnly />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputEmail3" className="col-sm-3 col-form-label"> Email:</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" id="inputEmail3" placeholder="Email" readOnly />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputEmail3" className="col-sm-3 col-form-label">Date & Time:</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" id="inputEmail3" placeholder="Email" readOnly />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputEmail3" className="col-sm-3 col-form-label">Assigned To:</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" id="inputEmail3" placeholder="Email" readOnly />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group row">
                                            <label for="inputEmail3" className="col-sm-3 col-form-label">Requester Name:</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" id="inputEmail3" placeholder="Email" readOnly />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputEmail3" className="col-sm-3 col-form-label">Subject:</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" id="inputEmail3" placeholder="Email" readOnly />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputEmail3" className="col-sm-3 col-form-label">Incident Type:</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" id="inputEmail3" placeholder="Email" readOnly />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputEmail3" className="col-sm-3 col-form-label">Support window:</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" id="inputEmail3" placeholder="Email" readOnly />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputEmail3" className="col-sm-3 col-form-label">Email :</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" id="inputEmail3" placeholder="Email" readOnly />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label for="inputEmail3" className="col-sm-3 col-form-label">Assigned To:</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control" id="inputEmail3" placeholder="Email" readOnly />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>

            </div>
        )
    }

}
// Tickets.prototype = {
//     requestticketslist:PropTypes.func,
// }
// const mapStateToProps=(state)=>{
// return{
//     ticketslist: state.ticketsReducer.ticketslist,
// }}
// const mapDispatchToProps = (dispatch) => ({
//     requestticketslist: (state) => dispatch(requestticketslist(state)),
//   });
//export default connect(mapStateToProps, mapDispatchToProps)(Tickets);

export default  Tickets;