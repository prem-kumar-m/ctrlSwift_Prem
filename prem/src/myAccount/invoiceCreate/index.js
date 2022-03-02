import { PropTypes } from "prop-types";
import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import HeaderLogin from "../../components/header_login/HeaderLogin";
import * as Constants from "../../constants";
import backgroundImage30 from "../../images/balbhas-logo.png";
import Logo from "../../images/logo.png";
import { paymentSuccess } from "./action";

class invoiceCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      invoiceNumber: "",
      detail: [],
      paymentData: "",
      currency: "",
      updateAgreement: [],
      invoicePeriod: "",
    };
  }

  componentDidMount() {
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

    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_INVOICENUMB)------>" +
        JSON.stringify(
          window.sessionStorage.getItem(Constants.ACCESS_INVOICENUMB)
        )
    );
    console.log(
      "updateAgreement \n" + JSON.stringify(this.props.updateAgreement)
    );
    //console.log("updateAgreement \n"+JSON.stringify(this.props.updateAgreement.lineItems[0].serialNumber));

    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_BILLTO)------>" +
        JSON.stringify(window.sessionStorage.getItem(Constants.ACCESS_COUNTRY))
    );

    // console.log("updateAgreement \n"+JSON.stringify(this.props.updateAgreement.invoiceNumber));
    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_INVOICEDATE)------>" +
        JSON.stringify(
          window.sessionStorage.getItem(Constants.ACCESS_INVOICEDATE)
        )
    );
    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_PAYMENTTERMS)------>" +
        JSON.stringify(
          window.sessionStorage.getItem(Constants.ACCESS_PAYMENTTERMS)
        )
    );
    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_DUEDATE)------>" +
        JSON.stringify(window.sessionStorage.getItem(Constants.ACCESS_DUEDATE))
    );
    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_ITEM)------>" +
        JSON.stringify(window.sessionStorage.getItem(Constants.ACCESS_ITEM))
    );
    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_SUBTOTAL)------>" +
        JSON.stringify(window.sessionStorage.getItem(Constants.ACCESS_SUBTOTAL))
    );

    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_TOTAL)------>" +
        JSON.stringify(window.sessionStorage.getItem(Constants.ACCESS_TOTAL))
    );

    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_BALANCEDUE)------>" +
        JSON.stringify(
          window.sessionStorage.getItem(Constants.ACCESS_BALANCEDUE)
        )
    );

    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_WORDS)------>" +
        JSON.stringify(
          window.sessionStorage.getItem(Constants.ACCESS_TOTALINWORDS)
        )
    );

    //this.props.agreementUpdate()
    this.setState({
      paymentData: JSON.parse(localStorage.getItem("updateAgreement")),
      planDetails:JSON.parse(localStorage.getItem("dataDMSA")),
    });
    // this.state.paymentData = JSON.parse(
    //   localStorage.getItem("updateAgreement")
    // );
    // this.state.planDetails = JSON.parse(localStorage.getItem("dataDMSA"));
    if (
      this.props.updateAgreement !== undefined &&
      this.props.updateAgreement !== null &&
      this.props.updateAgreement.currency !== undefined
    ) {
      console.log(
        "currency......................" + this.props.updateAgreement.currency
      );

      this.setState({
        updateAgreement: this.props.updateAgreement,
        currency: this.props.updateAgreement.currency,
      });
    }
  }

  navigate = (url) => {
    this.props.history.push(url);
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

    console.log("invoiceperiod" + this.state.invoicePeriod);

    console.log("this.state.lite" + JSON.stringify(this.state.lite));
    console.log(this.state.checked3 === true);
    if (
      this.props.updateAgreement !== undefined &&
      this.props.updateAgreement !== null
    ) {
      if (this.props.updateAgreement !== prevProps.updateAgreement) {
        if (this.props.updateAgreement.success === true) {
          this.setState({
            detail: this.props.updateAgreement.lineItems,
          });
        }
      }
      console.log(
        "invoicenumber2checking xerox......................" + this.state.detail
      );
    }

    if (
      this.props.paymentStaus !== undefined &&
      this.props.paymentStaus !== null
    ) {
      if (this.props.paymentStaus !== prevProps.paymentStaus) {
        console.log(JSON.stringify(this.props.paymentStaus));
        if (this.props.paymentStaus.success === true) {
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
              window.location.href = "/viewInvoice";
            }
          });
        }
      }
    }

    //console.log("updateAgreement \n"+JSON.stringify(this.props.updateAgreement));*/}
  }

  call = (response) => {
    console.log(JSON.stringify(response));
    //this.props.paymentDetails(response);
    const data = {
      email: this.state.planDetails.email,
      gstNumber: this.state.planDetails.gstNumber,
      plansList: this.state.planDetails.plansList,
      isTollFreeNumber: this.state.planDetails.isTollFreeNumber,
      contractDuration: this.state.planDetails.contractDuration,
      payment: this.state.planDetails.payment,
      serviceInitializationDate:
        this.state.planDetails.serviceInitializationDate,
      currencyCode: this.state.planDetails.currencyCode,
      generatedSignature: response.razorpay_signature,
      orderId: response.razorpay_order_id,
      razorPaymentId: response.razorpay_payment_id,
      secret: "pbHMHhoz9Ei7i5pCf9QQOliD",
    };
    console.log(JSON.stringify(data));
    this.props.paymentDetails(data);
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
        this.setState({
          paymentResponces:response,
        });
        // this.state.paymentResponces = response;
        if (
          response.razorpay_payment_id &&
          response.razorpay_order_id &&
          response.razorpay_signature
        ) {
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

  loadRazorpay = () => {
    console.log("Razorpay ");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    script.onload = this.displayRazorpay;
  };

  render() {
    return (
      <div>
        <HeaderLogin />
        <div className="view">
          <section
            className="relative banner-area-inner1"
            style={{ paddingTop: "200px", textAlign: "center" }}
          >
            <div
              className="overlay overlay-bg overlay-bg-blk"
              style={{ backgroundColor: "black", opacity: 0.5 }}
            ></div>
            <div className="container">
              <div className="row height align-items-center justify-content-center">
                <div className="col-lg-10">
                  <div className="generic-banner-content">
                    <h2 className="head2-inner">One Process - One Tool</h2>
                    <p
                      className="text-white"
                      style={{ opacity: 0.5, fontSize: 18 }}
                    >
                     CtrlSwift comprises of a robust maturity assessment
                      methodology and transformation cookbooks to progressively
                      drive the Service Desk transformation to the desired
                      end-state.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="about-generic-area bg-gr section-gap">
          <div className="row border-top-generic">
            <div className="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 padding">
              <div className="card" style={{ padding: "40px" }}>
                <div
                  className="card-header p-4"
                  style={{ backgroundColor: "white" }}
                >
                  <a className="pt-2 d-inline-block" data-abc="true">
                    <img
                      src={backgroundImage30}
                      width="200"
                      height="68"
                      alt="images"
                    />
                  </a>
                  <div className="float-right">
                    <h4 className="mt-5 mb-2 head7">
                      <strong>BALBHAS BUSINESS SYSNOMICS PVT LTD</strong>
                    </h4>
                    <p>
                      Company ID : U74999TN2017PTC118924<br></br>
                      RMZ LEVEL 6, PHASE II CAMPUS 4B UNIT 602A ,<br></br>
                      NO.143, MGR ROAD, PERUNGUDI<br></br>
                      CHENNAI Tamil Nadu 600096<br></br>
                      India<br></br>
                      GSTIN 33AAHCB4731F1Z1<br></br>
                    </p>
                  </div>
                </div>
                <div className="col-sm-12">
                  {" "}
                  <div className="text-center">
                    <h2>Proforma Invoice</h2>
                  </div>
                </div>

                <div className="card-body">
                  <div className="row mb-4">
                    <div className="col-sm-6">
                      <h4 className="mb-3">Bill To</h4>
                      <h4 className="text-dark mb-1">
                        {window.sessionStorage.getItem(
                          Constants.ACCESS_COMPANY
                        )}
                        ,
                      </h4>
                      <h4>
                        {window.sessionStorage.getItem(
                          Constants.ACCESS_ADDRESS
                        )}
                        ,<br></br>
                        {window.sessionStorage.getItem(
                          Constants.ACCESS_COUNTRY
                        )}
                        ,<br></br>
                        {window.sessionStorage.getItem(Constants.ACCESS_CITY)},
                        <br></br>
                        {window.sessionStorage.getItem(
                          Constants.ACCESS_PINCODE
                        )}
                        .<br></br>
                      </h4>
                    </div>
                    <div className="col-sm-6">
                      <div>
                        <table
                          className="table table-bordered"
                          style={{ fontSize: 14 }}
                        >
                          <thead>
                            <tr>
                              <th
                                className="active align-middle"
                                style={{ fontWeight: "bold" }}
                              >
                                {" "}
                                Proforma Invoice No.
                              </th>

                              <td>
                                {window.sessionStorage.getItem(
                                  Constants.ACCESS_INVOICENUMB
                                )}
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td
                                className="active align-middle"
                                style={{ fontWeight: "bold" }}
                              >
                                Proforma Invoice Date
                              </td>
                              <td>
                                {window.sessionStorage.getItem(
                                  Constants.ACCESS_INVOICEDATE
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th
                                className="active align-middle"
                                style={{ fontWeight: "bold" }}
                              >
                                Payment Terms
                              </th>
                              <td>
                                {window.sessionStorage.getItem(
                                  Constants.ACCESS_PAYMENTTERMS
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th
                                className="active align-middle"
                                style={{ fontWeight: "bold" }}
                              >
                                Due Date
                              </th>
                              <td>
                                {window.sessionStorage.getItem(
                                  Constants.ACCESS_DUEDATE
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-12 mb-30">
                  Place Of Supply: Tamil Nadu (33)<br></br>
                </div>

                <div className="table-responsive-sm disable-select">
                  <table className="table table-bordered disable-select">
                    <thead>
                      <tr className="active">
                        <th
                          className="center"
                          style={{ marginRight: "20px", fontWeight: "bold" }}
                        >
                          S NO
                        </th>
                        <th className="talign" style={{ fontWeight: "bold" }}>
                          Item & Description{" "}
                        </th>
                        <th className="right" style={{ fontWeight: "bold" }}>
                          Qty
                        </th>
                        <th className="center" style={{ fontWeight: "bold" }}>
                          Rate
                        </th>
                        <th className="right" style={{ fontWeight: "bold" }}>
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.updateAgreement !== undefined &&
                        this.props.updateAgreement !== null &&
                        this.props.updateAgreement.lineItems.length > 0 &&
                        this.props.updateAgreement.lineItems.map(
                          (detail, detailkey) => (
                            <tr key={detailkey}>
                              <td className="center">{detail.serialNumber}</td>
                              <td className="left strong talign">
                                {detail.itemAndDescription}{" "}
                                <div>{detail.invoicePeriod}</div>
                              </td>

                              <td className="right">{detail.quantity}</td>
                              {this.state.currency === "USD" ? (
                                <td className="center"> ${detail.rate}</td>
                              ) : (
                                <td className="center">
                                  <span style={{ fontFamily: "Open Sans" }}>
                                    ₹
                                  </span>{" "}
                                  {detail.rate}
                                </td>
                              )}
                              {this.state.currency ==="USD" ? (
                                <td className="right"> ${detail.amount}</td>
                              ) : (
                                <td className="center">
                                  <span style={{ fontFamily: "Open Sans" }}>
                                    ₹
                                  </span>{" "}
                                  {detail.amount}
                                </td>
                              )}
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-sm-5 talign">
                    Thanks for your business.
                  </div>
                  <div className="col-lg-5 col-sm-5 ml-auto">
                    <table className="table table-clear txt-r-al">
                      <tbody>
                        <tr>
                          <td className="left borderless">
                            <strong
                              className="text-dark"
                              style={{ fontWeight: "bold" }}
                            >
                              Subtotal
                            </strong>
                          </td>
                          {this.state.currency === "USD" ? (
                            <td className="right borderless">
                              {" "}
                              ${" "}
                              {window.sessionStorage.getItem(
                                Constants.ACCESS_SUBTOTAL
                              )}
                            </td>
                          ) : (
                            <td className="right borderless">
                              <span style={{ fontFamily: "Open Sans" }}>₹</span>{" "}
                              {window.sessionStorage.getItem(
                                Constants.ACCESS_SUBTOTAL
                              )}
                            </td>
                          )}
                        </tr>

                        <tr>
                          <td className="left">
                            <strong
                              className="text-dark"
                              style={{ fontWeight: "bold" }}
                            >
                              Total
                            </strong>{" "}
                          </td>
                          <td className="right">
                            {this.state.currency === "USD" ? (
                              <strong className="text-dark">
                                {" "}
                                ${" "}
                                {window.sessionStorage.getItem(
                                  Constants.ACCESS_TOTAL
                                )}
                              </strong>
                            ) : (
                              <strong className="text-dark">
                                <span style={{ fontFamily: "Open Sans" }}>
                                  ₹
                                </span>{" "}
                                {window.sessionStorage.getItem(
                                  Constants.ACCESS_TOTAL
                                )}
                              </strong>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="left">
                            <strong
                              className="text-dark"
                              style={{ fontWeight: "bold" }}
                            >
                              Total In Words:
                            </strong>{" "}
                          </td>
                          <td className="right">
                            <em className="text-dark">
                              {window.sessionStorage.getItem(
                                Constants.ACCESS_TOTALINWORDS
                              )}
                            </em>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="col-sm-12 col-lg-8">
                  {" "}
                  <text style={{ fontWeight: "bold" }}>
                    {" "}
                    Account Name:{" "}
                  </text>{" "}
                  <text>Balbhas Business Sysnomics Private Limited</text>{" "}
                  <br></br>
                  <text style={{ fontWeight: "bold" }}> Account Number: </text>
                  <text>8211936378</text> <br></br>
                  <text style={{ fontWeight: "bold" }}> Branch Name: </text>
                  <text>Villvakkam</text> <br></br>
                  <text style={{ fontWeight: "bold" }}> IFSC Code: </text>
                  <text>KKBK0008486</text> <br></br>
                  <text style={{ fontWeight: "bold" }}>SWIFT Code: </text>
                  <text>KKBKINBBCPC </text>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-lg-6 mb-30 pl-30">
                    <h4>Terms & Conditions</h4>
                    <p>Payment Terms: Immediate</p>
                  </div>

                  <div className="col-lg-6 ">
                    {" "}
                    <Button
                      className="genric-btn primary radius pull-right mr-20"
                      variant=" "
                      onClick={this.loadRazorpay}
                    >
                      PAY NOW
                    </Button>
                    <Button
                      className="genric-btn primary radius pull-right mr-20"
                      variant=" "
                      href="/editProfile"
                    >
                      PAY LATER
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

invoiceCreate.propTypes = {
  updateAgreement: PropTypes.func,
};

const mapStateToProps = (state) => {
  console.log(state, "feedback list");
  return {
    updateAgreement: state.dmsaReducer.updateAgreement,
    paymentStaus: state.invoiceCreateReducer.paymentStaus,
  };
};
const mapDispatchToProps = (dispatch) => ({
  //agreementUpdate: data => dispatch(agreementUpdate(data)),
  paymentDetails: (responces) => dispatch(paymentSuccess(responces)),
});

export default connect(mapStateToProps, mapDispatchToProps)(invoiceCreate);
