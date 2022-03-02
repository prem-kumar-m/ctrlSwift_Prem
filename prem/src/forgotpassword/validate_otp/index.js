import { PropTypes } from "prop-types";
import queryString from "query-string";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Footer from "../../components/footer";
import Logo from "../../images/logo.png";
import { forgotOtp, resendOtp } from "./action";

class VerifyOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      otp: "",
      page: "",
      submitted: false,
      isValidatdOtpSuccess: false,
      resendOtpSuccess: false,
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

  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, otp } = this.state;
    if (otp && otp.length === 6) {
      this.props.submitverifyValidateOtp(email, otp);
      //this.props.history.push('/resetPassword?page='+ this.state.page)
    }
  }

  componentDidMount() {
    let url = this.props.location.search;
    let params = queryString.parse(url);
    this.setState({ email: params.email });
    this.setState({ page: params.page });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.resendOtpSuccess !== prevProps.resendOtpSuccess) {
      if (this.state.submitted && this.props.resendOtpSuccess.success) {
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
      this.setState({ submitted: false });
    }

    if (this.props.isValidatdOtpSuccess !== prevProps.isValidatdOtpSuccess) {
      if (this.state.submitted && this.props.isValidatdOtpSuccess.success) {
        this.props.history.push(
          "/resetPassword?email=" +
            this.state.email +
            "&page=" +
            this.state.page
        );
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
      this.setState({ submitted: false });
    }
  }
  resendChange = () => {
    this.setState({ submitted: true });
    if (this.state.email) {
      this.props.clickResendOtp(this.state.email);
    }
  };

  render() {
    const { otp, submitted } = this.state;
    return (
      <div className="logincontainer" style={{ paddingLeft: "0px" }}>
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
                      alt="CtrlSwift Logo"
                      className="admin_logo_width"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <main className="main-content">
              <div id="mainContent">
                <div className="container-fluid">
                  <div className="row ">
                    <div className="col-md-8 "></div>
                    <div className="col-md-4 p-40">
                      <div className="card bgc-white p-40 bd otpcontent">

                        <h6 className="text-left font-weight-bold">
                          Sent on your Mobile/Email ID
                        </h6>
                        <div className="mT-30">
                          <form name="form" onSubmit={this.handleSubmit}>
                            <div
                              className={
                                "form-group text-center" +
                                (submitted && !otp ? " has-error" : "")
                              }
                            >
                               <h5
                          className="text-left font-weight-bold"
                          style={{
                            fontSize: "20px",
                          }}
                        >
                          Please enter the OTP
                        </h5>
                              <input
                                type="number"
                                align="middle"
                                className="form-control text-center"
                                name="otp"
                                value={otp}
                                maxLength={6}
                                minLength={6}
                                onInput={this.maxLengthCheck}
                                onChange={this.handleChange}
                              />
                              {submitted && !otp && (
                                <div
                                  style={{ fontSize: 12, color: "red" }}
                                  className="nav-left"
                                >
                                  OTP is required
                                </div>
                              )}
                              {submitted && otp.length !== 6 && otp && (
                                <div
                                  style={{ fontSize: 12, color: "red" }}
                                  className="nav-left"
                                >
                                  OTP is must be 6-digits
                                </div>
                              )}
                            </div>

                            <div>
                              <div className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-primary w-50"
                                  onClick={this.handleSubmit}
                                >
                                  VERIFY
                                </button>

                                <button
                                  onClick={this.resendChange}
                                  type="button"
                                  className="btn btn-link"
                                >
                                  <div style={{ fontSize: 27}}>
                                    <u>RESEND </u>
                                  </div>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
VerifyOTP.propTypes = {
  forgotOtp: PropTypes.func,
  resendOtp: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    isValidatdOtpSuccess: state.forgotOtpReducer.isValidatdOtpSuccess,
    resendOtpSuccess: state.forgotOtpReducer.resendOtpSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  submitverifyValidateOtp: (email, otp) => dispatch(forgotOtp(email, otp)),
  clickResendOtp: (email) => dispatch(resendOtp(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOTP);
