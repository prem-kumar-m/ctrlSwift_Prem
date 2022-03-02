import { PropTypes } from "prop-types";
// import * as Actions from './action';
import queryString from "query-string";
import React from "react";
import { Button, Container } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-email/style.css";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Swal from "sweetalert2";
import Footer from "../components/footer/Footer.js";
import Header from "../components/header/Header";
//import { Formik } from "formik";
import HeaderLogin from "../components/header_login/HeaderLogin";
import * as Constants from "../constants";
import {
  emailValidator, firstNameValidator,
  lastNameValidator, mobileValidator
} from "../Core/utils";
import {
  dataCustomizePage2, getPriceByTerms, getPriceDetails,
  requestInr
} from "./action";


class customizePage2 extends React.Component {
  constructor(props) {
    super();

    this.state = {
      submitted: false,
      terms: "",
      estimationValueRequestList: "",
      data: "",
      estimationValue: "",
      currency: "$",
      recommendedPrice: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    console.log("name===>" + name + "----------------value=>" + value);
    this.setState({
      [name]: value,
    });
  };
  termsHandleChange = (row, rowkey, event) => {
    this.setState({ currency: "$" });
    const data = this.state.estimationValueRequestList;
    console.log(
      "row===>\n" +
        JSON.stringify(row) +
        "----------------rowkey=>\n" +
        rowkey +
        "--------opt --------->\n" +
        JSON.stringify(event)
    );

    console.log("data[" + rowkey + "]\n" + JSON.stringify(data[rowkey]));
    if (data[rowkey].paymentTerms === "Yearly") {
      data[rowkey].paymentTerms = "Monthly";
    } else if (data[rowkey].paymentTerms === "Monthly") {
      data[rowkey].paymentTerms = "Yearly";
    }
    console.log("data\n" + JSON.stringify(data));
    this.props.getPriceByTerms(data);
  };
  currencyHandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

    if (value === "₹" && !!this.state.data) {
      const planRequestList = this.state.data.map((row) => {
        return {
          plan: row.plan,
          commercialModel: row.commercialModel,
          individualPrice: row.individualPlanPrice,
        };
      });
      const data = {
        currencyCode: "INR",
        individualPlanRequestList: planRequestList,
      };
      console.log("data \n" + JSON.stringify(data));
      this.props.requestInr(data);
    } else if (value === "$") {
      const planRequestList = this.state.data.map((row) => {
        return {
          plan: row.plan,
          commercialModel: row.commercialModel,
          individualPrice: row.individualPlanPrice,
        };
      });
      const data = {
        currencyCode: "USD",
        individualPlanRequestList: planRequestList,
      };
      console.log("data \n" + JSON.stringify(data));
      this.props.requestInr(data);
    }
  };

