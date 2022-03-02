import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { Button, Container, Modal, Row } from "react-bootstrap";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Swal from "sweetalert2";
import Footer from "../components/footer/Footer.js";
//import _ from 'lodash';
import Header from "../components/headerwaiveoff/Header";
import * as Constants from "../constants";
import { clearTokensCustomer, verifyCredentialCustomer } from "./action";

class waiveOff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordError: "",
      text: "",
      submitted: false,
      isLoginSuccess: false,
      isReadyToRedirect: false,
      emailError: "",
      showloginModal: "false",
      mode: "LOGIN",
      isVerifySuccess: false,
      isReadyToRedirect1: false,
      getmail: "",
      getmailError: "",
      page1: "",
      showmailModal: false,
      otp: "",
      resendOtpSuccess: false,
      isValidatdOtpSuccess: false,
      isnewPasswordSuccess: false,
      showpasswordModal: false,
      doClearTokens: "",
      local: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

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

  handlePasswordChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

    const re =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,12}$/;

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

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password, emailError, passwordError } = this.state;
    if (email && password && emailError === "" && passwordError === "") {
      this.props.verifyCredentialCustomer(email, password);
    }
    //this.props.history.push('/RegisterPage');
  }

  componentDidMount() {
    console.log(
      "session storage email id------>" +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL)
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
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isLoginSuccess !== prevProps.isLoginSuccess) {
      if (this.state.submitted && this.props.isLoginSuccess.success) {
        window.sessionStorage.setItem(
          Constants.ACCESS_EMAIL,
          this.props.isLoginSuccess.email
        );

        this.setState({ isReadyToRedirect: true });
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

    if (this.props.isVerifySuccess !== prevProps.isVerifySuccess) {
      if (this.state.submitted && this.props.isVerifySuccess.success) {
        Swal.fire({
          title: "Note",
          text: "OTP has been sent to your registered Email ID",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.setState({ isReadyToRedirect1: true });
      } else if (this.state.submitted && !this.props.isVerifySuccess.success) {
        Swal.fire({
          title: "Note",
          text: this.props.isVerifySuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.setState({ isReadyToRedirect1: false });
      }
      this.setState({ submitted2: false });
    }
  }

  handleClose = () => {
    this.setState({ showloginModal: false });
  };
  render() {
    if (this.state.isReadyToRedirect)
      return <Redirect to="/waiveoffinvoiceid" />;

    const { email, password, submitted } = this.state;

    return (
      <div>
        <Header />
        <div className="view">
          <section className="generic-banner relative banner-area-inner4">
            <div
              className="overlay overlay-bg overlay-bg-blk"
              style={{ backgroundColor: "black", opacity: 0.5 }}
            ></div>
          </section>
        </div>
        <Container>
          <Modal
            show={this.state.showloginModal}
            onHide={this.handleClose}
            backdrop={"static"}
          >
            <Modal.Header>
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

              <Row className="justify-content-md-center">
                <Button
                  className="genric-btn primary radius text-uppercase"
                  variant=" "
                  onClick={this.handleSubmit}
                  style={{ marginTop: 10 }}
                >
                  Login
                </Button>
              </Row>
            </Modal.Body>
          </Modal>
        </Container>
        <Footer />
      </div>
    );
  }
}

waiveOff.propTypes = {
  verifyCredentialCustomer: PropTypes.func,
  clearTokensCustomer: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isLoginSuccess: state.loginReducer.isLoginSuccess,
    doClearTokens: state.loginReducer.doClearTokens,
  };
};

const mapDispatchToProps = (dispatch) => ({
  verifyCredentialCustomer: (email, password) =>
    dispatch(verifyCredentialCustomer(email, password)),
  clearTokensCustomer: () => dispatch(clearTokensCustomer()),
});

connect(mapStateToProps, mapDispatchToProps)(waiveOff);

export default connect(mapStateToProps, mapDispatchToProps)(waiveOff);
