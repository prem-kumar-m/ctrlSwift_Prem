import { PropTypes } from "prop-types";
import queryString from "query-string";
import React from "react";
import { Button, Container, Modal, Row } from "react-bootstrap";
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
import Logo from "../images/logo.png";
import {
  createOrderDataTer,
  paymentSuccessTer
} from "./action";



class TerminationOrder extends React.Component {
  constructor(props) {
    super();

    this.state = {
      submitted: false,
      terms: "",
      estimationValueRequestList: "",
      data: "",
      dataUSD: "",
      estimationValue: "",
      currency: "",
      recommendedPrice: "",
      dataCustomizePage1: "",
      showplanModal: false,
      token: "",
      data1: "",
      status: "",
      plan: "",
      paymentTerms: "",
      selectedModelPrice: "",
      ticket: "",
      serviceSupport: "",
      supportWindow: "",
      initiationDate: "",
      terminateSuccess: "",
      page: "1",
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
      // console.log(this.state.data);
      const planRequestList = this.state.data.individualPlanPricingList.map(
        (row) => {
          return {
            plan: row.plan,
            commercialModel: row.commercialModel,
            individualPrice: row.individualPlanPrice,
          };
        }
      );
      const data = {
        currencyCode: "INR",
        individualPlanRequestList: this.state.data.individualPlanPricingList,
        estimationValue: this.state.data.estimationValue,
        taxPercentage: this.state.data.taxPercentage,
        taxAmount: this.state.data.taxAmount,
        contractDuration: this.state.data.contractDuration,
      };
      // console.log("data \n" + JSON.stringify(data));
      this.props.requestInr(data);
    } else if (value === "$") {
      this.props.getPriceDetails(this.state.estimationValueRequestList);
    }
  };

