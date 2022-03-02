// import _ from "lodash";
// import { PropTypes } from "prop-types";
// import React, { Component } from "react";
// import { connect } from "react-redux";
// import Swal from "sweetalert2";
// import Footer from "../components/footer";
// import Header1 from "../components/header1";
// import Sidemenu from "../components/sidemenu";
// import { reqloadreguser } from "./action";

// class profile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedRequest: {},
//       showassignModal: false,
//       showrescheduleModal: false,
//       showcancelModal: false,
//       requestoriginallist: _.cloneDeep(props.reglist),
//       reglist: _.cloneDeep(props.reglist),
//       isShowroomLoaded: false,
//       showroom: "",
//       listshowroom: "",
//       salesperson: "",
//       itassignee: "",
//       isAssignRequestSuccess: {},
//       ticket: "",
//       popassignsuccessmessage: true,
//       rescheduledDate: new Date(),
//       availableslots: {},
//       timeslot: "",
//       comments: "",
//       popreschedulesuccessmessage: true,
//       popcancellationsuccessmessage: true,
//       popcompletionsuccessmessage: true,
//       mode: "ASSIGN",
//       timeZone: "(GMT+5:30) Asia/Calcutta",
//     };
//     this.handleShowroomSelectChange =
//       this.handleShowroomSelectChange.bind(this);
//     this.handleSalesSelectChange = this.handleSalesSelectChange.bind(this);
//     this.handleITAssigneeSelectChange =
//       this.handleITAssigneeSelectChange.bind(this);
//     this.handleTimeSlotSelectChange =
//       this.handleTimeSlotSelectChange.bind(this);
//   }
//   componentDidMount() {
//     this.props.reqloadreguser();
//     console.log("checking yuva" + this.props.reglist);
//     //this.props.reqloadshowroom();
//     //console.log(this.props.listshowroom);
//     //this.props.reqloadsalespersonlist();
//     //this.props.reqloaditassigneelist();
//   }

//   handleChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleSelectChange = (selectedOption) => {
//     //console.log('selectedOption -->' + selectedOption.label + ' : ' );
//     this.setState({ role: selectedOption.label });
//   };

//   handledateChange = (date) => {
//     console.log("----rescheduled date :" + date);
//     this.setState({
//       rescheduledDate: date,
//     });
//     let dayparam = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
//     let monthparam =
//       date.getMonth() < 9 ? "0" + (1 + date.getMonth()) : 1 + date.getMonth();
//     let dateparam = date.getFullYear() + "-" + monthparam + "-" + dayparam;
//     this.props.reqAvailableSlots({
//       dateparam: dateparam,
//       timeZone: this.state.timeZone,
//     });
//   };
//   handleShowroomSelectChange = (selectedOption) => {
//     this.setState({ showroom: selectedOption.label });
//     console.log("selected Showroom is " + selectedOption.label);
//     this.props.reqsalesbyshowroom(selectedOption.label);
//   };
//   handleSalesSelectChange = (selectedOption) => {
//     this.setState({ salesperson: selectedOption.label });
//   };
//   handleITAssigneeSelectChange = (selectedOption) => {
//     this.setState({ itassignee: selectedOption.label });
//   };
//   handleTimeSlotSelectChange = (selectedOption) => {
//     this.setState({ timeslot: selectedOption.label });
//   };

//   static getDerivedStateFromProps(nextProps, prevState) {
//     /*
//         if(nextProps.requestlist!==prevState.requestlist){
//         return { requestlist: nextProps.requestlist, requestoriginallist: nextProps.requestlist };
//      }
//      else return null;
//        */
//     if (nextProps.reglist !== prevState.requestoriginallist) {
//       console.log("hi");
//       return {
//         reglist: nextProps.reglist,
//         requestoriginallist: nextProps.reglist,
//       };
//     } else return null;
//   }

//   dropdown = (evt, req) => {
//     const val = evt.target.value;
//     console.log("evt.target.value" + evt.target.value);
//     const request = this.state.requestlist;
//     if (val === "Reassigned") {
//       this.setState({ ticket: req.demoId });
//       this.assignClicked(req, "REASSIGN");
//     } else if (val === "Rescheduled") {
//       this.statusChange(evt, req);
//     } else if (val === "Completed") {
//       this.statusChange(evt, req);
//     } else if (val === "Cancelled") {
//       this.statusChange(evt, req);
//     }
//   };
//   componentDidUpdate(prevProps, prevState, snapshot) {
//     console.log(
//       "this.state.selectedRequest" + JSON.stringify(this.state.reglist)
//     );
//     console.log(
//       "this.state.selectedRequest" + JSON.stringify(this.state.selectedRequest)
//     );
//     console.log(
//       "this.state.selectedRequest" + JSON.stringify(this.props.reglist)
//     );
//     if (this.props.reglist !== prevProps.reglist) {
//       this.setState({
//         reglist: this.props.reglist,
//         reglistCopy: this.props.reglist,
//       });
//     }
//   }

