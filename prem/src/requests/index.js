import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import Footer from "../components/footer";
import Header1 from "../components/header1";
import * as Constants from "../constants";
import Pagination from "../pagination/pagination";
import {
  cancellationrequest,
  completionrequest, reqAvailableSlots, reqloaditassigneelist, reqloadrequests, reqloadsalespersonlist, reqloadshowroom, reqsalesbyshowroom,
  saveassignrequest, savereschedulerequest
} from "./action";

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRequest: {},
      showassignModal: false,
      showrescheduleModal: false,
      showcancelModal: false,
      requestoriginallist: _.cloneDeep(props.requestlist),
      requestlist: _.cloneDeep(props.requestlist),
      isShowroomLoaded: false,
      showroom: "",
      listshowroom: "",
      salesperson: "",
      itassignee: "",
      isAssignRequestSuccess: {},
      ticket: "",
      popassignsuccessmessage: true,
      rescheduledDate: "",
      availableslots: {},
      timeslot: "",
      comments: "",
      popreschedulesuccessmessage: true,
      popcancellationsuccessmessage: true,
      popcompletionsuccessmessage: true,
      mode: "ASSIGN",
      timeZone: "(GMT+5:30) Asia/Calcutta",
      datalist1: "",
    };
    this.handleShowroomSelectChange =
      this.handleShowroomSelectChange.bind(this);
    this.handleSalesSelectChange = this.handleSalesSelectChange.bind(this);
    this.handleITAssigneeSelectChange =
      this.handleITAssigneeSelectChange.bind(this);
    this.handleSubmitAssignRequest = this.handleSubmitAssignRequest.bind(this);
    this.handleTimeSlotSelectChange =
      this.handleTimeSlotSelectChange.bind(this);
  }

  callbackFunction = (childData) => {
    if (this.props.requestlist && this.props.requestlist.success == true) {
      this.setState({ datalist1: childData });
    } else {
      this.setState({ datalist1: childData });
    }
  };

  componentDidMount() {
    this.props.reqloadrequests();
    console.log(this.props.requestlist);
    //this.props.reqloadshowroom();
    //console.log(this.props.listshowroom);
    this.props.reqloadsalespersonlist();
    //this.props.reqloaditassigneelist();
  }

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

  handleSubmitAssignRequest = () => {
    // console.log('---------------ASSIGN POST VALUES FROM INDEX.JS-------------------');
    // console.log('showroom ->' + this.state.showroom);
    // console.log('salesperson ->' + this.state.salesperson);
    // console.log('it assignee ->' + this.state.itassignee);
    // console.log('comments ->' + this.state.comments);
    // console.log('mode ->' + this.state.mode);
    // console.log('---------------END ASSIGN POST VALUES FROM INDEX.JS-------------------');
    if (this.state.salesperson && this.state.ticket && this.state.mode) {
      this.props.saveassignrequest({
        ticket: this.state.ticket,
        salesperson: this.state.salesperson,
        mode: this.state.mode,
      });
    } else {
      Swal.fire({
        title: "",
        text: "Please select the sales advisor.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    /*
        if(nextProps.requestlist!==prevState.requestlist){
        return { requestlist: nextProps.requestlist, requestoriginallist: nextProps.requestlist };
     }
     else return null;
       */ console.log("hi 2");
    if (nextProps.requestlist !== prevState.requestoriginallist) {
      console.log("hi");
      return {
        requestlist: nextProps.requestlist,
        requestoriginallist: nextProps.requestlist,
      };
    } else return null;
  }

  dropdown = (evt, req) => {
    console.log("evt\n " + evt + "req\n" + JSON.stringify(req));
    const val = evt.value;
    console.log("evt.target.value" + evt.value);
    const request = this.state.requestlist;
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

  /*  dropdown = (opt) => {
    //console.log("evt\n "+evt.target+"req\n"+JSON.stringify(req))
   const val = opt.value;
  // console.log("evt.target.value"+evt.target.value)
   const request =this.state.requestlist;
   if(val === "Reassigned"){
     this.setState({ticket: req.demoId});
     this.assignClicked(req, 'REASSIGN')
   } else if(val === "Rescheduled"){
     this.statusChange(evt, req)
   } else if(val === "Completed"){
     this.statusChange(evt, req)
   }else if(val === "Cancelled"){
     this.statusChange(evt, req)
   }

 }*/
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("requestlist" + JSON.stringify(this.props.requestlist));
    // if (this.props.requestlist !== prevProps.requestlist) {
    //   {
    //     this.setState({ datalist1: this.props.requestlist });
    //   }
    //   console.log(
    //     "this.state.datalist1" + JSON.stringify(this.state.datalist1)
    //   );
    // }
  }

  statusChange = (evt, req) => {
    const selectVal = evt.value;
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
    const datalist1 = _.cloneDeep(this.state.requestoriginallist);
    console.log(datalist1);
    if (val === "All") {
      this.setState({ datalist1: [] }, () => {
        this.setState({ datalist1 });
      });
    } else {
      this.setState({ datalist1: [] }, () => {
        this.setState({ datalist1: _.filter(datalist1, { status: val }) });
      });
    }
  };

  searchby = (evt) => {
    const val = evt.target.value.toLowerCase();
    const datalist1 = _.cloneDeep(this.state.requestoriginallist);
    console.log("search ---->" + val);
    console.log("search In---->" + JSON.stringify(datalist1));
    if (val) {
      this.setState({ datalist1: [] }, () => {
        const results = _.filter(datalist1, (item) => {
          console.log("item.demoId" + ("" + item.demoId).indexOf(val));
          return (
            ("" + item.demoId).toLowerCase().indexOf("" + val) > -1 ||
            item.requester.toLowerCase().indexOf(val) > -1 ||
             item.mobile.toLowerCase().indexOf(val) > -1 ||
            item.startTime.toLowerCase().indexOf(val) > -1 ||
            item.timeZone.toLowerCase().indexOf(val) > -1 ||
            item.meetingDate.toLowerCase().indexOf(val) > -1 ||
            item.status.toLowerCase().indexOf(val) > -1 ||
            item.endTime.toLowerCase().indexOf(val) > -1
          );
        });
        this.setState({ datalist1: results });
      });
    } else {
      this.setState({ datalist1: [] }, () => {
        this.setState({ datalist1 });
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
    //this.state.requestlist
    /*  for(var i=0;i<= this.state.requestlist.length;i++){
        if(this.state.requestlist[i]==this.state.selectedRequest){
          console.log(JSON.stringify(this.state.requestlist[i].status))
          document.getElementById("action").selectedIndex = "0";

        }
      }
      console.log(JSON.stringify(this.state.selectedRequest))
      const option = document.getElementById("action")
      console.log("option \n"+option.selectedIndex)
      document.getElementById("action").selectedIndex = "1";

       console.log("option \n"+option.selectedIndex)
      // option.innerHTML()*/
  };
  render() {
    const statusOption = [
      { label: "", value: "" },
      { label: "Rescheduled", value: "Rescheduled" },
      { label: "Reassigned", value: "Reassigned" },
      { label: "Completed", value: "Completed" },
      { label: "Cancelled", value: "Cancelled" },
    ];

    if (
      this.props.isAssignRequestSuccess !== undefined &&
      this.props.isAssignRequestSuccess !== null
    ) {
      if (this.state.popassignsuccessmessage === true) {
        if (this.props.isAssignRequestSuccess.success === true) {
          let swaltext = "The ticket has been assigned!!";
          let swaltitle = "ASSIGNED !!";
          if (this.state.mode === Constants.MODE_REASSIGN) {
            swaltext = "The ticket has been reassigned!!";
            swaltitle = "RE-ASSIGNED !!";
          }
          Swal.fire({
            title: swaltitle,
            text: swaltext,
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.value) {
              this.handleClose();
              this.props.reqloadrequests(); //refresh the page
              window.location.reload();
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: this.props.isAssignRequestSuccess.message,
            timer: 3000,
          });
        }
        this.setState({ popassignsuccessmessage: false });
      }
    }
    if (
      this.props.isRescheduleRequestSuccess !== undefined &&
      this.props.isRescheduleRequestSuccess !== null
    ) {
      if (this.state.popreschedulesuccessmessage === true) {
        if (this.props.isRescheduleRequestSuccess.success === true) {
          Swal.fire({
            title: "RE-SCHEDULED",
            text: "The Ticket has been re-scheduled!!",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.value) {
              this.handleClose();
              this.props.reqloadrequests(); //refresh the page
              window.location.reload();
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: this.props.isRescheduleRequestSuccess.message,
          });
        }
        this.setState({ popreschedulesuccessmessage: false });
      }
    }

    if (
      this.props.isCancellationSuccess !== undefined &&
      this.props.isCancellationSuccess !== null
    ) {
      if (this.state.popcancellationsuccessmessage === true) {
        if (this.props.isCancellationSuccess.success === true) {
          Swal.fire({
            title: "CANCELLED",
            text: "The Ticket has been Cancelled!!",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.value) {
              this.handleClose();
              this.props.reqloadrequests(); //refresh the page
              window.location.reload();
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: this.props.isCancellationSuccess.message,
          });
        }
        this.setState({ popcancellationsuccessmessage: false });
      }
    }
    if (
      this.props.isCompletionSuccess !== undefined &&
      this.props.isCompletionSuccess !== null
    ) {
      if (this.state.popcompletionsuccessmessage === true) {
        if (this.props.isCompletionSuccess.success === true) {
          // window.location.reload();
          Swal.fire({
            title: "COMPLETED",
            text: "The Ticket is Complete!!",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.value) {
              this.handleClose();
              this.props.reqloadrequests(); //refresh the page
            }
          });
        } else {
          window.location.reload();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: this.props.isCompletionSuccess.message,
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.value) {
            }
          });
        }

        this.setState({ popcompletionsuccessmessage: false });
      }
    }

    const {
      ticket,
      showroom,
      salesperson,
      itAssignee,
      timeslot,
      comments,
      submitted,
      role,
    } = this.state;
    let showroomOptions = [{ label: "Loading Showrooms...", value: 1 }];
    let salespersonOptions = [{ label: "Loading Salespersons...", value: 1 }];
    let itAssigneeOptions = [{ label: "Loading IT Assignees...", value: 1 }];
    let timeslotOptions = [{ label: "Loading Time Slots...", value: 1 }];

    if (
      this.props.listshowroom !== undefined &&
      this.props.listshowroom !== null
    ) {
      showroomOptions = this.props.listshowroom.map((row) => {
        //console.log('inside the loop ---->' + row.showroom);
        return { label: row.showroom, value: row.showroom };
      });
    }
    if (
      this.props.salespersonlist !== undefined &&
      this.props.salespersonlist !== null
    ) {
      salespersonOptions = this.props.salespersonlist.map((salesperson) => {
        //console.log('inside the loop ---->' + salesperson);
        return { label: salesperson, value: salesperson };
      });
    }
    if (
      this.props.itassigneelist !== undefined &&
      this.props.itassigneelist !== null
    ) {
      itAssigneeOptions = this.props.itassigneelist.map((itAssignee) => {
        //console.log('inside the loop itassignee ---->' + itAssignee);
        return { label: itAssignee, value: itAssignee };
      });
    }
    if (
      this.props.availableslots !== undefined &&
      this.props.availableslots !== null
    ) {
      if (
        this.props.availableslots.success !== undefined &&
        this.props.availableslots.success === true
      ) {
        timeslotOptions = this.props.availableslots.slots.map((timeslot) => {
          console.log("inside the loop timeslots ---->" + timeslot);
          return { label: timeslot, value: timeslot };
        });
      } else if (
        this.props.availableslots.success !== undefined &&
        this.props.availableslots.success === false
      ) {
      }
    }

    return (
      <div className="page-container" style={{ paddingLeft: "0px" }}>
        <Header1 navigate={(url) => this.navigate("/sales")} />
        <main className="main-content bgc-grey-100">
          <div id="mainContent">
            <div id="mainContent">
              <div className="row">
                <div className="col-md-2">
                  <div className="list-group">
                    <li className="list-group-item list-group-item-action active">
                      {" "}
                      <span className="icon-holder">
                        <i className="c-blue-500 ti-headphone-alt"></i>{" "}
                      </span>{" "}
                      Requests
                    </li>
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="bgc-white p-20">
                        <div className="row">
                          <h4 className="c-grey-900 f700 col-md-7">Requests</h4>

                          <div className="col-md-5">
                            <div className="row">
                              <div className="form-group col-md-5">
                                <label htmlFor="cancelreason">
                                  Filter By Status
                                </label>
                                <select
                                  className="form-control "
                                  onChange={(evt) => this.filterby(evt)}
                                >
                                  <option value="All">All</option>
                                  <option value="New Request">
                                    New Request
                                  </option>
                                  <option value="Assigned">Assigned</option>
                                  <option value="Reassigned">Reassigned</option>
                                  <option value="Rescheduled">
                                    Rescheduled
                                  </option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </div>
                              <div className="form-group col-md-5">
                                <label htmlFor="searchby">Search By</label>
                                <input
                                  className="form-control"
                                  placeholder="Name"
                                  onChange={(evt) => this.searchby(evt)}
                                  id="searchby"
                                  type="text"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mT-30">
                          <table className="table table-hover">
                            <thead className="table-primary ">
                              <tr>
                                <th scope="col">Ticket</th>
                                <th scope="col">Name</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Date</th>
                                <th scope="col">Slot</th>
                                <th scope="col">Status</th>
                                <th scope="col" />
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.datalist1 &&
                                this.state.datalist1.length > 0 &&
                                _.orderBy(
                                  this.state.datalist1,
                                  ["demoId"],
                                  ["desc"]
                                ).map((request, requestkey) => (
                                  <tr key={requestkey}>
                                    <td>
                                      <Link
                                        className="details-link"
                                        to={"/details?ticket=" + request.demoId}
                                      >
                                        {request.demoId}
                                      </Link>
                                    </td>
                                    <td>{request.requester}</td>
                                    <td>{request.mobile}</td>
                                    <td>{request.meetingDate}</td>
                                    <td>
                                      {request.startTime}-{request.endTime}
                                    </td>
                                    <td>{request.status}</td>

                                    <td>
                                      {/* { request.status === "New Request"
                                                                ? <button type="button" onClick={()=>{ this.assignClicked(request, 'ASSIGN')}} className="btn-outline-primary">Assign</button> :
                                                                 (request.status === "Assigned" || request.status === "Reassigned" || request.status === "Rescheduled" )?
                                                                <select className="form-control" id="action" onChange={(evt)=> this.dropdown(evt,request)}>
                                                                        <option value="Select">Select</option>
                                                                <option value="Rescheduled">Rescheduled</option>
                                                                  <option value="Reassigned">Reassigned</option>
                                                                <option value="Completed">Completed</option>
                                                                <option value="Cancelled">Cancelled</option>
                                                              </select> :''} */}

                                      {request.status === "New Request" ? (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            this.assignClicked(
                                              request,
                                              "ASSIGN"
                                            );
                                          }}
                                          className="btn-outline-primary"
                                        >
                                          Assign
                                        </button>
                                      ) : request.status === "Assigned" ||
                                        request.status === "Reassigned" ||
                                        request.status === "Rescheduled" ? (
                                        <div
                                          className="col-lg-12"
                                          style={{ width: 200 }}
                                        >
                                          <Select
                                            onChange={(evt) =>
                                              this.dropdown(evt, request)
                                            }
                                            //  value={{label: this.state.option, value: this.state.option}}
                                            options={statusOption}
                                            name="liteserviceSupport"
                                          />{" "}
                                        </div>
                                      ) : (
                                        ""
                                      )}

                                      {/* { request.status === "ASSIGNED" || request.status === "REASSIGNED"
                                                                                        || (request.salesperson != null && request.status !== 'CANCELLED' && request.status !== 'COMPLETED')
                                                                ? <button type="button" onClick={()=>{ this.assignClicked(request, 'REASSIGN')}} className="btn-outline-primary">Reassign</button> : "" } */}
                                      {/* { request.status === "Assigned" || request.status === "Reassigned" ||request.status !== 'Cancelled' || request.status !== 'COMPLETED'
                                                                ? <select className="form-control " onChange={(evt)=> this.dropdown(evt,request)}>
                                                                <option value="Rescheduled">Rescheduled</option>
                                                                  <option value="Reassigned">Reassigned</option>
                                                                <option value="Completed">Completed</option>
                                                                <option value="Cancelled">Cancelled</option>
                                                              </select> : "" }  */}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                          <div>

                            {this.props.requestlist ? (
                                   <div className="row">
                                   <div className="cs-align-center" >
                                     <div className="col-12" style={{ margin: "auto" }}>
                                     {this.props.requestlist && (

                                       <Pagination
                                         parentCallback={this.callbackFunction}
                                         customer={this.props.requestlist}
                                       />
                                     )}
                                   </div>
                                   </div>
                                   </div>
                            ) : null}
                          </div>

                          <Modal
                            show={this.state.showassignModal}
                            onHide={this.handleClose}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>
                                Ticket : {this.state.selectedRequest.demoId}
                              </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                              {/* <div className="form-group">
                                              <label htmlFor="showrooms">Showrooms</label>
                                              <Select onChange={this.handleShowroomSelectChange}
                                                      isSearchable={true}
                                                      role={showroom}
                                                      options= {showroomOptions}
                                                      defaultValue = {{label:this.state.selectedRequest.showroom, value: this.state.selectedRequest.showroom}}
                                                      name='showroom'/>
                                            </div> */}
                              <div className="form-group">
                                <label htmlFor="salesassignee">
                                  Sales Advisor
                                </label>
                                <Select
                                  onChange={this.handleSalesSelectChange}
                                  isSearchable={true}
                                  role={salesperson}
                                  options={salespersonOptions}
                                  defaultValue={{
                                    label:
                                      this.state.selectedRequest.salesperson,
                                    value:
                                      this.state.selectedRequest.salesperson,
                                  }}
                                  name="salesperson"
                                />
                              </div>
                              {/* {
                                              this.state.selectedRequest.wantSupport === 1 ?

                                                  <div className="form-group">
                                                      <label htmlFor="itAssignee">IT Assignee</label>
                                                      <Select onChange={this.handleITAssigneeSelectChange}
                                                              isSearchable={true}
                                                              role={itAssignee}
                                                              options={itAssigneeOptions}
                                                              defaultValue = {{label:this.state.selectedRequest.itAssignee, value: this.state.selectedRequest.itAssignee}}
                                                              name='itAssignee'/>
                                                  </div>
                                          : null } */}
                            </Modal.Body>

                            <Modal.Footer>
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={this.handleClose}
                              >
                                Close
                              </button>
                              {this.state.mode === "ASSIGN" ? (
                                <button
                                  type="button"
                                  onClick={this.handleSubmitAssignRequest}
                                  className="btn btn-primary"
                                >
                                  Assign
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={this.handleSubmitAssignRequest}
                                  className="btn btn-primary"
                                >
                                  Reassign
                                </button>
                              )}
                            </Modal.Footer>
                          </Modal>
                          <Modal
                            show={this.state.showrescheduleModal}
                            onHide={this.handleClose}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>
                                Ticket : {this.state.selectedRequest.demoId}
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="form-group">
                                <label htmlFor="comments">
                                  Reason to Reschedule
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={this.handleChange}
                                  id={"comments"}
                                  name={"comments"}
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="cdate">Rescheduled Date</label>
                                <div className="dateclass">
                                  <DatePicker
                                    selected={this.state.rescheduledDate}
                                    minDate={new Date()}
                                    onChange={this.handledateChange}
                                  />
                                  <span className="icon-holder">
                                    <i className="c-blue-500 ti-calendar"></i>{" "}
                                  </span>
                                </div>
                              </div>

                              <div className="form-group">
                                <label htmlFor="timeslot">
                                  Available Time Slots
                                </label>
                                <Select
                                  onChange={this.handleTimeSlotSelectChange}
                                  isSearchable={true}
                                  role={timeslot}
                                  options={timeslotOptions}
                                  name="timeslot"
                                />
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={this.handleClose}
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                onClick={() => this.requestReschedule()}
                                className="btn btn-primary"
                              >
                                Reschedule
                              </button>
                            </Modal.Footer>
                          </Modal>
                          <Modal
                            show={this.state.showcancelModal}
                            onHide={this.handleClose}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>
                                Ticket : {this.state.selectedRequest.ticket}
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="form-group">
                                <label htmlFor="cancelreason">
                                  Reason to Cancel
                                </label>
                                <input
                                  type="text"
                                  ref={(input) => (this.cancelinput = input)}
                                  className="form-control"
                                  id="cancelreason"
                                />
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={this.handleClose}
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                onClick={() => this.requestCancel()}
                                className="btn btn-primary"
                              >
                                Confirm
                              </button>
                            </Modal.Footer>
                          </Modal>
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
      </div>
    );
  }
}
Request.propTypes = {
  reqloadrequests: PropTypes.func,
  reqloadshowroom: PropTypes.func,
  reqloadsalespersonlist: PropTypes.func,
  reqloaditassigneelist: PropTypes.func,
  reqsalesbyshowroom: PropTypes.func,
  saveassignrequest: PropTypes.func,
  reqAvailableSlots: PropTypes.func,
  savereschedulerequest: PropTypes.func,
  cancellationrequest: PropTypes.func,
  completionrequest: PropTypes.func,
  listshowroom: PropTypes.array,
  salespersonlist: PropTypes.array,
  itassigneelist: PropTypes.array,
  isAssignRequestSuccess: PropTypes.object,
  availableslots: PropTypes.object,
  isRescheduleRequestSuccess: PropTypes.object,
  isCancellationSuccess: PropTypes.object,
  isCompletionSuccess: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    requestlist: state.requestreducer.requestlist,
    listshowroom: state.requestreducer.listshowroom,
    salespersonlist: state.requestreducer.salespersonlist,
    itassigneelist: state.requestreducer.itassigneelist,
    isAssignRequestSuccess: state.requestreducer.isAssignRequestSuccess,
    availableslots: state.requestreducer.availableslots,
    isRescheduleRequestSuccess: state.requestreducer.isRescheduleRequestSuccess,
    isCancellationSuccess: state.requestreducer.isCancellationSuccess,
    isCompletionSuccess: state.requestreducer.isCompletionSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  reqloadrequests: (state) => dispatch(reqloadrequests(state)),
  reqloadshowroom: (showroom) => dispatch(reqloadshowroom(showroom)),
  reqloadsalespersonlist: (state) => dispatch(reqloadsalespersonlist(state)),
  reqloaditassigneelist: (state) => dispatch(reqloaditassigneelist(state)),
  reqsalesbyshowroom: (showroom) => dispatch(reqsalesbyshowroom(showroom)),
  saveassignrequest: (params) => dispatch(saveassignrequest(params)),
  reqAvailableSlots: (params) => dispatch(reqAvailableSlots(params)),
  savereschedulerequest: (params) => dispatch(savereschedulerequest(params)),
  cancellationrequest: (params) => dispatch(cancellationrequest(params)),
  completionrequest: (params) => dispatch(completionrequest(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Request);
