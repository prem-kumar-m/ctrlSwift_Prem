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
import SidemenuAdmin from "../components/sidemenu1";
import { emailValidator, mobileValidator, nameValidator } from "../Core/utils";
import { addRate, requestAllRate } from "./action";
import "./user.css";


class ExchangeValue extends Component {
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
        currencyCode: "",
        exchangeRate: "",
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
    const { currencyCode, exchangeRate, mode } = this.state;

    if (currencyCode && exchangeRate) {
      this.props.submitAddRate(currencyCode, exchangeRate, mode);
    }
  }

  componentDidMount() {
    console.log(
      "Add User Screen Componeent Did Mount........" + this.state.submitted
    );
    this.props.requestAllRate();
    console.log("called this.props.requestAllTax ()");
    this.setState({ mode: "add" });
  }

  editRow = (Rate, userkey) => {
    console.log("editrow-----" + userkey + " and " + JSON.stringify(Rate));
    this.setState({
      currencyCode: Rate.currencyCode,
      exchangeRate: Rate.exchangeRate,
      mode: "edit",
    });
    window.scrollTo(0, 0);
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
    console.log("Taxs.country \n" + Taxs.country);
    this.props.reqdeleteTaxs(Taxs.country);
  };
  navigate = (url) => {
    this.props.history.push(url);
  };

  clearText() {
    {
      this.setState({
        employeeId: "",
        name: "",
        email: "",
        mobile: "",
        role: "",
      });
    }
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
      "this.state.currencyCode" +
        this.state.currencyCode +
        "this.state.exchangeRate" +
        this.state.exchangeRate
    );
    if (this.props.isSuccess !== prevProps.isSuccess) {
      //console.log('there is a change in props........' + prevProps.isSuccess + ' and ' + this.props.isSuccess);
      console.log("delete --->" + this.state.goForDelete);
      console.log("success success --->" + this.props.isSuccess.success);
      if (this.state.submitted && this.props.isSuccess.success) {
        if (this.state.mode !== undefined && this.state.mode === "edit") {
          Swal.fire({
            title: "Success",
            text: " Rate Updated Successfully",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Success",
            text: "Add Rate success",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        }
        //console.log('Add User success');
        this.props.history.push("/exchangevalue");
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
    const {
      employeeId,
      name,
      mobile,
      email,
      role,
      submitted,
      selectedRole,
      currencyCode,
      exchangeRate,
    } = this.state;
    const roleMaster = [
      { label: "India", value: "India" },
      { label: "US", value: "US" },
      { label: "China", value: "China" },
      { label: "Japan", value: "Japan" },
      { label: "Germany", value: "Germany" },
      { label: "UK", value: "UK" },
      { label: "France", value: "France" },
      { label: "Brazil", value: "Brazil" },
      { label: "Italy", value: "Italy" },
      { label: "Canada", value: "Canada" },
      { label: "Russia", value: "Russia" },
      { label: "Singapore", value: "Singapore" },
      { label: "New zealand", value: "New zealand" },
      { label: "Australia", value: "Australia" },
      { label: "Iraq", value: "Iraq" },
      { label: "SouthKorea", value: "SouthKorea" },
      { label: "Spain", value: "Spain" },
      { label: "Mexico", value: "Mexico" },
      { label: "Indonesia", value: "Indonesia" },
    ];

    return (
      <div className="container-fulid page-container" style={{ paddingLeft: "0px" }}>
        <Header1 navigate={(url) => this.navigate("/admin")} />
        <main className="main-content bgc-grey-100">
          <div id="mainContent">
            <div className="row">
              <SidemenuAdmin
                navigate={(url) => this.navigate(url)}
                selected="exchangeValue"
              />
              <div className="col-md-9">
                <button type="button" className="btn btn-primary btn-color-admin">
                  <a href="/user">
                    <font color="white">Back</font>
                  </a>
                </button>
                <div className="row mt-2">
                  <div className="col-md-12">
                    <div
                      className="bgc-white p-20"
                      style={{ paddingBottom: "0px" }}
                    >
                      <div className="row">
                        <h4 className="c-grey-900 col-md-6">Exchange Value</h4>
                      </div>
                      <div className="mT-5">
                        <form name="form" onSubmit={this.handleSubmit}>
                          <div className="form-row">
                            <div className={"form-group col-md-6"}>
                              <label htmlFor="exampleInputName">
                                Currency Code
                              </label>
                              <Select
                              id="cs-admin-currency"
                                components={{
                                  DropdownIndicator: () => null,
                                  IndicatorSeparator: () => null,
                                  Menu: () => null,
                                }}
                                onChange={this.handleSelectChange}
                                isSearchable={true}
                                value={{
                                  label: currencyCode,
                                  value: currencyCode,
                                }}
                                name={"currencyCode"}
                              />

                              {submitted && !currencyCode && (
                                <div style={{ fontSize: 12, color: "red" }}>
                                  Code is required
                                </div>
                              )}
                            </div>
                            <div className={"form-group col-md-6"}>
                              <label htmlFor="exampleInputMobile">
                                Exchange value
                              </label>
                              <input
                                type="number"

                                ref={(input) => (this.mobile = input)}
                                className="form-control"
                                id="exampleInputMobile"
                                name="exchangeRate"
                                minLength="1"
                                maxlength="10"
                                value={exchangeRate}
                                onChange={this.changeMobile}
                                onInput={this.maxLengthCheck}
                              />

                              {submitted && !exchangeRate && (
                                <div style={{ fontSize: 12, color: "red" }}>
                                  Rate is required
                                </div>
                              )}
                            </div>

                            <div className="col-md-5" />
                            <div className="peer col-md-2">
                              {this.state.mode == "edit" ? (
                                <button
                                id="cs-admin-update"
                                  type="ADD"
                                  onClick={this.handleSubmit}
                                  className="btn btn-primary"
                                >
                                  UPDATE
                                </button>
                              ) : (
                                <button
                                id="cs-admin-add"
                                  type="ADD"
                                  disabled={true}
                                  onClick={this.handleSubmit}
                                  className="btn btn-primary"
                                >
                                  UPDATE
                                </button>
                              )}
                            </div>
                            <div className="col-md-5" />
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="bgc-white bd bdrs-3 p-20">
                      <h4 className="c-grey-900 mB-20">Price List</h4>

                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Serial No</th>

                            <th scope="col">Currency Code</th>
                            <th scope="col">Exchange Rate</th>
                            <th scope="col" />
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.Rate &&
                            this.props.Rate.length > 0 &&
                            this.props.Rate.map((Rate, userkey) => (
                              <tr key={userkey}>
                                <td>{Rate.serialNumber}</td>

                                <td>{Rate.currencyCode}</td>
                                <td>{Rate.exchangeRate}</td>
                                <td>
                                  <button
                                    type="button"
                                    id="cs-admin-edit"
                                    className="btn cur-p btn-primary"
                                    onClick={() => this.editRow(Rate, userkey)}
                                  >
                                    <i className="c-white-500 ti-pencil" />
                                  </button>
                                </td>
                                {/*}  <td>
                                                                <button type="button" className="btn cur-p btn-danger"
                                                                        onClick={() => this.deleteRow(Rate) }><i
                                                                    className="c-white-500 ti-trash"/></button>
                                                    </td>*/}
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
    );
  }
}

ExchangeValue.propTypes = {
  requestAllRate: PropTypes.func,
  // Taxs: PropTypes.array,
  submitAddRate: PropTypes.func,
  // reqdeleteTaxs:PropTypes.func,
  // user: PropTypes.array,
};

const mapStateToProps = (state) => {
  //console.debug(state, 'state');
  return {
    Rate: state.exchangeRateReducer.Rate,
    isSuccess: state.exchangeRateReducer.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestAllRate: (state) => dispatch(requestAllRate(state)),
  submitAddRate: (currencyCode, exchangeRate, mode) =>
    dispatch(addRate(currencyCode, exchangeRate, mode)),
  // reqdeleteTaxs: country =>dispatch(reqdeleteTaxs(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeValue);