  terminatePay = () => {
    var createOrderData = JSON.parse(localStorage.getItem("createOrderData"));
    console.log("data \n" + JSON.stringify(createOrderData));

    this.props.createOrderDataTer(createOrderData);
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
  handleSubmit(e) {
    e.preventDefault();
    // const {ticket,token,plan,}=this.state
    //   if (( ticket &&token&&plan)) {

    // this.props.planUpgrade(ticket,token,plan)
    //}
    //this.setState({  showplanModal: true, });
  }

  insert = () => {
    if (!!window.sessionStorage.getItem(Constants.ACCESS_EMAIL)) {
      this.props.dataCustomizePage2(this.state);
      console.log(this.props.dataCustomizePage);
      localStorage.setItem("dataCustomizePage", JSON.stringify(this.state));
      var dataCustomizePage = JSON.parse(
        localStorage.getItem("dataCustomizePage1")
      );
      console.log("data \n" + JSON.stringify(dataCustomizePage));
      var plansListData = this.state.data1.updatePlanRequestList.map(
        (row, rowkey) => {
          // key={rowkey}
          // for(var i=0;i<this.state.detailslist.planActiveCustomizationRequests.length;i++){
          //   if(this.state.detailslist.planActiveCustomizationRequests[i].plan == row.selectedPlan){
          //     this.state.token=this.state.detailslist.planActiveCustomizationRequests[i].token
          //      this.state.serviceSupport=this.state.detailslist.planActiveCustomizationRequests[i].serviceSupport
          //      this.state.supportWindow=this.state.detailslist.planActiveCustomizationRequests[i].supportWindow
          //      this.state.startDate=this.state.detailslist.planActiveCustomizationRequests[i].initialisationDate

          //   }

          // }
          return {
            status: row.status,
            ticket: row.ticket,
            token: row.token,
            paymentTerms: row.paymentTerms,
            selectedModelPrice: row.selectedModelPrice,
            plan: row.plan,
            serviceSupport: row.serviceSupport,
            supportWindow: row.supportWindow,
            initiationDate: dataCustomizePage.serviceInitializationDate,
            isTollFreeNumber: dataCustomizePage.isTollFreeNumber,

            contractDuration: dataCustomizePage.contractDuration,

            // "plansList":dataCustomizePage.plansList,
          };
        }
      );
      console.log("plansListdata" + JSON.stringify(plansListData));

      const data = {
        email: window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
        plansList: plansListData,
        //"isTollFreeNumber":dataCustomizePage.isTollFreeNumber,

        //"contractDuration":dataCustomizePage.contractDuration,

        //"payment":dataCustomizePage.payment,

        currencyCode: this.state.currency === "$" ? "USD" : "INR",
      };

      console.log("data \n" + JSON.stringify(data));

      this.props.dataInsert(data);
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
  viewDmsa = () => {
    if (!!window.sessionStorage.getItem(Constants.ACCESS_EMAIL)) {
      this.props.dataCustomizePage2(this.state);
      console.log(this.props.dataCustomizePage);
      localStorage.setItem("dataCustomizePage", JSON.stringify(this.state));
      var dataCustomizePage = JSON.parse(
        localStorage.getItem("dataCustomizePage1")
      );
      console.log("data \n" + JSON.stringify(dataCustomizePage));
      const data = {
        // "email":window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
        upgradeRequestList: dataCustomizePage.plansList,
        // "isTollFreeNumber":dataCustomizePage.isTollFreeNumber,

        // "contractDuration":dataCustomizePage.contractDuration,

        //"payment":dataCustomizePage.payment,

        // "serviceInitializationDate":dataCustomizePage.serviceInitializationDate,
        // "currencyCode":this.state.currency =="$"?"USD":"INR",
      };

      console.log("data \n" + JSON.stringify(data));

      this.props.planUpgrade(data);
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
  componentDidMount(prevProps, prevState, snapshot) {
    if (!window.sessionStorage.getItem(Constants.ACCESS_EMAIL)) {
      return Swal.fire({
        title: "",
        text: "Please login before proceeding",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      }).then((res) => {
        if (res.value) {
          window.sessionStorage.setItem(Constants.REGISTERED, true);
          this.props.history.push("/");
        }
      });
    }

    let url = this.props.location.search;
    let params = queryString.parse(url);
    this.setState({
      terms: params.terms,
    });
    this.state.recommendedPrice = JSON.parse(
      localStorage.getItem("recommendedPrice")
    );
    this.state.dataCustomizePage1 = JSON.parse(
      localStorage.getItem("dataCustomizePage1")
    );
    this.state.terminateSuccess = JSON.parse(localStorage.getItem("isSuccess"));

    console.log("isSuccess \n" + JSON.stringify(this.state.terminateSuccess));

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
        };
      }
    }
  }

  handleClose = () => {
    this.setState({ showplanModal: false });
  };
  navigate = (url) => {
    this.props.history.push(url);
  };

  page = (e) => {
    console.log("e \n" + JSON.stringify(e));
    this.setState({
      page: e.value,
    });
  };
  loadRazorpay = () => {
    console.log("Razorpay ");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    script.onload = this.displayRazorpay;
  };

  displayRazorpay = () => {
    const options = {
      key: this.state.paymentData.keyId,
      amount: this.state.paymentData.amount,
      currency: this.state.paymentData.currency,
      name: "services",
      description: this.state.paymentData.description,
      image: Logo,
      order_id: this.state.paymentData.orderId,
      handler: (response) => {
        console.log(JSON.stringify(response));
        this.state.paymentResponces = response;
        if (
          response.razorpay_payment_id &&
          response.razorpay_order_id &&
          response.razorpay_signature
        ) {
          console.log(
            "response.razorpay_payment_id\n" +
              response.razorpay_payment_id +
              "\nresponse.razorpay_order_id\n" +
              response.razorpay_order_id +
              "\nresponse.razorpay_signature\n" +
              response.razorpay_signature
          );
          this.call(response);
        }
      },

      prefill: {
        name: this.state.paymentData.customerName,
        email: this.state.paymentData.email,
        contact: this.state.paymentData.contact,
      },
    };
    const paymentObject = new window.Razorpay(options);
    console.log("paymentObject \n" + paymentObject);
    paymentObject.open();
    console.log("paymentObject \n" + paymentObject);
    paymentObject.on("payment.failed", function (response) {
      console.log(JSON.stringify(response));
    });
  };

  call = (response) => {
    console.log(JSON.stringify(response));
    // this.props.paymentDetails(response);
    console.log(JSON.stringify(this.state.planDetails));
    var paymentResponces = JSON.parse(localStorage.getItem("paymentResponces"));
    console.log("paymentResponces \n" + JSON.stringify(paymentResponces));
    var createOrderData = JSON.parse(localStorage.getItem("createOrderData"));
    console.log("createOrderData \n" + JSON.stringify(createOrderData));
    const data = {
      email: window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
      //"gstNumber":this.state.planDetails.gstNumber,
      plansList: paymentResponces,
      //"isTollFreeNumber":this.state.planDetails.isTollFreeNumber,
      //"contractDuration":this.state.planDetails.contractDuration,
      // "serviceInitializationDate":this.state.planDetails.serviceInitializationDate,
      currencyCode: createOrderData.currencyCode,
      generatedSignature: response.razorpay_signature,
      orderId: response.razorpay_order_id,
      razorPaymentId: response.razorpay_payment_id,
      reason: this.state.terminateSuccess.reason,
    };
    console.log(JSON.stringify(data));
    this.setState({
      isLoading: true,
    });
    this.props.paymentDetailsTer(data);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!window.sessionStorage.getItem(Constants.ACCESS_EMAIL)) {
      return Swal.fire({
        title: "",
        text: "Please login before proceeding",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      }).then((res) => {
        if (res.value) {
          window.sessionStorage.setItem(Constants.REGISTERED, true);
          this.props.history.push("/");
        }
      });
    }
    // console.log("dataCustomizePage1 \n" + JSON.stringify(this.state.dataCustomizePage1))

    // console.log("this.state.currency \n" + JSON.stringify(this.state.currency));
    // console.log("this.state.currency \n" + JSON.stringify(this.state.data));

    // console.log('pricedetails \n' + JSON.stringify(this.props.currencyInr));

    // console.log('this.props.pricedetails \n' + JSON.stringify(this.props.pricedetails));
    if (
      this.props.paymentStausTer !== undefined &&
      this.props.paymentStausTer !== null
    ) {
      if (this.props.paymentStausTer !== prevProps.paymentStausTer) {
        console.log(JSON.stringify(this.props.paymentStausTer));
        if (this.props.paymentStausTer.success == true) {
          this.setState({
            isLoading: false,
          });
          Swal.fire({
            title: "",
            text: "Payment completed successfully",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          }).then((res) => {
            if (res.value) {
              //this.pop()
              window.location.href = "/viewInvoice";
            }
          });
        }
      }
    }

    if (this.props.createOrderIdTer !== prevProps.createOrderIdTer) {
      if (this.props.createOrderIdTer) {
        this.loadRazorpay();
        this.state.paymentData = this.props.createOrderIdTer;
        console.log(" this.state.paymentData" + this.state.paymentData);
        console.log(" this.state.paymentData" + this.state.paymentData.success);
        console.log(
          "key \n" + "-" + this.state.paymentData.keyId,
          "amount\n" + "-" + this.state.paymentData.amount,
          "currency\n" + "-" + this.state.paymentData.currency,
          "name \n" + "-" + "services",
          "description\n" + "-" + this.state.paymentData.description,
          "image\n" + "-" + Logo,
          "order_id \n" + "-" + this.state.paymentData.orderId
        );
      }
    }

    console.log(this.props.isSuccess);

    if (this.props.insertResponse !== prevProps.insertResponse) {
      console.log("done");
      if (this.props.insertResponse.success == true) {
        Swal.fire({
          title: "",
          text: "You have Successfully Updated the Plan",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            //this.pop()
            window.location.href = "/viewInvoice";
          }
        });
      }
    }

    if (this.props.upgradeResponse !== prevProps.upgradeResponse) {
      if (this.props.upgradeResponse.success) {
        this.setState({
          data1: this.props.upgradeResponse,
        });
        this.setState({ showplanModal: true });
        // for(var i =0; i<this.props.upgradeResponse.updatePlanRequestList.length;i++){

        //}
      }
      if (this.props.upgradeResponse.success == false) {
        Swal.fire({
          title: "",
          text: this.props.upgradeResponse.message,
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            //this.pop()
            window.location.href = "/customizePage2";
          }
        });
      }
    }
    if (this.props.pricedetails !== prevProps.pricedetails) {
      if (this.props.pricedetails.success) {
        this.setState({
          data: this.props.pricedetails,
          dataUSD: this.props.pricedetails,
          estimationValue: this.props.pricedetails.estimationValue,
        });
      }
    }
    // console.log('this.props.pricedetails \n' + JSON.stringify(this.props.priceByTerms));
    if (this.props.priceByTerms !== prevProps.priceByTerms) {
      if (this.props.priceByTerms.success) {
        this.setState({
          data: this.props.priceByTerms,
          estimationValue: this.props.priceByTerms.estimationValue,
        });
      }
    }

