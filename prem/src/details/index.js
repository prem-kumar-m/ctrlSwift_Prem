import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import Header from "../components/header1";
import Footer from "../components/footer";
import { requestAllDetails } from "./action";
import { Redirect } from "react-router";
import queryString from "query-string";
import { BsArrowReturnLeft } from "react-icons/bs";
class Details extends Component {
  constructor() {
    super();
    this.state = {
      selectedRequest: {},
      detail: {
        ticket: "",
        requester: "",
        company: "",
        address: "",
        department: "",
        startTime: "",
        endTime: "",
        mobile: "",
        landline: "",
        email: "",
        timeZone: "",
        meetingDate: "",
        status: "",
        salesperson: "",
        inviteesEmail: "",
        city: "",
        pincode: "",
        country: "",
        isReadyToRedirect: false,
        isSuccess: false,
      },
      details: [],
      invitees: [],
    };
  }

  navigate = (url) => {
    this.props.history.push(url);
  };

  componentDidMount() {
    let url = this.props.location.search;
    console.log(url);
    let params = queryString.parse(url);
    console.log(params);
    this.props.requestAllDetails(params.ticket);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("component Did update" + JSON.stringify(this.props.details));
    if (this.props.details !== prevProps.details) {
      if (this.props.details.success == true) {
        this.setState({
          ticket: this.props.details.listDemoDetails.demoId,
          requester: this.props.details.listDemoDetails.requester,
          company: this.props.details.listDemoDetails.company,
          address: this.props.details.listDemoDetails.address,
          country: this.props.details.listDemoDetails.country,
          city: this.props.details.listDemoDetails.city,
          pincode: this.props.details.listDemoDetails.pincode,
          department: this.props.details.listDemoDetails.department,
          startTime: this.props.details.listDemoDetails.startTime,
          endTime: this.props.details.listDemoDetails.endTime,
          mobile: this.props.details.listDemoDetails.mobile,
          landline: this.props.details.listDemoDetails.landline,
          email: this.props.details.listDemoDetails.email,
          timeZone: this.props.details.listDemoDetails.timeZone,
          meetingDate: this.props.details.listDemoDetails.meetingDate,
          status: this.props.details.listDemoDetails.status,
          salesperson: this.props.details.listDemoDetails.salesperson,
        });
        if (this.props.details.listDemoDetails.inviteesEmail) {
          this.setState({
            inviteesEmail:
              this.props.details.listDemoDetails.inviteesEmail.replace(
                / , /g,
                "\n"
              ),
          });
        }
      }
    }
  }

