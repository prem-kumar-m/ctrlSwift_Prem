import { event } from "jquery";
import { PropTypes } from "prop-types";
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
import HeaderLogin from "../components/header_login/HeaderLogin";
import Loader from "../components/loading";
import * as Constants from "../constants";
import {
  dataCustomizePage2, getPriceByTerms, getPriceDetails, insertPlan, requestInr
} from "./action";

class customizePage2 extends React.Component {
  constructor(props) {
    super();

    this.state = {
      submitted: false,
      terms: "",
      estimationValueRequestList: "",
      data: "",
      dataUSD: "",
      estimationValue: "",
      currency: "$",
      recommendedPrice: "",
      dataCustomizePage1: "",
      showplanModal: "false",
      isLoading: false,
      //   currencyCode:window.sessionStorage.getItem(Constants.CURRENCY_CODE),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    // console.log("name===>" + name + "----------------value=>" + value)
    this.setState({
      [name]: value,
    });
  };

  termsHandleChange = (row, rowkey, event) => {
    this.setState({ currency: "$" });
    const data = this.state.estimationValueRequestList;
    // console.log(JSON.stringify(this.state.estimationValueRequestList.estimationValueRequestList[rowkey].paymentTerms));
    // console.log("row===>\n" + JSON.stringify(row) + "----------------rowkey=>\n" + rowkey + "--------opt --------->\n" + JSON.stringify(event))

    // console.log("data[" + rowkey + "]\n" + JSON.stringify(data.estimationValueRequestList[rowkey]));
    if (data.estimationValueRequestList[rowkey].paymentTerms === "Yearly") {
      // console.log('1')
      data.estimationValueRequestList[rowkey].paymentTerms = "Monthly";
    } else if (
      data.estimationValueRequestList[rowkey].paymentTerms === "Monthly"
    ) {
      // console.log('2')
      data.estimationValueRequestList[rowkey].paymentTerms = "Yearly";
    }
    // console.log("data\n" + JSON.stringify(data));
    this.props.getPriceByTerms(data);
  };

  currencyHandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });

    if (value === "₹" && !!this.state.data) {
      console.log(this.state.data);
      /*  const planRequestList = this.state.data.individualPlanPricingList.map(row => {
                return {
                    "plan": row.plan,
                    "commercialModel": row.commercialModel,
                    "individualPrice": row.individualPlanPrice,
                    "diffTicketCount": row.diffTicketCount
                }
            })*/

      const data = {
        email: window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
        currencyCode: "INR",
        individualPlanRequestList: this.state.data.individualPlanPricingList,
        estimationValue: this.state.data.estimationValue,
        taxPercentage: this.state.data.taxPercentage,
        taxAmount: this.state.data.taxAmount,
        contractDuration: this.state.data.contractDuration,
      };
      console.log("data \n" + JSON.stringify(data));
      this.props.requestInr(data);
    } else if (value === "$") {
      this.props.getPriceDetails(this.state.estimationValueRequestList);
    }
  };

  navigate = (url) => {
    this.props.history.push(url);
  };

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
      this.props.dataCustomizePage2(this.state);
      // console.log(this.props.dataCustomizePage);
      localStorage.setItem("dataCustomizePage", JSON.stringify(this.state));
      var dataCustomizePage = JSON.parse(
        localStorage.getItem("dataCustomizePage1")
      );
      // console.log("data \n"+JSON.stringify(dataCustomizePage))
      const data = {
        email: window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
        plansList: dataCustomizePage.plansList,
        isTollFreeNumber: dataCustomizePage.isTollFreeNumber,

        contractDuration: dataCustomizePage.contractDuration,

        payment: dataCustomizePage.payment,

        serviceInitializationDate: dataCustomizePage.serviceInitializationDate,
        currencyCode: this.state.currency === "$" ? "USD" : "INR",
      };
      // console.log("data \n"+JSON.stringify(data));

      this.props.insertPlan(data);
      this.setState({
        isLoading: true,
      });
      //this.props.history.push('/dmsa');
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
    if (window.sessionStorage.getItem(Constants.CURRENCY_CODE)) {
      var taxid = window.sessionStorage.getItem(Constants.CURRENCY_CODE);

      if (taxid === "INR") {
        // this.setState({
        //      currency :"₹",

        // });
        Swal.fire({
          title: "",
          text: "Please select INR before Payment Process",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        })
      } else if (taxid === "USD") {
        // this.setState({
        //      currency:"$",
        // });
        Swal.fire({
          title: "",
          text: "Please select USD for Payment Process",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        })
      }
    }
    window.scrollTo(0, 0);
    console.log(
      "window.sessionStorage.getItem(Constants.ACCESS_EMAIL)\n" +
      window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID)
    );
    let url = this.props.location.search;
    let params = queryString.parse(url);
    this.setState({
      terms: params.terms,

    });
    console.log("inr data:" + this.state.currency);
    this.state.recommendedPrice = JSON.parse(
      localStorage.getItem("recommendedPrice")
    );
    this.state.dataCustomizePage1 = JSON.parse(
      localStorage.getItem("dataCustomizePage1")
    );
    if (
      this.state.recommendedPrice !== undefined &&
      this.state.recommendedPrice !== null
    ) {
      if (this.state.recommendedPrice.modelList.length > 0) {
        this.state.estimationValueRequestList = {
          email: window.sessionStorage.getItem(Constants.ACCESS_EMAIL)
            ? window.sessionStorage.getItem(Constants.ACCESS_EMAIL)
            : "",
          estimationValueRequestList: this.state.dataCustomizePage1.plansList,
          serviceInitializationDate:
            this.state.dataCustomizePage1.serviceInitializationDate,
          contractDuration: this.state.dataCustomizePage1.contractDuration,
          currencyCode: "USD",
          // currencyCode: this.state.currencyCode,

        };
      }

      this.props.getPriceDetails(this.state.estimationValueRequestList);
    }
  }

  handleClick = () => {
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Response" + JSON.stringify(this.props.insertPlanResponse));

    if (this.props.pricedetails !== prevProps.pricedetails) {
      if (this.props.pricedetails.success) {
        this.setState({
          data: this.props.pricedetails,
          dataUSD: this.props.pricedetails,
          estimationValue: this.props.pricedetails.estimationValue,

        });
      } else if (this.props.pricedetails.success === false) {
        Swal.fire({
          title: "",
          text: this.props.pricedetails.message,
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            window.location.href = "/customizePage";
          }
        });
      }
    }
    if (this.props.priceByTerms !== prevProps.priceByTerms) {
      if (this.props.priceByTerms.success) {
        this.setState({
          data: this.props.priceByTerms,
          estimationValue: this.props.priceByTerms.estimationValue,
        });
      }
    }

    if (this.props.insertPlanResponse !== prevProps.insertPlanResponse) {
      this.setState({
        isLoading: false,
      });
      if (this.props.insertPlanResponse.success === true) {
        var createOrderData = {
          email: window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
          estimationValue: this.state.data.estimationValue,
          currencyCode: this.state.currency === "$" ? "USD" : "INR",
        };
        localStorage.setItem(
          "createOrderData",
          JSON.stringify(createOrderData)
        );
        localStorage.setItem(
          "insertPlanResponse",
          JSON.stringify(this.props.insertPlanResponse)
        );
        console.log(JSON.stringify(this.state.data));
        var customize1 = JSON.parse(localStorage.getItem("customize1"));
        console.log("customize1\n" + JSON.stringify(customize1));
        var paymentResponces = this.state.data.individualPlanPricingList.map(
          (row, rowkey) => {
            console.log(JSON.stringify(row));

            return {
              plan: row.plan,
              ticket: row.ticket,
              serviceSupport: customize1.plansList[rowkey].serviceSupport,
              supportWindow: customize1.plansList[rowkey].supportWindow,
              selectedModelPrice: row.selectedModelPrice,
              paymentTerms: row.paymentTerms,
              price: row.price,
              discount: row.discount,
              discountAmount: row.discountAmount,
              days: row.days,
              totalPricePerYear: row.totalPricePerYear,
              totalPerMonth: row.totalPricePerMonth,
              commericialModel: row.commercialModel,
              recommendSeat: customize1.plansList[rowkey].recommendSeat,
              userEnteredSeatCount:
                customize1.plansList[rowkey].userEnteredSeatCount,
              individualPlanPrice: row.individualPlanPrice,
              recommendModel: customize1.plansList[rowkey].recommendModel,
              recommendPrice: customize1.plansList[rowkey].recommendPrice,
            };
          }
        );

        localStorage.setItem(
          "paymentResponces",
          JSON.stringify(paymentResponces)
        );
        console.log(localStorage.getItem("paymentResponces"));
        this.props.history.push("/dmsa");
      } else {
        Swal.fire({
          title: "",
          // text: this.props.insertPlanResponse.message+" ",
          text: "Plan is already taken. Please view in plan details page",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            // window.location.href = "/planDetailsList";
          }
        });
      }
    }

    if (this.props.currencyInr !== prevProps.currencyInr) {
      if (this.props.currencyInr.success) {

        this.setState({
          data: this.props.currencyInr,
          estimationValue: this.props.currencyInr.estimationValue,
        });
        localStorage.setItem(
          "orderSummaryData",
          JSON.stringify(this.props.currencyInr)
        );
      }
    }
  }

  hour = (supportWindow) => {
    if (
      supportWindow === "24x7" ||
      supportWindow === "Weekend Support (48hours)"
    ) {
      return "24";
    } else if (supportWindow === "8 X 5 Weekdays (office hours support)") {
      return "8";
    } else if (supportWindow === "16 X 5 After office hours support") {
      return "16";
    }
  };

  days = (supportWindow) => {
    if (supportWindow === "24x7" || supportWindow == "24x7") {
      return "7";
    } else if (
      supportWindow === "8 X 5 Weekdays (office hours support)" ||
      supportWindow === "16 X 5 After office hours support"
    ) {
      return "5";
    } else if (supportWindow === "Weekend Support (48hours)") {
      return "2";
    }
  };

  render() {
    if (this.state.isReadyToRedirect) return <Redirect to="/user" />;
    const { currency } = this.state;
    return (
      <div>
        {!window.sessionStorage.getItem(Constants.ACCESS_EMAIL) ? (
          <Header />
        ) : (
          <HeaderLogin />
        )}
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div>
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
                  <div
                    className="scroll col-lg-12 col-md-12 col-sm-12"
                    style={{ maxWidth: "100%" }}
                  >
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
                            Model
                          </th>
                          <th
                            className="head"
                            scope="col"
                            style={{ fontSize: 14, fontFamily: "Poppins" }}
                          >
                            Subscription
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
                        {this.state.data.individualPlanPricingList &&
                          this.state.data.individualPlanPricingList.length >
                          0 &&
                          this.state.data.individualPlanPricingList.map(
                            (row, rowkey) => (
                              <tr key={rowkey}>
                                <td>{row.plan}</td>
                                <td>{row.commercialModel}</td>
                                <td>{this.state.data.contractDuration}</td>
                                {row.commercialModel === "PPU" ? (
                                  <td>
                                    {" "}
                                    <select
                                      type="dropdown"
                                      disabled={true}
                                      className="form-control"
                                      name="terms"
                                      value={row.paymentTerms}
                                      placeholder="select"
                                      onChange={() =>
                                        this.termsHandleChange(
                                          row,
                                          rowkey,
                                          event
                                        )
                                      }
                                    >
                                      <option value=""></option>
                                      <option value="Yearly">Yearly</option>
                                    </select>
                                  </td>
                                ) : (
                                  <td>
                                    {" "}
                                    <select
                                      type="dropdown"
                                      className="form-control"
                                      name="terms"
                                      value={row.paymentTerms}
                                      placeholder="select"
                                      onChange={() =>
                                        this.termsHandleChange(
                                          row,
                                          rowkey,
                                          event
                                        )
                                      }
                                      id="cs-pd-payterms"
                                    >
                                      <option value="Yearly">Yearly</option>
                                      <option value="Monthly">Monthly</option>
                                    </select>
                                  </td>
                                )}

                                <td>
                                  {row.paymentTerms === "Monthly" ? (
                                    <tr>
                                      <td style={{ textAlign: "left" }}>
                                        Price
                                        <span style={{ fontSize: 10 }}>
                                          /Month
                                        </span>
                                      </td>
                                      <td>:</td>
                                      <td>
                                        {row.selectedModelPrice ||
                                          row.individualPlanPrice}
                                      </td>
                                    </tr>
                                  ) : (
                                    <tr>
                                      {" "}
                                      <td style={{ textAlign: "left" }}>
                                        Price
                                        <span style={{ fontSize: 10 }}>
                                          /Year
                                        </span>
                                      </td>
                                      <td>:</td>
                                      <td>{row.individualPlanPrice}</td>
                                    </tr>
                                  )}

                                  {row.paymentTerms === "Monthly" ? (
                                    <tr>
                                      <td>Billing Cycle Price</td>
                                      <td>:</td>
                                      <td>{row.amountPayableForEveryMonth}</td>
                                      {row.commercialModel !== "Dedicated" ? (
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
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                Price/Month{" "}
                                              </span>{" "}
                                              = {row.ticket} *{" "}
                                              {row.ticketPerCost} ={" "}
                                              {row.selectedModelPrice}.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                Amount for {row.days} days
                                              </span>{" "}
                                              = {row.amountPayableForEveryMonth}
                                              .
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {row.ticket}
                                              </span>{" "}
                                              - No. of tickets.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {row.ticketPerCost}
                                              </span>{" "}
                                              - Cost per ticket.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {row.days}
                                              </span>{" "}
                                              - Billing cycle period.
                                            </div>
                                          </ReactTooltip>
                                          <div className="col-md-1" />
                                        </td>
                                      ) : (
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
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                Price/Month
                                              </span>{" "}
                                              = ( {row.ticketPerCost}*
                                              {this.hour(row.serviceSupport[0])}
                                              *
                                              {this.days(row.serviceSupport[0])}
                                              *{row.userEnteredSeatCount}*52)/
                                              {12} = {row.selectedModelPrice}.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                Amount for {row.days} days{" "}
                                              </span>{" "}
                                              = {row.amountPayableForEveryMonth}
                                              .
                                            </div>
                                            {/* <div className="row">
                                                                    <span style={{fontWeight:'bold'}}>{row.ticket}</span> - No. of tickets.
                                                                    </div> */}
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {row.ticketPerCost}
                                              </span>{" "}
                                              - Cost per hour.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {this.hour(
                                                  row.serviceSupport[0]
                                                )}
                                              </span>{" "}
                                              - Support window hours/day.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {this.days(
                                                  row.serviceSupport[0]
                                                )}
                                              </span>{" "}
                                              - Support window Days/week.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {row.userEnteredSeatCount}
                                              </span>{" "}
                                              - No of Resources.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                52
                                              </span>{" "}
                                              - No of weeks per Year.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                12
                                              </span>{" "}
                                              - No of months per Year.
                                            </div>
                                          </ReactTooltip>
                                          <div className="col-md-1" />
                                        </td>
                                      )}
                                    </tr>
                                  ) : null}

                                  {row.paymentTerms === "Yearly" ? (
                                    <tr>
                                      <td style={{ textAlign: "left" }}>
                                        {row.discount}% Discount
                                      </td>
                                      <td>:</td>
                                      <td>- {row.discountAmount} </td>
                                    </tr>
                                  ) : null}
                                  {row.paymentTerms == "Yearly" ? (
                                    <tr>
                                      <td style={{ textAlign: "left" }}>
                                        Amount
                                      </td>
                                      <td>:</td>
                                      <td>{row.price} </td>
                                      {row.commercialModel !== "Dedicated" ? (
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
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                Price/Year{" "}
                                              </span>
                                              = {row.ticket}*{row.ticketPerCost}
                                              *12 = {row.individualPlanPrice}.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                Discount Amount{" "}
                                              </span>
                                              = Price/Year*{row.discount}% ={" "}
                                              {row.discountAmount}.
                                            </div>
                                            <div className="row">
                                              {/* Amount for 365 days = {row.individualPlanPrice} */}
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                Amount{" "}
                                              </span>
                                              = Price/Year - Discount ={" "}
                                              {row.totalPricePerYear}.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {" "}
                                                {row.ticket}
                                              </span>{" "}
                                              - No. of tickets.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {" "}
                                                {row.ticketPerCost}
                                              </span>{" "}
                                              - Cost per ticket.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {row.discount}%
                                              </span>{" "}
                                              - Discount.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                12
                                              </span>{" "}
                                              - no of months per Year.
                                            </div>
                                            {/* <div className="row">
                                                                    {row.individualPlanPrice} - {row.discountAmount} = {row.totalPricePerYear}
                                                                </div> */}
                                          </ReactTooltip>
                                          <div className="col-md-1" />
                                        </td>
                                      ) : (
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
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                Price/Year
                                              </span>{" "}
                                              = {row.ticketPerCost}*
                                              {this.hour(row.serviceSupport[0])}
                                              *
                                              {this.days(row.serviceSupport[0])}
                                              *{row.userEnteredSeatCount}*52 =
                                              {row.individualPlanPrice}.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                Discount Amount
                                              </span>
                                              = Price/Year*{row.discount}% ={" "}
                                              {row.discountAmount}.
                                            </div>
                                            <div className="row">
                                              {/* Amount for 365 days = {row.individualPlanPrice} */}
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                Amount
                                              </span>{" "}
                                              = Price/Year - Discount ={" "}
                                              {row.totalPricePerYear}.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {" "}
                                                {row.ticketPerCost}{" "}
                                              </span>
                                              - Cost per hour.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {" "}
                                                {this.hour(
                                                  row.serviceSupport[0]
                                                )}
                                              </span>
                                              - Support window hours/day.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {this.days(
                                                  row.serviceSupport[0]
                                                )}
                                              </span>{" "}
                                              - Support window Days/week.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {row.userEnteredSeatCount}
                                              </span>{" "}
                                              - No of Resources.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {" "}
                                                52{" "}
                                              </span>
                                              - No of weeks per Year.
                                            </div>
                                            <div className="row">
                                              <span
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {row.discount}%
                                              </span>{" "}
                                              - Discount.
                                            </div>

                                            {/* <div className="row">
                                                                    <span style={{fontWeight:'bold'}}> 12 </span>- No of month per Year.
                                                                    </div> */}
                                            {/* <div className="row">
                                                                        {row.individualPlanPrice} - {row.discountAmount} = {row.totalPricePerYear}
                                                                    </div> */}
                                          </ReactTooltip>
                                          <div className="col-md-1" />
                                        </td>
                                      )}
                                    </tr>
                                  ) : null}
                                </td>

                                {/* <select type="dropdown" className="form-control" name="terms" value={row.paymentTerms}
                                                    placeholder='select' onChange={() => this.termsHandleChange(row, rowkey, event)}>
                                                    <option value=""></option>
                                                <option value="Yearly">Yearly</option>
                                                    <option value="Monthly">Monthly</option>
                                                </select>} */}
                              </tr>
                            )
                          )}
                      </tbody>
                    </table>
                  </div>
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
                    Tax({this.state.data.taxPercentage}%)
                  </div>
                  <div className="col-md-1">:</div>
                  <div className="col-md-2">
                    <input
                      type="text"
                      style={{ fontFamily: "Open Sans" }}
                      className="form-control"
                      name="estimationValue"
                      disabled="true"
                      value={this.state.data.taxAmount + " " + currency}
                    />
                  </div>
                </div>
              )}
              <br />
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
                  Total Amount Payable
                </div>
                <div className="col-md-1">:</div>
                <div className="col-md-2">
                  <input
                    type="text"
                    className="form-control"
                    name="estimationValue"
                    disabled="true"
                    value={this.state.data.estimationValue}
                  />
                  {!window.sessionStorage.getItem(Constants.ACCESS_EMAIL) ? (
                    <div>(+ Tax Applicable) </div>
                  ) : null}
                </div>
                <div className="col-md-2">
                  <select
                    type="dropdown"
                    className="form-control"
                    name="currency"
                    style={{ fontFamily: "Open Sans" }}
                    value={this.state.currency}
                    placeholder="select"
                    onChange={this.currencyHandleChange}
                    id="cs-pd-dollars"
                  >
                    <option value="$">
                      USD($)
                    </option>
                    <option value="₹">INR(₹)</option>
                  </select>{" "}
                </div>
                <i className="fas fa-lightbulb"></i>
              </div>
              <br /> <br />
              {/* {<Button className="genric-btn primary radius text-uppercase" onClick={this.viewDmsa}>NEXT</Button>} */}
              {window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID) !==
                "undefined" ? (
                <div className="row col-md-12">
                  <div className="col-md-5" />
                  <div className="col-md-2">
                    <Button
                      className="genric-btn  radius text-uppercase"
                      onClick={this.viewDmsa}
                      id="cs-pd-next"
                    >
                      NEXT
                    </Button>
                  </div>

                  <div className="col-md-5" />
                </div>
              ) : (
                <div className="row col-md-12">
                  <div className="col-md-4" />

                  <div className="col-md-6">
                    <text style={{ fontWeight: "bold" }}>
                      Administrator Access is need for the Further process<br />
                      Please Contact Your Admin: " <a href="#">{window.sessionStorage.getItem(Constants.ACCESS_EMAIL_ID)}</a> "
                    </text>
                  </div>

                  <div className="col-md-2" />
                </div>
              )}
              <br /> <br />
            </Container>

            <Footer />
          </div>
        )}
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
  insertPlanResponse: PropTypes.func,
};

const mapStateToProps = (state) => {
  // console.log(state, 'feedback list');
  return {
    pricedetails: state.priceDetailsReducer.pricedetails,
    recommendedPrice: state.customizePageReducer.recommendedPrice,
    currencyInr: state.priceDetailsReducer.currencyInr,
    priceByTerms: state.priceDetailsReducer.priceByTerms,
    dataCustomizePage: state.priceDetailsReducer.dataCustomizePage,
    insertPlanResponse: state.priceDetailsReducer.insertPlanResponse,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getPriceDetails: (data) => dispatch(getPriceDetails(data)),
  getPriceByTerms: (data) => dispatch(getPriceByTerms(data)),
  requestInr: (data) => dispatch(requestInr(data)),
  dataCustomizePage2: (data) => dispatch(dataCustomizePage2(data)),
  insertPlan: (data) => dispatch(insertPlan(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(customizePage2);
