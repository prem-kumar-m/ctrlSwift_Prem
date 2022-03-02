import { PropTypes } from "prop-types";
import React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/footer";
import Loader from "../components/loading";
import * as Constants from "../constants";
import Logo from "../images/logo.png";
import { clearTokens } from "../sales_login/action";
import { otpVerify, resendOtp, verifyLogin } from "./action";

class projectManagerLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      submitted: false,
      isLoginSuccess: false,
      isReadyToRedirect: false,
      emailError: "",
      isLoading: false,
      showOtpModal: false,
      otpSubmitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.verifyLogin(username, password);
      this.setState({
        isLoading: true,
      });
    }
  }

  componentDidMount() {
    console.log(
      "before clearing session storage ------>" +
        window.sessionStorage.getItem(Constants.PROJECT_MANAGER_ACCESS_TOKEN)
    );
    if (
      window.sessionStorage.getItem(Constants.PROJECT_MANAGER_ACCESS_TOKEN) !==
        undefined &&
      window.sessionStorage.getItem(Constants.PROJECT_MANAGER_ACCESS_TOKEN) !=
        null
    ) {
      console.log(
        "Clear expired keys..." +
          window.sessionStorage.getItem(Constants.PROJECT_MANAGER_ACCESS_TOKEN)
      );
      this.props.clearTokens(
        window.sessionStorage.getItem(Constants.PROJECT_MANAGER_ACCESS_TOKEN)
      );
    }
    window.sessionStorage.clear();
    console.log(
      "after clearing session storage ------>" +
        window.sessionStorage.getItem(Constants.PROJECT_MANAGER_ACCESS_TOKEN)
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isLoginSuccess !== prevProps.isLoginSuccess) {
      if (this.state.submitted && this.props.isLoginSuccess.success) {
        window.sessionStorage.setItem(
          Constants.PROJECT_MANAGER_ACCESS_TOKEN,
          this.props.isLoginSuccess.accessToken
        );
        this.setState({ isLoading: false, isReadyToRedirect: true });
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
        this.setState({ isReadyToRedirect: false, isLoading: false });
      }
      this.setState({ submitted: false });
    }

    if (this.props.isOtpSuccess !== prevProps.isOtpSuccess) {
      if (this.props.isOtpSuccess.success) {
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
  }

  handleClose = () => {
    this.setState({
      showOtpModal: false,
    });
  };

  resendotp = () => {
    console.log("testing");
    if (this.state.username) {
      this.props.resendOtps(this.state.username);
    }
  };

  otpVer = () => {
    this.setState({
      otpSubmitted: true,
    });
    if (this.state.otp) {
      if (this.state.otp.length == 6) {
        this.props.otpVerify({
          otp: this.state.otp,
          email: this.state.username,
        });
      }
    }
  };
  render() {
    if (this.state.isReadyToRedirect)
      return <Redirect to="/yetToInitiatePlan" />;
    const { username, password, submitted, otp, otpSubmitted } = this.state;
    return (
      <div className="projectManagerContainer" style={{ paddingLeft: "0px" }}>
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
            <main className="main-content ">
              {this.state.isLoading ? (
                <Loader />
              ) : (
                <div id="mainContent">
                  <div className="container-fluid">
                    <div className="row-md-5">
                      <div className="col-md-4 p-40">
                        <div className="card bgc-white p-40 bd logincontent">
                          <h5 className="text-center font-weight-bold">
                            {" "}
                            Project Manager Login
                          </h5>
                          <div className="mT-30">
                            <form name="form" onSubmit={this.handleSubmit}>
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Email Address
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="username"
                                  value={username}
                                  onChange={this.handleChanges}
                                />
                                {submitted && !username && (
                                  <div style={{ fontSize: 12, color: "red" }}>
                                    Email is required
                                  </div>
                                )}
                                {this.state.emailError !== "" &&
                                  submitted &&
                                  username && (
                                    <div style={{ fontSize: 12, color: "red" }}>
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
                                  value={password}
                                  onChange={this.handleChange}
                                />
                                {submitted && !password && (
                                  <div
                                    className="help-block"
                                    style={{ fontSize: 12, color: "red" }}
                                  >
                                    Password is required
                                  </div>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={this.handleSubmit}
                                className="btn btn-primary btn-color-admin"
                              >
                                Submit
                              </button>
                              <br />
                              <br />
                              <Link to="/forgotpassword?page=pmlogin">
                                Forgot My Password
                              </Link>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3"></div>
                    </div>
                  </div>
                </div>
              )}
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
              />
              {otpSubmitted && !otp && (
                <div style={{ fontSize: 12, color: "red" }}>
                  This field is required
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="col-md-12" style={{ alignItems: "center" }}>
              <div className="row">
                <div className="col-md-5">
                  <button
                    type="button"
                    onClick={(e) => this.otpVer()}
                    className="buttons"
                    style={{ width: "100%" }}
                  >
                    SUBMIT
                  </button>
                </div>
                <div className="col-md-1" />
                <div className="col-md-5">
                  <button
                    type="button"
                    onClick={(e) => this.resendotp()}
                    className="buttons"
                    style={{ width: "100%" }}
                  >
                    RESEND OTP
                  </button>
                </div>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
projectManagerLogin.propTypes = {
  verifyLogin: PropTypes.func,
  clearTokens: PropTypes.func,
  otpVerify: PropTypes.func,
  resendOtps: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    isLoginSuccess: state.projectManagerLoginreducer.isLoginSuccess,
    doClearTokens: state.salesAdminLoginReducer.doClearTokens,
    // isOtpSuccess:state.adminloginreducer.isOtpSuccess,
    // resendOtpSuccess:state.adminloginreducer.resendOtpSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  verifyLogin: (username, password) =>
    dispatch(verifyLogin(username, password)),
  clearTokens: (token) => dispatch(clearTokens(token)),
  otpVerify: (otp) => dispatch(otpVerify(otp)),
  resendOtps: (email) => dispatch(resendOtp(email)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(projectManagerLogin);
