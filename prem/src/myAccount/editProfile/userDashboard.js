import { MDBContainer } from "mdbreact";
import { PropTypes } from "prop-types";
import React from "react";
import {
  ButtonGroup, ButtonToolbar, Col, Container, Form, Row
} from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Footer from "../../components/footer/Footer.js";
import HeaderLogin from "../../components/header_login/HeaderLogin";
import Loader from "../../components/loading";
import * as Constants from "../../constants";
import {
  datechange, requestloadData
} from "./action";

class editProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: "",
      checkBox: "",
      firstName: "",
      firstNameError: "",
      lastName: "",
      lastNameError: "",
      email: "",
      transferemail: "",
      emailError: "",
      transferemailError: "",
      departmentError: "",
      mobileError: "",
      landLineError: "",
      companyError: "",
      mobileCountryCodeError: "",
      department: "",
      mobile: "",
      landLine: "",
      company: "",
      address: "",
      city: "",
      addressError: "",
      countryError: "",
      cityError: "",
      pincodeError: "",
      mobileCountryCode: "",
      landlineCountryCode: "",
      mobileCode: "",
      change:true,
      isReadyToRedirect: false,
      isVerifySuccess: false,

      country: "",
      code: "",
      code1: "",
      pincode: "",
      submitted: false,
      isLoginSuccess: false,
      isSuccess: false,
      users: [],
      isCityLoaded: false,
      drop: "",
      cityOption: "",
      selectedCity: "",
      isUserLoaded: false,
      hideshow: true,
      anotherAddress: "",
      anotherCountry: "",
      anotherCity: "",
      anotherPincode: "",
      password: "",
      passwordError: "",
      showotpModal: false,
      otp: "",
      isPlanOrdered: 1,
      isAdmin: "",
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
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };



  // navigate = (url) => {
  //   this.props.history.push(url);
  // };

  componentDidMount() {
    console.log(window.sessionStorage.getItem(Constants.ACCESS_EMAIL));
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

    this.props.requestloadData();

    const admin = window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID);
    if (admin !== undefined && admin !== "") {
      this.setState({
        isAdmin: admin,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if(this.props.datePlanData !== prevProps.datePlanData){
      if(this.props.datePlanData && this.props.datePlanData.success){
      this.setState({
        change: !this.state.change,
      })
         this.state.dataPie.datasets[0].data=this.props.datePlanData.ticketCountPerThePlan.actualTicketCount;
         this.state.dataPie.labels = this.props.datePlanData.ticketCountPerThePlan.plan;
         this.state.usedDataPie.datasets[0].data=this.props.datePlanData.ticketCountPerThePlan.utilizedTicketCount;
         this.state.usedDataPie.labels = this.props.datePlanData.ticketCountPerThePlan.plan;
      }
    }

    if(this.props.planData !== prevProps.planData){
         if(this.props.planData && this.props.planData.success){

        this.state.dataPie.datasets[0].data=this.props.planData.plan.ticket;
        this.state.dataPie.labels = this.props.planData.plan.plan;
        this.state.usedDataPie.datasets[0].data=this.props.planData.plan.utilizedTicketCount;
        this.state.usedDataPie.labels = this.props.planData.plan.plan;
        // this.state.fromDate=this.props.planData.plan.fromDate;
        // this.state.toDate=this.props.planData.plan.toDate;
        this.setState({
          fromDate:this.props.planData.plan.fromDate,
          toDate:this.props.planData.plan.toDate,
          maxDate:this.props.planData.plan.toDate,
          minDate:this.props.planData.plan.fromDate,
        });

        if(this.props.planData.plan.fromDate && this.props.planData.plan.toDate){
          this.setState({
            startFromDate:new Date(this.props.planData.plan.fromDate),
            startToDate:new Date(this.props.planData.plan.toDate),
          })
        }

         }else{
          Swal.fire({
            title: "",
            text: "There is no active plan.",
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          }).then((res) => {
            if (res.value) {
              this.props.history.push("/editProfile");
            }
          });

      }
    }


    console.log(window.sessionStorage.getItem(Constants.ACCESS_EMAIL));
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
    console.log("plandata :"+JSON.stringify(this.props.planData));
  }



  alert = (e) => {

    if (
      this.state.isPlanOrdered &&
      this.state.isAdmin !== undefined &&
      this.state.isAdmin !== ""
    ) {
      this.props.history.push("/" + e.name);
    } else if (this.state.isPlanOrdered === 0 && this.state.isAdmin) {
      Swal.fire({
        title: "",
        text: "Please customize a plan before use this option",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "YES",
        cancelButtonText: "NO",
      }).then((result) => {
        if (result.value) {
          this.props.history.push("/customizePage");
        } else if (result.dismiss == "cancel") {
          // window.location.reload();
        }
      });
    } else if (this.state.isPlanOrdered === 0 && !this.state.isAdmin) {
      Swal.fire({
        title: "",
        text: "This Feature Only Can Accessed By Administrator",
        icon: "warning",
        // showCancelButton: true,
        confirmButtonColor: "#3085d6",
        // cancelButtonColor: '#d33',
        confirmButtonText: "OK",
        //cancelButtonText: 'NO'
      });
    }
  };


  handleChangeFromDate = (date) => {
    let dayparam = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let monthparam =
      date.getMonth() < 9 ? "0" + (1 + date.getMonth()) : 1 + date.getMonth();

    let dateparam = date.getFullYear() + "-" + monthparam + "-" + dayparam;
    var days = dayparam;
    this.state.d1 = date.getFullYear() + "," + monthparam + "," + days;
    console.log(dateparam);
    console.log(date);
    this.setState({
      fromDate: dateparam,
      startFromDate: date,
    });
    this.props.datechange({"fromDate":dateparam,"toDate":this.state.toDate})
  };

  handleChangeToDate = (date) => {
    let dayparam = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let monthparam =date.getMonth() < 9 ? "0" + (1 + date.getMonth()) : 1 + date.getMonth();
    let dateparam = date.getFullYear() + "-" + monthparam + "-" + dayparam;
    var days = dayparam;
    this.state.d1 = date.getFullYear() + "," + monthparam + "," + days;
    this.setState({
      toDate: dateparam,
      startToDate: date,
    });

    this.props.datechange({"fromDate":this.state.fromDate,"toDate":dateparam})

  };


  render() {
    // console.log( this.state.dataPie.datasets[0].data == [0,0,0])
    // console.log( (this.state.dataPie.datasets[0].data.length))

    const mobileCode = [
      { label: "+91", value: "+91" },
      { label: "+1", value: "+1" },
      { label: "+44", value: "+44" },
      { label: "+49", value: "+49" },
      { label: "+65", value: "+65" },
      { label: "+39", value: "+39" },
      { label: "+81", value: "+81" },
      { label: "+55", value: "+55" },
      { label: "+33", value: "+33" },
      { label: "+7", value: "+7" },
      { label: "+964", value: "+964" },
      { label: "+86", value: "+86" },
    ];

    const {
      firstName,
      landLine,
      lastName,
      city,
      country,
      otp,
      address,
      pincode,
      department,
      company,
      email,
      mobile,
      mobileCountryCode,
      submitted,
      transferemail,
    } = this.state;
    return (
      <div>
        <HeaderLogin />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="view">
              <section
                className="relative banner-area-inner19"
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
            </div>
            <br></br>
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
              </div>

              </div>




            </Row>
            <br></br>
              <br></br>
              <br></br>

              { this.state.dataPie.datasets[0].data !==[0,0,0]?   <Form>
         <Form.Row>

                  <Form.Group as={Col} md="4" controlId="landLine">
                    <Form.Label>From Date</Form.Label>
                    <div className="dateclass">
                      <DatePicker
                        name="fromDate"
                        value={this.state.fromDate}
                        id="fromDate"
                        //value={startDate}
                        style={
                          !this.state.checked1
                            ? { backgroundColor: "#f2f4f2" }
                            : null
                        }
                        selected={this.state.startFromDate}
                        onChange={(date) =>
                          this.handleChangeFromDate(date)
                        }
                        maxDate={new Date(this.state.maxDate)}

                      />

                    </div>
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="mobile">
                    <Form.Label>To date</Form.Label>
                    <div className="dateclass">
                      <DatePicker
                        name="toDate"
                        value={this.state.toDate}
                        id="toDate"
                        style={
                          !this.state.checked1
                            ? { backgroundColor: "#f2f4f2" }
                            : null
                        }
                        selected={this.state.startToDate}
                        onChange={(date) =>
                          this.handleChangeToDate(date)
                        }
                       maxDate={new Date(this.state.maxDate)}
                       minDate={new Date(this.state.fromDate)}

                      />

                    </div>
                  </Form.Group>
                </Form.Row>

                <br></br>
              <br></br>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="firstName">
                    <Form.Label> Total Ticket Volume By Plan</Form.Label>
                    <br></br>
              <br></br>

                    <MDBContainer>

                              <Pie
                                data={this.state.dataPie}
                                options={{ responsive: true }}
                              />
                            </MDBContainer>
                  </Form.Group>
                  <Form.Group as={Col} md="1" controlId="firstName">
                  <div className="vr">&nbsp;</div>
                  </Form.Group>
                  <Form.Group as={Col} md="5" controlId="lastName">
                    <Form.Label>Used Ticket Volume By Plan</Form.Label>
                    <br></br>
              <br></br>

                    <MDBContainer>
                              {/* <h3 className="mt-5">
                                Used Ticket Volume By Plan
                              </h3>
                              <br></br> */}
                              <Pie
                                data={this.state.usedDataPie}
                                options={{ responsive: true }}
                              />
                            </MDBContainer>
                  </Form.Group>

                </Form.Row>


              </Form> :<Form><Form.Row>
                  <label>testing</label>
                  </Form.Row></Form>}

           <br></br>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           <br></br>

            </Container>{" "}
            <Footer />
          </div>
        )}
      </div>
    );
  }
}
editProfile.propTypes = {
  planData:PropTypes.object,
  datePlanData:PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
    planData:state.editprofileReducer.planData,
    datePlanData:state.editprofileReducer.datePlanData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestloadData:()=> dispatch(requestloadData()),
  datechange:(data) => dispatch(datechange(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(editProfile);