  navigate = (url) => {
    this.props.history.push(url);
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
    const {
      firstName,
      lastName,
      city,
      country,
      address,
      pincode,
      department,
      companyName,
      workMail,
      mobile,
    } = this.state;

    const emailError = emailValidator(this.state.workMail);
    const mobileError = mobileValidator(this.state.mobile);

    const firstNameError = firstNameValidator(this.state.firstName);
    const lastNameError = lastNameValidator(this.state.lastName);

    if (emailError || firstNameError || lastNameError || mobileError)
      this.setState({
        emailError: emailError,
        firstNameError: firstNameError,
        lastNameError: lastNameError,
        mobileError: mobileError,
        value: 0,
        value1: 0,
        value2: 0,
      });

    this.setState({ submitted: true });

    if (
      firstName &&
      lastName &&
      mobile &&
      address &&
      workMail &&
      country &&
      city &&
      department &&
      companyName &&
      pincode &&
      emailError == "" &&
      firstNameError === "" &&
      lastNameError === "" &&
      mobileError === ""
    ) {
      this.props.history.push("/RegisterOtp");
    }
  }

  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  viewDmsa = () => {
    if (!!window.sessionStorage.getItem(Constants.ACCESS_EMAIL)) {
      this.state.recommendedPrice.isOrderSummary = true;
      this.props.getPriceDetails(this.state.recommendedPrice);


    } else {
      Swal.fire({
        title: "",
        text: "Please login before proceeding",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };
  componentDidMount() {
    console.log(
      "window.sessionStorage.getItem(Constants.ACCESS_EMAIL)\n" +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL)
    );
    console.log(
      "this.props.recommendedPrice \n" +
        JSON.stringify(this.props.recommendedPrice)
    );
    let url = this.props.location.search;
    let params = queryString.parse(url);
    console.log(params);
    this.setState({
      terms: params.terms,
    });
    this.state.recommendedPrice = JSON.parse(
      localStorage.getItem("modifiedDetails")
    );
    this.props.getPriceDetails(this.state.recommendedPrice);
  }



  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("this.state.currency \n" + JSON.stringify(this.state.currency));
    console.log("this.state.currency \n" + JSON.stringify(this.state.data));

    console.log("pricedetails \n" + JSON.stringify(this.props.currencyInr));

    console.log(
      "this.props.pricedetails \n" + JSON.stringify(this.props.pricedetails)
    );
    if (this.props.pricedetails !== prevProps.pricedetails) {
      if (this.props.pricedetails.success === false) {
        Swal.fire({
          title: "",
          text: " Plan expire date was not fit to do your plan upgrade or degrade!",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            this.props.history.push("/customizePage2");
          }
        });

      }
      if (this.props.pricedetails.success) {
        if(this.state.recommendedPrice.isOrderSummary === false){
        const data = this.props.pricedetails.updatePlanRequestList.map(
          (row, rowkey) => {
            return {
              plan: row.plan,
              commercialModel: row.commercialModel,
              individualPlanPrice: row.individualPlanPrice,
            };
          }
        );

        this.setState({
          data: this.props.pricedetails.updatePlanRequestList,
          estimationValue: this.props.pricedetails.estimationValue,
          taxPercentage:this.props.pricedetails.taxPercentage,
          taxAmount:this.props.pricedetails.taxAmount,
          finalAmountPlusTax:this.props.pricedetails.finalAmountPlusTax,
          currency:this.props.pricedetails.currencyCode==="USD"?"$":"₹",
         // currency:"INR"==="USD"?"$":"₹",
        });
      }else {
        console.log("testing role");
        Swal.fire({
          title: "success",
          text: "Your request has been submitted successfully",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            this.props.history.push("/editProfile");
          }
        });

      }}
    }
    console.log(
      "this.props.pricedetails \n" + JSON.stringify(this.props.priceByTerms)
    );
    if (this.props.priceByTerms !== prevProps.priceByTerms) {
      if (this.props.priceByTerms.success) {
        const data = this.props.priceByTerms.updatePlanRequestList.map(
          (row, rowkey) => {
            return {
              plan: row.plan,
              commercialModel: row.commercialModel,
              individualPlanPrice: row.individualPlanPrice,
              //"paymentTerms":this.state.estimationValueRequestList[rowkey].paymentTerms,
            };
          }
        );
        this.setState({
          data: this.props.pricedetails.updatePlanRequestList,
          estimationValue: this.props.priceByTerms.estimationValue,
        });
      }
    }

