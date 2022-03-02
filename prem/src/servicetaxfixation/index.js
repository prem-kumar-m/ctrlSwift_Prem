import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Select from "react-select";
import Swal from "sweetalert2";
import Footer from "../components/footer";
import Header1 from "../components/header1";
import Sidemenu from "../components/sidemenu";
import { emailValidator, mobileValidator, nameValidator } from "../Core/utils";
import { addTaxs, reqdeleteTaxs, requestAllTax } from "./action";
import "./user.css";


class serviceTex extends Component {
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
        countryName: "",
        servicesTaxPercentage: "",
      },
      users: [],
      hideshow: true,
      selectedRole: "",
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

    if (value.length < 10) {
      this.setState({
        mobileError: "Invalid mobile number",
      });
      console.log("changeing mobile" + this.state.mobileError);
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
      countryName: selectedOption.label,
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
    const { countryName, servicesTaxPercentage, mode } = this.state;

    if (countryName && servicesTaxPercentage && servicesTaxPercentage < 100) {
      this.props.submitAddTaxs(countryName, servicesTaxPercentage, mode);
    }
  }

  componentDidMount() {
    console.log(
      "Add User Screen Componeent Did Mount........" + this.state.submitted
    );
    this.props.requestAllTax();
    console.log("called this.props.requestAllTax ()");
    this.setState({ mode: "add" });
  }

  editRow = (Taxs, userkey) => {
    console.log("editrow-----" + userkey + " and " + JSON.stringify(Taxs));
    this.setState({
      countryName: Taxs.country,
      servicesTaxPercentage: Taxs.serviceTax,
      mode: "edit",
    });
    console.log("states selectedRole---------" + this.state.selectedRole);
  };
  deleteRow = (Taxs) => {
    //console.log(user);
    Swal.fire({
      title: "Confirm to Delete",
      text: "Do you want to delete " + Taxs.country,
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
        this.deleteTaxs(Taxs);
      } else if (res.dismiss == "cancel") {
        console.log("cancel");
      }
    });
  };

  deleteTaxs = (Taxs) => {
    this.setState({ goForDelete: true });
    console.log("Taxs.country \n" + JSON.stringify(Taxs));
    this.props.reqdeleteTaxs({
      taxs: Taxs.country,
      serviceTax: Taxs.serviceTax,
    });
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

    // {
    //     this.setState({name: ''})
    // }
    // {
    //     this.setState({email: ''})
    // }
    // {
    //     this.setState({mobile: ''})
    // }
    // {
    //     this.setState({role: ''})
    // }
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
    console.log(
      "this.state.countryName" +
        this.state.countryName +
        "this.state.servicesTaxPercentage" +
        this.state.servicesTaxPercentage
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
        this.props.history.push("/serviceTax");
        //this.setState({isReadyToRedirect : true});
        window.location.reload();
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
        window.location.reload();
      }
      this.setState({ submitted: false });
      this.setState({ goForDelete: false });
    }
  }

  render() {
    if (this.state.isReadyToRedirect) return <Redirect to="/user" />;
    const { submitted, countryName, servicesTaxPercentage } = this.state;
    const roleMaster = [
      { label: "Australia", value: "Australia" },
      { label: "Brazil", value: "Brazil" },
      { label: "Canada", value: "Canada" },
      { label: "China", value: "China" },
      { label: "France", value: "France" },
      { label: "Germany", value: "Germany" },
      { label: "India", value: "India" },
      { label: "Indonesia", value: "Indonesia" },
      { label: "Italy", value: "Italy" },
      { label: "Iraq", value: "Iraq" },
      { label: "Japan", value: "Japan" },
      { label: "New zealand", value: "New zealand" },
      { label: "Mexico", value: "Mexico" },
      { label: "Russia", value: "Russia" },
      { label: "Singapore", value: "Singapore" },
      { label: "SouthKorea", value: "SouthKorea" },
      { label: "Spain", value: "Spain" },
      { label: "UK", value: "UK" },
      { label: "US,New York", value: "US,New York" },
      { label: "US,Los Angeles", value: "US,Los Angeles" },
      { label: "US,Chicago", value: "US,Chicago" },
      { label: "US,San francisco", value: "US,San francisco" },
      { label: "US,Washington", value: "US,Washington" },
      { label: "US,Dallas", value: "US,Dallas" },
      { label: "US,Houston", value: "US,Houston" },
      { label: "US,Boston", value: "US,Boston" },
      { label: "US,Philadelphia", value: "US,Philadelphia" },
      { label: "US,Atlanta", value: "US,Atlanta" },
      { label: "US,Phoenix", value: "US,Phoenix" },
      { label: "US,Columbus", value: "US,Columbus" },
      { label: "US,Oklahoma city", value: "US,Oklahoma city" },
      { label: "US,Des Moines", value: "US,Des Moines" },
      { label: "US,Salt lake city", value: "US,Salt lake city" },
    ];

    return (
      <div className="page-container" style={{ paddingLeft: "0px" }}>
        <Header1 navigate={(url) => this.navigate("/admin")} />
        <main className="main-content bgc-grey-100">
          <div id="mainContent">
            <div className="row">
              <Sidemenu
                navigate={(url) => this.navigate(url)}
                selected="serviceTax"
              />
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-12">
                    <div
                      className="bgc-white p-20"
                      style={{ paddingBottom: "0px" }}
                    >
                      <div className="row">
                        <h4 className="c-grey-900 f700 col-md-6">ServiceTax</h4>
                      </div>
                      <div className="mT-5">
                        <form name="form" onSubmit={this.handleSubmit}>
                          <div className="form-row">
                            <div className={"form-group col-md-6"}>
                              <label htmlFor="exampleInputName">
                                Country Name
                              </label>
                              <Select
                                onChange={this.handleSelectChange}
                                isSearchable={true}
                                id="cs-admin-stax-country"
                                options={roleMaster}
                                value={{
                                  label: countryName,
                                  value: countryName,
                                }}
                                name={"countryName"}
                              />

                              {submitted && !countryName && (
                                <div style={{ fontSize: 12, color: "red" }}>
                                  Name is required
                                </div>
                              )}
                            </div>
                            <div className={"form-group col-md-6"}>
                              <label htmlFor="exampleInputMobile">
                                Enter service Tax %
                              </label>
                              <input
                                type="number"
                                ref={(input) => (this.mobile = input)}
                                className="form-control"
                                id="exampleInputMobile"
                                name="servicesTaxPercentage"
                                minLength="1"
                                maxlength="3"
                                value={servicesTaxPercentage}
                                onChange={this.changeMobile}
                                onInput={this.maxLengthCheck}
                              />

                              {submitted && !servicesTaxPercentage && (
                                <div style={{ fontSize: 12, color: "red" }}>
                                  % is required
                                </div>
                              )}
                              {submitted &&
                                servicesTaxPercentage &&
                                servicesTaxPercentage > 100 && (
                                  <div style={{ fontSize: 12, color: "red" }}>
                                    % should be less than 100
                                  </div>
                                )}
                            </div>

                            <div className="col-md-5" />
                            <div className="peer col-md-2">
                              <button
                                type="ADD"
                                id="cs-admin-add"
                                onClick={this.handleSubmit}
                                className="btn btn-primary btn-color-admin"
                              >
                                Add
                              </button>
                            </div>
                            <div className="col-md-5" />
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="bgc-white bd bdrs-3 p-20">
                      <h4 className="c-grey-900 f700 mB-20">User List</h4>
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
                              <th scope="col">S.no</th>
                              <th scope="col">Country</th>
                              <th scope="col">Service Tax</th>
                              <th scope="col">Edit</th>
                              <th scope="col">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.Taxs &&
                              this.props.Taxs.length > 0 &&
                              this.props.Taxs.map((Taxs, userkey) => (
                                <tr key={userkey}>
                                  <td>{Taxs.serialNumber}</td>
                                  <td>{Taxs.country}</td>
                                  <td>{Taxs.serviceTax}%</td>
                                  <td>
                                    <button
                                      type="button"
                                      id="cs-admin-edit"
                                      className="btn cur-p btn-primary"
                                      onClick={() =>
                                        this.editRow(Taxs, userkey)
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
                                      onClick={() => this.deleteRow(Taxs)}
                                    >
                                      <i className="c-white-500 ti-trash" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
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

serviceTex.propTypes = {
  requestAllTax: PropTypes.func,
  Taxs: PropTypes.array,
  submitAddTaxs: PropTypes.func,
  reqdeleteTaxs: PropTypes.func,
  user: PropTypes.array,
};

const mapStateToProps = (state) => {
  //console.debug(state, 'state');
  return {
    Taxs: state.serviceTaxReducer.Taxs,
    isSuccess: state.serviceTaxReducer.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestAllTax: (state) => dispatch(requestAllTax(state)),
  submitAddTaxs: (countryName, servicesTaxPercentage, mode) =>
    dispatch(addTaxs(countryName, servicesTaxPercentage, mode)),
  reqdeleteTaxs: (country) => dispatch(reqdeleteTaxs(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(serviceTex);