    if (this.state.terminateSuccess !== prevProps.terminateSuccess) {
      if (this.state.terminateSuccess.success) {
        // console.log(JSON.stringify(this.props.insertPlanResponse))
        var createOrderData = {
          email: window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
          estimationValue: this.state.terminateSuccess.estimationValue,
          currencyCode: this.state.terminateSuccess.currencyCode,
          //"currencyCode":this.state.currency =="$"?"USD":"INR",
        };
        console.log(this.state.terminateSuccess.currencyCode);
        localStorage.setItem(
          "createOrderData",
          JSON.stringify(createOrderData)
        );
        // console.log(JSON.stringify(this.state.data.individualPlanPricingList))
        console.log(JSON.stringify(createOrderData));
        localStorage.setItem(
          "insertPlanResponse",
          JSON.stringify(this.props.insertPlanResponse)
        );

        var customize1 = JSON.parse(localStorage.getItem("customize1"));
        console.log("customize1\n" + customize1);
        var paymentResponces = this.state.terminateSuccess.plansList.map(
          (row, rowkey) => {
            console.log(JSON.stringify(row));

            return {
              plan: row.plan,
              token: row.token,
              // "subscription":customize1.plansList[rowkey].serviceSupport,
              //"supportWindow":customize1.plansList[rowkey].supportWindow,
              subscription: row.subscription,
              unpaidAmount: row.unpaidAmount,
              balanceAmount: row.balanceAmount,
              penaultyAmount: row.penaultyAmount,
              price: row.price,
              ticket: row.ticket,
              invoiceNumbers: row.invoiceNumbers,
            };
          }
        );

        console.log(JSON.stringify(paymentResponces));
        localStorage.setItem(
          "paymentResponces",
          JSON.stringify(paymentResponces)
        );

        //this.props.history.push('/dmsa');
      } else {
        Swal.fire({
          title: "",
          text: this.props.insertPlanResponse.message,
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    }

    if (this.props.currencyInr !== prevProps.currencyInr) {
      if (this.props.currencyInr.success) {
        // console.log("this.props.currencyInr.individualPlanPricingList \n" + JSON.stringify(this.props.currencyInr.individualPlanPricingList));
        // console.log("this.state.data \n" + JSON.stringify(this.state.data));

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

            <Container style={{ alignItems: "center", width: "1250px" }}>
              <div className="row col-md-12">
                <div className="col-md-1" />
                <div className="col-md-10">
                  <br />
                  <div style={{ textAlign: "center" }}>
                    <h2>Termination Invoice Summary</h2>
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
                          Subscription
                        </th>
                        <th
                          className="head"
                          scope="col"
                          style={{ fontSize: 14, fontFamily: "Poppins" }}
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.terminateSuccess.plansList &&
                        this.state.terminateSuccess.plansList.length > 0 &&
                        this.state.terminateSuccess.plansList.map(
                          (row, rowkey) => (
                            <tr key={rowkey}>
                              <td>{row.plan}</td>
                              <td>{row.subscription}</td>

                              {row.subscription == "Pay Per use" ? (
                                <td
                                  style={{
                                    fontWeight: "bold",
                                    textAlign: "left",
                                  }}
                                >
                                  Penaulty Amount Not Applicable
                                </td>
                              ) : (
                                <td>
                                  <tr>
                                    <td style={{ textAlign: "left" }}>
                                      Penaulty Amount
                                    </td>
                                    <td>:</td>
                                    <td>{row.penaultyAmount}</td>
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
                                        <div style={{ textAlign: "left" }}>
                                          {/* {console.log("test" + row.days)} */}
                                          Penalty Percentage ={" "}
                                          {row.penaltyPercentage}%
                                        </div>
                                        <div style={{ textAlign: "left" }}>
                                          {/* {console.log("test" + row.days)} */}
                                          Subscription Amount ={" "}
                                          {row.subscriptionAmount}
                                          <span
                                            style={{ fontFamily: "Open Sans" }}
                                          >
                                            {" "}
                                            for {row.subscription}
                                          </span>
                                        </div>
                                        <div style={{ textAlign: "left" }}>
                                          ({row.penaltyPercentage}/{100})*
                                          {row.subscriptionAmount}={row.price}
                                        </div>
                                        <div style={{ textAlign: "left" }}>
                                          {row.ticket} - No. of tickets
                                        </div>
                                        <div style={{ textAlign: "left" }}>
                                          Penalty Amount = {row.penaultyAmount}
                                        </div>
                                      </ReactTooltip>
                                      <div className="col-md-1" />{" "}
                                    </td>
                                  </tr>
                                  {row.balanceAmount == undefined ? null : (
                                    <tr>
                                      <td>Balance Amount</td>
                                      <td>:</td>
                                      <td>{row.balanceAmount}</td>
                                      <td>
                                        <Link
                                          data-tip
                                          data-for={"registerTipsss" + rowkey}
                                        >
                                          <i className="c-blue-900 ti-info-alt"></i>
                                        </Link>
                                        <ReactTooltip
                                          id={"registerTipsss" + rowkey}
                                          place="right"
                                          effect="solid"
                                        >
                                          <div style={{ textAlign: "left" }}>
                                            {/* {console.log("test" + row.days)} */}
                                            No.of days = {row.balanceDays}
                                          </div>

                                          <div style={{ textAlign: "left" }}>
                                            {/* {console.log("test" + row.days)} */}
                                            Per day Balance Amount ={" "}
                                            {row.perDayBalanceAmount}
                                          </div>
                                          <div style={{ textAlign: "left" }}>
                                            {/* {console.log("test" + row.days)} */}
                                            {row.balanceDays} *{" "}
                                            {row.perDayBalanceAmount} ={" "}
                                            {row.balanceAmount}
                                          </div>
                                        </ReactTooltip>
                                        <div className="col-md-1" />{" "}
                                      </td>
                                    </tr>
                                  )}
                                  <tr>
                                    <td style={{ textAlign: "left" }}>Price</td>
                                    <td>:</td>
                                    <td>{row.price}</td>{" "}
                                  </tr>

                                  <tr>
                                    <td style={{ textAlign: "left" }}>
                                      Ticket
                                    </td>
                                    <td>:</td>
                                    <td>{row.ticket} </td>
                                  </tr>

                                  <tr></tr>
                                </td>
                              )}
                            </tr>
                          )
                        )}
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
                    Tax({this.state.terminateSuccess.taxPercentage}%)
                  </div>
                  <div className="col-md-1">:</div>
                  <div className="col-md-2">
                    <input
                      type="text"
                      style={{ fontFamily: "Open Sans" }}
                      className="form-control"
                      name="estimationValue"
                      disabled="true"
                      value={
                        this.state.terminateSuccess.taxAmount + " " + currency
                      }
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
                    value={this.state.terminateSuccess.estimationValue}
                  />
                  {!window.sessionStorage.getItem(Constants.ACCESS_EMAIL) ? (
                    <div>(+ Tax Applicable) </div>
                  ) : null}
                </div>
                <div className="col-md-2">
                  <input
                    type="dropdown"
                    disabled={true}
                    className="form-control"
                    name="currency"
                    style={{ fontFamily: "Open Sans" }}
                    value={this.state.terminateSuccess.currencyCode}
                    placeholder="select"
                  ></input>{" "}
                </div>
                <i className="fas fa-lightbulb"></i>
              </div>
              <br /> <br />
              <div className="row col-md-12">
                <div className="col-md-5" />

                <div className="col-md-2">
                  <Button
                    className="genric-btn primary radius text-uppercase"
                    onClick={this.terminatePay}
                  >
                    NEXT
                  </Button>
                </div>

                <div className="col-md-5" />
              </div>
              <br /> <br />
            </Container>
            <Modal show={this.state.showplanModal} onHide={this.handleClose}>
              <Modal.Body>
                <table className="table table-hover">
                  <thead className="thead-light">
                    <tr>
                      <th
                        className="head"
                        scope="col"
                        style={{ fontSize: 14, fontFamily: "Poppins" }}
                      >
                        Plan
                      </th>
                      <th
                        className="head"
                        scope="col"
                        style={{ fontSize: 14, fontFamily: "Poppins" }}
                      >
                        Tickets
                      </th>
                      <th
                        className="head"
                        scope="col"
                        style={{ fontSize: 14, fontFamily: "Poppins" }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data1.updatePlanRequestList &&
                      this.state.data1.updatePlanRequestList.length > 0 &&
                      this.state.data1.updatePlanRequestList.map(
                        (rows, rowskey) => (
                          <tr key={rowskey}>
                            <td>{rows.plan}</td>
                            <td>{rows.ticket}</td>
                            <td>{rows.status}</td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>

                <Row className="justify-content-md-center">
                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    style={{ marginTop: 10 }}
                    onClick={this.insert}
                  >
                    OK
                  </Button>

                  <Button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    style={{ marginTop: 10, marginLeft: 40 }}
                    href="/customizePage2"
                  >
                    CANCEL
                  </Button>
                </Row>
              </Modal.Body>
            </Modal>

            <Footer />
          </div>
        )}
      </div>
    );
  }
}
TerminationOrder.propTypes = {
  // submitAddFeedback: PropTypes.func,
  // recommendedPrice: PropTypes.func,
  // pricedetails: PropTypes.func,
  // currencyInr: PropTypes.func,
  // priceByTerms: PropTypes.func,
  // insertPlanResponse: PropTypes.func,
  // upgradeResponse:PropTypes.func,
  // insertResponse:PropTypes.func,
  isSuccess: PropTypes.array,
  createOrderIdTer: PropTypes.func,
};

const mapStateToProps = (state) => {
  // console.log(state, 'feedback list');
  return {
    // pricedetails: state.priceDetailsReducer.pricedetails,
    // recommendedPrice: state.customizePageReducer.recommendedPrice,
    // currencyInr: state.priceDetailsReducer.currencyInr,
    // priceByTerms: state.priceDetailsReducer.priceByTerms,
    // dataCustomizePage: state.priceDetailsReducer.dataCustomizePage,
    // insertPlanResponse:state.priceDetailsReducer.insertPlanResponse,
    // upgradeResponse:state.orderChangeReducer.upgradeResponse,
    // insertResponse:state.orderChangeReducer.insertResponse,
    isSuccess: state.choosePlansReducer.isSuccess,
    createOrderIdTer: state.terminateorderReducer.createOrderIdTer,
    paymentStausTer: state.terminateorderReducer.paymentStausTer,
  };
};
const mapDispatchToProps = (dispatch) => ({
  // getPriceDetails: data => dispatch(getPriceDetails(data)),
  // getPriceByTerms: data => dispatch(getPriceByTerms(data)),
  // requestInr: data => dispatch(requestInr(data)),
  // dataCustomizePage2: data => dispatch(dataCustomizePage2(data)),
  // insertPlan:data => dispatch(insertPlan(data)),
  // planUpgrade:data => dispatch(upgradePlan(data)),
  // dataInsert:data => dispatch(insertData(data))
  createOrderDataTer: (data) => dispatch(createOrderDataTer(data)),
  paymentDetailsTer: (responces) => dispatch(paymentSuccessTer(responces)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TerminationOrder);
