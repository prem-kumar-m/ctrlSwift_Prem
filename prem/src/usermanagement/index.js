import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import { requestAllUsers, addUser, reqdeleteuser } from "./action";
import Header1 from "../components/header1";
import Footer from "../components/footer";
import Sidemenu from "../components/sidemenu";
import { Redirect } from "react-router";
import Select from "react-select";
import { emailValidator, mobileValidator, nameValidator } from "../Core/utils";
import Swal from "sweetalert2";
import Pagination from "../pagination/pagination";

import "./user.css";

class Users extends Component {
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
      },
      users: [],
      hideshow: true,
      selectedRole: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callbackFunction = (childData) => {
    if (this.props.users) {
      this.setState({ datalist1: childData });
    } else {
      this.setState({ datalist1: childData });
    }
  };

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
  changeMobile = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    var mobileno;
    if (isNaN(value)) {
      mobileno = true;
    } else {
      mobileno = false;
    }
    if (value.length < 10) {
      this.setState({
        mobileError: "Invalid mobile number",
      });
      console.log("changeing mobile" + this.state.mobileError);
    } else if (mobileno === true) {
      this.setState({
        mobileError: "Mobile numbers is not a number",
      });
    } else {
      this.setState({
        mobileError: "",
      });
      console.log("changeing mobile" + this.state.mobileError);
    }
  };

  Change = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const re = /^[A-Za-z_ ]+$/;

    if (!re.test(value)) {
      this.setState({
        nameError: "Invalid name.",
      });
    } else {
      this.setState({
        nameError: "",
      });
    }
  };

  handleSelectChange = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({
      role: selectedOption.label,
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

  handleSubmit(e) {
    e.preventDefault();
    const emailError = emailValidator(this.state.email);
    const mobileError = mobileValidator(this.state.mobile);
    const nameError = nameValidator(this.state.name);
    if (emailError || mobileError || nameError)
      this.setState({
        emailError: emailError,
        mobileError: mobileError,
        nameError: nameError,
      });

    this.setState({ submitted: true });
    const { name, mobile, email, role, employeeId } = this.state;
    console.log("---------------------------STATE-------------------\n");
    console.log(
      "\n employeeId----" +
      employeeId +
      "\n name----" +
      name +
      "\n mobile----" +
      mobile +
      "\n email----" +
      email +
      "\n role----" +
      role +
      "\n mobileError----" +
      mobileError +
      "\n nameError----" +
      nameError +
      "\n emailError----" +
      emailError +
      "\n MODE----" +
      this.state.mode
    );
    if (
      name &&
      mobile &&
      email &&
      role &&
      employeeId &&
      emailError == "" &&
      nameError === "" &&
      mobile.length === 10
    ) {
      this.props.submitAddUser(
        employeeId,
        name,
        mobile,
        email,
        role,
        this.state.mode
      );
    }
  }

  componentDidMount() {
    console.log(
      "Add User Screen Componeent Did Mount........" + this.state.submitted
    );
    this.props.requestAllUsers();
    console.log("called this.props.requestAllUsers ()");
    this.setState({ mode: "add" });
  }

  editRow = (user, userkey) => {
    console.log("editrow-----" + userkey + " and " + JSON.stringify(user));
    this.setState({
      selectedRole: user.role,
      name: user.name,
      employeeId: user.employeeId,
      role: user.role,
      mobile: user.mobile,
      email: user.email,
      mode: "edit",
    });
    this.setState({ hideshow: true }, () => {
      this.name.value = user.name;
      this.mobile.value = user.mobile;
      this.email.value = user.email;
      this.employeeId.value = user.employeeId;
      this.setState({ user });
      window.scrollTo(0, 0);
    });
    console.log("states selectedRole---------" + this.state.selectedRole);
  };
  deleteRow = (user) => {
    //console.log(user);
    Swal.fire({
      title: "Confirm to Delete",
      text: "Do you want to delete " + user.name,
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
        this.deleteUser(user);
      } else if (res.dismiss == "cancel") {
        console.log("cancel");
      }
    });
  };

  deleteUser = (user) => {
    this.setState({ goForDelete: true });
    this.props.reqdeleteuser(user.employeeId);
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
      selectedRole: "",
      mode: "",
    });
  }

  submitform = () => {
    const criteria = {
      employeeId: this.employeeId.value,
      name: this.name.value,
      mobile: this.mobile.value,
      email: this.email.value,
      role: this.role.value,
      mode: this.state.mode,
    };

    const users = _.cloneDeep(this.state.users);
    users.push(criteria);
    this.setState({ users }, () => {
      this.employeeId.value = "";
      this.name.value = "";
      this.mobile.value = "";
      this.email.value = "";
      this.role.value = "";
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    //console.log('component Did update');
    if (this.props.isSuccess !== prevProps.isSuccess) {
      this.props.requestAllUsers();
      this.clearText();
      //console.log('there is a change in props........' + prevProps.isSuccess + ' and ' + this.props.isSuccess);
      console.log("delete --->" + this.state.goForDelete);
      console.log("success success --->" + this.props.isSuccess.success);
      if (this.state.submitted && this.props.isSuccess.success) {
        if (this.state.mode !== undefined && this.state.mode === "edit") {
          Swal.fire({
            title: "Success",
            text: " User Updated Successfully",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Success",
            text: "Add User success",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        }
        //console.log('Add User success');
        this.props.history.push("/user");
        //this.setState({isReadyToRedirect : true});
        // window.location.reload();
      } else if (this.state.submitted && !this.props.isSuccess.success) {
        //console.log('Add User failure');
        Swal.fire({
          title: "",
          text: this.props.isSuccess.message,
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        //this.setState({isReadyToRedirect : false});
      } else if (this.state.goForDelete && this.props.isSuccess.success) {
        Swal.fire({
          title: "Deleted",
          text: this.props.isSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        // window.location.reload();
      }
      this.setState({ submitted: false });
      this.setState({ goForDelete: false });
    }
  }

  render() {
    if (this.state.isReadyToRedirect) return <Redirect to="/user" />;
    const { employeeId, name, mobile, email, role, submitted, selectedRole } =
      this.state;
    const roleMaster = [
      // {label: "SALES RESOURCE", value: 'SALES RESOURCE'},
      { label: "SALES ADVISOR", value: "SALES ADVISOR" },
      { label: "SALES ADMIN", value: "SALES ADMIN" },
      { label: "PROJECT MANAGER", value: "PROJECT MANAGER" },
    ];
    /*  let showroomOptions = [{label: "Loading Showrooms...", value: 1},];

        //console.log('In Index file Props is ---->' + JSON.stringify(this.props.showroomlist));
        console.log('fist ---' + (this.props.showroomlist !== undefined));

        if (this.props.showroomlist !== undefined && this.props.showroomlist !== null
        ) {
            showroomOptions = this.props.showroomlist.map(row => {
                //console.log('inside the loop ---->' + row.showroom);
                return {label: row.showroom, value: row.showroom}
            });
        }  */
    return (
      <div className="container-fulid page-container" style={{ paddingLeft: "0px" }}>
        <Header1 navigate={(url) => this.navigate("/admin")} />
        <main className="main-content bgc-grey-100">
          <div id="mainContent">
            <div className="row">
              <Sidemenu
                navigate={(url) => this.navigate(url)}
                selected="user"
              />
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-12">
                    <div
                      className="bgc-white p-20"
                      style={{ paddingBottom: "0px" }}
                    >
                      <div className="row">
                        <h4 className="c-grey-900 f700 col-md-6">Add/Edit User</h4>
                        <div className="col-md-6 text-right">
                          <button
                            className="btn-outline-primary font-weight-bold"
                            id="cs-admin-back"
                            style={{ border: "none" }}
                            onClick={() => {
                              this.setState({ hideshow: !this.state.hideshow });
                            }}
                          >

                            {this.state.hideshow ? (
                              <span>Hide{" "}
                                <i className="c-blue-500 ti-angle-right font-weight-bold" />
                              </span>
                            ) : (
                              <span>Show{" "}
                                <i className="c-blue-500 ti-angle-down font-weight-bold" />
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                      {this.state.hideshow ? (
                        <div className="mT-5">
                          <form name="form" onSubmit={this.handleSubmit}>
                            <div className="form-row">
                              <div
                                className={
                                  "form-group col-md-5" +
                                  (submitted && !employeeId ? " has-error" : "")
                                }
                              >
                                <label htmlFor="exampleEmployeeId">
                                  Employee Id
                                </label>
                                <input
                                  type="text"
                                  ref={(input) => (this.employeeId = input)}
                                  className="form-control"
                                  id="exampleEmployeeId"
                                  name="employeeId"
                                  value={employeeId}
                                  disabled={this.state.mode === "edit"}
                                  onChange={this.handleChange}
                                />
                                {submitted && !employeeId && (
                                  <div
                                    className="help-block"
                                    style={{ fontSize: 12, color: "red" }}
                                  >
                                    Employee Id is required
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="form-row">
                              <div
                                className={
                                  "form-group col-md-5" +
                                  (submitted && !name ? " has-error" : "")
                                }
                              >
                                <label htmlFor="exampleInputName">Name</label>
                                <input
                                  type="text"
                                  ref={(input) => (this.name = input)}
                                  required
                                  pattern="[0-9a-zA-Z_.-]*"
                                  className="form-control"
                                  id="exampleInputName"
                                  name="name"
                                  value={name}
                                  onChange={this.Change}
                                />

                                {submitted && !name && (
                                  <div style={{ fontSize: 12, color: "red" }}>
                                    Name is required
                                  </div>
                                )}

                                {submitted &&
                                  this.state.nameError !== "" &&
                                  name && (
                                    <div style={{ fontSize: 12, color: "red" }}>
                                      {this.state.nameError}
                                    </div>
                                  )}
                              </div>
                              <div
                                className={
                                  "form-group col-md-5" +
                                  (submitted && !mobile ? " has-error" : "")
                                }
                              >
                                <label htmlFor="exampleInputMobile">
                                  Mobile
                                </label>
                                <input
                                  type="number"
                                  ref={(input) => (this.mobile = input)}
                                  className="form-control"
                                  id="exampleInputMobile"
                                  name="mobile"
                                  minLength="10"
                                  maxlength="10"
                                  value={mobile}
                                  onChange={this.changeMobile}
                                  onInput={this.maxLengthCheck}
                                />

                                {submitted && !mobile && (
                                  <div style={{ fontSize: 12, color: "red" }}>
                                    Mobile is required
                                  </div>
                                )}
                                {this.state.mobileError !== "" &&
                                  submitted &&
                                  mobile && (
                                    <div style={{ fontSize: 12, color: "red" }}>
                                      {this.state.mobileError}
                                    </div>
                                  )}
                              </div>
                              <div className="form-group col-md-2"></div>
                              <div
                                className={
                                  "form-group col-md-5" +
                                  (submitted && !email ? " has-error" : "")
                                }
                              >
                                <label htmlFor="exampleInputEmail">
                                  Email address
                                </label>
                                <input
                                  type="email"
                                  ref={(input) => (this.email = input)}
                                  className="form-control"
                                  id="exampleInputEmail"
                                  name="email"
                                  value={email}
                                  disabled={this.state.mode === "edit"}
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
                              <div
                                className={
                                  "form-group col-md-5" +
                                  (submitted && !role ? " has-error" : "")
                                }
                              >
                                <label htmlFor="exampleInputRole">Role</label>
                                <Select
                                  onChange={this.handleSelectChange}
                                  isSearchable={true}
                                  options={roleMaster}
                                  value={{
                                    label: selectedRole,
                                    value: selectedRole,
                                  }}
                                  name={"role"}
                                />
                                {submitted && !role && (
                                  <div
                                    className="help-block"
                                    style={{ fontSize: 12, color: "red" }}
                                  >
                                    Role is required
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-md-2"></div>
                              <div className="peer col-md-2">
                                <button
                                  type="submit"
                                  onClick={this.handleSubmit}
                                  className="btn btn-primary btn-color-admin"
                                >
                                  Create
                                </button>
                              </div>
                              <div className="peer  col-md-1">
                                <button
                                  type="submit"
                                  onClick={() => this.clearText()}
                                  className="btn btn-outline-dark"
                                >
                                  Clear
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="bgc-white bd bdrs-3 p-20">
                      <h4 className="c-grey-900 mt-20">User List</h4>
                      <div
                        className="scroll"
                        style={{ width: "100%", height: 500 }}
                      >
                        <table
                          className="table table-hover"
                          style={{ textAlign: "left" }}
                        >
                          <thead className="table-primary  font-weight-bold">
                            <tr>
                              <th scope="col">Employee Id</th>
                              <th scope="col">Name</th>
                              <th scope="col">Mobile Number</th>
                              <th scope="col">Email</th>
                              <th scope="col">Role</th>
                              <th scope="col">Edit</th>
                              <th scope="col">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.datalist1 &&
                              this.state.datalist1.length > 0 &&
                              this.state.datalist1.map((user, userkey) => (
                                <tr key={userkey}>
                                  <th scope="row">{user.employeeId}</th>
                                  <td>{user.name}</td>
                                  <td>{user.mobile}</td>
                                  <td>{user.email}</td>
                                  <td>{user.role}</td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn cur-p btn-primary "
                                      id="cs-admin-edit"
                                      onClick={() =>
                                        this.editRow(user, userkey)
                                      }
                                    >
                                      <i className="c-white-500 ti-pencil" />
                                    </button>
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      id="cs-admin-delete"
                                      className="btn cur-p btn-danger"
                                      onClick={() => this.deleteRow(user)}
                                    >
                                      <i className="c-white-500 ti-trash" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        <div className="d-flex justify-content-center">
                          {this.props.users && (
                            /*<PaginationComponent customer={this.props.customer} />}*/
                            <Pagination
                              parentCallback={this.callbackFunction}
                              customer={this.props.users}
                            />
                          )}
                        </div>
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

Users.propTypes = {
  requestAllUsers: PropTypes.func,
  users: PropTypes.array,
  submitAddUser: PropTypes.func,
  reqdeleteuser: PropTypes.func,
  user: PropTypes.array,
};

const mapStateToProps = (state) => {
  //console.debug(state, 'state');
  return {
    users: state.usersReducer.users,
    isSuccess: state.usersReducer.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestAllUsers: (state) => dispatch(requestAllUsers(state)),
  submitAddUser: (employeeId, name, mobile, email, role, mode) =>
    dispatch(addUser(employeeId, name, mobile, email, role, mode)),
  reqdeleteuser: (employeeId) => dispatch(reqdeleteuser(employeeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