//   statusChange = (evt, req) => {
//     const selectVal = evt.target.value;
//     if (selectVal === "Cancelled") {
//       this.setState({ showcancelModal: true });
//     } else if (selectVal === "Rescheduled") {
//       console.log("req.demoId" + req.demoId);
//       this.setState({ showrescheduleModal: true });
//       this.setState({ ticket: req.demoId });
//     } else if (selectVal === "Completed") {
//       Swal.fire({
//         title: "",
//         text: "Please confirm if this Ticket is completed.",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, completed!",
//       }).then((result) => {
//         if (result.value) {
//           console.log(
//             "this.state.selectedRequest.ticket" +
//               this.state.selectedRequest.demoId
//           );
//           this.props.completionrequest({
//             demoId: this.state.selectedRequest.demoId,
//           });
//         } else if (result.dismiss == "cancel") {
//           window.location.reload();
//         }
//       });
//     }

//     this.setState({ selectedRequest: req });
//   };
//   assignClicked = (request, type) => {
//     this.setState({
//       selectedRequest: request,
//       showassignModal: true,
//       mode: type,
//     });
//     console.log("--->Open Assign Modal<--" + type);
//     if (request !== undefined && request !== null) {
//       this.setState({ ticket: request.demoId });
//       if (
//         request !== undefined &&
//         request !== null &&
//         request.wantSupport === 0
//       ) {
//         console.log("----Turning off itassignee---");
//         this.setState({ itassignee: "" });
//       }
//     }
//     this.setState({ selectedRequest: request });
//   };

//   componentWillReceiveProps(nextProps) {
//     console.log(nextProps);
//   }
//   navigate = (url) => {
//     this.props.history.push(url);
//   };

//   filterby = (evt) => {
//     console.log("evt.target.value" + evt.target.value);
//     const val = evt.target.value;
//     const reglist = _.cloneDeep(this.state.requestoriginallist);
//     console.log(reglist);
//     if (val === "All") {
//       this.setState({ reglist: [] }, () => {
//         this.setState({ reglist });
//       });
//     } else {
//       this.setState({ reglist: [] }, () => {
//         this.setState({ reglist: _.filter(reglist, { isAdmin: val }) });
//       });
//     }
//   };

