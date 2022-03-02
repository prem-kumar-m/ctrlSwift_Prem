import { PropTypes } from "prop-types";
import queryString from "query-string";
import React, { Component } from "react";
import { Col, Form } from 'react-bootstrap';
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Swal from "sweetalert2";
import Footer from "../components/footer";
import Logo from "../images/logo.png";
import { addClient, reqdeleteClient, requestAllClients } from "./action";
import "./user.css";



class AcceptOrDenyNewAdmin extends Component {
  constructor() {
    super();
    this.state = {

      user: {
        employeeId: "",
        name: "",
        nameError: "",
        role: "",
        mobile: "",
        email: "",
        emailError: "",
        submitted: false,
        isReadyToRedirect: false,
        isSuccess: false,
        isShowroomLoaded: false,
        letters: "",
        mobileError: "",
        goForDelete: false,
        mode: "add",
        countryName: "",
        servicesTaxPercentage: "",
      },
      mobile:"",
      firstName:"",
      email:"",
      company:"",
      firstName:"",
lastName:"",
email:"",
department:"",
mobile:"",
landline:"",
customerId:"",
company:"",
address:"",
country:"",
city:"",
pincode:"",
statusId:"",
wantUpdate:"",
taxId:"",
      users: [],
      clientlist:[],
      ticket1:"",
      hideshow: true,
      selectedRole: "",
      // token:window.sessionStorage.getItem("token"),
      // clientToken: window.sessionStorage.getItem("tokenClient"),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /\S+@[A-Za-z]+\.com/;
    const ks = /\S+@[A-Za-z]+\.co\.in/;
    if (!re.test(value) && !ks.test(value)) {
      this.setState({
        emailError: "Invalid email",
      });
      console.log("eeeeeeeee" + this.state.emailError);
    } else {
      this.setState({
        emailError: "",
      });
    }
  };




  handleSelectChange = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({
      countryName: selectedOption.label,
      selectedRole: selectedOption.label,
    });
  };

  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  editRow = () => {
    this.setState({ submitted: true });
    this.props.submitAddClient(this.state.ticket1);


  };
  deleteRow = () => {
    //console.log(user);
    Swal.fire({
      title: "Confirm to Denied",
      text: "Do you want to Denied Name: "+this.state.firstName+","+"email ID: "+this.state.email,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      closeOnConfirm: true,
      closeOnCancel: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((res) => {
      if (res.value) {
        this.deleteClient(this.state.ticket1);
      } else if (res.dismiss == "cancel") {
        console.log("cancel");
      }
    });
  };

  deleteClient = (ticket1) => {
    this.setState({ goForDelete: true });
    this.props.reqdeleteClient(ticket1);
  };
  navigate = (url) => {
    this.props.history.push(url);
  };

  clearText() {
    this.setState({
      employeeId: "",
      name: "",
      email: "",
      mobile: "",
      role: "",
    });
  }



  componentDidMount() {
    let url = this.props.location.search;
    let params = queryString.parse(url);
    this.state.ticket1=params.token;
    // console.log(this.state.token);
    this.setState({
      mode: "add"
  });
  // console.log("ticket number set to " + this.state.ticket1);

    this.props.requestAllClients(this.state.ticket1);


  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("index DID MOunt " + JSON.stringify(this.props.clientlist));
    if (this.props.clientlist !== prevProps.clientlist) {
      console.log("updated detials ......................");
      if (
        this.props.clientlist !== undefined &&
        this.props.clientlist !== null &&
        this.props.clientlist.firstName !== undefined
      ) {
        // console.log("updated firstname ......................" +this.props.clientlist.firstName, );
        // console.log('updated firstName ......................' + this.state.firstName);
        this.setState({
          firstName:this.props.clientlist.firstName,
          lastName:this.props.clientlist.lastName,
          email:this.props.clientlist.email,
          department:this.props.clientlist.department,
          mobile:this.props.clientlist.mobile,
          landline:this.props.clientlist.landline,
          customerId:this.props.clientlist.customerId,
          company:this.props.clientlist.company,
          address:this.props.clientlist.address,
          country:this.props.clientlist.country,
          city:this.props.clientlist.city,
          pincode:this.props.clientlist.pincode,
          statusId:this.props.clientlist.statusId,
          wantUpdate:this.props.clientlist.wantUpdate,
          taxId:this.props.clientlist.taxId,

        });

      }
      else{
        console.log(" ------- Not Working -------- ");
        Swal.fire({
          title: "Loading Data",
          text: " ",
          icon: "success",
          timer:2000,
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    }

    if (this.props.isSuccess !== prevProps.isSuccess) {
      console.log("delete --->" + this.state.goForDelete);
      console.log("success success --->" + this.props.isSuccess.success);
      if (this.state.submitted && this.props.isSuccess.success) {

          Swal.fire({
            title: "Success",
            text: "User Updated Successfully as an CtrlSwift Admin",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
          this.props.history.push("/");
        // window.location.reload();
      }
      else if(this.state.submitted && !this.props.isSuccess.success && this.props.isSuccess.message==""){
        Swal.fire({
          title: "Already updated",
          text: this.props.isSuccess.message,
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            this.props.history.push("/");
          }
        });
      }

      else if (this.state.submitted && !this.props.isSuccess.success) {
        Swal.fire({
          title: "",
          text: this.props.isSuccess.message,
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            this.props.history.push("/");
          }
        });

        //this.setState({isReadyToRedirect : false});
      } else if (this.state.goForDelete && !this.props.isSuccess.success) {
        Swal.fire({
          title: "",
          text: this.props.isSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            this.props.history.push("/");
          }
        });

        //window.location.reload();
      }
      else if (this.state.goForDelete == true && this.props.isSuccess.success) {
        Swal.fire({
          title: "Deleted",
          text: this.props.isSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            this.props.history.push("/");
          }
        });
        //window.location.reload();
      }

      this.setState({ submitted: false });
      this.setState({ goForDelete: false });

    }
  }

  render() {
    if (this.state.isReadyToRedirect) return <Redirect to="/" />;
    const { submitted, countryName, servicesTaxPercentage,ticket1,firstName,lastName, email,department,mobile,landline,customerId,company,address, country,city,pincode,statusId,wantUpdate,taxId, } = this.state;


    return (
      <div className="page-container" style={{ paddingLeft: "0px" }}>
        <div
            className="header navbar"
            style={{ width: "100%", position: "absolute" }}
          >
            <div className="header-container">
              <ul className="nav-left">
                <li>
                <img src={Logo} alt="CtrlSwift" className="logo_width" />
                </li>
              </ul>
            </div>
          </div>
        <main className="main-content bgc-grey-100">
          <div id="mainContent"
>
            <div className="row">
            <div className="col-md-3"></div>
              <div className="col-md-6 ">
                <div className="col-md-3"></div>
                <div className="row">
                  <div className="col-12 m-2">

                    <div className="bgc-white bd bdrs-3 p-20">
                      <h4 className="c-grey-900 mB-20">Requester information</h4>
                      <div
                        className=""
                        style={{ height: 500, width: "100%" }}
                      >
                     <Form>
                     <Form.Row>
                  <Form.Group as={Col} md="6" controlId="firstName">
                    <Form.Label><span style={{fontWeight:1000,fontSize:"16px"}}>First Name: </span>  {firstName} </Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="lastName">
                    <Form.Label><span style={{fontWeight:1000,fontSize:"16px"}}>Last Name:</span> {lastName} </Form.Label>

                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="firstName">
                    <Form.Label><span style={{fontWeight:1000,fontSize:"16px"}}>Email ID:  </span> {email} </Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="lastName">
                    <Form.Label><span style={{fontWeight:1000,fontSize:"16px"}}>Department: </span> {department} </Form.Label>

                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="firstName">
                    <Form.Label><span style={{fontWeight:1000,fontSize:"16px"}}>Mobile:  </span> {mobile} </Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="lastName">
                    <Form.Label><span style={{fontWeight:1000,fontSize:"16px"}}>Landline: </span>{landline} </Form.Label>

                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  {/* <Form.Group as={Col} md="6" controlId="firstName">
                    <Form.Label><span style={{fontWeight:1000,fontSize:"16px"}}>Customer Id: </span> {customerId} </Form.Label>
                  </Form.Group> */}
                    {/* <Form.Group as={Col} md="6" controlId="lastName">
                    <Form.Label><span style={{fontWeight:1000,fontSize:"16px"}}>WantUpdate:</span> {wantUpdate} </Form.Label>

                  </Form.Group>  */}
                   <Form.Group as={Col} md="6" controlId="firstName">
                    <Form.Label><span style={{fontWeight:1000,fontSize:"16px"}}>Tax Id:</span> {taxId} </Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="lastName">
                    <Form.Label><span style={{fontWeight:1000,fontSize:"16px"}}>Company:</span> {company} </Form.Label>

                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="firstName">
                    <Form.Label><span style={{fontWeight:1000,fontSize:"16px"}}>Address:</span> {address} </Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="lastName">
                    <Form.Label><span style={{fontWeight:1000,fontSize:"16px"}}>Country:</span> {country} </Form.Label>

                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="firstName">
                    <Form.Label><span style={{fontWeight:1000,fontSize:"16px"}}>City:  </span> {city} </Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="lastName">
                    <Form.Label><span style={{fontWeight:1000,fontSize:"16px"}}>Pincode:</span> {pincode} </Form.Label>

                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  {/* <Form.Group as={Col} md="6" controlId="firstName">
                    <Form.Label><span style={{fontWeight:1000,fontSize:"16px"}}>StatusId:</span> {statusId} </Form.Label>
                  </Form.Group> */}

                </Form.Row>
                {/* <Form.Row>
                  <Form.Group as={Col} md="6" controlId="firstName">
                    <Form.Label><span style={{fontWeight:1000,fontSize:"16px"}}>Tax Id:</span> {taxId} </Form.Label>
                  </Form.Group>

                </Form.Row> */}
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="firstName">
                  <button
                                      type="button"
                                      className="btn cur-p btn-primary "
                                      onClick={() =>
                                        this.editRow()
                                      }
                                    >  Accept
                                    </button>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="lastName">
                  <button
                                      type="button"
                                      className="btn cur-p btn-danger"
                                     onClick={() => this.deleteRow()}
                                    > Deny

                                    </button>
                  </Form.Group>
                </Form.Row>
                </Form>

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

AcceptOrDenyNewAdmin.propTypes = {
  requestAllClients: PropTypes.func,
  clientlist: PropTypes.array,
  submitAddClient: PropTypes.func,
  reqdeleteClient: PropTypes.func,
  user: PropTypes.array,
};

const mapStateToProps = (state) => {
  //console.debug(state, 'state');
  return {
    clientlist: state.AcceptOrDenyNewAdminSagaReducer.clientlist,
    isSuccess: state.AcceptOrDenyNewAdminSagaReducer.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestAllClients: (ticket1) => dispatch(requestAllClients(ticket1)),
  submitAddClient: (ticket1) =>
    dispatch(addClient(ticket1)),
  reqdeleteClient: (ticket1) => dispatch(reqdeleteClient(ticket1)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AcceptOrDenyNewAdmin);