    if (this.props.currencyInr !== prevProps.currencyInr) {
      if (this.props.currencyInr.success) {
        console.log(
          "this.props.currencyInr.individualPlanPricingList \n" +
            JSON.stringify(this.props.currencyInr.individualPlanPricingList)
        );
        console.log("this.state.data \n" + JSON.stringify(this.state.data));
        const data = this.props.currencyInr.individualPlanPricingList.map(
          (row, rowkey) => {
            return {
              plan: row.plan,
              commercialModel: row.commercialModel,
              individualPlanPrice: row.individualPlanPrice,
              paymentTerms:
                this.state.estimationValueRequestList[rowkey].paymentTerms,
            };
          }
        );

        this.setState({
          data: data,
          estimationValue: this.props.currencyInr.estimationValue,
        });
      }
    }
    //this.setState({submitted : false});
  }

  render() {
    if (this.state.isReadyToRedirect) return <Redirect to="/user" />;
    const { currency } = this.state;
    console.log(JSON.stringify(this.state.data));
    return (
      <div>
        {!window.sessionStorage.getItem(Constants.ACCESS_EMAIL) ? (
          <Header />
        ) : (
          <HeaderLogin />
        )}

        <div className="view">
          <section className="generic-banner relative banner-area-inner5">
            <div className="overlay overlay-bg overlay-bg-blk"></div>
            <div className="container">
              <div className="row height align-items-center justify-content-center">
                <div className="col-lg-10">
                  <div className="generic-banner-content">
                    <h2 className="head2-inner">
                      Higher First Call Resolution Capabilities!
                    </h2>
                    <p className="text-white" style={{ opacity: 0.5 }}>
                      {" "}
                      Centralized instances of SOPs and KEDBS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <br></br>
        <br></br>

        <Container
          style={{
            alignItems: "center",
            // width: "1250px"
          }}
        >
          <div className="row col-md-12">
            <div className="col-md-1" />
            <div className="col-md-10">
              <br />
              <div style={{ textAlign: "center" }}>
                <h2>Order Summary</h2>
              </div>
              <br />
              <table className="table table-hover">
                <thead className="thead-light">
                  <tr>
                    <th
                      className="head"
                      scope="col"
                      style={{ fontSize: 14, fontFamily: "Poppins" }}
                    >
                      Plan Name
                    </th>
                    <th
                      className="head"
                      scope="col"
                      style={{ fontSize: 14, fontFamily: "Poppins" }}
                    >
                      Model Name
                    </th>
                     <th
                      className="head"
                      scope="col"
                      style={{ fontSize: 14, fontFamily: "Poppins" }}
                    >
                      Plan Status
                    </th>
                    <th
                      className="head"
                      scope="col"
                      style={{ fontSize: 14, fontFamily: "Poppins" }}
                    >
                      Payment Terms
                    </th>
                    <th
                      className="head"
                      scope="col"
                      style={{ fontSize: 14, fontFamily: "Poppins" }}
                    >
                      Plan Price (
                      <span style={{ fontFamily: "Open Sans" }}>
                        {currency}
                      </span>
                      )
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data &&
                    this.state.data.length > 0 &&
                    this.state.data.map((row, rowkey) => (
                      <tr key={rowkey}>
                        <td>{row.plan}</td>
                        <td>{row.model}</td>
                        <td>{row.planStatus}</td>
                        <td>
                          {row.paymentTerms}
                        </td>

                        <td>
                        {row.paymentTerms == "Yearly" ? (
                            <tr>
                              {" "}
                              <td style={{ textAlign: "left" }}>
                                Price
                                <span style={{ fontSize: 10 }}>/Year</span>
                              </td>
                              <td>:</td>
                              <td>{row.totalPricePerYear}</td>
                            </tr>
                          ) :null}
                          {row.paymentTerms == "Yearly" ? (
                            <tr>
                              {" "}
                              <td style={{ textAlign: "left" }}>
                                <tr>Price</tr>
                              </td>
                              <td>:</td>
                              <td>{row.totalAmountForYearlyPaymentDiffInDays}</td>
                            </tr>
                          ) : (
                            <tr>
                              <td style={{ textAlign: "left" }}>
                                Price
                                <span style={{ fontSize: 10 }}>/Month</span>
                              </td>
                              <td>:</td>
                              <td>
                                {row.amountPayableForEveryMonth}
                              </td>
                            </tr>
                          )}
  {row.paymentTerms == "Yearly" ? null :(<tr>  <td style={{ textAlign: "left" }}>
                              Amount
                              </td>
                              <td>:</td>
                              <td>
                                {row.newPlanFirstPayingAmount}
                              </td>
                              <td>
                                <Link
                                  data-tip
                                  data-for={"registerTip" + rowkey}
                                >
                                  <i className="c-blue-900 ti-info-alt"></i>
                                </Link>
                                <ReactTooltip
                                  id={"registerTip" + rowkey}
                                  place="right"
                                  effect="solid"
                                >
                                  <div style={{ textAlign: "left", fontSize: 11 }}>
                                 {row.serviceInitializationDate?"Effective From -"+row.serviceInitializationDate:null}
                                  </div>
                                  <div style={{ textAlign: "left", fontSize: 11 }}>
                                 {row.newPlanFirstPayingAmount?"Amount Billing Duration - From "+row.newPlanBillingPriceDate:null}
                                  </div>
                                  <div style={{ textAlign: "left" }}>
                                    Amount for {row.days} days= {row.newPlanFirstPayingAmount}.
                                  </div>
                                </ReactTooltip>
                                <div className="col-md-1" />{" "}
                              </td>
                           </tr>)}
                          {row.paymentTerms == "Yearly" ? (
                            <tr>
                              <td style={{ textAlign: "left" }}>
                                {row.newPlanDiscountPercentage}% Discount
                              </td>
                              <td>:</td>
                              <td>- {row.newPlanDiscountAmount} </td>
                            </tr>
                          ) : null}
                          {row.paymentTerms == "Yearly" ? (
                            <tr>
                              <td style={{ textAlign: "left" }}>Amount</td>
                              <td>:</td>
                              <td>{row.newPlanFirstPayingAmount} </td>
                              <td>
                                <Link
                                  data-tip
                                  data-for={"registerTip" + rowkey}
                                >
                                  <i className="c-blue-900 ti-info-alt"></i>
                                </Link>
                                <ReactTooltip
                                  id={"registerTip" + rowkey}
                                  place="right"
                                  effect="solid"
                                >
                                  <div style={{ textAlign: "left"}}>
                                {row.serviceInitializationDate?"Effective From -"+row.serviceInitializationDate:null}
                                 </div>
                                 <div style={{ textAlign: "left"}}>
                                {row.startAndEndDateOfNewPlan?"Amount Calculated From "+row.startAndEndDateOfNewPlan:null}
                                 </div>
                                  <div style={{ textAlign: "left" }}>
                                   Price Amount for {row.days} days = {row.totalAmountForYearlyPaymentDiffInDays}.
                                  </div>
                                  <div style={{ textAlign: "left" }}>
                                  {row.newPlanDiscountPercentage}% Discount of {row.totalAmountForYearlyPaymentDiffInDays} = {row.newPlanDiscountAmount}.
                                  </div>
                                  <br/>
                                  <div style={{ textAlign: "left" }}>
                                    Amount for {row.days} days = {row.totalAmountForYearlyPaymentDiffInDays} - {row.newPlanDiscountAmount}= {row.newPlanFirstPayingAmount}.
                                  </div>
                                </ReactTooltip>
                                <div className="col-md-1" />{" "}
                              </td>
                            </tr>
                          ) : (
                            null
                          )}
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <br /> <br />
          {!window.sessionStorage.getItem(Constants.ACCESS_EMAIL) ? null : (
            <div className="row col-md-12">
              <div className="col-md-3" />

              <div
                className="col-md-3"
                style={{
                  fontSize: 14,
                  marginright: -20,
                  fontFamily: "Poppins",
                }}
              >
                Tax({this.state.taxPercentage}%)
              </div>
              <div className="col-md-1">:</div>
              <div className="col-md-2">
                <input
                  type="text"
                  style={{ fontFamily: "Open Sans" }}
                  className="form-control"
                  name="estimationValue"
                  disabled="true"
                  value={this.state.taxAmount + " " + currency}
                />
              </div>
            </div>
          )}
          <br />
          <div className="row col-md-12">
            <div className="col-md-3" />
            <div
              className="col-md-3"
              style={{ fontSize: 14, marginright: -20, fontFamily: "Poppins" }}
            >
              Total Amount Payable
            </div>
            <div className="col-md-1">:</div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                name="estimationValue"
                disabled="true"
                value={this.state.finalAmountPlusTax}
              />
              {!window.sessionStorage.getItem(Constants.ACCESS_EMAIL) ? (
                <div>(+ Tax Applicable) </div>
              ) : null}
            </div>
            <div className="col-md-2">
              <select
                type="dropdown"
                disabled="true"
                className="form-control"
                name="currency"
                style={{ fontFamily: "Open Sans" }}
                value={this.state.currency}
                placeholder="select"
                onChange={this.currencyHandleChange}
              >
                <option value="$" select>
                  USD($)
                </option>
                <option value="₹">INR(₹)</option>
              </select>{" "}
            </div>
            <i className="fas fa-lightbulb"></i>
          </div>
          <br /> <br />
          {window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID) !==
          "undefined" ? (
            <div className="row col-md-12">
              <div className="col-md-5" />

              <div className="col-md-2 ">
                <Button
                  className="genric-btn  text-uppercase cs-bt-color"
                  onClick={this.viewDmsa}
                >
                  Confirm
                </Button>
              </div>

              <div className="col-md-5" />
            </div>
          ) : (
            <div className="row col-md-12">
              <div className="col-md-4" />

              <div className="col-md-6">
                <text style={{ fontWeight: "bold" }}>
                  Administrator Access is need for the Further process
                </text>
              </div>

              <div className="col-md-2" />
            </div>
          )}
          <br /> <br />
        </Container>

        <Footer />
      </div>
    );
  }
}
customizePage2.propTypes = {
  submitAddFeedback: PropTypes.func,
  recommendedPrice: PropTypes.func,
  pricedetails: PropTypes.func,
  currencyInr: PropTypes.func,
  priceByTerms: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    pricedetails: state.orderChangeReducer.pricedetails,
    recommendedPrice: state.customizePageReducer.recommendedPrice,
    currencyInr: state.priceDetailsReducer.currencyInr,
    priceByTerms: state.priceDetailsReducer.priceByTerms,
    dataCustomizePage: state.priceDetailsReducer.dataCustomizePage,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getPriceDetails: (data) => dispatch(getPriceDetails(data)),
  getPriceByTerms: (data) => dispatch(getPriceByTerms(data)),
  requestInr: (data) => dispatch(requestInr(data)),
  dataCustomizePage2: (data) => dispatch(dataCustomizePage2(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(customizePage2);
