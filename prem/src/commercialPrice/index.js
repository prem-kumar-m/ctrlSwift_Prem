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
import { addPrice, requestAllPrice, requestChangeVariablePrice } from "./action";
import "./user.css";

class CommercialPrice extends Component {
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
        model: "",
      },
      users: [],
      hideshow: true,
      selectedRole: "",
      variablepriceMode:"EDIT",
      variablepricedisable:true,
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
  variablePriceChange=(event)=>{
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

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

  handleSelectPlanChange = (selectedOption) => {
    console.log("selectedOption -->" + selectedOption.label + " : ");
    this.setState({ plan: selectedOption.label });
  };

  handleSelectModelChange = (selectedOption) => {
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
    const { plan, price, mode, model } = this.state;

    if (plan && price) {
      this.props.submitAddPrice(plan, price, mode, model);
    }
  }

  componentDidMount() {
    console.log(
      "Add User Screen Componeent Did Mount........" + this.state.submitted
    );
    this.props.requestAllPrice();
    console.log("called this.props.requestAllTax ()");
    this.setState({ mode: "add" });
  }

  editRow = (Price, userkey) => {
    console.log(
      "editrow-----" +
        userkey +
        " and " +
        JSON.stringify(Price.model) +
        "\n" +
        JSON.stringify(Price)
    );
    this.setState({
      plan: Price.plan,
      price: Price.price,
      model: Price.model,
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
      } else if (res.dismiss === "cancel") {
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
    if(this.props.Price!== prevProps.Price){
      if (this.props.Price.success) {
      this.setState({
        variablePrice:this.props.Price.variableTicketCost,
     })
    }
    }

    if(this.props.variablePriceChnage!== prevProps.variablePriceChnage){
      if (this.props.variablePriceChnage.success) {
        this.setState({
          variablepriceMode:"EDIT",
          variablepricedisable:true,
        })
        Swal.fire({
          title: "Success",
          text: "Variable Price updated",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });

    }
    }


    if (this.props.isSuccess !== prevProps.isSuccess) {
      //console.log('there is a change in props........' + prevProps.isSuccess + ' and ' + this.props.isSuccess);
      console.log("delete --->" + this.state.goForDelete);
      console.log("success success --->" + this.props.isSuccess.success);
      if (this.state.submitted && this.props.isSuccess.success) {

        if (this.state.mode !== undefined && this.state.mode === "edit") {
          Swal.fire({
            title: "Success",
            text: " Price Updated Successfully",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Success",
            text: "Add Price success",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        }
        //console.log('Add User success');
        this.props.history.push("/commercialprice");

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
      this.setState({ submitted: false, goForDelete: false });
      // this.setState({goForDelete: false});
    }
  }

  variablePriceMode=()=>{
    if(this.state.variablepriceMode ==="EDIT"){
      this.setState({
        variablepriceMode:"UPDATE",
        variablepricedisable:false,
      })
    }else if(this.state.variablepriceMode === "UPDATE"){
      this.props.changeVariablePrice(this.state.variablePrice);

    }
  }

  render() {
    if (this.state.isReadyToRedirect) return <Redirect to="/user" />;
    const {
      employeeId,
      name,
      mobile,
      variablePrice,
      model,
      submitted,
      selectedRole,
      plan,
      price,
    } = this.state;
    const roleMasterPlan = [
      { label: "Lite", value: "Lite" },
      { label: "Enterprise", value: "Enterprise" },
      { label: "Premium", value: "Premium" },
    ];

    const roleMasterModel = [
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
                selected="commercialprice"
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
                        <h4 className="c-grey-900 col-md-6">
                          Variable price
                        </h4>
                      </div>
                      <div className="mT-5">
                          <div className="form-row">

                            <div className={"form-group col-md-4"}>
                              <input
                                type="number"
                                ref={(input) => (this.mobile = input)}
                                className="form-control"
                                id="exampleInputMobile"
                                name="variablePrice"
                                minLength="1"
                                disabled={this.state.variablepricedisable}
                                maxlength="10"
                                value={variablePrice}
                                onChange={this.variablePriceChange}

                              />

                              {submitted && !price && (
                                <div style={{ fontSize: 12, color: "red" }}>
                                  {" "}
                                  Price is required
                                </div>
                              )}
                            </div>

                            <div className="col-md-5" />
                            <div className="peer col-md-2">

                                <button
                                  type="number"
                                  id="cs-admin-visiable"
                                  onClick={()=>this.variablePriceMode()}
                                  className="btn btn-primary"
                                >
                                {this.state.variablepriceMode}
                                </button>

                            </div>
                            <div className="col-md-5" />
                          </div>

                        </div>
                      <div className="row">
                        <h4 className="c-grey-900 col-md-6">
                          Commercial Price
                        </h4>
                      </div>

                      <div className="mT-5">
                        <form name="form" onSubmit={this.handleSubmit}>
                          <div className="form-row">
                            <div className={"form-group col-md-4"}>
                              <label htmlFor="exampleInputName">Plan</label>
                              <Select
                                //  components={{ DropdownIndicator: () => null,
                                //     IndicatorSeparator: () => null,
                                //     Menu: () => null, }}
                                onChange={this.handleSelectPlanChange}
                                isSearchable={true}
                                options={roleMasterPlan}
                                value={{ label: plan, value: plan }}
                                name={"plan"}
                                id="cs-admin-plan"
                              />

                              {submitted && !plan && (
                                <div style={{ fontSize: 12, color: "red" }}>
                                  Plan is required
                                </div>
                              )}
                            </div>
                            <div className={"form-group col-md-4"}>
                              <label htmlFor="exampleInputName">Model</label>
                              <Select
                                //  components={{ DropdownIndicator: () => null,
                                //     IndicatorSeparator: () => null,
                                //     Menu: () => null, }}
                                onChange={this.handleSelectModelChange}
                                isSearchable={true}
                                options={roleMasterModel}
                                value={{ label: model, value: model }}
                                name={"model"}
                                id="cs-admin-model"
                              />

                              {submitted && !plan && (
                                <div style={{ fontSize: 12, color: "red" }}>
                                  Plan is required
                                </div>
                              )}
                            </div>
                            <div className={"form-group col-md-4"}>
                              <label htmlFor="exampleInputMobile">
                                Price Value
                              </label>
                              <input
                                type="number"
                                ref={(input) => (this.mobile = input)}
                                className="form-control"
                                id="exampleInputMobile"
                                name="price"
                                minLength="1"
                                maxlength="10"
                                value={price}
                                onChange={this.changeMobile}
                                onInput={this.maxLengthCheck}
                              />

                              {submitted && !price && (
                                <div style={{ fontSize: 12, color: "red" }}>
                                  {" "}
                                  Price is required
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
                      <h4 className="c-grey-900 mB-20"> Commercial List</h4>

                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">S.no</th>
                            <th scope="col">Plan</th>
                            <th scope="col">Model</th>
                            <th scope="col">Price($)</th>
                            <th scope="col">Edit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.Price &&
                            this.props.Price.commercialList.length > 0 &&
                            this.props.Price.commercialList.map((Price, userkey) => (
                              <tr key={userkey}>
                                <td>{Price.serialNumber}</td>
                                <td>{Price.plan}</td>
                                <td>{Price.model}</td>
                                <td>{Price.price}</td>
                                <td>
                                  <button
                                    type="button"
                                    id="cs-admin-edit"
                                    className="btn cur-p btn-primary"
                                    onClick={() => this.editRow(Price, userkey)}
                                  >
                                    <i className="c-white-500 ti-pencil" />
                                  </button>
                                </td>
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
CommercialPrice.propTypes = {
  requestAllPrice: PropTypes.func,
  //Taxs: PropTypes.array,
  submitAddPrice: PropTypes.func,
  // reqdeleteTaxs:PropTypes.func,
  // user: PropTypes.array,
};

const mapStateToProps = (state) => {
  //console.debug(state, 'state');
  return {
    Price: state.priceReducer.Price,
    isSuccess: state.priceReducer.isSuccess,
    variablePriceChnage: state.priceReducer.variablePriceChnage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestAllPrice: (state) => dispatch(requestAllPrice(state)),
  submitAddPrice: (plan, price, mode, model) =>
    dispatch(addPrice(plan, price, mode, model)),
    changeVariablePrice: variablePrice => dispatch(requestChangeVariablePrice(variablePrice)),
  // reqdeleteTaxs: country =>dispatch(reqdeleteTaxs(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommercialPrice);
