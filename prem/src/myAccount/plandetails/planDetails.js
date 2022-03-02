import { PropTypes } from "prop-types";
import React from "react";
import {
  Button, ButtonGroup, ButtonToolbar, Col, Container, Form, Modal, Row
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/footer/Footer.js";
import HeaderLogin from "../../components/header_login/HeaderLogin";
import Loader from "../../components/loading";
import * as Constants from "../../constants";
import { planValidator } from "../../Core/utils";
import {
  contractTerminate, contractUpdate, requestchangePlanList, requestCheckNoticePeriod, requestchoosePlansList, requestchoosePlansListExtend, requestplanDetial
} from "./action";

class changePlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planIsActive: "",
      isExtendable: "",
      user: {
        currentPlan: "",
        initiationDate: "",
        expiresOn: "",
        status: "",
        showPlanDetails: false,
        showReasonModal: false,
        reason: "",
        email: "",
        submitted: false,
        resendOtpSuccess: false,
        isValidatdOtpSuccess: false,
        showotpModal1: false,
        showotpModal2: false,
        showotpModal3: false,
        subcription: false,
        choosePlans: [],
        responseproduct: "",
        plan: false,
        isSuccess: false,
        sub: "1Year",
        token: [],
        planList: [],
        terminatorData: [],
        showExtendPlanModel: false,
        showotpModal: true,
        showotpModal1: false,
        showloginModal2: false,
        selectDate: [],
        responseproduct: "",
        contractDuration: "",
        popUp1: true,
        plan1: "",
        plan2: "",
        plan3: "",
        paymentTerms: "",
        isLoading: false,
        supportWindowDtostimeslot:"",
      },
    };
  }
  // hanelUpgrade =()=>{
  //   console.log("working");
  // }
  componentDidMount() {
    this.setState({
      email: window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
    });

    if (!window.sessionStorage.getItem(Constants.ACCESS_EMAIL)) {
      return Swal.fire({
        title: "",
        text: "Please login before proceeding",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      }).then((res) => {
        if (res.value) {
          window.sessionStorage.setItem(Constants.REGISTERED, true);
          this.props.history.push("/");
        }
      });
    }

    this.props.requestchangePlanList();
    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_EMAIL)------>" +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL)
    );
    console.log("data" + JSON.stringify(this.props.user));
    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID)------>" +
        window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID)
    );
  }

  navigate = (url) => {
    this.props.history.push(url);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (!window.sessionStorage.getItem(Constants.ACCESS_EMAIL)) {
      return Swal.fire({
        title: "",
        text: "Please login before proceeding",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      }).then((res) => {
        if (res.value) {
          window.sessionStorage.setItem(Constants.REGISTERED, true);
          this.props.history.push("/");
        }
      });
    }

    if (this.props.plandetails !== prevProps.plandetails) {

      if (this.props.plandetails.success === true) {
        this.setState({
          show: true,
          planName: this.props.plandetails.plan,
          ticket: this.props.plandetails.ticket,
          tollFreeNumber: this.props.plandetails.tollFreeNumber,
          subscription: this.props.plandetails.subscription,
          status: this.props.plandetails.status,
        });
        if (this.props.plandetails.service) {
          this.setState({
            service: this.props.plandetails.service,
          });
        }

        if (this.props.plandetails.supportWindowDtos) {
          this.setState({
            supportWindowDtostimeslot :this.props.plandetails.supportWindowDtos
          })
          if(this.props.plandetails.supportWindowDtos[0] === undefined ||
            this.props.plandetails.supportWindowDtos[0] === null
            )

            {
              this.setState({
                timeZone: " ",
                dayList: " ",
                startTime: " ",
                endTime: " ",
                support:"",

              });
          }else{

            this.setState({
              timeZone: this.props.plandetails.supportWindowDtos[0].timeZone,
              dayList: this.props.plandetails.supportWindowDtos[0].dayList,
              startTime: this.props.plandetails.supportWindowDtos[0].startTime,
              endTime: this.props.plandetails.supportWindowDtos[0].endTime,
            });
          }

        }
      }
    }
    console.log(
      "componentDidUpdate----window.sessionStorage.getItem(Constants.ACCESS_EMAIL)------>" +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL) !==
        null
    );
    console.log("user data" + JSON.stringify(this.props.user));
    console.log("user data" + JSON.stringify(this.props.userlist));
    console.log("component Did update");
    if (this.props.user !== prevProps.user) {
      if (this.props.user.success === false) {

        Swal.fire({
          title: "Note",
          text: this.props.user.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
             this.props.history.push("./customizePage");

            // window.location.reload();
          }
        });
      }
      for (var i = 0; i < this.props.user.length; i++) {
        if (
          this.props.user[i].status !== "Yet to initiate" &&
          this.props.user[i].status !== "Notice period" &&
          this.props.user[i].status !== "Terminated" &&
          this.props.user[i].status !== "Expired"
        ) {
          this.setState({
            planIsActive: true,
          });
        }
        if (
          (this.props.user[i].status == "Active" ||
            this.props.user[i].status == "Contract expired") &&
          this.props.user[i].subcription !== "Pay Per use"
        ) {
          this.setState({
            isExtendable: true,
          });
        }
      }
      console.log("updated detials ......................");
      if (
        this.props.userlist !== undefined &&
        this.props.userlist !== null &&
        this.props.userlist.listPlanRequests !== undefined
      ) {
        console.log(
          "updated listPlanRequests ......................" +
            this.props.userlist.listPlanRequests
        );
        this.setState({
          listPlanRequests: this.props.userlist.listPlanRequests,
        });
      }

      if (
        this.props.userlist !== undefined &&
        this.props.userlist !== null &&
        this.props.userlist.email !== undefined
      ) {
        console.log(
          "updated email ......................" + this.props.userlist.email
        );
        this.setState({
          email: this.props.userlist.email,
        });
      }
    }

    if (this.props.choosePlans !== prevProps.choosePlans) {
      if (this.props.choosePlans.success === true) {
        if (this.props.choosePlans.planRequests) {
          this.setState({
            showPlanDetails: true,
          });
        } else {
          Swal.fire({
            title: "",
            text: "No List Of Plan is Avilaiable ",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        }
      }
    }

    if (this.props.NoticePeriod !== prevProps.NoticePeriod) {
      if (this.props.NoticePeriod.success === true) {
        console.log("testing 2");
        if (this.props.NoticePeriod.plansList.length > 0) {
          let planDetial = [];

          for (var i = 0; i < this.props.NoticePeriod.plansList.length; i++) {
            planDetial.push(this.props.NoticePeriod.plansList[i].plan);
          }
          console.log("\n\n" + planDetial);
          Swal.fire({
            title: "Note",
            text:
              this.props.NoticePeriod.plansList.length == 1
                ? "Termination date of this plan(" +
                  planDetial +
                  ")is beyond expiration date, would you still like to continue?"
                : "Termination date of this plans(" +
                  planDetial +
                  ")is beyond expiration date, would you still like to continue?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          }).then((res) => {
            if (res.value) {
              this.modelChange();
            } else if (res.dismiss == "cancel") {
              console.log("cancel");
            }
          });
        } else {
          this.modelChange();
        }
      }
    }

    if (
      this.props.isSuccess !== undefined &&
      this.props.isSuccess !== null &&
      this.props.isSuccess.lastName !== undefined
    ) {
      this.setState({
        estimationValue: this.props.isSuccess.estimationValue,
      });
    }
    if (this.props.isSuccess !== prevProps.isSuccess) {
      this.handleClose();
      if (this.state.submitted && this.props.isSuccess.success) {
        Swal.fire({
          title: "Success",
          text: "Termination initiated Successfully",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            // this.props.history.push("./planDetailsList");

            window.location.reload();
          }
        });
      }
      this.setState({ submitted: false, isLoading: false });
    }

    //-----------------------------------

    if (this.props.choosePlans2 !== prevProps.choosePlans2) {
      if (this.props.choosePlans2.success) {
        console.log(JSON.stringify(this.props.choosePlans2.planRequests));
        if (this.props.choosePlans2.planRequests.length > 0) {
          this.setState({
            showExtendPlanModel: true,
          });
        } else {
          Swal.fire({
            title: "",
            text: "No Plans Available To Renewal",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        }
      }
    }

    if (this.props.isSuccess2 !== prevProps.isSuccess2) {
      if (this.props.isSuccess2.success) {
        Swal.fire({
          title: "Success",
          text: "Service extended Successfully",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.handleClose();
        window.location.reload();
      } else if (!this.props.isSuccess2.success) {
        Swal.fire({
          title: "",
          text: this.props.isSuccess2.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }

      this.setState({ submitted: false });
    }
    console.log("-----------"+this.props.plandetails);
     console.log("supportWindowDtostimeslot----------- :"+JSON.stringify(this.state.supportWindowDtostimeslot));
  }

  planDetials = (e) => {
    this.props.planDetial(e);
  };

  handleClose = () => {
    this.setState({
      show: false,
      showPlanDetails: false,
      showReasonModal: false,
      showloginModal2: false,
      showloginModal1: false,
      showExtendPlanModel: false,
      planList: [],
      terminatorData: [],
    });
  };

  terminate = () => {
    this.props.requestchoosePlansList();
  };

  renewal = () => {
    this.props.requestchoosePlansListExtend();
  };

  handelSubmit = (e) => {
    e.preventDefault();

    const { email, planList, reason, token } = this.state;
    const planError = planValidator(this.state.plan);
    console.log(
      "email \n" +
        email +
        "planList \n" +
        planList +
        "reason \n" +
        reason +
        "token \n" +
        token
    );
    if (planError)
      this.setState({
        palnError: planError,
      });
    this.setState({ submitted: true });
    console.log("\n plan" + planList);
    if (email && planList && reason) {
      this.setState({ isLoading: true });
      this.props.submitcontractTerminate(email, planList, reason);
    }
  };

  handelSubmitExtent = (e) => {
    e.preventDefault();
    const { email, planList, contractDuration, paymentTerms } = this.state;
    const planError = planValidator(this.state.plan);
    console.log(
      "email \n" +
        email +
        "planList \n" +
        planList +
        "contractDuration \n" +
        contractDuration
    );
    if (planError)
      this.setState({
        palnError: planError,
      });
    this.setState({ submitted: true });
    console.log("\n plan" + planList);
    if (email && planList && contractDuration) {
      this.props.submitcontractUpdate(email, planList, contractDuration);
    }
  };

  click = (e) => {
    if (this.state.planList === undefined || this.state.planList === null) {
      this.state.planList = [];
      this.state.terminatorData = [];
    }
    if (
      this.state.terminatorData === undefined ||
      this.state.terminatorData === null
    ) {
      this.state.terminatorData = [];
    }
    if (this.state.planList.length > 0) {
      for (var i = 0; i < this.state.planList.length; i++) {
        if (JSON.stringify(this.state.planList[i]) == JSON.stringify(e.data)) {
          this.state.planList.splice(i, 1);
          this.state.terminatorData.splice(i, 1);
          return;
        }
      }
      this.state.planList.push(e.data);
      this.state.terminatorData.push(e);
    } else {
      this.state.planList.push(e.data);
      this.state.terminatorData.push(e);
      return;
    }
  };

  clicked = (type) => {
    console.log(this.state.planList);
    if (this.state.planList === undefined || this.state.planList === null) {
      this.state.planList = [];
    }

    if (this.state.planList.length > 0) {
      this.props.checkNoticePeriod(this.state.planList);
    } else {
      Swal.fire({
        title: "",
        text: "Please Choose Atleast One Plan",
        icon: "info",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };

  modelChange = () => {
    console.log("testing");
    this.setState({ showReasonModal: true, showPlanDetails: false });
  };

  Change = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  clickExtend = (e) => {
    if (this.state.planList === undefined || this.state.planList === null) {
      this.state.planList = [];
      this.state.terminatorData = [];
    }
    if (
      this.state.terminatorData === undefined ||
      this.state.terminatorData === null
    ) {
      this.state.terminatorData = [];
    }

    if (this.state.planList.length > 0) {
      for (var i = 0; i < this.state.planList.length; i++) {
        if (this.state.planList[i] === e) {
          this.state.planList.splice(i, 1);
          console.log("this.state.planList2 \n" + this.state.planList);
          return;
        }
      }
      this.state.planList.push(e);
    } else {
      //console.log("e after else \n"+JSON.stringify(e));
      this.state.planList.push(e);
      console.log("this.state.planList3 \n" + this.state.planList);
      return;
    }
  };

  clickedExtend = (type) => {
    if (this.state.planList === undefined || this.state.planList === null) {
      this.state.planList = [];
    }
    if (this.state.planList.length > 0) {
      this.setState({ showloginModal1: true, showExtendPlanModel: false });
    }

    console.log("Contract Duration open");
  };
  alert = (e) => {
    console.log(
      e.name + "\n" + this.state.isAdmin + "\n" + this.state.isPlanOrdered
    );
    this.props.history.push("/" + e.name);

  };

  render() {
    const { reason, submitted, contractDuration, paymentTerms, plan1, plan2 } =
      this.state;

    const myJson = [
      { "CURRENT PLAN": "john", email: "john@@xyz.com" },
      { name: "jane", email: "jane@@xyz.com" },
      { name: "john", email: "john@@xyz.com" },
      { name: "jane", email: "jane@@xyz.com" },
      { name: "john", email: "john@@xyz.com" },
      { name: "jane", email: "jane@@xyz.com" },
      { name: "john", email: "john@@xyz.com" },
      { name: "jane", email: "jane@@xyz.com" },
      { name: "john", email: "john@@xyz.com" },
      { name: "jane", email: "jane@@xyz.com" },
      { name: "john", email: "john@@xyz.com" },
      { name: "jane", email: "jane@@xyz.com" },
      { name: "john", email: "john@@xyz.com" },
      { name: "jane", email: "jane@@xyz.com" },
    ];

    return (
      <div>
        <HeaderLogin />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div>
            <section
              className="relative banner-area-inner20"
              style={{ paddingTop: "200px", textAlign: "center" }}
            >
              <div className="overlay overlay-bg overlay-bg-blk"></div>
              <div className="container">
                <div className="row height align-items-center justify-content-center">
                  <div className="col-lg-10">
                    <div className="generic-banner-content">
                      <h2 className="head2-inner">One Process - One Tool</h2>
                      <p className="text-white" style={{ opacity: 0.5 }}>
                      CtrlSwiftTM comprises of a robust maturity assessment
                        methodology and transformation cookbooks to
                        progressively drive the Service Desk transformation to
                        the desired end-state.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <br />
            <Container>
            <Row className="col-md-12">
            <div className="col-md-12 " >
              <div className="d-flex justify-content-center">

              <ButtonToolbar
                aria-label="Toolbar with button groups"
                style={{ marginBottom: 20, marginLeft: 70 }}
              ><ButtonGroup className="mr-2">
                  <button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    to="./userDashboard"
                    onClick={(e) => this.alert({ name: "userDashboard" })}
                    id="cs-ud-userDashboard"
                  >
                    Dashboard
                  </button>{" "}
              </ButtonGroup>
                <ButtonGroup className="mr-2">

                  <button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={(e) => this.alert({ name: "editProfile" })}
                    id="cs-us-editProfile"
                  >
                    Edit Profile
                  </button>{" "}
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                  <button
                    onClick={(e) => this.alert({ name: "viewInvoice" })}
                    className="genric-btn primary radius text-uppercase"
                    variant=""
                    id="cs-us-viewInvoice"
                  >
                    View Invoice
                  </button>
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                  <button
                    onClick={(e) => this.alert({ name: "planDetailsList" })}
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    id="cs-us-planDetailsList"
                  >
                    Plan Details
                  </button>{" "}
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                  <button
                    onClick={(e) => this.alert({ name: "viewDMSA" })}
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    id="cs-us-viewDMSA"
                  >
                    View DMSA
                  </button>{" "}
                </ButtonGroup>
              </ButtonToolbar>
              </div></div>
            </Row>
            <br /> <br />
            <div className="row col-md-12">
              <div className="col-md-1" />
              <div className="col-md-10">
                <div className="col-md-12 scroll">
                  <table className="schdule-table table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th
                          className="head"
                          scope="col"
                          style={{ fontSize: 16, fontFamily: "Poppins" }}
                        >
                          CURRENT PLAN
                        </th>
                        <th
                          className="head"
                          scope="col"
                          style={{ fontSize: 16, fontFamily: "Poppins" }}
                        >
                          MODEL
                        </th>
                        <th
                          className="head"
                          scope="col"
                          style={{ fontSize: 16, fontFamily: "Poppins" }}
                        >
                          SUBSCRIPTION
                        </th>
                        <th
                          className="head"
                          scope="col"
                          style={{ fontSize: 16, fontFamily: "Poppins" }}
                        >
                          SERVICE INITIATION
                        </th>
                        <th
                          className="head"
                          scope="col"
                          style={{ fontSize: 16, fontFamily: "Poppins" }}
                        >
                          EXPIRES ON
                        </th>
                        <th
                          className="head"
                          scope="col"
                          style={{ fontSize: 16, fontFamily: "Poppins" }}
                        >
                          STATUS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.user &&
                        this.props.user.length > 0 &&
                        this.props.user.map((user) => (
                          <tr>
                            <th className="name" scope="row">
                              <Link
                                className="details-link"
                                onClick={(e) => {
                                  this.planDetials({
                                    token: user.token,
                                    plan: user.currentPlan,
                                  });
                                }}
                              >
                                {user.currentPlan}
                              </Link>
                            </th>

                            <td>{user.commercialModel}</td>
                            <td>{user.subcription}</td>
                            <td>{user.initiationDate}</td>
                            <td>{user.expiresOn}</td>
                            <td>{user.status} </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-1" />
            </div>
            <br />
            {this.state.planIsActive ? (
              <div className="row col-md-12">
                <div className="col-md-3" />
                <Row className="col-md-12">
                  <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="mr-2">
                      <button
                        className="genric-btn primary radius text-uppercase"
                        variant=" "
                        href="./customizePage2"
                        id="cs-pd-Upgrade/Downgrade"
                        onClick={(e) => this.alert({ name: "customizePage2" })}

                      >
                        Upgrade/Downgrade
                      </button>
                    </ButtonGroup>
                    {this.state.isExtendable ? (
                      <ButtonGroup className="mr-2">
                        {/* <Button className="genric-btn primary radius text-uppercase"   variant=" " href="./choosePlansExtend">Renewal Contract</Button>  */}
                        <button
                          className="genric-btn primary radius text-uppercase"
                          variant=" "
                          id="cs-pd-renewal"
                          onClick={this.renewal}
                        >
                          Renewal Contract
                        </button>
                      </ButtonGroup>
                    ) : null}
                    <ButtonGroup className="mr-2">
                      {/* <Button className="genric-btn primary radius text-uppercase" variant=" " href="./choosePlans">Terminate Services</Button>  */}
                      <button
                        className="genric-btn primary radius text-uppercase"
                        variant=" "
                        id="cs-pd-terminate"
                        onClick={this.terminate}
                      >
                        Terminate Service
                      </button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </Row>
                <div className="col-md-4" />
              </div>
            ) : null}
            <br />
            {/* List of support windows  */}
            <Modal
              show={this.state.show}
              onHide={this.handleClose}
              backdrop={"static"}

              size="lg"
            >
              <Modal.Header closeButton>
                <h5 className="text-center">
                  <span>{this.state.planName} </span>
                </h5>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group">
                  <div className="row">
                    {/* <div className="col-md-3">
                      <label
                        htmlFor="name"
                        style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                      >
                        Total No Of Ticket
                      </label>
                    </div> */}
                    <div className="col-md-3">
                    <label
                        htmlFor="name"
                        style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                      >
                        Total No Of Ticket
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ticket"
                        name="poNumber"
                        value={this.state.ticket}
                        readOnly="true"
                      />
                    </div>
                    <div className="col-md-3">
                    <label
                        htmlFor="name"
                        style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                      >
                        Toll Free Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="tollFreeNumber"
                        name="poNumber"
                        value={this.state.tollFreeNumber}
                        readOnly="true"
                      />
                    </div>
                    <div className="col-md-3">
                    <label
                        htmlFor="name"
                        style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                      >
                        Subscription
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="subscription"
                        name="poNumber"
                        value={this.state.subscription}
                        readOnly="true"
                      />
                    </div>
                    <div className="col-md-3">
                    <label
                        htmlFor="name"
                        style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                      >
                        status
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="status"
                        name="poNumber"
                        value={this.state.status}
                        readOnly="true"
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <label
                        htmlFor="name"
                        style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                      >
                        Toll Free Number
                      </label>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        id="tollFreeNumber"
                        name="poNumber"
                        value={this.state.tollFreeNumber}
                        readOnly="true"
                      />
                    </div>
                  </div>
                </div> */}

                {/* <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <label
                        htmlFor="name"
                        style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                      >
                        Subscription
                      </label>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        id="subscription"
                        name="poNumber"
                        value={this.state.subscription}
                        readOnly="true"
                      />
                    </div>
                  </div>
                </div> */}

                {/* <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <label
                        htmlFor="name"
                        style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                      >
                        status
                      </label>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        id="status"
                        name="poNumber"
                        value={this.state.status}
                        readOnly="true"
                      />
                    </div>
                  </div>
                </div> */}

                {this.state.service ==="24x7" ? (
                  <div className="form-group">
                    <div className="row">

                      <div className="col-md-6">
                      <label
                            htmlFor="name"
                            style={{
                              fontFamily: "nosRegular",
                              fontSize: "18px",
                            }}
                          >
                            Support Windows Details
                          </label><br/>
                      <label
                          htmlFor="name"
                          style={{ fontFamily: "nosRegular", fontSize: "14px" }}
                        >
                          Support Window
                        </label>
                        <textarea
                          type="text"
                          className="form-control"
                          id="examplepoNumber"
                          name="poNumber"
                          value={this.state.service}
                          readOnly="true"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-12">
                          <label
                            htmlFor="name"
                            style={{
                              fontFamily: "nosRegular",
                              fontSize: "18px",
                            }}
                          >
                            Support Windows Details
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        {/* <div className="col-md-6">
                          <label
                            htmlFor="name"
                            style={{
                              fontFamily: "nosRegular",
                              fontSize: "14px",
                            }}
                          >
                             Support Windows
                          </label>
                        </div> */}
                        <div className="col-md-6">
                        <label
                            htmlFor="name"
                            style={{
                              fontFamily: "nosRegular",
                              fontSize: "14px",
                            }}
                          >
                             Support Windows
                          </label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="SupportWindows"
                            name="SupportWindows"
                            value={this.state.service}
                            readOnly="true"
                          />

                        </div>
                        <div className="col-md-6">
                        <label
                            htmlFor="name"
                            style={{
                              fontFamily: "nosRegular",
                              fontSize: "14px",
                            }}
                          >
                            TimeZone
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            id="timeZone"
                            name="timeZone"
                            value={this.state.timeZone}
                            readOnly="true"
                          />
                        </div>

<div className="row ml-3 mt-3">


<div className="col-12">
              <label
                            htmlFor="name"
                            style={{
                              fontFamily: "nosRegular",
                              fontSize: "16px",
                              fontWeight:500,
                            }}
                          >
                            Service's Day List
                          </label>
</div>


</div>
{this.state.supportWindowDtostimeslot && this.state.supportWindowDtostimeslot.map((timeslot,index) =>(
    <div className="row ml-3 mt-3 " >

     <div className="col-md-6" key={index}>

                          <textarea
                            type="text"
                            className="form-control"
                            id="dayList"
                            name="dayList"
                            value={timeslot.dayList}
                            readOnly="true"
                          />
                        </div>


                        <div className="col-md-3">
                        <label
                            htmlFor="name"
                            style={{
                              fontFamily: "nosRegular",
                              fontSize: "14px",
                            }}
                          >
                            Start Time
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="startTime"
                            name="startTime"
                            value={timeslot.startTime}
                            readOnly="true"
                          />
                          </div>
                          <div className="col-md-3">
                          <label
                            htmlFor="name"
                            style={{
                              fontFamily: "nosRegular",
                              fontSize: "14px",
                            }}
                          >
                            End Time
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="endTime"
                            name="endTime"
                            value={timeslot.endTime}
                            readOnly="true"
                          />


                        </div>

  </div>
) ) }



                      </div>
                    </div>

                    {/* <div className="form-group">
                      <div className="row">
                        <div className="col-md-6">
                          <label
                            htmlFor="name"
                            style={{
                              fontFamily: "nosRegular",
                              fontSize: "14px",
                            }}
                          >
                            TimeZone
                          </label>
                        </div>
                        <div className="col-md-6">
                        <label
                            htmlFor="name"
                            style={{
                              fontFamily: "nosRegular",
                              fontSize: "14px",
                            }}
                          >
                            TimeZone
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            id="timeZone"
                            name="timeZone"
                            value={this.state.timeZone}
                            readOnly="true"
                          />
                        </div>
                      </div>
                    </div> */}

                    {/* <div className="form-group">
                      <div className="row">
                        <div className="col-md-6">
                          <label
                            htmlFor="name"
                            style={{
                              fontFamily: "nosRegular",
                              fontSize: "14px",
                            }}
                          >
                            Service's Day List
                          </label>
                        </div>
                        <div className="col-md-6">
                          <textarea
                            type="text"
                            className="form-control"
                            id="dayList"
                            name="dayList"
                            value={this.state.dayList}
                            readOnly="true"
                          />
                        </div>
                      </div>
                    </div> */}
{/*
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-6">
                          <label
                            htmlFor="name"
                            style={{
                              fontFamily: "nosRegular",
                              fontSize: "14px",
                            }}
                          >
                            Start Time
                          </label>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            id="startTime"
                            name="startTime"
                            value={this.state.startTime}
                            readOnly="true"
                          />
                        </div>
                      </div>
                    </div> */}

                    {/* <div className="form-group">
                      <div className="row">
                        <div className="col-md-6">
                          <label
                            htmlFor="name"
                            style={{
                              fontFamily: "nosRegular",
                              fontSize: "14px",
                            }}
                          >
                            End Time
                          </label>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            id="endTime"
                            name="endTime"
                            value={this.state.endTime}
                            readOnly="true"
                          />
                        </div>
                      </div>
                    </div> */}
                  </div>
                )}
              </Modal.Body>
            </Modal>
            {/* -------------------------choose plan------------------------- */}
            <Modal
              show={this.state.showPlanDetails == true}
              onHide={this.handleClose}
              style={{ marginTop: 20 }}
              backdrop={"static"}

            >
              <Modal.Header closeButton>
                <Modal.Title style={{ textAlign: "center", marginTop: 10 }}>
                  {/* You have more than one active plan, <br></br>Please choose to
                  proceed */}
                  List Of Active Plan
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="col-md-12 scroll">
                  <table className="schdule-table table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th
                          className="head"
                          scope="col"
                          style={{ fontSize: 14, fontFamily: "Poppins" }}
                        >
                          Plan
                        </th>
                        <th
                          className="head"
                          scope="col"
                          style={{ fontSize: 14, fontFamily: "Poppins" }}
                        >
                          Model
                        </th>
                        <th
                          className="head"
                          scope="col"
                          style={{ fontSize: 14, fontFamily: "Poppins" }}
                        >
                          Subscription
                        </th>
                        <th
                          className="head"
                          scope="col"
                          style={{ fontSize: 14, fontFamily: "Poppins" }}
                        >
                          Check
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.choosePlans !== undefined &&
                        this.props.choosePlans !== null &&
                        this.props.choosePlans.planRequests &&
                        this.props.choosePlans.planRequests.length > 0 &&
                        this.props.choosePlans.planRequests.map(
                          (plan, plankey) => (
                            <tr key={plankey}>
                              <td className="name" scope="row">
                                {plan.plan}
                              </td>
                              <td className="name" scope="row">
                                {plan.model}
                              </td>
                              <td className="name" scope="row">
                                {plan.subcription}
                              </td>

                              <td>
                                <input
                                  type="checkbox"
                                  name="lite"
                                  value={plan}
                                  style={{ marginLeft: 30 }}
                                  onClick={(e) => {
                                    this.click({
                                      data: {
                                        plan: plan.plan,
                                        token: plan.token,
                                        model: plan.model,
                                      },
                                      subcription: plan.subcription,
                                    });
                                  }}
                                />
                                {submitted && !plan && (
                                  <div
                                    style={{ fontSize: 12, color: "red" }}
                                    className="nav-left"
                                  >
                                    plan is required
                                  </div>
                                )}
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
                <Row className="justify-content-md-center">
                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={this.clicked}
                  >
                    OK
                  </Button>
                </Row>
              </Modal.Body>
            </Modal>
            <Modal
              show={this.state.showReasonModal == true}
              onHide={this.handleClose}
              backdrop={"static"}
            >
              <Modal.Header closeButton>
                {/* <Modal.Title >Your existing plan is Premium service will be terminated immediately and we will refund the cost of untilized tickets</Modal.Title>*/}
                <Modal.Title>Share Feedback/Reason for Termination</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <textarea
                  autocomplete="off"
                  className="form-control"
                  required
                  pattern="[0-9a-zA-Z_.-]*"
                  onChange={this.Change}
                  name="reason"
                  value={reason}
                />

                <Row className="justify-content-md-center">
                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={this.handelSubmit}
                    style={{ marginTop: 10 }}
                  >
                    Confirm Termination
                  </Button>
                </Row>
              </Modal.Body>
            </Modal>
            {/* ---------------choose extend */}
            <Modal
              show={this.state.showExtendPlanModel === true}
              onHide={this.handleClose}
              style={{ marginTop: 20 }}
              backdrop={"static"}
            >
              <Modal.Header closeButton>
                <Modal.Title style={{ textAlign: "center", marginTop: 10 }}>
                  You have more than one active plan, <br></br>Please choose to
                  proceed
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <table className="schdule-table table table-bordered">
                  <thead className="thead-light"></thead>
                  <tbody>
                    {this.props.choosePlans2 &&
                      this.props.choosePlans2.planRequests.length > 0 &&
                      this.props.choosePlans2.planRequests.map(
                        (plan, plankey) => (
                          <tr key={plankey}>
                            <td className="name" scope="row">
                              {plan.plan}
                            </td>
                            <td>
                              <input
                                type="checkbox"
                                name="lite"
                                value={plan}
                                style={{ marginLeft: 30 }}
                                onClick={(e) => {
                                  this.clickExtend(plan.plan);
                                }}
                              />
                              {submitted && !plan && (
                                <div
                                  style={{ fontSize: 12, color: "red" }}
                                  className="nav-left"
                                >
                                  plan is required
                                </div>
                              )}
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>

                <Row className="justify-content-md-center">
                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={this.clickedExtend}
                  >
                    OK
                  </Button>
                </Row>
              </Modal.Body>
            </Modal>
            <Modal
              show={this.state.showloginModal1 === true}
              onHide={this.handleClose}
              style={{ marginTop: 100 }}
              backdrop={"static"}
            >
              <Modal.Header closeButton>
                <Modal.Title> Contract Duration </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <select
                  type="dropdown"
                  className="form-control"
                  name="contractDuration"
                  value={contractDuration}
                  onChange={this.Change}
                >
                  <option value=""></option>
                  <option value="1 Year">1 Year</option>
                  <option value="3 Years">3 Years</option>
                </select>
                <br></br>
                {submitted && !contractDuration && (
                  <div
                    style={{ fontSize: 12, color: "red" }}
                    className="nav-left"
                  >
                    contractDuration is required
                  </div>
                )}
                <Row className="justify-content-md-center">
                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    // onClick={this.handelSubmit}
                    onClick={this.handelSubmitExtent}
                    style={{ marginTop: 10 }}
                  >
                    OK
                  </Button>
                </Row>
              </Modal.Body>
            </Modal>
            <Modal
              show={this.state.showloginModal2 === true}
              onHide={this.handleClose}
              style={{ marginTop: 100 }}
              backdrop={"static"}
            >
              <Modal.Header closeButton>
                <Modal.Title> Payment Terms </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <select
                  type="dropdown"
                  className="form-control"
                  name="paymentTerms"
                  value={paymentTerms}
                  onChange={this.Change}
                  placeholde="payment terms"
                >
                  <option value=""></option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
                <br></br>
                {submitted && !paymentTerms && (
                  <div
                    style={{ fontSize: 12, color: "red" }}
                    className="nav-left"
                  >
                    paymentTerms is required
                  </div>
                )}
                <Row className="justify-content-md-center">
                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    // onClick={this.handelSubmit}
                    onClick={this.handelSubmit}
                    style={{ marginTop: 10 }}
                  >
                    OK
                  </Button>
                </Row>
              </Modal.Body>
            </Modal>
            <Modal
              show={this.state.showloginModal3 === "true"}
              style={{ marginTop: 100 }}
              backdrop={"static"}
            >
              <Modal.Header></Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Row>
                    <Form.Group>
                      <ul className="unordered-list">
                        <li>
                          <text> lite/Shared</text>
                        </li>
                      </ul>
                    </Form.Group>
                    <Form.Group as={Col} md="3">
                      <select
                        type="dropdown"
                        className="form-control"
                        name="plan1"
                        value={plan1}
                        onChange={this.Change}
                        placeholde="payment terms"
                        style={{ marginLeft: 120 }}
                      >
                        <option value=""></option>
                        <option value="Monthly">Monthly</option>
                        <option value="1 Year">1 Year</option>
                        <option value="2 year">2 Year</option>
                        <option value="3 Year">3 Year</option>
                      </select>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group>
                      <ul className="unordered-list">
                        <li>
                          <text> Enterprice/Dedicated </text>
                        </li>
                      </ul>
                    </Form.Group>
                    <Form.Group as={Col} md="3">
                      <select
                        type="dropdown"
                        className="form-control"
                        name="plan2"
                        value={plan2}
                        onChange={this.Change}
                        placeholde="payment terms"
                        style={{ marginLeft: 45 }}
                      >
                        <option value=""></option>
                        <option value="Monthly">Monthly</option>
                        <option value="1 Year">1 Year</option>
                        <option value="2 year">2 Year</option>
                        <option value="3 Year">3 Year</option>
                      </select>
                    </Form.Group>
                  </Form.Row>
                  <Row
                    className="justify-content-md-center"
                    style={{ margin: "10px" }}
                  >
                    <Button
                      className="genric-btn primary radius text-uppercase"
                      variant=" "
                      placeholder="payment terms"
                      onClick={this.handleSubmit}
                      style={{ marginTop: "20px", margin: "4px" }}
                    >
                      OK
                    </Button>
                    <Button
                      className="genric-btn primary radius text-uppercase"
                      variant=" "
                      onClick={this.handleSubmit}
                      style={{ marginTop: "20px", margin: "4px" }}
                    >
                      Cancle
                    </Button>
                  </Row>
                </Form>
              </Modal.Body>
            </Modal>
            </Container>
            <Footer />
          </div>
        )}
      </div>
    );
  }
}
changePlan.propTypes = {
  requestchangePlanList: PropTypes.func,
  user: PropTypes.array,
  //planDetial: PropTypes.func,
  //requestloadcitylist: PropTypes.func,
  //citylist: PropTypes.object,
  //requestloadprofileUpdate: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    requestchoosePlansList: PropTypes.func,
    user: state.changePlanReducer.user,
    plandetails: state.changePlanReducer.plandetails,
    isSuccess: state.changePlanReducer.isSuccess,
    choosePlans: state.changePlanReducer.choosePlans,
    NoticePeriod: state.changePlanReducer.NoticePeriod,
    choosePlans2: state.changePlanReducer.choosePlans2,
    isSuccess2: state.changePlanReducer.isSuccess2,
  };
};

const mapDispatchToProps = (dispatch) => ({
  planDetial: (data) => dispatch(requestplanDetial(data)),
  requestchangePlanList: (email) => dispatch(requestchangePlanList(email)),
  submitcontractTerminate: (email, planList, reason, token) =>
    dispatch(contractTerminate(email, planList, reason)),
  requestchoosePlansList: (email) => dispatch(requestchoosePlansList(email)),
  checkNoticePeriod: (planDetials) =>
    dispatch(requestCheckNoticePeriod(planDetials)),
  submitcontractUpdate: (email, planList, contractDuration) =>
    dispatch(contractUpdate(email, planList, contractDuration)),
  requestchoosePlansListExtend: (email) =>
    dispatch(requestchoosePlansListExtend(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(changePlan);
