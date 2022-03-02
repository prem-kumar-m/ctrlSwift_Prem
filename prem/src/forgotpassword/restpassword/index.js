import { PropTypes } from "prop-types";
import queryString from "query-string";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Footer from "../../components/footer";
import Logo from "../../images/nac_logoo.png";
import { newPassword } from "./action";

class resetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newpassword: "",
      newpasswordError: "",
      confirmpassword: "",
      confirmpasswordError: "",
      submitted: false,
      isnewPasswordSuccess: false,
    };
    this.handleChangeNew = this.handleChangeNew.bind(this);
    this.handleChangeConfirm = this.handleChangeConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
          "Password should be atleast (8-12) digits with  alphabets,  numbers and one special character",
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

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const {
      email,
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
      this.props.submitnewPassword(email, newpassword);
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
  }

  componentDidMount() {
    let url = this.props.location.search;
    let params = queryString.parse(url);
    this.setState({ email: params.email });
    this.setState({ page: params.page });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isnewPasswordSuccess !== prevProps.isnewPasswordSuccess) {
      if (this.state.submitted && this.props.isnewPasswordSuccess.success) {
        Swal.fire({
          title: "",
          text: "Your password was set successfully!",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.props.history.push("/" + this.state.page);
        /*.then((res) => {
            if(res.value){
              this.props.history.push('/'+ this.state.page);
            }else if(res.dismiss == 'cancel'){
                console.log('cancel');
            }
        }) */
      } else if (
        this.state.submitted &&
        !this.props.isnewPasswordSuccess.success
      ) {
        Swal.fire({
          title: "",
          text: "Your Password length exceeds, Please check!",
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

  render() {
    const { newpassword, confirmpassword, submitted } = this.state;
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
                    <div className="col-md-8"></div>
                    <div className="col-md-4 p-40">
                      <div className="card bgc-white p-40 bd signupcontent">
                        <h5 className="text-center">Set Password</h5>
                        <div className="mT-30">
                          <form name="form" onSubmit={this.handleSubmit}>
                            <div
                              className={
                                "form-group" +
                                (submitted && !newpassword ? " has-error" : "")
                              }
                            >
                              <div className="row">
                                <div className="col-md-12">
                                  <label
                                    htmlFor="exampleInputPassword1"
                                    className="font-weight-bold"
                                  >
                                    New Password :
                                  </label>
                                </div>

                                <div className="col-md-12">
                                  <input
                                    type="password"
                                    align="middle"
                                    className="form-control "
                                    name="newpassword"
                                    value={newpassword}
                                    onChange={this.handleChangeNew}
                                  />
                                  {submitted && !newpassword && (
                                    <div
                                      className="help-block"
                                      style={{ fontSize: 12, color: "red" }}
                                    >
                                      New Password Is Required
                                    </div>
                                  )}
                                  {this.state.newpasswordError !== "" &&
                                    newpassword &&
                                    submitted && (
                                      <div
                                        className="help-block "
                                        style={{ fontSize: 12, color: "red" }}
                                      >
                                        {this.state.newpasswordError}
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                            <div
                              className={
                                "form-group" +
                                (submitted && !confirmpassword
                                  ? " has-error"
                                  : "")
                              }
                            >
                              <div className="row">
                                <div className="col-md-12">
                                  <label
                                    htmlFor="exampleInputPassword1"
                                    className="font-weight-bold"
                                  >
                                    Confirm Password :
                                  </label>
                                </div>

                                <div className="col-md-12">
                                  <input
                                    type="password"
                                    className="form-control"
                                    name="confirmpassword"
                                    value={confirmpassword}
                                    onChange={this.handleChangeConfirm}
                                  />
                                  {submitted && !confirmpassword && (
                                    <div
                                      className="help-block"
                                      style={{ fontSize: 12, color: "red" }}
                                    >
                                      Confirm Password Is Required
                                    </div>
                                  )}
                                  {this.state.confirmpasswordError !== "" &&
                                    confirmpassword &&
                                    submitted && (
                                      <div
                                        className="help-block "
                                        style={{ fontSize: 12, color: "red" }}
                                      >
                                        {this.state.confirmpasswordError}
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                            <div className="text-center ">
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={this.handleSubmit}
                              >
                                SET
                              </button>
                            </div>{" "}
                          </form>
                        </div>
                      </div>
                    </div>
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
resetPassword.propTypes = {
  newPassword: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    isnewPasswordSuccess: state.resetReducer.isnewPasswordSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  submitnewPassword: (email, newpassword) =>
    dispatch(newPassword(email, newpassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(resetPassword);
