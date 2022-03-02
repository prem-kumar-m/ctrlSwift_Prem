import { PropTypes } from "prop-types";
import queryString from "query-string";
import React from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Logo from "../images/logo.png";
import { newPasswordData, resendOtp, verifyEmail, verifyOtp } from "./action";

class setNewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      sendOtp: "",
      newPassword: "",
      confirmPassword: "",
      confirmPasswordError: "",
      newpasswordError: "",
      submitted: false,
      submitOtp: false,
      submitNewPassword: false,
    };
  }
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
    const { email, emailError } = this.state;
    if (email && emailError === "") {
      this.props.verifyEmail(email);
    }
  };

  //------->otp model
  handleOtpClose = () => {
    this.setState({ showOtpModall: false });
  };
  handleSubmitOtp = (event) => {
    event.preventDefault();
    this.setState({ submitOtp: true });
    const { email, sendOtp } = this.state;
    if (sendOtp && sendOtp.length === 6) {
      this.props.verifyOtp(email, sendOtp);
      console.log("====sending forgot otp=====" + JSON.stringify(sendOtp));
    }
  };
  handleResendOtp = () => {
    console.log("Forgot Resnd Otp");
    this.setState({ submitResend: true });
    const { email } = this.state;
    if (email) {
      this.props.resendOtp(email);
      console.log("====sending forgot otp=====" + JSON.stringify(email));
    }
  };

  //-------->new password model
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
      email,
    } = this.state;

    if (
      newPassword &&
      confirmPassword &&
      newpasswordError === "" &&
      confirmPasswordError === "" &&
      newPassword === confirmPassword
    ) {
      this.props.newPasswordData(email, newPassword);
      console.log(
        "====sending forgot otp=====" + JSON.stringify(email, newPassword)
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

  componentDidMount() {
    // console.log(this.state.otp);
    // this.captcha();
    let url = this.props.location.search;
    let params = queryString.parse(url);
    this.setState({
      email: params.email
    })
    //this.state.email=params.email;
    console.log(this.state.email)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //------------> forgot password (email)--------
    if (this.props.isVerifySuccess !== prevProps.isVerifySuccess) {
      if (
        this.state.submitted &&
        this.props.isVerifySuccess &&
        this.props.isVerifySuccess.success
      ) {
        this.setState({ showOtpModal: true });
      } else if (this.state.submitted && !this.props.isVerifySuccess.success) {
        Swal.fire({
          title: "",
          text: this.props.isVerifySuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.setState({ showOtpModal: false });
      }
    }
    //---->otp model (verify)----------

    if (this.props.isValidatdOtpSuccess !== prevProps.isValidatdOtpSuccess) {
      if (
        this.state.submitOtp &&
        this.props.isValidatdOtpSuccess &&
        this.props.isValidatdOtpSuccess.success === true
      ) {
        console.log(
          "  this.props.isValidatdOtpSuccess.success=======>" +
          this.props.isValidatdOtpSuccess.success
        );

        this.setState({ showOtpModal: false, newPasswordModel: true });
      } else if (
        this.state.submitOtp &&
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
        this.setState({ showOtpModal: true });
      }
    }

    //---------> otp model (resend)-------
    if (this.props.resendOtpSuccess !== prevProps.resendOtpSuccess) {
      if (
        this.state.submitResend &&
        this.props.resendOtpSuccess &&
        this.props.resendOtpSuccess.success
      ) {
        console.log("resendOtpSuccess" + this.props.resendOtpSuccess.otp);
        this.setState({ showOtpModal: true });
      }
      // } else if (this.state.submitResend && !this.props.resendOtpSuccess.data.success) {
      //   console.log(this.props.resendOtpSuccess.message);
      //   Swal.fire({
      //     title: "",
      //     text: this.props.resendOtpSuccess.message,
      //     icon: "info",
      //     showCancelButton: false,
      //     confirmButtonColor: "#3085d6",
      //     cancelButtonColor: "#d33",
      //     confirmButtonText: "OK",
      //   });
      //   this.setState({ showOtpModal: false });
      // }
    }

    //--------->New Password
    if (this.props.newPasswordSuccess !== prevProps.newPasswordSuccess) {
      if (
        this.state.submitOtp &&
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
        }).then(function () {
          window.location = "/PartnerLogin";
        });

        this.setState({ newPasswordModel: false });
      } else if (
        this.state.submitOtp &&
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
        });
        // this.setState({ showOtpModal: true });
      }
    }
  }

  render() {
    const {
      email,
      sendOtp,
      newPassword,
      confirmPassword,
      submitted,
      submitOtp,
      submitNewPassword,
    } = this.state;
    return (
      <div
        className="page-container newPasswordcontainer"
        style={{ paddingLeft: "0px" }}
      >
        <div className="header navbar" style={{ width: "100%" }}>
          <div className="header-container">
            <ul className="nav-left">
              <li>
                <img src={Logo} alt="CtrlSwift" className="logo_width" />
              </li>
            </ul>
          </div>
        </div>
        <main className="main-content">
          <div id="mainContent">
            <div className="container-fluid">
              <div className="row mT-60">
                <div className="col-md-4">
                  <div className="bgc-white p-40 bd logincontent">
                    <h5 className="text-center" style={{ color: "#B1822B" }}>
                      Set New Password
                    </h5>
                    <div className="mT-30">
                      <Form>
                        <Form.Row>
                          <Form.Group as={Col} lg="10">
                            <Form.Label>Email</Form.Label>
                            <input
                              type="text"
                              name="email"
                              value={email}
                              className="form-control"
                              onChange={this.handleChanges}
                              disabled
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
                          </Form.Group>
                        </Form.Row>
                        <br></br>
                        <Form.Row>
                          <Form.Group>
                            <Button
                              className="btn btn-primary"
                              onClick={this.handleSubmit}
                            >
                              Submit
                            </Button>
                          </Form.Group>
                        </Form.Row>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Modal
          show={this.state.showOtpModal}
          onHide={this.handleOtpClose}
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
                  {submitOtp && !sendOtp && (
                    <div
                      style={{ fontSize: 12, color: "red" }}
                      className="nav-left "
                    >
                      OTP is required
                    </div>
                  )}
                  {/* {submitOtp && sendOtp.length !== 6 && sendOtp && (
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
setNewPassword.propTypes = {
  verifyPartnerLogin: PropTypes.func,
  partnerOtpVerify: PropTypes.func,
  resendOtps: PropTypes.func,
  verifyPartnerForgot: PropTypes.func,
  verifyOtp: PropTypes.func,
  resendOtp: PropTypes.func,
  newPasswordData: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isVerifySuccess: state.setNewPasswordReducer.isVerifySuccess,
    isValidatdOtpSuccess: state.setNewPasswordReducer.isValidatdOtpSuccess,
    resendOtpSuccess: state.setNewPasswordReducer.resendOtpSuccess,
    newPasswordSuccess: state.setNewPasswordReducer.newPasswordSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  verifyEmail: (email) => dispatch(verifyEmail(email)),
  verifyOtp: (email, sendOtp) => dispatch(verifyOtp(email, sendOtp)),

  resendOtp: (email, sendOtp) => dispatch(resendOtp(email, sendOtp)),
  newPasswordData: (email, newPassword) =>
    dispatch(newPasswordData(email, newPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(setNewPassword);