//   searchby = (evt) => {
//     const val = evt.target.value;
//     const reglist = _.cloneDeep(this.state.requestoriginallist);
//     console.log('search ---->' + val);
//     console.log('search In---->' + JSON.stringify(reglist));
//     if(val) {
//       this.setState({ reglist: [] }, ()=> {
//         const results =_.filter(reglist, (item) => {
//           console.log("item.company"+((''+item.company).indexOf(val)));
//           return (((''+item.company).indexOf(''+val))>-1
//           // || item.name.indexOf(val)>-1 || item.mobile.indexOf(val)>-1
//           //     || item.email.indexOf(val)>-1 || item.landline.indexOf(val)>-1 || item.address.indexOf(val)>-1
//           //     || item.isAdmin.indexOf(val)>-1 || item.taxId.indexOf(val)>-1
//                );
//         });
//         this.setState({ reglist :results });
//       });
//     } else {
//       this.setState({ reglist: [] }, ()=>{
//         this.setState({ reglist });
//       });
//     }
//   // }
//   requestAssign = () => {
//     //this.handleClose();
//   };
//   requestReschedule = () => {
//     console.log(this.state.selectedRequest);
//     console.log(
//       "---------------RESCHEDULE POST VALUES FROM INDEX.JS-------------------"
//     );
//     console.log("rescheduledDate ->" + this.state.rescheduledDate);
//     console.log("timeslot ->" + this.state.timeslot);
//     console.log("comments ->" + this.state.comments);
//     console.log(
//       "---------------END RESCHEDULE POST VALUES FROM INDEX.JS-------------------"
//     );
//     if (
//       this.state.rescheduledDate &&
//       this.state.timeslot &&
//       this.state.comments
//     ) {
//       let date = this.state.rescheduledDate;
//       let dayparam =
//         date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
//       let monthparam =
//         date.getMonth() < 9 ? "0" + (1 + date.getMonth()) : 1 + date.getMonth();
//       let dateparam = date.getFullYear() + "-" + monthparam + "-" + dayparam;
//       //let dateparam = dayparam +'/'+ monthparam +'/'+ date.getFullYear();
//       console.log("dateparam ->" + dateparam);
//       let timeparam = this.state.timeslot;
//       let range = timeparam.split(" -- ");
//       let startrange = range[0];
//       console.log("startrange ----" + startrange);
//       let start = startrange.split(" ");
//       console.log("start" + start);
//       let starttimeparam = '';
//       if(start[0] !== undefined && start[0] != null) {
//           starttimeparam = (start[0] < 10) ? '0'+start[0]+':00 '+start[1] : start[0] +':00 '+start[1];
//       }
//       console.log("tange[1] --->" + range[1] + "<--");
//       let endrange = range[1];
//       console.log("endrange ----" + endrange);
//       let end = endrange.split(' ');
//       console.log('end' + end);
//       let endtimeparam = '';
//       if(end[0] !== undefined && end[0] != null) {
//           endtimeparam = (end[0] < 10) ? '0'+end[0]+end[1] : end[0] +end[1];
//       }
//       console.log('start time ---' + starttimeparam);
//       console.log('end time ----' + endtimeparam);
//       console.log(
//         "ticket" + this.state.ticket,
//         "convenientDate" + dateparam,
//         "convenientStartTime" + startrange,
//         "convenientEndTime" + endrange,
//         "comments" + this.state.comments
//       );
//       this.props.savereschedulerequest({
//         demoId: this.state.ticket,
//         date: dateparam,
//         timeZone: "(GMT+5:30) Asia/Calcutta",
//         startTime: startrange,
//         endTime: endrange,
//         comments: this.state.comments,
//       });
//       this.setState({ popreschedulesuccessmessage: true });
//     } else {
//       Swal.fire({
//         title: "",
//         text: "Please fill all the details.",
//         icon: "warning",
//         confirmButtonColor: "#3085d6",
//         confirmButtonText: "OK",
//       });
//     }
//   };
//   requestCancel = () => {
//     console.log(this.cancelinput.value);
//     console.log(this.state.selectedRequest.demoId);
//     if (this.state.selectedRequest.demoId && this.cancelinput.value) {
//       this.props.cancellationrequest({
//         demoId: this.state.selectedRequest.demoId,
//         comments: this.cancelinput.value,
//       });
//     } else {
//       Swal.fire({
//         title: "",
//         text: "Please fill the reason to cancel",
//         icon: "warning",
//         confirmButtonColor: "#3085d6",
//         confirmButtonText: "OK",
//       });
//     }
//   };
//   handleClose = () => {
//     this.setState({
//       showassignModal: false,
//       showrescheduleModal: false,
//       showcancelModal: false,
//     });
//   };

//   customerDetials = (name, id) => {
//     console.log(
//       "event-------" + JSON.stringify(name) + "-----event--------" + id
//     );
//     localStorage.setItem("name", name);
//     localStorage.setItem("id", id);
//     window.location.href = "/customerDetials";
//   };

//   searchby = (evt) => {
//     const val = evt.target.value;
//     const requestlist = _.cloneDeep(this.state.reglistCopy);
//     console.log("search ---->" + val);
//     if (val) {
//       this.setState({ requestlist: [] }, () => {
//         const results = _.filter(requestlist, (item) => {
//           return (
//             item.company.indexOf(val) > -1
//              || item.mobile.indexOf(val)>-1 || item.meetingDate.indexOf(val)>-1
//                  || item.startTime.indexOf(val)>-1 || item.metal.indexOf(val)>-1 || item.product.indexOf(val)>-1
//                || item.description.indexOf(val)>-1
//           );
//         });
//         this.setState({ reglist: results });
//       });
//     } else {
//       this.setState({ reglist: [] }, () => {
//         this.setState({ reglist: this.state.reglistCopy });
//       });
//     }
//   };

//   render() {
//     return (
//       <div className="page-container" style={{ paddingLeft: "0px" }}>
//         <Header1 navigate={(url) => this.navigate("/admin")} />
//         <main className="main-content bgc-grey-100">
//           <div id="mainContent">
//             <div id="mainContent">
//               <div className="row">
//                 <div className="list-group">
//                                 <li className="list-group-item list-group-item-action active"> <span className="icon-holder"><i className="c-blue-500 ti-headphone-alt"></i> </span> Requests</li>
//                             </div>
//                 <Sidemenu
//                   navigate={(url) => this.navigate(url)}
//                   selected="dashBoard"
//                 />