  render() {
    if (this.state.isReadyToRedirect) return <Redirect to="/" />;
    const {
      ticket,
      requester,
      company,
      address,
      city,
      pincode,
      country,
      department,
      startTime,
      endTime,
      mobile,
      landline,
      email,
      timeZone,
      inviteesEmail,
      salesperson,
      meetingDate,
      status,
    } = this.state;

    const location =
      address + ",\n" + city + "-" + pincode + ",\n" + country + ".";

    return (
      <div className="container-fulid" style={{ paddingLeft: "0px" }}>
        <Header navigate={(url) => this.navigate("/sales")} />
        <main className="container">
          <div id="mainContent" className="card shadow">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <div
                      className="bgc-white p-20"
                      style={{ paddingBottom: "0px" }}
                    >

                      <div className="row">
                        <h4 className="c-grey-900 f700 col-md-11">
                          Ticket : {ticket}
                        </h4>

                        <button type="button" className="btn btn-primary">
                      <BsArrowReturnLeft/>{"  "}
                        <a href="/request">
                          <font color="white">Back</font>
                        </a>
                      </button>
                        <div className="form-group col-md-12" />
                        <div className="col-sm-12">
                          <div className="form-row">
                            <div className="col-sm-4">
                              <div style={{ width: "300px" }}>
                                <label
                                  className="f700"
                                  htmlFor="exampleInputName"
                                >
                                  Requester Name
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  ref={requester}
                                  className="form-control"
                                  id="exampleInputMobile"
                                  name="requester"
                                  value={requester}
                                />
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div style={{ width: "300px" }}>
                                <label
                                  className="f700"

                                  htmlFor="exampleInputMobile"
                                >
                                  Company
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  ref={company}
                                  className="form-control"
                                  id="exampleInputMobile"
                                  name="company"
                                  value={company}
                                />
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div style={{ width: "200px" }}>
                                <label
                                  className="f700"

                                  htmlFor="exampleInputName"
                                >
                                  Address
                                </label>
                                <textarea
                                  name="body"
                                  disabled
                                  style={{ height: "100px", width: "300px" }}
                                  //   value={address+",\n"+city+"-"+pincode+",\n"+country+"." }
                                  value={
                                    address !== "undefined" ? location : null
                                  }
                                />
                              </div>
                            </div>{" "}
                          </div>
                        </div>
                        <div className="form-group col-md-12" />
                        <div className="col-sm-12">
                          <div className="form-row">
                            <div className="col-sm-4">
                              <div style={{ width: "300px" }}>
                                <label
                                  className="f700"

                                  htmlFor="exampleInputName"
                                >
                                  Department
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  ref={department}
                                  className="form-control"
                                  name="emailId"
                                  value={department}
                                />
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div style={{ width: "300px" }}>
                                <label
                                  className="f700"

                                  htmlFor="exampleInputName"
                                >
                                  Mobile Number
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  ref={mobile}
                                  className="form-control"
                                  id="exampleInputMobile"
                                  name="mobile"
                                  value={mobile}
                                />
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div style={{ width: "300px" }}>
                                <label
                                  className="f700"

                                  htmlFor="exampleInputName"
                                >
                                  Landline
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  ref={landline}
                                  className="form-control"
                                  name="landline"
                                  value={landline}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group col-md-12" />
                        <div className="col-sm-12">
                          <div className="form-row">
                            <div className="col-sm-4">
                              <div style={{ width: "300px" }}>
                                <label
                                  className="f700"

                                  htmlFor="exampleInputName"
                                >
                                  Email ID
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  ref={email}
                                  className="form-control"
                                  name="email"
                                  value={email}
                                />
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div style={{ width: "300px" }}>
                                <label
                                  className="f700"

                                  htmlFor="exampleInputName"
                                >
                                  Time Zone
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  ref={timeZone}
                                  className="form-control"
                                  name="timeZone"
                                  value={timeZone}
                                />
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div style={{ width: "300px" }}>
                                <label
                                  className="f700"

                                  htmlFor="exampleInputName"
                                >
                                  Meeting Date
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  ref={meetingDate}
                                  className="form-control"
                                  name="meetingDate"
                                  value={meetingDate}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group col-md-12" />
                        <div className="col-sm-12">
                          <div className="form-row">
                            <div className="col-sm-4">
                              <div style={{ width: "300px" }}>
                                <label
                                  className="f700"

                                  htmlFor="exampleInputName"
                                >
                                  Start Time
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  ref={startTime}
                                  className="form-control"
                                  name="startTime"
                                  value={startTime}
                                />
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div style={{ width: "300px" }}>
                                <label
                                  className="f700"

                                  htmlFor="exampleInputName"
                                >
                                  End Time
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  ref={endTime}
                                  className="form-control"
                                  name="endTime"
                                  value={endTime}
                                />
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <div style={{ width: "300px" }}>
                                <label
                                  className="f700"

                                  htmlFor="exampleInputName"
                                >
                                  Status
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  ref={status}
                                  className="form-control"
                                  name="status"
                                  value={status}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group col-md-12" />
                        <div className="col-sm-12">
                          <div className="form-row">
                            <div className="col-sm-4">
                              <div style={{ width: "300px" }}>
                                <label
                                  className="f700"

                                  htmlFor="exampleInputName"
                                >
                                  Invitees Email
                                </label>
                                <textarea
                                  name="inviteesEmail"
                                  disabled
                                  style={{ height: "100px", width: "300px" }}
                                  value={inviteesEmail}
                                />
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div style={{ width: "300px" }}>
                                <label
                                  className="f700"

                                  htmlFor="exampleInputName"
                                >
                                  Assigned To
                                </label>
                                <input
                                  type="text"
                                  disabled
                                  ref={salesperson}
                                  className="form-control"
                                  name="salesperson"
                                  value={salesperson}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group col-md-5"></div>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
Details.propTypes = {
  requestAllDetails: PropTypes.func,
  details: PropTypes.array,
  detail: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    details: state.detailsReducer.details,
    invitees: state.detailsReducer.invitees,
    isSuccess: state.detailsReducer.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestAllDetails: (ticket) => dispatch(requestAllDetails(ticket)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
