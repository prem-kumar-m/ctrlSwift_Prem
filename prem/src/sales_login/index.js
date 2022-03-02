import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/footer";
import * as Constants from "../constants";
import Logo from "../images/logo.png";
import { clearTokens, verifyCredential } from "./action";

class salesadminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      submitted: false,
      isLoginSuccess: false,
      isReadyToRedirect: false,
      emailError: "",
      doClearTokens: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
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
    const { email, password } = this.state;
    if (email && password) {
      this.props.verifyCredential(email, password);
      //this.props.history.push('/request');
    }
  }

  componentDidMount() {
    console.log(
      "before clearing session storage ------>" +
        window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN)
    );
    if (
      window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN) !==
        undefined &&
      window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN) != null
    ) {
      console.log(
        "Clear expired keys..." +
          window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN)
      );
      this.props.clearTokens(
        window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN)
      );
    }
    window.sessionStorage.clear();
    console.log(
      "after clearing session storage ------>" +
        window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN)
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isLoginSuccess !== prevProps.isLoginSuccess) {
      if (this.state.submitted && this.props.isLoginSuccess.success) {
        window.sessionStorage.setItem(
          Constants.SALES_ACCESS_TOKEN,
          this.props.isLoginSuccess.accessToken
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
  }

  render() {
    if (this.state.isReadyToRedirect) return <Redirect to="/request" />;
    const { email, password, submitted } = this.state;
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
                  <div className="row ">
                    <div className="col-md-4 p-40">
                      <div className="card bgc-white p-40 bd logincontent">
                        <h5 className="text-center">Sales Admin</h5>

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
                                onChange={this.handleChanges}
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
                              className="btn btn-primary"
                            >
                              Submit
                            </button>
                            <br />
                            <br />
                            <Link to="/forgotpassword?page=sales">
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

salesadminLogin.propTypes = {
  verifyCredential: PropTypes.func,
  clearTokens: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    isLoginSuccess: state.salesAdminLoginReducer.isLoginSuccess,
    doClearTokens: state.salesAdminLoginReducer.doClearTokens,
  };
};

const mapDispatchToProps = (dispatch) => ({
  verifyCredential: (email, password) =>
    dispatch(verifyCredential(email, password)),
  clearTokens: (token) => dispatch(clearTokens(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(salesadminLogin);
