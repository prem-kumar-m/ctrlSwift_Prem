import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { BsDownload } from "react-icons/bs";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/footer";
import Header1 from "../components/header1";
import Sidemenu from "../components/sidemenu";
import Pagination from "../pagination/pagination";
import { planDetialsRequest, reqloadreguser } from "./action";
class RegisterCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRequest: {},
      showassignModal: false,
      showrescheduleModal: false,
      showcancelModal: false,
      requestoriginallist: _.cloneDeep(props.reglist),
      reglist: _.cloneDeep(props.reglist),
      isShowroomLoaded: false,
      showroom: "",
      listshowroom: "",
      salesperson: "",
      itassignee: "",
      isAssignRequestSuccess: {},
      ticket: "",
      popassignsuccessmessage: true,
      rescheduledDate: new Date(),
      availableslots: {},
      timeslot: "",
      comments: "",
      popreschedulesuccessmessage: true,
      popcancellationsuccessmessage: true,
      popcompletionsuccessmessage: true,
      mode: "ASSIGN",
      timeZone: "(GMT+5:30) Asia/Calcutta",
      customerCount: "",
      csvdata: [],
      show: false,
      dataPie: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#F7464A",
              "#46BFBD",
              "#FDB45C",
              "#949FB1",
              // "#4D5360",
              // "#AC64AD"
            ],
            hoverBackgroundColor: [
              "#FF5A5E",
              "#5AD3D1",
              "#FFC870",
              "#A8B3C5",
              // "#616774",
              // "#DA92DB"
            ],
          },
        ],
      },
      usedDataPie: {
        labels: [],
        datasets: [
          {
            data: [20, 35, 49],
            backgroundColor: [
              "#F7464A",
              "#46BFBD",
              "#FDB45C",
              "#949FB1",
              // "#4D5360",
              // "#AC64AD"
            ],
            hoverBackgroundColor: [
              "#FF5A5E",
              "#5AD3D1",
              "#FFC870",
              "#A8B3C5",
              // "#616774",
              // "#DA92DB"
            ],
          },
        ],
      },
    };
    this.handleShowroomSelectChange =
      this.handleShowroomSelectChange.bind(this);
    this.handleSalesSelectChange = this.handleSalesSelectChange.bind(this);
    this.handleITAssigneeSelectChange =
      this.handleITAssigneeSelectChange.bind(this);
    this.handleTimeSlotSelectChange =
      this.handleTimeSlotSelectChange.bind(this);
  }



  callbackFunction = (childData) => {
    if (
      this.props.reglist &&
      this.props.reglist.success === true
    ) {
      this.setState({ datalist1: childData });
    } else {
      this.setState({ datalist1: childData });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSelectChange = (selectedOption) => {
    //console.log('selectedOption -->' + selectedOption.label + ' : ' );
    this.setState({ role: selectedOption.label });
  };

  handledateChange = (date) => {
    console.log("----rescheduled date :" + date);
    this.setState({
      rescheduledDate: date,
    });
    let dayparam = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let monthparam =
      date.getMonth() < 9 ? "0" + (1 + date.getMonth()) : 1 + date.getMonth();
    let dateparam = date.getFullYear() + "-" + monthparam + "-" + dayparam;
    this.props.reqAvailableSlots({
      dateparam: dateparam,
      timeZone: this.state.timeZone,
    });
  };
  handleShowroomSelectChange = (selectedOption) => {
    this.setState({ showroom: selectedOption.label });
    console.log("selected Showroom is " + selectedOption.label);
    this.props.reqsalesbyshowroom(selectedOption.label);
  };
  handleSalesSelectChange = (selectedOption) => {
    this.setState({ salesperson: selectedOption.label });
  };
  handleITAssigneeSelectChange = (selectedOption) => {
    this.setState({ itassignee: selectedOption.label });
  };
  handleTimeSlotSelectChange = (selectedOption) => {
    this.setState({ timeslot: selectedOption.label });
  };

  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.reglist !== prevState.requestoriginallist) {
      console.log("hi");
      return {
        reglist: nextProps.reglist,
        requestoriginallist: nextProps.reglist,
      };
    } else return null;
  }

  dropdown = (evt, req) => {
    const val = evt.target.value;
    console.log("evt.target.value" + evt.target.value);
    // const request = this.state.requestlist;
    if (val === "Reassigned") {
      this.setState({ ticket: req.demoId });
      this.assignClicked(req, "REASSIGN");
    } else if (val === "Rescheduled") {
      this.statusChange(evt, req);
    } else if (val === "Completed") {
      this.statusChange(evt, req);
    } else if (val === "Cancelled") {
      this.statusChange(evt, req);
    }
  };
  componentDidMount() {
    this.props.reqloadreguser();

    //this.props.reqloadshowroom();
    //this.props.reqloadsalespersonlist();
    //this.props.reqloaditassigneelist();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(
      "this.state.selectedRequest" + JSON.stringify(this.state.selectedRequest)
    );
    console.log(
      "this.state.selectedRequest" + JSON.stringify(this.props.reglist)
    );
    if (this.props.reglist !== prevProps.reglist) {
      this.setState({
        reglist: this.props.reglist,
        reglistCopy: this.props.reglist,
        customerCount: this.props.reglist.length,
      });
    }
    // planlist part popup
    if (this.props.planList !== prevProps.planList) {
      this.setState({
        isLoading: false,
      });
      if (this.props.planList.success) {
        this.state.dataPie.datasets[0].data = this.props.planList.plansList.map(
          (row, rowkey) => {
            return this.props.planList.plansList[rowkey].actualTicket;
          }
        );

        this.state.dataPie.labels = this.props.planList.plansList.map(
          (row, rowkey) => {
            return this.props.planList.plansList[rowkey].plan;
          }
        );
        this.state.usedDataPie.labels = this.props.planList.plansList.map(
          (row, rowkey) => {
            return this.props.planList.plansList[rowkey].plan;
          }
        );

        this.setState({
          planList: this.props.planList.plansList,
          show: true,
          isLoading: false,
        });
      } else {
        Swal.fire({
          title: "",
          text: this.props.planList.message,
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      }
    }
    console.log("datas::" + JSON.stringify(this.state.data));
  }

  statusChange = (evt, req) => {
    const selectVal = evt.target.value;
    if (selectVal === "Cancelled") {
      this.setState({ showcancelModal: true });
    } else if (selectVal === "Rescheduled") {
      console.log("req.demoId" + req.demoId);
      this.setState({ showrescheduleModal: true });
      this.setState({ ticket: req.demoId });
    } else if (selectVal === "Completed") {
      Swal.fire({
        title: "",
        text: "Please confirm if this Ticket is completed.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, completed!",
      }).then((result) => {
        if (result.value) {
          console.log(
            "this.state.selectedRequest.ticket" +
            this.state.selectedRequest.demoId
          );
          this.props.completionrequest({
            demoId: this.state.selectedRequest.demoId,
          });
        } else if (result.dismiss == "cancel") {
          window.location.reload();
        }
      });
    }

    this.setState({ selectedRequest: req });
  };
  assignClicked = (request, type) => {
    this.setState({
      selectedRequest: request,
      showassignModal: true,
      mode: type,
    });
    console.log("--->Open Assign Modal<--" + type);
    if (request !== undefined && request !== null) {
      this.setState({ ticket: request.demoId });
      if (
        request !== undefined &&
        request !== null &&
        request.wantSupport === 0
      ) {
        console.log("----Turning off itassignee---");
        this.setState({ itassignee: "" });
      }
    }
    this.setState({ selectedRequest: request });
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  navigate = (url) => {
    this.props.history.push(url);
  };

  filterby = (evt) => {
    console.log("evt.target.value" + evt.target.value);
    const val = evt.target.value;
    const reglist = _.cloneDeep(this.state.requestoriginallist);
    console.log(reglist);
    if (val === "All") {
      this.setState({ reglist: [] }, () => {
        this.setState({ reglist });
      });
    } else {
      this.setState({ reglist: [] }, () => {
        this.setState({ reglist: _.filter(reglist, { isAdmin: val }) });
      });
    }
  };


  requestAssign = () => {
    //this.handleClose();
  };
  requestReschedule = () => {
    console.log(this.state.selectedRequest);
    console.log(
      "---------------RESCHEDULE POST VALUES FROM INDEX.JS-------------------"
    );
    console.log("rescheduledDate ->" + this.state.rescheduledDate);
    console.log("timeslot ->" + this.state.timeslot);
    console.log("comments ->" + this.state.comments);
    console.log(
      "---------------END RESCHEDULE POST VALUES FROM INDEX.JS-------------------"
    );
    if (
      this.state.rescheduledDate &&
      this.state.timeslot &&
      this.state.comments
    ) {
      let date = this.state.rescheduledDate;
      let dayparam =
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let monthparam =
        date.getMonth() < 9 ? "0" + (1 + date.getMonth()) : 1 + date.getMonth();
      let dateparam = date.getFullYear() + "-" + monthparam + "-" + dayparam;
      //let dateparam = dayparam +'/'+ monthparam +'/'+ date.getFullYear();
      console.log("dateparam ->" + dateparam);
      let timeparam = this.state.timeslot;
      let range = timeparam.split(" -- ");
      let startrange = range[0];
      console.log("startrange ----" + startrange);
      let start = startrange.split(" ");
      console.log("start" + start);
      // let starttimeparam = '';
      // if(start[0] !== undefined && start[0] != null) {
      //     starttimeparam = (start[0] < 10) ? '0'+start[0]+':00 '+start[1] : start[0] +':00 '+start[1];
      // }
      console.log("tange[1] --->" + range[1] + "<--");
      let endrange = range[1];
      console.log("endrange ----" + endrange);
      // let end = endrange.split(' ');
      // console.log('end' + end);
      // let endtimeparam = '';
      // if(end[0] !== undefined && end[0] != null) {
      //     endtimeparam = (end[0] < 10) ? '0'+end[0]+end[1] : end[0] +end[1];
      // }
      //console.log('start time ---' + starttimeparam);
      //console.log('end time ----' + endtimeparam);
      console.log(
        "ticket" + this.state.ticket,
        "convenientDate" + dateparam,
        "convenientStartTime" + startrange,
        "convenientEndTime" + endrange,
        "comments" + this.state.comments
      );
      this.props.savereschedulerequest({
        demoId: this.state.ticket,
        date: dateparam,
        timeZone: "(GMT+5:30) Asia/Calcutta",
        startTime: startrange,
        endTime: endrange,
        comments: this.state.comments,
      });
      this.setState({ popreschedulesuccessmessage: true });
    } else {
      Swal.fire({
        title: "",
        text: "Please fill all the details.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    }
  };
  requestCancel = () => {
    console.log(this.cancelinput.value);
    console.log(this.state.selectedRequest.demoId);
    if (this.state.selectedRequest.demoId && this.cancelinput.value) {
      this.props.cancellationrequest({
        demoId: this.state.selectedRequest.demoId,
        comments: this.cancelinput.value,
      });
    } else {
      Swal.fire({
        title: "",
        text: "Please fill the reason to cancel",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    }
  };
  handleClose = () => {
    this.setState({
      showassignModal: false,
      showrescheduleModal: false,
      showcancelModal: false,
    });
  };
  hidemodel = () => {
    this.setState({
      show: false,
    });
  }
  customerDetials = (name, id) => {
    console.log(
      "event-------" + JSON.stringify(name) + "-----event--------" + id
    );
    localStorage.setItem("name", name);
    localStorage.setItem("id", id);
    this.props.planDetials(id);
    //  window.location.href = "/customerDetials";

  };

  searchby = (evt) => {
    const val = evt.target.value.toLowerCase();
    const requestlist = _.cloneDeep(this.state.reglistCopy);
    console.log("search ---->" + val);
    if (val) {
      this.setState({ requestlist: [] }, () => {
        const results = _.filter(requestlist, (item) => {
          return (
            item.company.toLowerCase().indexOf(val) > -1
            //  || item.mobile.indexOf(val)>-1 || item.meetingDate.indexOf(val)>-1
            //     || item.startTime.indexOf(val)>-1 || item.metal.indexOf(val)>-1 || item.product.indexOf(val)>-1
            //     || item.description.indexOf(val)>-1
          );
        });
        this.setState({ datalist1: results });
      });
    } else {
      this.setState({ datalist1: [] }, () => {
        this.setState({ datalist1: this.state.reglistCopy });
      });
    }
  };

  render() {
    let data1 = [];
    if (this.props.reglist !== undefined && this.props.reglist !== null) {
      for (var i = 1; i <= this.props.reglist.length; i++) {
        this.props.reglist &&
          this.props.reglist.length > 0 &&
          _.orderBy(this.state.reglist, ["ticket"], ["desc"]).map(
            (reglist, i) =>
            (data1[i] = {
              DemoId: reglist.company,
              Name: reglist.name,
              Mobile: reglist.mobile,
              Email: reglist.email,
              Address: reglist.address,
              Department: reglist.department,
              TaxId: reglist.taxId,
              LoginCount: reglist.loginCount,

            })
          );

        this.state.csvdata = data1;
      }
    }
    return (
      <div className="page-container" style={{ paddingLeft: "0px" }}>
        <Header1 navigate={(url) => this.navigate("/admin")} />
        <main className="main-content bgc-grey-100">
          <div id="mainContent">
            <div id="mainContent">
              <div className="row">

                <Sidemenu
                  navigate={(url) => this.navigate(url)}
                  selected="registerCustomer"
                />

                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-12 ">
                      <div
                        className="bgc-white p-20"
                        style={{ paddingBottom: "0px" }}
                      >

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="row">
                              <div className="form-group col-md-4">
                                <label htmlFor="searchby" className="text-dark font-weight-bold">Search By</label>
                                {/* <input
                                  className="form-control"
                                  placeholder="Company"
                                  onChange={(evt) => this.searchby(evt)}
                                  id="searchby"
                                  type="text"
                                /> */}

                                <div className="input-group mb-3">
                                  <input type="text" className="form-control" placeholder="Company"
                                  aria-label="Company"
                                  aria-describedby="basic-addon2"
                                  onChange={(evt) => this.searchby(evt)}
                                  id="searchby"
                                  type="text"

                                  />
                                  <div className="input-group-append">
                                  <button
                                  type="submit"
                                  className="btn btn-primary btn-color-admin admin-logout-header-btn "
                                  id="cs-admin-csv"
                                  data-toggle="tooltip"
                                  data-placement="right"
                                  title="Export to CSV"
                                >
                                  <CSVLink
                                    data={this.state.csvdata}
                                    filename={"registerCustomer.csv"}
                                  >
                                    <font color="white"><BsDownload /></font>
                                  </CSVLink>
                                  {" "}
                                </button>

                                                                </div>
                                </div>
                              </div>



                              <div className="col-xl-4 offset-md-3  col-sm-6 col-12 mb-4">
                                <div className="card" id="rp-total">
                                  <div className="card-body">
                                    <div className="d-flex justify-content-between px-md-1">
                                      <div className="align-self-center">
                                        <i className="fa fa-line-chart text fa-3x" id="rp-data1" aria-hidden="true"></i>
                                        {/* <i className="fas fa-pencil-alt text-info fa-3x">aaa</i> */}
                                      </div>
                                      <div className="text-center font-weight-bold">
                                        <h3>{this.state.customerCount}</h3>

                                        <p className="mb-0 rs-data-c text-muted">Registered Customers</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>

                        </div>

                        <div className=" p-20 pt-2">

                          <div className="mT-30  ">
                            <h2 className="f700">Registered Customer</h2>
                            <div
                              className="scroll"
                              style={{ width: "100%" }}
                            >
                              <table
                                className="table table-hover"
                                style={{ textAlign: "left", whiteSpace: "nowrap" }}
                              >
                                <thead className="table-primary">
                                  <tr>
                                    <th
                                      scope="col"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Company
                                    </th>
                                    <th
                                      scope="col"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Name
                                    </th>
                                    <th
                                      scope="col"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Mobile
                                    </th>
                                    <th
                                      scope="col"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Email
                                    </th>
                                    <th
                                      scope="col"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Address
                                    </th>
                                    <th
                                      scope="col"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Department
                                    </th>
                                    <th
                                      scope="col"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Admin
                                    </th>
                                    <th
                                      scope="col"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Tax Id
                                    </th>
                                    <th
                                      scope="col"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      Login count
                                    </th>

                                    <th scope="col" />
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.datalist1 &&
                                    this.state.datalist1.length > 0 &&
                                    this.state.datalist1.map(
                                      (customer, customerkey) => (
                                        <tr key={customerkey}>
                                          <td>
                                            {customer.isAdmin == "1" ? (
                                              <Link
                                                onClick={(name, id) =>
                                                  this.customerDetials(
                                                    customer.company,
                                                    customer.customerId
                                                  )
                                                }
                                              >
                                                {customer.company}
                                              </Link>
                                            ) : (
                                              customer.company
                                            )}
                                          </td>
                                          <td>{customer.name}</td>
                                          <td>{customer.mobile}</td>
                                          <td>{customer.email}</td>
                                          <td>{customer.address}</td>
                                          <td>{customer.department}</td>
                                          <td>
                                            {customer.isAdmin == "1"
                                              ? "Yes"
                                              : "No"}{" "}
                                          </td>
                                          <td>{customer.taxId}</td>
                                          <td>{customer.loginCount}</td>
                                        </tr>
                                      )
                                    )}
                                </tbody>
                              </table>
                            </div>{" "}

                          </div>

                        </div>


                      </div>
                      <div className="row">
                        <div className="cs-align-center" >
                          <div className="col-12" style={{ margin: "auto" }}>
                            {this.props.reglist && (
                              <Pagination
                                parentCallback={this.callbackFunction}
                                customer={this.props.reglist}
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

          </div>
        </main>
        <Modal
          show={this.state.show}
          onHide={() => this.hidemodel()}
          backdrop={"static"}
          size="lg"
        >
          <Modal.Header closeButton>
            <h3 >
              PlanList
            </h3>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12 ">
              <div
                className="bgc-white p-20"
                style={{ paddingBottom: "0px" }}
              >

                <div
                  className="scroll"
                  style={{ width: "100%", height: 500 }}
                >
                  <table
                    className="table table-hover lg "
                    style={{ textAlign: "left" }}
                  >
                    <thead>
                      <tr className="table-info">
                        <th scope="col" style={{ fontWeight: "bold" }}>
                          Plan
                        </th>
                        <th scope="col" style={{ fontWeight: "bold" }}>
                          Actual Ticket
                        </th>
                        <th scope="col" style={{ fontWeight: "bold" }}>
                          Service Support
                        </th>
                        <th scope="col" style={{ fontWeight: "bold" }}>
                          Payment Terms
                        </th>
                        <th scope="col" style={{ fontWeight: "bold" }}>
                          TollFree Number
                        </th>
                        <th scope="col" style={{ fontWeight: "bold" }}>
                          Contract Duration
                        </th>
                        <th scope="col" style={{ fontWeight: "bold" }}>
                          Initialisation Date
                        </th>
                        <th scope="col" style={{ fontWeight: "bold" }}>
                          Expire Date
                        </th>
                        <th scope="col" style={{ fontWeight: "bold" }}>
                          status
                        </th>
                        <th scope="col" style={{ fontWeight: "bold" }}>
                          Created On
                        </th>
                        <th scope="col" style={{ fontWeight: "bold" }}>
                          Activated On
                        </th>
                        <th scope="col" style={{ fontWeight: "bold" }}>
                          Updated On
                        </th>

                      </tr>
                    </thead>
                    <tbody>
                      {this.state.show
                        ? this.props.planList &&
                        this.props.planList.plansList.length > 0 &&
                        _.orderBy(
                          this.props.planList.plansList,
                          ["plan"],
                          ["ace"]
                        ).map((customer, customerkey) => (
                          <tr key={customerkey}>
                            <td style={{ columnWidth: 200 }}>
                              {customer.plan}
                            </td>
                            <td style={{ columnWidth: 200 }}>
                              {customer.actualTicket}

                            </td>
                            <td style={{ columnWidth: 200 }}>

                              {customer.serviceSupport}

                            </td>
                            <td style={{ columnWidth: 200 }}>
                              {customer.paymentTerms}
                            </td>
                            <td style={{ columnWidth: 200 }}>
                              {customer.isTollFreeNumber}
                            </td>
                            <td style={{ columnWidth: 200 }}>
                              {customer.contractDuration}
                            </td>
                            <td style={{ columnWidth: 200 }}>
                              {customer.serviceInitialisationDate}{" "}
                            </td>
                            <td style={{ columnWidth: 200 }}>
                              {customer.serviceExpireDate}
                            </td>
                            <td style={{ columnWidth: 200 }}>
                              {customer.status}
                            </td>
                            <td style={{ columnWidth: 200 }}>
                              {customer.createdOn}
                            </td>
                            <td style={{ columnWidth: 200 }}>
                              {customer.activatedOn}
                            </td>
                            <td style={{ columnWidth: 200 }}>
                              {customer.updatedOn}
                            </td>
                            <td></td>
                          </tr>
                        ))
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Footer />
      </div>
    );
  }
}
RegisterCustomer.propTypes = {
  reqloadreguser: PropTypes.func,

  reglist: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    reglist: state.registercustomerReducer.reglist,
    planList: state.customerDetailsReducer.planList,

  };
};

const mapDispatchToProps = (dispatch) => ({
  reqloadreguser: (state) => dispatch(reqloadreguser(state)),
  planDetials: (id) => dispatch(planDetialsRequest(id)),

});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCustomer);
