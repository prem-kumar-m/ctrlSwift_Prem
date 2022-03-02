import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { connect } from "react-redux";
import Select from "react-select";
import Swal from "sweetalert2";
import Footer from "../components/footer";
import Header1 from "../components/header1";
import Sidemenu from "../components/sidemenu1";
import {
  reqdeleteNoticePeriod, requestAllPlanNoticePeriod,
  submitAddNoticePeriod
} from "./action";
import "./user.css";


class noticePeriod extends Component {
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
        modelName: "",
        noticePeriodDays: "",
        change: true,
      },
      users: [],
      hideshow: true,
      selectedRole: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectChange = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({
      modelName: selectedOption.label,
      selectedRole: selectedOption.label,
    });
  };



  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { modelName, noticePeriodDays, mode, id } = this.state;
    console.log(modelName + "\n" + noticePeriodDays + "\n" + mode + id);
    console.log(modelName && noticePeriodDays >= 0);
    if (modelName && noticePeriodDays >= 0 && noticePeriodDays < 366) {
      this.props.submitAddNoticePeriod(modelName, noticePeriodDays, mode, id);
    }
  }

  componentDidMount() {
    console.log(
      "Add User Screen Componeent Did Mount........" + this.state.submitted
    );
    this.props.requestAllPlanNoticePeriod();
    console.log("called this.props.requestAllTax ()");
    this.setState({ mode: "add" });
  }

  editRow = (noticePeriodList, userkey) => {
    console.log(
      "editrow-----" + userkey + " and " + JSON.stringify(noticePeriodList)
    );
    this.setState({
      modelName: noticePeriodList.model,
      noticePeriodDays: noticePeriodList.noOfDays,
      mode: "edit",
      id: noticePeriodList.id,
    });
    console.log("states selectedRole---------" + this.state.selectedRole);
  };
  deleteRow = (noticePeriodList) => {
    //console.log(user);
    Swal.fire({
      title: "Confirm to Delete",
      text: "Do you want to delete " + noticePeriodList.model,
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
        this.deletenoticePeriodList(noticePeriodList);
      } else if (res.dismiss === "cancel") {
        console.log("cancel");
      }
    });
  };

  deletenoticePeriodList = (noticePeriodList) => {
    this.setState({ goForDelete: true });
    console.log(
      "noticePeriodList.country \n" + JSON.stringify(noticePeriodList)
    );
    this.props.reqdeleteNoticePeriod(noticePeriodList);
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
      role: "",
    });
  }

  changeMobile = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
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
    console.log(
      "this.state.modelName" +
        this.state.modelName +
        "this.state.noticePeriodDays" +
        this.state.noticePeriodDays
    );
    if (this.props.isSuccess !== prevProps.isSuccess) {
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
          }).then((res) => {
            if (res.value) {
              window.location.reload();
            }
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
          }).then((res) => {
            if (res.value) {
              window.location.reload();
            }
          });
        }
        //console.log('Add User success');
        //this.props.history.push('/serviceTax');
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
        }).then((res) => {
          if (res.value) {
            window.location.reload();
          }
        });
      }
      this.setState({ submitted: false });
      this.setState({ goForDelete: false });
    }
  }

  render() {
    // if (this.state.isReadyToRedirect) return <Redirect to='/user'/>;
    const { submitted, modelName, noticePeriodDays } = this.state;

    const roleMaster = [
      { label: "PPU", value: "PPU" },
      { label: "Shared", value: "Shared" },
      { label: "Dedicated", value: "Dedicated" },
    ];

    return (
      <div className="page-container" style={{ paddingLeft: "0px" }}>
        <Header1 navigate={(url) => this.navigate("/admin")} />
        <main className="main-content bgc-grey-100">
          <div id="mainContent">
            <div className="row">
              <Sidemenu
                navigate={(url) => this.navigate(url)}
                selected="noticePeriod"
              />
              <div className="col-md-9">
                <button type="button" className="btn btn-primary btn-color-admin" id="back">
                  <a href="/user">
                    <font color="white">Back</font>
                  </a>
                </button>

                <div className="row pt-2">
                  <div className="col-md-12">
                    <div
                      className="bgc-white p-20"
                      style={{ paddingBottom: "0px" }}
                    >
                      <div className="row">
                        <h4 className="c-grey-900 col-md-6">Notice period</h4>
                      </div>
                      <div className="mT-5">
                        <form name="form" onSubmit={this.handleSubmit}>
                          <div className="form-row">
                            <div className={"form-group col-md-6"}>
                              <label htmlFor="exampleInputName">
                                Model name
                              </label>
                              <Select
                                onChange={this.handleSelectChange}
                                isSearchable={true}
                                options={roleMaster}
                                value={{ label: modelName, value: modelName }}
                                name={"modelName"}
                                id="cs-admin-modelName"
                              />

                              {submitted && !modelName && (
                                <div style={{ fontSize: 12, color: "red" }}>
                                  Name is required
                                </div>
                              )}
                            </div>
                            <div className={"form-group col-md-6"}>
                              <label htmlFor="exampleInputMobile">
                                No of notice period days
                              </label>
                              <input
                                type="number"
                                ref={(input) => (this.mobile = input)}
                                className="form-control"
                                id="exampleInputMobile"
                                name="noticePeriodDays"
                                value={noticePeriodDays}
                                onChange={this.changeMobile}
                              />
                              {submitted &&
                                !noticePeriodDays &&
                                noticePeriodDays < 0 && (
                                  <div style={{ fontSize: 12, color: "red" }}>
                                    % is required
                                  </div>
                                )}
                              {submitted &&
                                noticePeriodDays < 0 &&
                                noticePeriodDays && (
                                  <div style={{ fontSize: 12, color: "red" }}>
                                    Days must be greater than or equal to 0
                                  </div>
                                )}
                              {submitted &&
                                noticePeriodDays > 366 &&
                                noticePeriodDays && (
                                  <div style={{ fontSize: 12, color: "red" }}>
                                    Days must be less than or equal to 365
                                  </div>
                                )}
                            </div>

                            <div className="col-md-5" />
                            <div className="peer col-md-2">
                              <button
                                type="ADD"
                                id="cs-admin-update"
                                onClick={this.handleSubmit}
                                className="btn btn-primary btn-color-admin admin-logout-header-btn"
                              >
                                Add/Update
                              </button>
                            </div>
                            <div className="col-md-5" />
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="bgc-white bd bdrs-3 p-20">
                      <h4 className="c-grey-900 mB-20">Notice period list</h4>
                      <div
                        className="scroll"
                        style={{ height: 500, width: "100%" }}
                      >
                        <table
                          className="table table-hover"
                          style={{ textAlign: "left" }}
                        >
                          <thead>
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Model</th>
                              <th scope="col">No Of Days</th>
                              <th scope="col">Edit</th>
                              <th scope="col">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.noticePeriodList &&
                              this.props.noticePeriodList.length > 0 &&
                              this.props.noticePeriodList.map(
                                (noticePeriodList, userkey) => (
                                  <tr key={userkey}>
                                    <td>{userkey + 1}</td>
                                    <td>{noticePeriodList.model}</td>
                                    <td>{noticePeriodList.noOfDays}</td>
                                    <td>
                                      <button
                                        type="button"
                                        id="cs-admin-edit"
                                        className="btn cur-p btn-primary"
                                        onClick={() =>
                                          this.editRow(
                                            noticePeriodList,
                                            userkey
                                          )
                                        }
                                      >
                                        <i className="c-white-500 ti-pencil" />
                                      </button>
                                    </td>
                                    <td>
                                      <button
                                        id="cs-admin-delete"
                                        type="button"
                                        className="btn cur-p btn-danger"
                                        onClick={() =>
                                          this.deleteRow(noticePeriodList)
                                        }
                                      >
                                        <i className="c-white-500 ti-trash" />
                                      </button>
                                    </td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>{" "}
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

noticePeriod.propTypes = {
  requestAllTax: PropTypes.func,
  noticePeriodList: PropTypes.array,
  submitAddTaxs: PropTypes.func,
  reqdeleteTaxs: PropTypes.func,
  user: PropTypes.array,
};

const mapStateToProps = (state) => {
  //console.debug(state, 'state');
  return {
    noticePeriodList: state.noticePeriodReducer.noticePeriodList,
    isSuccess: state.noticePeriodReducer.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestAllPlanNoticePeriod: (state) =>
    dispatch(requestAllPlanNoticePeriod(state)),
  submitAddNoticePeriod: (modelName, noticePeriodDays, mode, id) =>
    dispatch(submitAddNoticePeriod(modelName, noticePeriodDays, mode, id)),
  reqdeleteNoticePeriod: (country) => dispatch(reqdeleteNoticePeriod(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(noticePeriod);
