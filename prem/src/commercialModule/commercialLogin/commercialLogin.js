import { PropTypes } from "prop-types";
import React from "react";
import {
  Button, Col,
  Form,
  Modal, Row
} from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/footer";
import Logo from "../../images/logo.png";
// import {
//   forgotResendOtp,
//   newPasswordData, partnerOtpVerify, commercialResendOtp, verifyForgotOtp, verifycommercialForgot, verifycommercialLogin
// } from "./action";
import { BsArrowCounterclockwise } from "react-icons/bs";




class commercialLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: " ",
      passwordError: "",
      isLoginSuccess: false,
      isReadyToRedirect: false,
      isLoading: false,
      submitted: false,
      submitOtp: false,
      showOtpModal: false,
      otpSubmitted: false,
      showModal: false,
      captcha: "",
      captchaError: "",
      text: "",
      otp: "",
      submitForgot: false,
      forgotEmail: "",
      isVerifySuccess: false,
      submitForgotOtp: false,
      sendOtp: "",
      submitNewPassword: false,
      newPassword: "",
      confirmPassword: "",
      newpasswordError: "",
      confirmPasswordError: "",
      submitForgotResend: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.captcha = this.captcha.bind(this);
  }
  // state = initialState ;

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

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
  handleSubmit = (event) => {
    event.preventDefault();
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
      emailError === "" &&
      passwordError === "" &&
      captchaError === ""
    ) {
      this.props.verifycommercialLogin(email, password);

      console.log("fail" + this.state.showOtpModal);

      this.setState({
        isLoading: true,
      });
    }
  };

  resendotp = () => {
    console.log("testing");
    //this.setState({submitted : true});
    if (this.state.email) {
      this.props.commercialResendOtps(this.state.email);
    }
  };
  otpVer = () => {
    this.setState({
      otpSubmitted: true,
    });
    if (this.state.otp) {
      if (this.state.otp.length === 6) {
        this.props.commercialOtpVerify({
          email: this.state.email,
          otp: this.state.otp,
        });
      }
    }
  };
  handleClose = () => {
    this.setState({
      showOtpModal: false,
    });
  };
  clicked = () => {
    this.setState({ showModal: true });
  };

  handleClose2 = () => {
    this.setState({
      showModal: false,
    });
  };

  handleMove = () => {
    this.props.history.push("/partnerRegister");
  };
  captcha() {
    var no = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";
    var x = no[Math.floor(Math.random() * no.length)];
    for (var i = 0; i < 4; i++) {
      x = x + no[Math.floor(Math.random() * no.length)];
    }
    this.setState({
      text: x,
    });
    console.log(this.state.text);
  }
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
    // pasteBox.onpaste = (e) => {
    //   e.preventDefault();
    //   return false;
    // };
    if (this.state.text !== value) {
      this.setState({
        captchaError: "Captcha is mismatching",
      });
    } else {
      this.setState({
        captchaError: "",
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
        confirmPasswordError:
          "Password should be atleast (8-12) digits with  alphabets,  numbers and one special character",
      });
    } else {
      this.setState({
        confirmPasswordError: "",
      });
    }
    console.log(this.state.confirmPasswordError);
  };
  //-------forgot password (email)--------
  handleFrgtPassClose = () => {
    this.setState({ partnerForgotpassword: false });
  };

  handleForgotPassword = (event) => {
    event.preventDefault();

    // if (this.state.submitForgot === true) {
    this.setState({ partnerForgotpassword: true });
    // }
  };

  handleSubmitEmail = (event) => {
    event.preventDefault();
    this.setState({ submitForgot: true });
    console.log("=>testing");
    const { forgotEmail, emailError } = this.state;
    if (forgotEmail && emailError === "") {
      console.log(
        "====sending forgot email=====" + JSON.stringify(forgotEmail)
      );
      this.props.verifyPartnerForgot(forgotEmail);
    }
  };

  handleFrgtOtpClose = () => {
    this.setState({ partnerForgotOtp: false });
  };

  handleSubmitOtp = (event) => {
    event.preventDefault();
    this.setState({ submitForgotOtp: true });
    const { forgotEmail, sendOtp } = this.state;
    if (sendOtp && sendOtp.length === 6) {
      this.props.verifyForgotOtp(forgotEmail, sendOtp);
      console.log("====sending forgot otp=====" + JSON.stringify(sendOtp));
    }
  };

  handleResendOtp = () => {
    console.log("Forgot Resnd Otp");
    this.setState({ submitForgotResend: true });
    const { forgotEmail } = this.state;
    if (forgotEmail) {
      this.props.forgotResendOtp(forgotEmail);
      console.log("====sending forgot otp=====" + JSON.stringify(forgotEmail));
    }
  };

  handleNewPasswordClose = () => {
    this.setState({ newPasswordModel: false });
  };
  handlesubmitnew = () => {
    this.setState({ submitNewPassword: true });
    const {
      newPassword,
      newpasswordError,
      confirmPassword,
      confirmPasswordError,
      forgotEmail,
    } = this.state;

    if (
      newPassword &&
      confirmPassword &&
      newpasswordError === "" &&
      confirmPasswordError === "" &&
      newPassword === confirmPassword
    ) {
      this.props.newPasswordData(forgotEmail, newPassword);
      console.log(
        "====sending forgot otp=====" + JSON.stringify(forgotEmail, newPassword)
      );
    } else if (
      newPassword &&
      confirmPassword &&
      newPassword !== confirmPassword
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
  };

  componentDidMount() {
    console.log(this.state.otp);
    this.captcha();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //-------->Login
    if (this.props.isLoginSuccess !== prevProps.isLoginSuccess) {
      if (this.state.submitted && this.props.isLoginSuccess.success) {
        console.log(this.props.isLoginSuccess.message);
        this.setState({ submitted: true, showOtpModal: true });
        // this.setState({ isReadyToRedirect: true });
      } else if (this.state.submitted && !this.props.isLoginSuccess.success) {
        console.log(this.props.isLoginSuccess.message);
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
        this.setState({ submitted: false });
      } else if (this.state.submitted && !this.props.isLoginSuccess.success) {
        console.log(this.props.isLoginSuccess.message);
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
    if (this.props.isOtpSuccess !== prevProps.isOtpSuccess) {
      if (
        this.state.otpSubmitted &&
        this.props.isOtpSuccess &&
        this.props.isOtpSuccess.success
      ) {
        console.log(this.props.isOtpSuccess.success);
        this.setState({
          isReadyToRedirect: true,

          showOtpModal: false,
        });
      } else {
        Swal.fire({
          title: "",
          text: this.props.isOtpSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    }
    if (this.props.resendOtpSuccess !== prevProps.resendOtpSuccess) {
      if (this.props.resendOtpSuccess.success) {
        Swal.fire({
          title: "",
          text: "OTP Is Sent To Your Registered Mail ID",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "",
          text: this.props.resendOtpSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    }

    //------------> forgot password (email)--------
    if (this.props.isVerifySuccess !== prevProps.isVerifySuccess) {
      if (
        this.state.submitForgot &&
        this.props.isVerifySuccess &&
        this.props.isVerifySuccess.success
      ) {
        this.setState({ partnerForgotOtp: true, partnerForgotpassword: false });
      } else if (
        this.state.submitForgot &&
        this.props.isVerifySuccess.success===false
      ) {
        Swal.fire({
          title: "",
          text: this.props.isVerifySuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.setState({ partnerForgotOtp: false });
      }
    }
    //---->otp model (verify)----------

    if (this.props.isValidatdOtpSuccess !== prevProps.isValidatdOtpSuccess) {
      if (
        this.state.submitForgotOtp &&
        this.props.isValidatdOtpSuccess &&
        this.props.isValidatdOtpSuccess.success === true
      ) {
        console.log(
          "  this.props.isValidatdOtpSuccess.success=======>" +
          this.props.isValidatdOtpSuccess.success
        );

        this.setState({ partnerForgotOtp: false, newPasswordModel: true });
      } else if (
        this.state.submitForgotOtp &&
        !this.props.isValidatdOtpSuccess.success
      ) {
        console.log(this.props.isValidatdOtpSuccess.message);
        Swal.fire({
          title: "",
          text: this.props.isValidatdOtpSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.setState({ partnerForgotOtp: true });
      }
    }

    //---------> otp model (resend)-------
    if (
      this.props.forgotResendOtpSuccess !== prevProps.forgotResendOtpSuccess
    ) {
      if (
        this.state.submitForgotResend &&
        this.props.forgotResendOtpSuccess &&
        this.props.forgotResendOtpSuccess.success
      ) {
        console.log(
          "forgotResendOtpSuccess" + this.props.forgotResendOtpSuccess.otp
        );
        this.setState({ partnerForgotOtp: true, partnerForgotpassword: false });
      }
      // } else if (this.state.submitForgotResend && !this.props.forgotResendOtpSuccess.data.success) {
      //   console.log(this.props.forgotResendOtpSuccess.message);
      //   Swal.fire({
      //     title: "",
      //     text: this.props.forgotResendOtpSuccess.message,
      //     icon: "info",
      //     showCancelButton: false,
      //     confirmButtonColor: "#3085d6",
      //     cancelButtonColor: "#d33",
      //     confirmButtonText: "OK",
      //   });
      //   this.setState({ partnerForgotOtp: false });
      // }
    }

    //--------->New Password
    if (this.props.newPasswordSuccess !== prevProps.newPasswordSuccess) {
      if (
        this.state.submitForgotOtp &&
        this.props.newPasswordSuccess &&
        this.props.newPasswordSuccess.success === true
      ) {
        console.log(
          "  this.props.newPasswordSuccess.success=======>" +
          this.props.newPasswordSuccess.success
        );
        Swal.fire({
          title: "",
          text: "password changed successfully",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
          window.location.reload();
          }
        });

        // this.setState({ partnerForgotOtp: false, newPasswordModel: true });
      } else if (
        this.state.submitForgotOtp &&
        !this.props.newPasswordSuccess.success
      ) {
        console.log(this.props.newPasswordSuccess.message);
        Swal.fire({
          title: "",
          text: "technical issue",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
          window.location.reload();
          }
        });
        // this.setState({ partnerForgotOtp: true });
      }
    }
  }

  render() {
    if (this.state.isReadyToRedirect)
      return <Redirect to="/companyEditProfile" />;
    const {
      otp,
      otpSubmitted,
      email,
      password,
      submitted,
      otpVer,
      captcha,
      text,
      forgotEmail,
      submitForgot,
      submitForgotOtp,
      sendOtp,
      submitNewPassword,
      newPassword,
      confirmPassword,
      submitForgotResend,
    } = this.state;
    return (
      <div className="adminLogincontainer" style={{ paddingLeft: "0px" }}>
        <div size={10}>
          <div>
            <div
              className="header navbar admin-login-header"
              style={{ width: "100%" }}
            >
              <div className="header-container">
                <ul className="nav-left">
                  <li>
                    <img
                      src={Logo}
                      alt="CtrlSwift"
                      className="admin_logo_width"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <main className="main-content">
              <div id="mainContent">
                <div className="container-fluid">
                  <div className="row  ">
                    <div className="col-md-6 offset-md-3">
                      <div className=" card bgc-white p-40 bd logincontent">
                        <h5
                          className="text-center"
                          style={{ color: "#B1822B" }}
                        >
                          Commercial Login
                        </h5>
                        <div className="mT-30">
                          <form
                            name="form"
                            onSubmit={this.handleSubmit}
                            mapStateToProps
                            autoComplete="off"
                          >
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Email Address
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChanges}
                                autoComplete="off"
                                id="plEmail"
                              />

                              {submitted && !email && (
                                <div className="validationError">
                                  Email is required
                                </div>
                              )}
                              {this.state.emailError !== "" &&
                                submitted &&
                                email && (
                                  <div className="validationError">
                                    {this.state.emailError}
                                  </div>
                                )}
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                id="plPassword"
                              />

                              {submitted && !password && (
                                <div
                                  className="help-block"
                                  className="validationError"
                                >
                                  Password is required
                                </div>
                              )}
                            </div>
                            <div class="md-form mb-2">
                              <label
                                data-error="wrong"
                                data-success="right"
                                for="defaultForm-pass"
                              >
                                Captcha
                              </label>
                              <input
                                type="text"
                                autocomplete="off"
                                id="defaultForm-pass"
                                onPaste="return false"
                                class="form-control validate"
                                name="captcha"
                                id="captcha"
                                value={captcha}
                                onChange={this.handleChangeCaptcha}
                                id="plCaptcha"
                              />
                              {submitted && !captcha && (
                                <div
                                  className="help-block"
                                  className="validationError"
                                >
                                  Captcha is required
                                </div>
                              )}
                              {submitted && text !== captcha && captcha && (
                                <div
                                  className="help-block"
                                  className="validationError"
                                >
                                  {this.state.captchaError}
                                </div>
                              )}
                              <br></br>

                              <div className="row">
                                <div classname="col-md-2">
                                  <div class="input-group mb-3">
                                    <input type="text" class="form-control"
                                      disabled
                                      name="text"
                                      value={text}
                                      ondragstart="dragStart(event)"
                                      draggable="true"
                                      id="dragtarget"
                                      style={{
                                        fontSize: "18px",
                                        width: 100,
                                        marginLeft: 20,
                                      }}
                                      aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    <div class="input-group-append">
                                      <button class="btn btn-primary" type="button"
                                        variant="link"
                                        onClick={this.captcha}
                                        id="plRefresh"
                                      > <BsArrowCounterclockwise /></button>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={this.handleSubmit}
                              className="btn btn-primary"
                              id="plSubmit"
                            >
                              Submit
                            </button>
                            <br />
                            <br />
                            <Link
                              onClick={this.handleForgotPassword}
                            // to="/partnerResetPass?page=partnerLogin"
                            >
                              Forgot My Password?
                            </Link>{" "}
                            
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3"></div>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <div className="admin-login-footer">
            <Footer />
          </div>
        </div>

        <Modal
          show={this.state.showOtpModal}
          onHide={(e) => this.handleClose()}
          backdrop={"static"}
        >
          <Modal.Header closeButton>
            <h5 className="text-center">
              <span>Please Enter The OTP</span>
            </h5>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="otp"
                value={otp}
                onChange={this.handleChange}
                id="plOtp"
              />
              {otpSubmitted && !otp && <div className="validationError"></div>}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="col-md-12" style={{ alignItems: "center" }}>
              <div className="row">
                <div className="col-md-5">
                  <button
                    type="button"
                    onClick={(e) => this.otpVer()}
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                    id="plOtpSubmit"
                  >
                    SUBMIT
                  </button>
                </div>
                <div className="col-md-1" />
                <div className="col-md-5">
                  <button
                    type="button"
                    onClick={(e) => this.resendotp()}
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                    id="plResend"
                  >
                    RESEND OTP
                  </button>
                </div>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      
        <Modal
          show={this.state.partnerForgotpassword}
          onHide={this.handleFrgtPassClose}
          backdrop={" static"}
        >
          <Modal.Header closeButton>
            <span>Enter your Registered Mail ID to send OTP</span>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <input
                    type="text"
                    name="forgotEmail"
                    value={forgotEmail}
                    onChange={this.handleChanges}
                    className="form-control"
                  />
                  {submitForgot && !forgotEmail && (
                    <div className="validationError">Email is required</div>
                  )}
                  {this.state.emailError !== "" &&
                    submitForgot &&
                    forgotEmail && (
                      <div className="validationError">
                        {this.state.emailError}
                      </div>
                    )}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group>
                  <Button onClick={this.handleSubmitEmail}>Send OTP</Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal
          show={this.state.partnerForgotOtp}
          onHide={this.handleFrgtOtpClose}
          backdrop={" static"}
        >
          <Modal.Header closeButton>
            <span>Enter OTP</span>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>OTP</Form.Label>
                  <input
                    type="number"
                    className="form-control"
                    name="sendOtp"
                    value={sendOtp}
                    onChange={this.handleChange}
                  />
                  {submitForgotOtp && !sendOtp && (
                    <div
                      style={{ fontSize: 12, color: "red" }}
                      className="nav-left "
                    >
                      OTP is required
                    </div>
                  )}
                  {/* {submitForgotOtp && sendOtp.length !== 6 && sendOtp && (
                      <div
                        style={{ fontSize: 12, color: "red" }}
                        className="nav-left"
                      >
                        OTP is must be 6-digits
                      </div>
                    )} */}
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Button onClick={this.handleSubmitOtp}>Verify</Button>
                </Form.Group>
                <Form.Group as={Col}>
                  <Button onClick={this.handleResendOtp}>Resend</Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal
          show={this.state.newPasswordModel}
          onHide={this.handleNewPasswordClose}
          backdrop={" static"}
        >
          <Modal.Header closeButton>
            <span>Set your New passowrd</span>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>New Password</Form.Label>
                  <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={this.handleChangeNew}
                    className="form-control"
                  />
                  {submitNewPassword && !newPassword && (
                    <div className="validationError">Password is required</div>
                  )}
                  {this.state.newpasswordError !== "" &&
                    newPassword &&
                    submitNewPassword && (
                      <div className="help-block  validationError">
                        {this.state.newpasswordError}
                      </div>
                    )}
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Label>Confirm Password</Form.Label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleChangeConfirm}
                  className="form-control"
                />
                {submitNewPassword && !confirmPassword && (
                  <div className="validationError">Password is required</div>
                )}
                {this.state.confirmPassword !== "" &&
                  confirmPassword &&
                  submitNewPassword && (
                    <div className="help-block  validationError">
                      {this.state.confirmPasswordError}
                    </div>
                  )}
              </Form.Row>
              <br></br>
              <Form.Row>
                <Form.Group>
                  <Button onClick={this.handlesubmitnew}>Submit</Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

commercialLogin.propTypes = {
  verifycommercialLogin: PropTypes.func,
  commercialOtpVerify: PropTypes.func,
  resendOtps: PropTypes.func,
  verifycommercialForgot: PropTypes.func,
  verifyForgotOtp: PropTypes.func,
  forgotResendOtp: PropTypes.func,
  newPasswordData: PropTypes.func,
};

// const mapStateToProps = (state) => {
//   return {
//     // login side----------
//     isLoginSuccess: state.commercialLoginreducer.isLoginSuccess,
//     isOtpSuccess: state.commercialLoginreducer.isOtpSuccess,
//     resendOtpSuccess: state.commercialLoginreducer.resendOtpSuccess,
//     // forgot side----------
//     isVerifySuccess: state.commercialLoginreducer.isVerifySuccess,
//     isValidatdOtpSuccess: state.commercialLoginreducer.isValidatdOtpSuccess,
//     forgotResendOtpSuccess: state.commercialLoginreducer.forgotResendOtpSuccess,
//     newPasswordSuccess: state.commercialLoginreducer.newPasswordSuccess,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   verifycommercialLogin: (email, password) =>
//     dispatch(verifycommercialLogin(email, password)),
//   commercialOtpVerify: (otp) => dispatch(commercialOtpVerify(otp)),
//   commercialResendOtps: (email) => dispatch(commercialResendOtp(email)),

//   verifycommercialForgot: (forgotEmail) =>
//     dispatch(verifycommercialForgot(forgotEmail)),
//   verifyForgotOtp: (forgotEmail, sendOtp) =>
//     dispatch(verifyForgotOtp(forgotEmail, sendOtp)),

//   forgotResendOtp: (forgotEmail, sendOtp) =>
//     dispatch(forgotResendOtp(forgotEmail, sendOtp)),
//   newPasswordData: (forgotEmail, newPassword) =>
//     dispatch(newPasswordData(forgotEmail, newPassword)),
// });

export default
//  connect(mapStateToProps, mapDispatchToProps)
(commercialLogin);
