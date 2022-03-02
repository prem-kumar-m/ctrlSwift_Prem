import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  verifyCredentialCustomer,
  clearTokensCustomer,
  newPasswordCustomer,
  verifyEmailCustomer,
  forgotOtpCustomer,
  resendOtpCustomer,
} from "./action";
import * as Constants from "../../constants";
import Loader from "../../components/loading";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "./Header.scss";
import Logo from "../../images/logo.png";
// import { HashLink } from "react-router-hash-link";
// import { HashLink } from "react-router-dom";

class PartnersHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordError: "",
      captcha: "",
      captcha2: "",
      submitted: false,
      isLoginSuccess: false,
      isReadyToRedirect: false,
      emailError: "",
      captchaError: "",
      showloginModal: false,
      mode: "LOGIN",
      isVerifySuccess: false,
      getmail: "",
      getmailError: "",
      page1: "",
      showmailModal: false,
      otp: "",
      resendOtpSuccess: false,
      isValidatdOtpSuccess: false,
      showotpModal: false,
      newpassword: "",
      newpasswordError: "",
      confirmpassword: "",
      confirmpasswordError: "",
      isnewPasswordSuccess: false,
      showpasswordModal: false,
      submitted2: false,
      submitted3: false,
      submitted4: false,
      doClearTokens: "",
      local: "",
      prevPath: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.captcha = this.captcha.bind(this);
    this.handleChangeNew = this.handleChangeNew.bind(this);
    this.handleChangeConfirm = this.handleChangeConfirm.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
  }

  handleChanges = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /\S+@[A-Za-z]+\.com/;
    const ks = /\S+@[A-Za-z]+\.co.in/;
    if (!re.test(value) && !ks.test(value)) {
      this.setState({
        emailError: "Invalid email",
      });
    } else {
      this.setState({
        emailError: "",
      });
    }
  };

  handlePasswordChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

    const re =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,11}$/;

    if (!re.test(value)) {
      this.setState({
        passwordError:
          "Password should be atleast (8-12) digits with atleast one alphabet, one number and one symbol",
      });
    } else {
      this.setState({
        passwordError: "",
      });
    }
  };

  handleChangeNew = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,11}$/;

    if (!re.test(value)) {
      this.setState({
        newpasswordError:
          "Password should be atleast (8-12) digits with atleast one alphabet, one number and one symbol",
      });
    } else {
      this.setState({
        newpasswordError: "",
      });
    }
    console.log(this.state.newpasswordError);
  };

  handleChangeConfirm = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,11}$/;

    if (!re.test(value)) {
      this.setState({
        confirmpasswordError:
          "Password should be atleast (8-12) digits with  alphabets,  numbers and one special character",
      });
    } else {
      this.setState({
        confirmpasswordError: "",
      });
    }
    console.log(this.state.confirmpasswordError);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /\S+@[A-Za-z]+\.com/;
    const ks = /\S+@[A-Za-z]+\.co.in/;
    if (!re.test(value) && !ks.test(value)) {
      this.setState({
        emailError: "Invalid email",
      });
    } else {
      this.setState({
        emailError: "",
      });
    }
  };

  handleChangeOTP = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleChangeCaptcha = (event) => {
    const { name, value } = event.target;
    // this.setState({
    //    [name]: value
    // });
    //   var difference = function (num1, num2){
    //     return Math.abs(num1 - num2);
    //  }
    console.log(Math.abs(value.length - this.state.captcha.length));
    console.log("name \n" + name + " \n value \n" + value);
    console.log(Math.abs(value.length - this.state.captcha.length) === 1);
    if (Math.abs(value.length - this.state.captcha.length) === 1) {
      this.setState({
        captcha: value,
      });
    }
    const pasteBox = document.getElementById("captcha");
    pasteBox.onpaste = (e) => {
      e.preventDefault();
      return false;
    };
    if (this.state.captcha2 !== value) {
      this.setState({
        captchaError: "Captcha is mismatching",
      });
    } else {
      this.setState({
        captchaError: "",
      });
    }
  };

  handleEmailChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /\S+@[A-Za-z]+\.com/;
    const ks = /\S+@[A-Za-z]+\.co.in/;
    if (!re.test(value) && !ks.test(value)) {
      this.setState({
        emailError: "Invalid email",
      });
    } else {
      this.setState({
        emailError: "",
      });
    }
  };

  captcha() {
    var no = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";
    var x = no[Math.floor(Math.random() * no.length)];
    for (var i = 0; i < 4; i++) {
      x = x + no[Math.floor(Math.random() * no.length)];
    }
    this.setState({
      captcha2: x,
    });
    console.log(this.state.captcha2);
  }

  final = (e) => {
    e.preventDefault();
    this.setState({ submitted4: true });
    const {
      getmail,
      newpassword,
      confirmpassword,
      newpasswordError,
      confirmpasswordError,
    } = this.state;
    if (
      newpassword &&
      confirmpassword &&
      newpassword === confirmpassword &&
      newpasswordError === "" &&
      confirmpasswordError === ""
    ) {
      this.props.submitnewPasswordCustomer(getmail, newpassword);
    } else if (
      newpassword &&
      confirmpassword &&
      newpassword !== confirmpassword
    ) {
      Swal.fire({
        title: "",
        text: "New password and Confirm Password Is Mismatching",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
    if (newpassword.length < 8 && confirmpassword.length < 8) {
      Swal.fire({
        title: "",
        text: "Please Check your password length!",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    } else if (newpassword.length > 12 && confirmpassword.length > 12) {
      Swal.fire({
        title: "",
        text: "Your Password length Exceeds. Please Check",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const {
      email,
      password,
      captcha,
      emailError,
      passwordError,
      captchaError,
    } = this.state;
    if (
      email &&
      password &&
      captcha &&
      emailError == "" &&
      passwordError == "" &&
      captchaError == ""
    ) {
      this.props.verifyCredentialCustomer(email, password);

      this.setState({
        isLoading: true,
      });
    }
    //this.props.history.push('/RegisterPage');
  }

  handleSubmit2 = (type) => {
    this.setState({ submitted2: true });

    if (this.state.getmail !== "" && this.state.getmailError === "") {
      // this.setState({  showotpModal: true, mode: type});
      // this.setState({  showgetmailModal: false, mode: type});
    }
    const yu = /\S+@[A-Za-z]+\.com/;
    const va = /\S+@[A-Za-z]+\.co.in/;
    if (!yu.test(this.state.getmail) && !va.test(this.state.getmail)) {
      this.setState({
        getmailError: "Invalid email",
      });
    } else {
      this.setState({
        getmailError: "",
      });
      const { getmail, getmailError } = this.state;

      if (
        (getmail, !yu.test(this.state.getmail) || !va.test(this.state.getmail))
      ) {
        this.props.verifyEmailCustomer(getmail);
        // this.setState({  showotpModal: true, mode: type});
        // this.setState({  showgetmailModal: false, mode: type});
      }
    }
  };

  handleSubmit3 = (type) => {
    this.setState({ submitted3: true });
    const { getmail, otp } = this.state;
    if (otp && otp.length === 6) {
      this.props.submitverifyValidateOtpCustomer(getmail, otp);
    }
  };

  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  resendChange = () => {
    this.setState({ submitted3: true });
    if (this.state.getmail) {
      this.props.clickResendOtpCustomer(this.state.getmail);
    }
  };

  loginClicked = (type) => {
    const date = new Date();
    const dateAsString = date.toString();
    console.log(date.toString().split(" "));
    console.log(dateAsString.match(/\(([^\)]+)\)$/));
    const timezone = dateAsString.match(/\(([^\)]+)\)$/)[1];

    console.log(timezone);
    const timeZone = new Date();
    console.log(timeZone);
    //this.props.timezone(date.toString()); //--------used to get the timeZone------------
    this.setState({ showloginModal: true, mode: type });
    console.log("--->Open Login Modal<--");
  };

  forgotClicked = (type) => {
    this.setState({ showgetmailModal: true, mode: type });
    this.setState({ showloginModal: false, mode: type });

    console.log("--->Open forgot mail Modal<--");
  };
  otpClicked = (type) => {
    this.setState({ showotpModal: true, mode: type });
    this.setState({ showgetmailModal: false, mode: type });

    console.log("--->Open otp Modal<--");
  };

  passwordClicked = (type) => {
    this.setState({ showpasswordModal: true, mode: type });
    this.setState({ showotpModal: false, mode: type });

    console.log("--->Open password Modal<--");
  };

  handleClose = () => {
    this.setState({ showloginModal: false });
    this.setState({ showgetmailModal: false });
    this.setState({ showotpModal: false });
    this.setState({ showpasswordModal: false });
    // window.location.reload();
  };

  forgotModal = () => {
    this.setState({
      showgetmailModal: true,
      showloginModal: false,
    });
  };
  redirect = () => {
    console.log("working");
    //  this.props.history.push('/ctrlSwiftlite');
    window.location.href = "/ctrlSwiftlite";
  };

  componentDidMount() {
    this.captcha();

    console.log(
      "session storage email id------>" +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL)
    );
    console.log(
      "session storage email id------>" +
        window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID)
    );
    if (
      window.sessionStorage.getItem(Constants.REGISTERED) !== undefined &&
      window.sessionStorage.getItem(Constants.REGISTERED) != null
    ) {
      console.log(
        "REGISTERED..." + window.sessionStorage.getItem(Constants.REGISTERED)
      );
      this.loginClicked();
      window.sessionStorage.clear();
    }
    if (
      window.sessionStorage.getItem(Constants.RESETPASSWORD) !== undefined &&
      window.sessionStorage.getItem(Constants.RESETPASSWORD) != null
    ) {
      console.log(
        "RESETPASSWORD..." +
          window.sessionStorage.getItem(Constants.RESETPASSWORD)
      );
      this.loginClicked();
      window.sessionStorage.clear();
    }
    console.log(
      "REGISTERED..." + window.sessionStorage.getItem(Constants.REGISTERED)
    );

    if (
      window.sessionStorage.getItem(Constants.ACCESS_EMAIL) !== undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_EMAIL) != null
    ) {
      console.log(
        "login mail id..." +
          window.sessionStorage.getItem(Constants.ACCESS_EMAIL)
      );
      this.props.clearTokensCustomer();
    }
    window.sessionStorage.clear();
    console.log(
      "login mail id ------>" +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL)
    );

    if (
      window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID) !==
        undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID) != null
    ) {
      console.log(
        "login mail id..." +
          window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID)
      );
      // this.props.clearTokensCustomer();
    }
    console.log(
      "login CUSTOMER ID..." +
        window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID)
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isnewPasswordSuccess !== prevProps.isnewPasswordSuccess) {
      if (this.state.submitted4 && this.props.isnewPasswordSuccess.success) {
        this.handleClose();
        Swal.fire({
          title: "",
          text: "Password reset is completed",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            //window.location.reload();
          }
        });
        //this.props.history.push('/');
        /*.then((res) => {
      if(res.value){
        this.props.history.push('/'+ this.state.page);
      }else if(res.dismiss == 'cancel'){
          console.log('cancel');
      }
  }) */
      } else if (
        this.state.submitted4 &&
        !this.props.isnewPasswordSuccess.success
      ) {
        Swal.fire({
          title: "",
          text: "Unable to Reset, Please Check your Internet Connection!",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
      this.setState({ submitted4: false });
    }

    if (this.props.resendOtpSuccess !== prevProps.resendOtpSuccess) {
      console.log(this.state.submitted3);

      if (this.state.submitted3 && this.props.resendOtpSuccess.success) {
        console.log(this.props.resendOtpSuccess.success);
        /*   Swal.fire({
        title: "",
        text:"",
        icon: 'info',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      })*/
      } else {
        Swal.fire({
          title: "",
          text: this.props.resendOtpSuccess.message,
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
      this.setState({ submitted3: false });
    }

    if (this.props.isValidatdOtpSuccess !== prevProps.isValidatdOtpSuccess) {
      if (this.props.isValidatdOtpSuccess.success) {
        console.log(this.props.isValidatdOtpSuccess.success);
        // this.props.history.push('/resetPasswordCustomer?getmail='+ this.state.getmail+ '&page='+ this.state.page);
        this.handleClose();
        this.setState({
          //showotpModal:false,
          showpasswordModal: true,
        });
      } else if (!this.props.isValidatdOtpSuccess.success) {
        Swal.fire({
          title: "",
          text: this.props.isValidatdOtpSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
      this.setState({ submitted3: false });
    }

    if (this.props.isVerifySuccess !== prevProps.isVerifySuccess) {
      console.log(this.state.submitted2 && this.props.isVerifySuccess.success);
      if (this.state.submitted2 && this.props.isVerifySuccess.success) {
        Swal.fire({
          title: "Note",
          text: "OTP has been sent to your registered Email ID",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.setState({ showotpModal: true, showgetmailModal: false });
      } else if (this.state.submitted2 && !this.props.isVerifySuccess.success) {
        Swal.fire({
          title: "Note",
          text: this.props.isVerifySuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.setState({ showgetmailModal: false });
      }
      this.setState({ submitted2: false });
    }

    /* if(this.props.isTimezoneSuccess !== prevProps.isTimezoneSuccess){
    if(this.props.isTimezoneSuccess.data.timeZone!==undefined){
    }
  }*/

    if (this.props.isLoginSuccess !== prevProps.isLoginSuccess) {
      this.setState({
        isLoading: false,
      });
      if (this.state.submitted && this.props.isLoginSuccess.success) {
        window.sessionStorage.setItem(
          Constants.ACCESS_EMAIL,
          this.props.isLoginSuccess.email
        );
        window.sessionStorage.setItem(
          Constants.ACCESS_CUSTOMERID,
          this.props.isLoginSuccess.customerId
        );
        window.sessionStorage.setItem(
          Constants.CLIENT_ACCESS_TOKEN,
          this.props.isLoginSuccess.accessToken
        );
        if (this.props.isLoginSuccess.isActivePlanPresents == "1") {
          window.sessionStorage.setItem(
            Constants.ACTIVE_PLAN,
            this.props.isLoginSuccess.isActivePlanPresents
          );
        }
        console.log(window.sessionStorage.getItem(Constants.ACTIVE_PLAN));
        this.setState({ isReadyToRedirect: true, showloginModal: false });

        // this.props.history.push("/editProfile");
        //window.location.reload();
      } else if (this.state.submitted && !this.props.isLoginSuccess.success) {
        Swal.fire({
          title: "",
          text: this.props.isLoginSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.setState({ isReadyToRedirect: false });
      }
      this.setState({ submitted: false });
    }

    if (this.props.isEmailVerifySuccess !== prevProps.isEmailVerifySuccess) {
      if (this.state.submitted2 && this.props.isEmailVerifySuccess.success) {
        console.log(
          this.state.submitted2 && this.props.isEmailVerifySuccess.success
        );

        this.handleClose();
        this.setState({
          showotpModal: true,
        });
      } else if (
        this.state.submitted2 &&
        !this.props.isEmailVerifySuccess.success
      ) {
        Swal.fire({
          title: "Note",
          text: this.props.isEmailVerifySuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
      this.setState({ submitted2: false });
    }
    console.log("prevPath" + this.state.prevPath);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location });
    }
  }

  render() {
    if (this.state.isReadyToRedirect) return <Redirect to="/userDashboard" />;

    const {
      email,
      password,
      submitted,
      captcha,
      captcha2,
      getmail,
      otp,
      newpassword,
      confirmpassword,
      submitted2,
      submitted3,
      submitted4,
    } = this.state;

    return (
      <header id="header">
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div>
            <Container className="container">
              <Row className="row align-items-center justify-content-between d-flex">
                <Col>
                  <a href="/">
                    <img src={Logo} alt="CtrlSwift" className="logo_width" />
                  </a>
                </Col>

                <Navbar bg="nav-menu-container" expand="lg">
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                      <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <NavDropdown title="Know Us" id="nav-dropdown-knowus">
                          <NavDropdown.Item
                            eventKey="4.1"
                            href="/aboutctrlSwift"
                          >
                            About CtrlSwift
                          </NavDropdown.Item>
                          <NavDropdown.Item></NavDropdown.Item>
                          <NavDropdown.Item
                            eventKey="4.2"
                            href="/aboutctrlSwift#What CtrlSwift"
                          >
                            What is CtrlSwift
                          </NavDropdown.Item>
                          <NavDropdown.Item></NavDropdown.Item>
                          {/* <NavDropdown.Item eventKey="4.3" href="/whyctrlSwift"> */}
                          <NavDropdown.Item
                            eventKey="4.3"
                            href="/aboutctrlSwift#Why CtrlSwift?"
                          >
                            Why CtrlSwift
                          </NavDropdown.Item>
                          <NavDropdown.Item></NavDropdown.Item>
                          <NavDropdown.Item eventKey="4.4" href="/faq">
                            FAQ
                          </NavDropdown.Item>
                        </NavDropdown>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          id="nav-dropdown-service"
                          href="/ctrlSwiftlite"
                        >
                          Service Offerings
                        </Nav.Link>
                      </Nav.Item>

                      <Nav.Item>
                        <NavDropdown
                          title="Pricing Plans"
                          id="nav-dropdown-pricing"
                        >
                          <NavDropdown.Item
                            eventKey="4.1"
                            href="./ctrlSwiftLitePlan"
                          >
                            {/* ctrlSwift Pay Per Use */}
                            CtrlSwift Lite
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            eventKey="4.2"
                            href="./ctrlSwiftEnterprisePlan"
                          >
                            {/* ctrlSwift Shared */}
                            CtrlSwift Enterprise
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            eventKey="4.3"
                            href="./ctrlSwiftPremiumPlan"
                          >
                            {/* ctrlSwift Dedicated{" "} */}
                            CtrlSwift Premium
                          </NavDropdown.Item>
                        </NavDropdown>
                      </Nav.Item>
                      {/* <NavDropdown  title="Partners "
                          id="nav-dropdown-partnersignup">
                            <NavDropdown.Item
                            eventKey="4.1"
                            href="/partnerHome"
                          >
                            Partner's Advantage
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            eventKey="4.1"
                            // href="#"
                          >
                            How to register
                          </NavDropdown.Item>

                          <NavDropdown.Item
                            eventKey="4.1"
                            // href="#"
                          >
                            FAQ
                          </NavDropdown.Item>

                         

                      </NavDropdown> */}
                      <Nav.Item>
                        <Nav.Link href="#partners">partners</Nav.Link>
                        {/* <Link to="/#partners"> partners </Link> */}
                        {/* <HashLink smooth to="//#partners">
                          {" "}
                          Partners{" "}
                        </HashLink> */}
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Item>
                          <Nav.Link href="/contactus">Contact</Nav.Link>
                        </Nav.Item>
                      </Nav.Item>
                      <Nav.Item>
                        <Button
                          className=" text-uppercase"
                          onClick={this.loginClicked}
                          id="cs-h-Login"
                          name="cs-h-Login"
                        >
                          Login
                        </Button>
                      </Nav.Item>
                      <Nav.Item>
                        <Button
                          className="text-uppercase"
                          href="/register"
                          id="cs-h-Signup"
                          name="cs-h-Signup"
                        >
                          Signup
                        </Button>
                      </Nav.Item>
                      {/* <Nav.Item>
                        <Button
                          className="genric-btn success medium radius text-uppercase"
                          href="/admin"
                        >
                         Partner Login
                        </Button>
                      </Nav.Item> */}
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </Row>
            </Container>

            <Modal
              show={this.state.showloginModal === true}
              onHide={this.handleClose}
              backdrop={"static"}
            >
              <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="md-form mb-2">
                  <i className="fas fa fa-envelope prefix grey-text"></i>
                  <input
                    type="email"
                    id="defaultForm-email"
                    className="form-control validate"
                    name="email"
                    value={email}
                    onChange={this.handleEmailChange}
                  />
                  {submitted && !email && (
                    <div style={{ fontSize: 12, color: "red" }}>
                      Email is required
                    </div>
                  )}
                  {this.state.emailError !== "" && submitted && email && (
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.emailError}
                    </div>
                  )}
                  <label
                    data-error="wrong"
                    data-success="right"
                    for="defaultForm-email"
                  >
                    Your email
                  </label>
                </div>

                <div className="md-form mb-2">
                  <i className="fas fa fa-lock prefix grey-text"></i>
                  <input
                    type="password"
                    id="defaultForm-pass"
                    className="form-control validate"
                    name="password"
                    value={password}
                    onChange={this.handlePasswordChange}
                  />
                  {submitted && !password && (
                    <div
                      className="help-block"
                      style={{ fontSize: 12, color: "red" }}
                    >
                      Password is required
                    </div>
                  )}
                  {this.state.passwordError !== "" && password && submitted && (
                    <div
                      className="help-block "
                      style={{ fontSize: 12, color: "red" }}
                    >
                      {this.state.passwordError}
                    </div>
                  )}
                  <label
                    data-error="wrong"
                    data-success="right"
                    for="defaultForm-pass"
                  >
                    Your password
                  </label>
                </div>
                <div className="md-form mb-2">
                  <input
                    type="text"
                    autocomplete="off"
                    id="defaultForm-pass"
                    onPaste="return false"
                    className="form-control validate"
                    name="captcha"
                    id="captcha"
                    value={captcha}
                    onChange={this.handleChangeCaptcha}
                  />
                  {submitted && !captcha && (
                    <div
                      className="help-block"
                      style={{ fontSize: 12, color: "red" }}
                    >
                      Captcha is required
                    </div>
                  )}
                  {submitted && captcha2 !== captcha && captcha && (
                    <div
                      className="help-block"
                      style={{ fontSize: 12, color: "red" }}
                    >
                      {this.state.captchaError}
                    </div>
                  )}
                  <label
                    data-error="wrong"
                    data-success="right"
                    for="defaultForm-pass"
                  >
                    Captcha
                  </label>
                  <div className="row">
                    <div classname="col-md-2">
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        id="captcha2"
                        name="captcha2"
                        value={captcha2}
                        ondragstart="dragStart(event)"
                        draggable="true"
                        id="dragtarget"
                        style={{ fontSize: "18px", width: 100, marginLeft: 20 }}
                      />{" "}
                    </div>
                    <div classname="col-md-12">
                      <Button
                        variant="link"
                        onClick={this.captcha}
                        style={{ marginBottom: 10, width: 100 }}
                      >
                        Refresh
                      </Button>{" "}
                    </div>{" "}
                  </div>
                </div>
                <Row className="justify-content-md-center">
                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={this.handleSubmit}
                    style={{ marginTop: 10 }}
                    id="CS-Login"
                  >
                    Login
                  </Button>
                </Row>
              </Modal.Body>

              <Row className="justify-content-md-center">
                <Col className="text-center">
                  {/* <a href="#!" className="forgot-password-link"  href="/forgotpasswordcustomer" >
                  Forgot password?
                </a> */}
                  <Link onClick={this.forgotModal}> Forgot password?</Link>
                  <p className="login-card-footer-text">
                    Don't have an account?{" "}
                    <a href="/register" className="text-reset cs-reg-color">
                      Register here
                    </a>
                  </p>
                </Col>
              </Row>
            </Modal>

            <Modal
              show={this.state.showgetmailModal}
              onHide={this.handleClose}
              backdrop={"static"}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  Enter your Registered Mail ID to send OTP
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="md-form mb-2">
                  <i className="fas fa fa-envelope prefix grey-text"></i>
                  <input
                    type="email"
                    id="defaultForm-email"
                    className="form-control validate"
                    name="getmail"
                    value={getmail}
                    onChange={this.handleEmailChange}
                  />
                  {submitted2 && !getmail && (
                    <div style={{ fontSize: 12, color: "red" }}>
                      Email is required
                    </div>
                  )}
                  {this.state.getmail !== "" && submitted2 && getmail && (
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.getmailError}
                    </div>
                  )}
                  <label
                    data-error="wrong"
                    data-success="right"
                    for="defaultForm-email"
                  >
                    Enter your registered mail ID
                  </label>
                </div>

                <Row className="justify-content-md-center">
                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={this.handleSubmit2}
                    style={{ marginTop: 10 }}
                  >
                    NEXT
                  </Button>
                </Row>
              </Modal.Body>
            </Modal>
            <Modal
              show={this.state.showotpModal}
              onHide={this.handleClose}
              backdrop={"static"}
            >
              <Modal.Header closeButton>
                <Modal.Title>Enter OTP </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="md-form mb-2">
                  <input
                    type="email"
                    id="defaultForm-email"
                    className="form-control validate"
                    name="otp"
                    value={otp}
                    maxLength={6}
                    minLength={6}
                    onInput={this.maxLengthCheck}
                    onChange={this.handleChangeOTP}
                  />

                  {submitted3 && !otp && (
                    <div
                      style={{ fontSize: 12, color: "red" }}
                      className="nav-left "
                    >
                      OTP is required
                    </div>
                  )}
                  {submitted3 && otp.length !== 6 && otp && (
                    <div
                      style={{ fontSize: 12, color: "red" }}
                      className="nav-left"
                    >
                      OTP is must be 6-digits
                    </div>
                  )}
                  <label
                    data-error="wrong"
                    data-success="right"
                    for="defaultForm-email"
                  >
                    Enter your OTP
                  </label>
                </div>

                <Row className="justify-content-md-center">
                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={this.handleSubmit3}
                    style={{ marginTop: 10 }}
                  >
                    Verify
                  </Button>

                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={this.resendChange}
                    style={{ marginTop: 10, marginLeft: 40 }}
                  >
                    Resend
                  </Button>
                </Row>
              </Modal.Body>
            </Modal>

            <Modal
              show={this.state.showpasswordModal}
              onHide={this.handleClose}
              backdrop={"static"}
            >
              <Modal.Header closeButton>
                <Modal.Title>Enter Password </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="md-form mb-2">
                  <i className="fas fa fa-lock prefix grey-text"></i>

                  <input
                    type="password"
                    id="defaultForm-email"
                    className="form-control validate"
                    name="newpassword"
                    value={newpassword}
                    onChange={this.handleChangeNew}
                  />

                  {submitted4 && !newpassword && (
                    <div
                      className="help-block"
                      style={{ fontSize: 12, color: "red" }}
                    >
                      New Password Is Required
                    </div>
                  )}
                  {this.state.newpasswordError !== "" &&
                    newpassword &&
                    submitted4 && (
                      <div
                        className="help-block "
                        style={{ fontSize: 12, color: "red" }}
                      >
                        {this.state.newpasswordError}
                      </div>
                    )}

                  <label
                    data-error="wrong"
                    data-success="right"
                    for="defaultForm-email"
                  >
                    New Password
                  </label>
                </div>
                <div className="md-form mb-2">
                  <i className="fas fa fa-lock prefix grey-text"></i>

                  <input
                    type="password"
                    id="defaultForm-email"
                    className="form-control validate"
                    name="confirmpassword"
                    value={confirmpassword}
                    onChange={this.handleChangeConfirm}
                  />

                  {submitted4 && !confirmpassword && (
                    <div
                      className="help-block"
                      style={{ fontSize: 12, color: "red" }}
                    >
                      Confirm Password Is Required
                    </div>
                  )}
                  {this.state.confirmpasswordError !== "" &&
                    confirmpassword &&
                    submitted4 && (
                      <div
                        className="help-block "
                        style={{ fontSize: 12, color: "red" }}
                      >
                        {this.state.confirmpasswordError}
                      </div>
                    )}

                  <label
                    data-error="wrong"
                    data-success="right"
                    for="defaultForm-email"
                  >
                    Confirm Password
                  </label>
                </div>

                <Row className="justify-content-md-center">
                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={this.final}
                    style={{ marginTop: 10 }}
                  >
                    Create
                  </Button>
                </Row>
              </Modal.Body>
            </Modal>
          </div>
        )}
      </header>
    );
  }
}

PartnersHeader.propTypes = {
  verifyCredentialCustomer: PropTypes.func,
  timezone: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    isLoginSuccess: state.loginReducer.isLoginSuccess,
    //isTimezoneSuccess:state.loginReducer.isTimezoneSuccess,
    isEmailVerifySuccess: state.loginReducer.isEmailVerifySuccess,
    isnewPasswordSuccess: state.loginReducer.isnewPasswordSuccess,
    isValidatdOtpSuccess: state.loginReducer.isValidatdOtpSuccess,
    resendOtpSuccess: state.loginReducer.resendOtpSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  verifyCredentialCustomer: (email, password) =>
    dispatch(verifyCredentialCustomer(email, password)),
  // timezone:data => dispatch(timezone(data))
  verifyEmailCustomer: (getmail) => dispatch(verifyEmailCustomer(getmail)),
  submitverifyValidateOtpCustomer: (getmail, value) =>
    dispatch(forgotOtpCustomer(getmail, value)),
  clickResendOtpCustomer: (getmail) => dispatch(resendOtpCustomer(getmail)),
  submitnewPasswordCustomer: (getmail, newpassword) =>
    dispatch(newPasswordCustomer(getmail, newpassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnersHeader);
