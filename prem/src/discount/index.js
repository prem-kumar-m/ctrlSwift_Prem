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
import Sidemenu from "../components/sidemenu1";
import { emailValidator, mobileValidator, nameValidator } from "../Core/utils";
import { addDiscount, requestAllDiscount } from "./action";
import "./user.css";


class Discount extends Component {
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
        subscription: "",
        discount: "",
      },
      users: [],
      hideshow: true,
      selectedRole: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  // Change = (event) => {
  //     const {name, value} = event.target;
  //     this.setState({
  //         [name]: value
  //     });
  //     const re = /^[A-Za-z_ ]+$/;

  //     if (!re.test(value)) {

  //         this.setState({
  //             nameError : "Invalid name.",
  //         });}
  //     else{
  //         this.setState({
  //             nameError : "",
  //         });
  //     }

  // };

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
    const { subscription, discount, mode } = this.state;

    if (subscription && discount) {
      this.props.submitAddDiscount(subscription, discount, mode);
    }
  }

  componentDidMount() {
    console.log(
      "Add User Screen Componeent Did Mount........" + this.state.submitted
    );
    this.props.requestAllDiscount();
    console.log("called this.props.requestAllTax ()");
    this.setState({ mode: "add" });
  }

  editRow = (Discount, userkey) => {
    console.log("editrow-----" + userkey + " and " + JSON.stringify(Discount));
    this.setState({
      subscription: Discount.subscription,
      discount: Discount.discount,
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
            text: " Discount Updated Successfully",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Success",
            text: "Add Discount success",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        }
        //console.log('Add User success');
        this.props.history.push("/discount");
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
      subscription,
      discount,
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
      <div className="page-container" style={{ paddingLeft: "0px" }}>
        <Header1 navigate={(url) => this.navigate("/admin")} />
        <main className="main-content bgc-grey-100">
          <div id="mainContent">
            <div className="row">
              <Sidemenu
                navigate={(url) => this.navigate(url)}
                selected="discount"
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
                        <h4 className="c-grey-900 col-md-6">Discount</h4>
                      </div>
                      <div className="mT-5">
                        <form name="form" onSubmit={this.handleSubmit}>
                          <div className="form-row">
                            <div className={"form-group col-md-6"}>
                              <label htmlFor="exampleInputName">
                                Subscription Period
                              </label>
                              <Select
                              id="cs-admin-subscription"
                                onChange={this.handleSelectChange}
                                components={{
                                  DropdownIndicator: () => null,
                                  IndicatorSeparator: () => null,
                                  Menu: () => null,
                                }}
                                isSearchable={true}
                                options={roleMaster}
                                value={{
                                  label: subscription,
                                  value: subscription,
                                }}
                                name={"subscription"}
                              />

                              {submitted && !subscription && (
                                <div style={{ fontSize: 12, color: "red" }}>
                                  subscription is required
                                </div>
                              )}
                            </div>
                            <div className={"form-group col-md-6"}>
                              <label htmlFor="exampleInputMobile">
                                Discount %
                              </label>
                              <input
                                type="number"
                                ref={(input) => (this.mobile = input)}
                                className="form-control"
                                id="exampleInputMobile"
                                name="discount"
                                minLength="1"
                                maxlength="10"
                                value={discount}
                                onChange={this.changeMobile}
                                onInput={this.maxLengthCheck}
                              />

                              {submitted && !discount && (
                                <div style={{ fontSize: 12, color: "red" }}>
                                  {" "}
                                  % is required
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
                      <h4 className="c-grey-900 mB-20"> Discount List</h4>

                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">S.no</th>
                            <th scope="col">Subscription Period</th>
                            <th scope="col">Discount</th>
                            <th scope="col" />
                            <th scope="col" />
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.Discount &&
                            this.props.Discount.length > 0 &&
                            this.props.Discount.map((Discount, userkey) => (
                              <tr key={userkey}>
                                <td>{Discount.serialNumber}</td>
                                <td>{Discount.subscription}</td>
                                <td>{Discount.discount}%</td>
                                <td>
                                  <button
                                    type="button"
                                    id="cs-admin-edit"
                                    className="btn cur-p btn-primary"
                                    onClick={() =>
                                      this.editRow(Discount, userkey)
                                    }
                                  >
                                    <i className="c-white-500 ti-pencil" />
                                  </button>
                                </td>
                                {/*}  <td>
                                                                <button type="button" className="btn cur-p btn-danger"
                                                                        onClick={() => this.deleteRow(Taxs) }><i
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
        <Footer />
      </div>
    );
  }
}
Discount.propTypes = {
  requestAllDiscount: PropTypes.func,
  // Taxs: PropTypes.array,
  submitAddDiscount: PropTypes.func,
  // reqdeleteTaxs:PropTypes.func,
  // user: PropTypes.array,
};

const mapStateToProps = (state) => {
  //console.debug(state, 'state');
  return {
    Discount: state.discountReducer.Discount,
    isSuccess: state.discountReducer.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestAllDiscount: (state) => dispatch(requestAllDiscount(state)),
  submitAddDiscount: (subscription, discount, mode) =>
    dispatch(addDiscount(subscription, discount, mode)),
  // reqdeleteTaxs: country =>dispatch(reqdeleteTaxs(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Discount);
