import _ from "lodash";
import { PropTypes } from "prop-types";
import queryString from "query-string";
import React, { Component } from "react";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import Footer from "../components/footer";
import Header from "../components/header1";
import Sidemenu from "../components/sidemenu";
import Pagination from "../pagination/pagination";
import { requestAllReports } from "./action";



class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      bloodGroup: "",
      showroom: "",
      salesperson: "",
      isShowroomLoaded: false,
      selectedShowroom: "",
      reportlist: "",
      reports: "",
      data: [],
      filter: [],
      status: "",
      d1: "",
      d2: "",
      date: [],
      fvalue: {},
      filtering: "",
      page: "",
      users: "",
      reportCopy: [],
      reportcount:"",
      newRequest:"",
      Pending:"",
      completed:""

    };
  }

  callbackFunction = (childData) => {
    if (this.props.reports) {
      this.setState({ datalist1: childData });
    } else {
      this.setState({ datalist1: childData });
    }
  };

  componentDidMount() {
    let url = this.props.location.search;
    let params = queryString.parse(url);
    console.log("params.userName" + params.userName);
    this.setState({
      page: params.userName,
    });
    this.props.requestAllReports();
  }
  componentDidUpdate(prevProps) {
    console.log("filter" + JSON.stringify(this.state.reports));
    console.log("datefilter" + JSON.stringify(this.state.filtering));
    if (this.props.reports !== prevProps.reports) {
      this.setState({
        reports: this.props.reports,
        reportCopy: this.props.reports,
        reportcount:this.props.reports.length,
        // newRequest:this.props.reports.newRequestCount
      });


    }
    if (this.props.reports !== prevProps.reports) {
      console.log("updated detials ......................");
      if (
        this.props.reports.completedCount !== undefined &&
        this.props.reports.pendingCount !== null &&
        this.props.reports.newRequestCount !== undefined
      ) {
        console.log(
          "updated newrequest ......................" +
          this.props.reports.newRequestCount +this.props.reports.completedCount+this.props.reports.pendingCount );
        window.sessionStorage.setItem("New",this.props.reports.newRequestCount)
        window.sessionStorage.setItem("Completed",this.props.reports.completedCount)
        window.sessionStorage.setItem("Pending",this.props.reports.pendingCount)

       }
    }
    console.log("newrequest" +this.state.newRequest);
    console.log("data reports" +this.state.data);

  }
  navigate = (url) => {
    this.props.history.push(url);
  };

  filter = (evt)  =>{
    const val = evt.target.value;
    const requestlist = _.cloneDeep(this.state.reportCopy);
    if (val !=="All" ) {
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
        this.setState({ datalist1: this.state.reportCopy });
      });
    }
}
  openDatepicker = () => this._calendar.setOpen(true);

  filterclear = () => {
    window.location.reload();
  };

  searchby = (evt) => {
    const val = evt.target.value.toLowerCase();
    const requestlist = _.cloneDeep(this.state.reportCopy);
    console.log("search ---->" + val);
    if (val) {
      this.setState({ requestlist: [] }, () => {
        const results = _.filter(requestlist, (item) => {
          return (
            item.name.toLowerCase().indexOf(val) > -1
            ||
            item.mobile.toLowerCase().indexOf(val) > -1 ||
            item.email.toLowerCase().indexOf(val) > -1 ||
            item.status.toLowerCase().indexOf(val) > -1
          );
        });
        this.setState({ datalist1: results });
      });
    } else {
      this.setState({ datalist1: [] }, () => {
        this.setState({ datalist1: this.state.reportCopy });
      });
    }
  };

  render() {
    let data1 = [];
    if (this.props.reports !== undefined && this.props.reports !== null) {
      for (var i = 1; i <= this.props.reports.length; i++) {
        this.props.reports &&
          this.props.reports.length > 0 &&
          _.orderBy(this.state.reports, ["ticket"], ["desc"]).map(
            (reports, i) =>
              (data1[i] = {
                DemoId: reports.demoId,
                Name: reports.name,
                Mobile: reports.mobile,
                Email: reports.email,
                MeetingDate: reports.meetingDate,
                StartTime: reports.startTime,
                EndTime: reports.endTime,
                Status: reports.status,
                Salesperson: reports.salesperson,
              })
          );
        this.state.data = data1;
      }
    }

    return (
      <div>
      <div className="container-fulid page-container" style={{ paddingLeft: "0px" }}>
        <Header navigate={(url) => this.navigate(this.state.page)} />
        <main className="main-content bgc-grey-100">

            <div id="mainContent">
              <div className="row">
                <Sidemenu
                  navigate={(url) => this.navigate(url)}
                  selected="report"
                />

                <div className="col-md-9 border1">
                  <div className="col-md-12">
                  <h4 className="c-grey-900 f700 col-md-10">Report Details</h4>
<br/>
<div>
<div className="row">
      <div className="col-xl-3 col-sm-6 col-12 mb-4">
        <div className="card" id="rp-total">
          <div className="card-body">
            <div className="d-flex justify-content-between px-md-1">
              <div className="align-self-center">
              <i className="fa fa-line-chart text fa-3x" id="rp-data1" aria-hidden="true"></i>
              </div>
              <div className="text-center">
                <h3>{this.state.reportcount}</h3>
                <p className="mb-0 rs-data-t" id="rs-data">Total</p>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 col-12 mb-4">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between px-md-1">
              <div className="align-self-center">
                <i className="fa fa-user text fa-3x" id="rp-data2" aria-hidden="true"></i>
              </div>
              <div className="text-center">
                <h3>{window.sessionStorage.getItem("New")}</h3>
                <p className="mb-0 rs-data-t">New Request</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 col-12 mb-4">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between px-md-1">
              <div className="align-self-center">
                <i className="fa fa-check-circle text-success fa-3x" aria-hidden="true"></i>
              </div>
              <div className="text-center">
                <h3>{window.sessionStorage.getItem("Completed")}</h3>
                <p className="mb-0 rs-data-t">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 col-12 mb-4">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between px-md-1">
              <div className="align-self-center">
                <i className="fas fa-pencil-alt text-info fa-3x"></i>
                <i className="fa fa-pencil text-danger fa-3x" aria-hidden="true"></i>
              </div>
              <div className="text-center">
                <h3>{window.sessionStorage.getItem("Pending")}</h3>
                <p className="mb-0 rs-data-t">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
</div>

              <div className="row">


                      <div
                        className="col-md-5"
                      >
                        <label htmlFor="searchby" className="text-dark font-weight-bold">Search By</label>
                        <div className="dateclass">
                          <input
                            className="form-control"
                            placeholder="Name,Email Id,Status,Mobile no"
                            onChange={(evt) => this.searchby(evt)}
                            id="searchby"
                            type="text"
                          />
                        </div>

                      </div>
                      <div className="form-group col-md-5">
                                <label htmlFor="cancelreason">
                                  Filter By Status
                                </label>
                                <select
                                  id="cs-admin-status"
                                  className="form-control "
                                  onChange={(evt) => this.filter(evt)}
                                >
                                  <option value="All">All</option>
                                  <option value="New Request">
                                    New Request
                                  </option>
                                  <option id="cs-admin-Assigned" value="Assigned">Assigned</option>
                                  <option id="cs-admin-Reassigned" value="Reassigned">Reassigned</option>
                                  <option id="cs-admin-Rescheduled" value="Rescheduled">Rescheduled</option>
                                  <option id="cs-admin-Completed" value="Completed">Completed</option>
                                  <option id="cs-admin-Cancelled" value="Cancelled">Cancelled</option>
                                </select>
                              </div>
                              </div>
                      <div className="col-md-12">
                    <div className="row">
                      <div
                        className="col-md-2"
                        style={{ marginRight: "-30px" }}
                      >
                        <div>
                          <button
                            type="submit"
                            id="cs-admin-csv"
                            className="btn btn-primary btn-color-admin admin-logout-header-btn"
                            style={{ marginTop: "20px" }}
                          >
                            <CSVLink
                              data={this.state.data}
                              filename={"Report .csv"}
                            >
                              <font color="white">Export to CSV</font>
                            </CSVLink>{" "}
                          </button>
                        </div>
                      </div>
                      <div
                        className="col-md-2"
                        style={{ marginRight: "-30px" }}
                      >
                        <div>
                          <button
                            type="submit"
                            id="cs-admin-clear"
                            className="btn btn-primary btn-color-admin ml-2"
                            style={{ marginTop: "20px" }}
                            onClick={this.filterclear}
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>{" "}
                  </div>

                      <div className=" p-20"></div>

                  </div>



                  <div className="col-md-2" style={{ marginTop: "20px" }}></div>

                  <div className="row">
                    <div
                      className="bgc-white bd bdrs-2 p-20"
                      style={{ height: 600, width: "100%" }}
                    >


                      <div
                        className="scroll"
                        style={{ height: 400, width: "100%" }}
                      >
                        <table
                          className="table table-hover text-nowrap"
                          style={{ textAlign: "center" }}
                        >
                          <thead className="table-primary">
                            <tr>
                              <th scope="col" id="demoid">Demo Id</th>
                              <th scope="col">Name</th>
                              <th scope="col">Mobile</th>
                              <th scope="col">Email ID</th>
                              <th scope="col">Meeting Date & Time</th>
                              <th scope="col">Sales Person</th>
                              <th scope="col">Status</th>

                              <th scope="col">Reason</th>
                              <th scope="col">Feedback Rating</th>
                            </tr>
                          </thead>

                          <tbody className="table-active">
                            {this.state.datalist1 &&
                              this.state.datalist1.length > 0 &&
                              _.orderBy(
                                this.state.datalist1,
                                ["demoId"],
                                ["desc"]
                              ).map((reports, reportskey) => (
                                <tr key={reportskey}>
                                  <th scope="row">{reports.demoId}</th>

                                  <td> {reports.name}</td>
                                  <td>{reports.mobile}</td>

                                  <td>{reports.email}</td>
                                  <td>
                                    {reports.meetingDate +
                                      " & \n" +
                                      reports.startTime +
                                      "-" +
                                      reports.endTime}
                                  </td>

                                  <td>{reports.salesperson}</td>
                                  <td className={reports.status ==="Completed" ?"report-c"
                                    :
                                    ""
                                    }>

                                    {reports.status}
                                    </td>

                                  <td>
                                    {reports.reason ? reports.reason : "-"}
                                  </td>
                                  <td>
                                    {reports.feedbackRating
                                      ? reports.feedbackRating
                                      : "-"}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>


                      </div>
                      <br/>
                      <div className="row">
                        <div className="cs-align-center" >
                          <div className="col-12" style={{ margin: "auto" }}>
                          {this.props.reports && (

                            <Pagination
                              parentCallback={this.callbackFunction}
                              customer={this.props.reports}
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
        <Footer/>
  </div>

  </div>
    );
  }
}
Report.propTypes = {
  requestloaddistrict: PropTypes.func,
  requestloadshowroomlist: PropTypes.func,
  requestAllReports: PropTypes.func,
  reports: PropTypes.func,
  reportlist: PropTypes.func,
  requestloadSalesPersonlist: PropTypes.func,
  users: PropTypes.func,
  requestloadusers: PropTypes.func,
};

const mapStateToProps = (state) => {
  console.debug(state, "state");
  return {
    // userlist: state.userreducer.userlist,
    // showroomlist: state.reportReducer.showroomlist,
    reports: state.reportReducer.reports,
    // salesPersonlist: state.reportReducer.salesPersonlist,
    // users: state.reportReducer.users,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // requestloadusers: state => dispatch(requestloadusers(state)),
  // requestloadshowroomlist: showroom => dispatch(requestloadshowroomlist(showroom)),
  requestAllReports: (state) => dispatch(requestAllReports(state)),
  // requestloadSalesPersonlist: salesPerson => dispatch(requestloadSalesPersonlist(salesPerson)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);
