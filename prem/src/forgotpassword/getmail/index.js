import { PropTypes } from "prop-types";
import queryString from "query-string";
import React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Swal from "sweetalert2";
import Footer from "../../components/footer";
import Logo from "../../images/logo.png";
import { verifyEmail } from "./action";

class forgotpassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      page: "",
      emailError: "",
      submitted: false,
      isVerifySuccess: false,
      isReadyToRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });

    const re = /\S+@[A-Za-z]+\.com/;
    const ks = /\S+@[A-Za-z]+\.co.in/;
    if (this.state.email.length === 0) {
      this.setState({
        emailError: " Email is required",
      });
    } else if (!re.test(this.state.email) && !ks.test(this.state.email)) {
      this.setState({
        emailError: "Invalid email",
      });
    } else {
      this.setState({
        emailError: "",
      });
      const { email, emailError } = this.state;

      if (email) {
        this.props.verifyEmail(email);
      }
    }
  }

  componentDidMount() {
    let url = this.props.location.search;
    let params = queryString.parse(url);
    this.setState({ page: params.page, setpassword: params.setpassword });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
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
        this.setState({ isReadyToRedirect: true });
      } else if (this.state.submitted && !this.props.isVerifySuccess.success) {
        console.log(this.props.isVerifySuccess);
        Swal.fire({
          title: "Note",
          text: this.props.isVerifySuccess,
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
  }

  render() {
    if (this.state.isReadyToRedirect)
      return (
        <Redirect
          to={
            "/forgotOtp?email=" + this.state.email + "&page=" + this.state.page
          }
        />
      );

    const { email, submitted } = this.state;
    return (
      <div className=" logincontainer" style={{ paddingLeft: "0px" }}>
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
                    <div className="col-md-4 p-40">
                      <div className="card bgc-white p-40 bd logincontent">
                        {this.state.setpassword == "yes" ? (
                          <h5 className="text-center">Set Password</h5>
                        ) : (
                          <h5 className="text-center">Forgot Password</h5>
                        )}
                        <div className="mT-30">
                          <form name="form" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Email address
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                              />
                              {submitted && !email && (
                                <div style={{ fontSize: 12, color: "red" }}>
                                  Email is required
                                </div>
                              )}
                              {this.state.emailError !== "" &&
                                submitted &&
                                email && (
                                  <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.emailError}
                                  </div>
                                )}
                            </div>
                            <button
                              type="button"
                              onClick={this.handleSubmit}
                              className="btn btn-primary"
                            >
                              Submit
                            </button>
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
      </div>
    );
  }
}
forgotpassword.propTypes = {
  verifyLogin: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    isVerifySuccess: state.getmailReducer.isVerifySuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  verifyEmail: (email) => dispatch(verifyEmail(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(forgotpassword);