//                 <div className="col-md-10">
//                   <div className="row">
//                     <div className="col-md-12 ">
//                       <div
//                         className="bgc-white p-20"
//                         style={{ paddingBottom: "0px" }}
//                       >
//                         <div className="row">
//                               <div className="col-md-12 "></div>
//                             <button type="button" className="btn btn-primary" ><a href="/user"><font color="white">Back</font></a></button>
//                             </div>

//                         <div className=" p-20">

//                           <div className="col-md-12 ">
//                             <iframe width="100%" height="373em" src="https://app.powerbi.com/view?r=eyJrIjoiZmI2MDA1MjItZDRmOS00OGFkLThkMGEtOWRlNjgzYTZiMjFiIiwidCI6IjhkNzdlNjhmLTk5MmUtNGMzYy1hMGZjLWQ1ZTkxODAzMTkzYyJ9" frameborder="0" allowFullScreen="true"></iframe> */}
//                             <iframe width="100%" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiZjE2NjNiMDUtYTJkOS00MDQxLThkNTktZWI5OWFmZjE5YmRlIiwidCI6IjhkNzdlNjhmLTk5MmUtNGMzYy1hMGZjLWQ1ZTkxODAzMTkzYyJ9" frameborder="0" allowFullScreen="true"></iframe> */}
//                             <iframe width="100%" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiZjE2NjNiMDUtYTJkOS00MDQxLThkNTktZWI5OWFmZjE5YmRlIiwidCI6IjhkNzdlNjhmLTk5MmUtNGMzYy1hMGZjLWQ1ZTkxODAzMTkzYyJ9&pageName=ReportSection" frameborder="0" allowFullScreen="true"></iframe> */}
//                             <iframe width="100%" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiZjE2NjNiMDUtYTJkOS00MDQxLThkNTktZWI5OWFmZjE5YmRlIiwidCI6IjhkNzdlNjhmLTk5MmUtNGMzYy1hMGZjLWQ1ZTkxODAzMTkzYyJ9&pageName=ReportSectionce01dda209c0bd003650" frameborder="0" allowFullScreen="true"></iframe>                             */}
//                            <iframe width="100%" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiZjE2NjNiMDUtYTJkOS00MDQxLThkNTktZWI5OWFmZjE5YmRlIiwidCI6IjhkNzdlNjhmLTk5MmUtNGMzYy1hMGZjLWQ1ZTkxODAzMTkzYyJ9&pageName=ReportSection4259a2a769b5287e7dce" frameborder="0" allowFullScreen="true">

//                             </iframe> 
//                             <iframe title="DEMO - Page 1" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiNDQwOWYzZGEtYWJlZC00MGM3LWExMWMtN2ZiNjkwNTExZTI2IiwidCI6IjhkNzdlNjhmLTk5MmUtNGMzYy1hMGZjLWQ1ZTkxODAzMTkzYyJ9" frameborder="0" allowFullScreen="true"></iframe>
//                             <iframe title="DEMO" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiNDQwOWYzZGEtYWJlZC00MGM3LWExMWMtN2ZiNjkwNTExZTI2IiwidCI6IjhkNzdlNjhmLTk5MmUtNGMzYy1hMGZjLWQ1ZTkxODAzMTkzYyJ9&pageName=ReportSection" frameborder="0" allowFullScreen="true"></iframe>
//                             <iframe title="DEMO" width="600" height="373.5" src="https://app.powerbi.com/view?r=eyJrIjoiNDQwOWYzZGEtYWJlZC00MGM3LWExMWMtN2ZiNjkwNTExZTI2IiwidCI6IjhkNzdlNjhmLTk5MmUtNGMzYy1hMGZjLWQ1ZTkxODAzMTkzYyJ9&pageName=ReportSection" frameborder="0" allowFullScreen="true"></iframe>
//                                                      </div>

//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }
// }
// profile.propTypes = {
//   reqloadreguser: PropTypes.func,

//   reglist: PropTypes.array,
// };

// const mapStateToProps = (state) => {
//   return {
//     reglist: state.registercustomerReducer.reglist,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   reqloadreguser: (state) => dispatch(reqloadreguser(state)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(profile);
