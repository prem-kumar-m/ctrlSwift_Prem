import { PropTypes } from "prop-types";
import queryString from "query-string";
import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import Pdf from "react-to-pdf";
import Swal from "sweetalert2";
import HeaderLogin from "../../components/header_login/HeaderLogin";
import Loader from "../../components/loading";
import * as Constants from "../../constants";
import backgroundImage30 from "../../images/balbhas-logo.png";
import Logo from "../../images/logo.png";
import { paymentSuccess, requestAllDetails } from "./action";

const ref = React.createRef();

class taxInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      invoiceNumber: "",
      details: [],
      submitted: false,
      user: "",
      invoiceDate: "",
      dueDate: "",
      paymentTerms: "",
      subtotal: "",
      total: "",
      words: "",
      company: "",
      address: "",
      city: "",
      pincode: "",
      country: "",
      itemAndDescription: "",
      invoiceId: "",
      paymentData: "",
      status: "",
      currency: "",
      invoicePeriod: "",
      data: {},
      isLoading: false,
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

    if (
      window.sessionStorage.getItem(Constants.ACCESS_INVOICENUMB) !==
        undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_INVOICENUMB) != null
    ) {
      console.log(
        "login INVOICE NUMB." +
          window.sessionStorage.getItem(Constants.ACCESS_INVOICENUMB)
      );
      // this.props.clearTokensCustomer();
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

    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_INVOICETOKEN)------>" +
        JSON.stringify(
          window.sessionStorage.getItem(Constants.ACCESS_INVOICETOKEN)
        )
    );

    let url = this.props.location.search;
    console.log(url);
    let params = queryString.parse(url);
    console.log(params);
    this.state.invoiceId = params.invoiceId;
    this.state.dueDate = params.dueDate;
    this.state.invoiceDate = params.invoiceDate;

    this.props.requestAllDetails(this.state.invoiceId);
    console.log("ticket number set to " + this.state.invoiceNumber);
    console.log(
      "Add feedback Component Did Mount........" + this.state.submitted
    );
    console.log("incoming---------> " + this.props.match.params.invoiceId);
    console.log("incomingdetails---------> " + this.props.details);
    console.log("duedate" + this.state.dueDate);
    console.log("incoming---------> " + this.props.match.params.dueDate);
    console.log(this.props.invitees);
    console.log(this.props.invoicePeriodRequest);
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

    if (this.props.details !== prevProps.details) {
      this.setState({
        paymentData: this.props.details,
      });
      if (
        this.props.invitees !== prevProps.invitees &&
        this.props.invoicePeriodRequest !== prevProps.invoicePeriodRequest
      ) {
        for (var i = 0; i < this.props.invitees.length; i++) {
          for (var j = 0; j < this.props.invoicePeriodRequest.length; j++) {
            if (i === j) {
              //   var D=JSON.stringify(this.props.invitees[i].concat(this.props.invoicePeriodRequest[j]))
              //console.log("D \n"+D)
            }
          }
        }
      }
      // if (this.props.invoicePeriodRequest !== undefined &&this.props.invoicePeriodRequest !== null ) {
      console.log(
        "......................" +
          JSON.stringify(this.props.invoicePeriodRequest)
      );

      // this.setState({
      // details: this.props.details,
      //invoicePeriod: this.props.invoicePeriodRequest.invoicePeriod,
      //});
      //}
      /*}  if (this.props.invoicePeriodRequest !== undefined || this.props.invoicePeriodRequest !== null || this.props.invoicePeriodRequest.invoicePeriod !== undefined) {
            console.log('invoice ......................' + this.props.invoicePeriodRequest.invoicePeriod);

            this.setState({
                details: this.props.details,

                invoicePeriodRequest: this.props.invoicePeriodRequest.invoicePeriod,
            })
        }*/
      console.log("updated detials ......................");
      //console.log('updated......................' + this.props.invoicePeriodRequest);

      if (
        this.props.details !== undefined &&
        this.props.details !== null &&
        this.props.details.invoiceDate !== undefined
      ) {
        console.log(
          "updated not null detials ......................" +
            this.props.details.invoiceDate
        );

        this.setState({
          details: this.props.details,
          invoiceDate: this.props.details.invoiceDate,
        });
      }
      console.log(
        "updated not null detials ......................" +
          this.state.invoiceDate
      );
      if (
        this.props.details !== undefined &&
        this.props.details !== null &&
        this.props.details.subtotal !== undefined
      ) {
        console.log(
          "updated not null detials ......................" +
            this.props.details.subtotal
        );

        this.setState({
          details: this.props.details,
          subtotal: this.props.details.subtotal,
        });
      }
      if (
        this.props.details !== undefined &&
        this.props.details !== null &&
        this.props.details.total !== undefined
      ) {
        console.log(
          "updated not null detials ......................" +
            this.props.details.total
        );

        this.setState({
          details: this.props.details,
          total: this.props.details.total,
        });
      }
      if (
        this.props.details !== undefined &&
        this.props.details !== null &&
        this.props.details.totalInWords !== undefined
      ) {
        console.log(
          "updated not null detials ......................" +
            this.props.details.totalInWords
        );

        this.setState({
          details: this.props.details,
          words: this.props.details.totalInWords,
        });
      }
      if (
        this.props.details !== undefined &&
        this.props.details !== null &&
        this.props.details.company !== undefined
      ) {
        console.log(
          "updated not null detials ......................" +
            this.props.details.company
        );

        this.setState({
          details: this.props.details,
          company: this.props.details.company,
        });
      }
      if (
        this.props.details !== undefined &&
        this.props.details !== null &&
        this.props.details.city !== undefined
      ) {
        console.log(
          "updated not null detials ......................" +
            this.props.details.city
        );

        this.setState({
          details: this.props.details,
          city: this.props.details.city,
        });
      }
      if (
        this.props.details !== undefined &&
        this.props.details !== null &&
        this.props.details.address !== undefined
      ) {
        console.log(
          "updated not null detials ......................" +
            this.props.details.address
        );

        this.setState({
          details: this.props.details,
          address: this.props.details.address,
        });
      }
      if (
        this.props.details !== undefined &&
        this.props.details !== null &&
        this.props.details.country !== undefined
      ) {
        console.log(
          "updated not null detials ......................" +
            this.props.details.country
        );

        this.setState({
          details: this.props.details,
          country: this.props.details.country,
        });
      }
      if (
        this.props.details !== undefined &&
        this.props.details !== null &&
        this.props.details.pincode !== undefined
      ) {
        console.log(
          "updated not null detials ......................" +
            this.props.details.pincode
        );

        this.setState({
          details: this.props.details,
          pincode: this.props.details.pincode,
        });
      }
      if (
        this.props.details !== undefined &&
        this.props.details !== null &&
        this.props.details.paymentTerms !== undefined
      ) {
        console.log(
          "updated not null detials ......................" +
            this.props.details.paymentTerms
        );

        this.setState({
          details: this.props.details,
          paymentTerms: this.props.details.paymentTerms,
        });
      }
      if (
        this.props.details !== undefined &&
        this.props.details !== null &&
        this.props.details.invoiceDate !== undefined
      ) {
        console.log(
          "updated not null detials ......................" +
            this.props.details.invoiceDate
        );

        this.setState({
          details: this.props.details,
          invoiceDate: this.props.details.invoiceDate,
        });
      }

      if (
        this.props.details !== undefined &&
        this.props.details !== null &&
        this.props.details.invoiceNumber !== undefined
      ) {
        console.log(
          "updated not null detials ......................" +
            this.props.details.invoiceNumber
        );

        this.setState({
          details: this.props.details,
          invoiceNumber: this.props.details.invoiceNumber,
        });
      }
      if (
        this.props.details !== undefined &&
        this.props.details !== null &&
        this.props.details.dueDate !== undefined
      ) {
        console.log(
          "updated not null detials ......................" +
            this.props.details.dueDate
        );

        this.setState({
          details: this.props.details,
          dueDate: this.props.details.dueDate,
        });
      }
      if (
        this.props.details !== undefined &&
        this.props.details !== null &&
        this.props.details.status !== undefined
      ) {
        console.log(
          "updated not null detials ......................" +
            this.props.details.status
        );

        this.setState({
          details: this.props.details,
          status: this.props.details.status,
        });
      }
      if (
        this.props.invitees !== undefined &&
        this.props.invitees !== null &&
        this.props.invitees.itemAndDescription !== undefined
      ) {
        console.log(
          "updated not null detials ......................" +
            this.props.details.dueDate
        );

        this.setState({
          details: this.props.details,
          itemAndDescription: this.props.invitees.itemAndDescription,
        });
      }

      if (
        this.props.details !== undefined &&
        this.props.details !== null &&
        this.props.details.currency !== undefined
      ) {
        console.log(
          "currency ......................" + this.props.details.currency
        );

        this.setState({
          details: this.props.details,
          currency: this.props.details.currency,
        });
      }
    }

    console.log("this.state.lite" + JSON.stringify(this.state.lite));
    console.log(this.state.checked3 == true);
    if (
      this.props.updateAgreement !== undefined &&
      this.props.updateAgreement !== null
    ) {
      if (this.props.updateAgreement !== prevProps.updateAgreement) {
        if (this.props.updateAgreement.success == true) {
          this.setState({
            detail: this.props.updateAgreement.lineItems,
          });
        }
      }
      console.log(
        "invoicenumber2checking xerox......................" + this.state.detail
      );
      console.log(
        "invoicenumber2checking xerox......................" +
          window.sessionStorage.setItem(
            Constants.ACCESS_INVOICENUMB,
            this.props.details.invoiceNumber
          )
      );
    }
    if (
      this.props.paymentStaus !== undefined &&
      this.props.paymentStaus !== null
    ) {
      if (this.props.paymentStaus !== prevProps.paymentStaus) {
        console.log(JSON.stringify(this.props.paymentStaus));
        if (this.props.paymentStaus.success == true) {
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
    this.setState({
      isLoading: true,
    });
    this.props.paymentDetails(response);
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
    const {
      invoiceNumber,
      invoiceDate,
      subtotal,
      total,
      words,
      company,
      city,
      country,
      address,
      paymentTerms,
      dueDate,
    } = this.state;
    return (
      <div>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div className="view">
            <HeaderLogin />


            <Pdf targetRef={ref} filename="Invoice.pdf">
              {({ toPdf }) => (
                <button
                  onClick={toPdf}
                  className="genric-btn primary radius pull-right mr-20"
                  style={{ marginTop: 100 }}
                  variant=" "
                >
                  DOWNLOAD
                </button>
              )}
            </Pdf>

            {this.state.status == "Paid" ? (
              <Button
                disabled
                className="genric-btn primary radius pull-right mr-20"
                variant=" "
                style={{ marginTop: 100, marginLeft: 20 }}
              >
                PAID
              </Button>
            ) : (
              <Button
                className="genric-btn primary radius pull-right mr-20"
                variant=" "
                style={{ marginTop: 100 }}
                onClick={this.loadRazorpay}
              >
                PAY NOW
              </Button>
            )}

            <div
              ref={ref}
              style={{
                marginLeft: 200,
                marginRight: 200,
                justifyContent: "center",
              }}
            >
              <section className="about-generic-area bg-gr section-gap">
                <div
                  style={{
                    marginLeft: 60,
                    marginRight: 100,
                    justifyContent: "center",
                  }}
                >
                  <div style={{ padding: "20px", marginTop: -90 }}>
                    <div>
                      <div className="float-right">
                        <img
                          src={backgroundImage30}
                          width="200"
                          height="68"
                          alt="Image"
                        />
                      </div>
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

                    <div className="col-sm-12">
                      {" "}
                      <div className="text-center" style={{ marginBottom: 20 }}>
                        <h2>Tax Invoice</h2>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-sm-6">
                        <h4 className="mb-3">Bill To</h4>
                        <p style={{ fontWeight: "400" }} className="text-dark mb-1">
                          {company},<br></br>
                          {address},<br></br>
                          {city},<br></br>
                          {country},<br></br>
                          {this.state.pincode}.<br></br>
                        </p>
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
                                  Invoice No.
                                </th>

                                <td>{invoiceNumber}</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td
                                  className="active align-middle"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Invoice Date
                                </td>
                                <td>{invoiceDate}</td>
                              </tr>
                              <tr>
                                <th
                                  className="active align-middle"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Payment Terms
                                </th>
                                <td>{paymentTerms}</td>
                              </tr>
                              <tr>
                                <th
                                  className="active align-middle"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Due Date
                                </th>
                                <td>{dueDate}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div
                      className="col-sm-12 col-lg-12 mb-30"
                      style={{ marginTop: -40, marginRight: 50 }}
                    >
                      Place Of Supply: Tamil Nadu (33)<br></br>
                    </div>

                    <div className="table-responsive-sm disable-select">
                      <table className="table table-bordered disable-select">
                        <thead>
                          <tr className="active">
                            <th
                              className="center"
                              style={{
                                marginRight: "20px",
                                fontWeight: "bold",
                              }}
                            >
                              S NO
                            </th>
                            <th className="center" style={{ fontWeight: "bold" }}>
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
                          {this.props.invitees !== undefined &&
                            this.props.invitees !== null &&
                            this.props.invitees.length > 0 &&
                            this.props.invitees.map((detail, detailkey) => (
                              <tr key={detailkey}>
                                <td className="center">{detail.serialNumber}</td>


                                <td>
                                  {detail.itemAndDescription}
                                  <div>{detail.invoicePeriod}</div>
                                </td>


                                <td className="right">{detail.quantity}</td>
                                {this.state.currency == "USD" ? (
                                  <td className="center"> ${detail.rate}</td>
                                ) : (
                                  <td className="center">
                                    <span style={{ fontFamily: "Open Sans" }}>
                                      ₹
                                    </span>
                                    {detail.rate}
                                  </td>
                                )}
                                {this.state.currency == "USD" ? (
                                  <td className="right"> ${detail.amount}</td>
                                ) : (
                                  <td className="center">
                                    <span style={{ fontFamily: "Open Sans" }}>
                                      ₹
                                    </span>
                                    {detail.amount}
                                  </td>
                                )}
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="row">
                      <div
                        className="col-lg-6 col-sm-5 talign"
                        style={{ marginLeft: 10 }}
                      >
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
                              {this.state.currency == "USD" ? (
                                <td className="right borderless"> ${subtotal}</td>
                              ) : (
                                <td className="right borderless">
                                  <span style={{ fontFamily: "Open Sans" }}>
                                    ₹
                                  </span>{" "}
                                  {subtotal}
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
                                {this.state.currency == "USD" ? (
                                  <strong className="text-dark">${total}</strong>
                                ) : (
                                  <strong className="text-dark">
                                    <span style={{ fontFamily: "Open Sans" }}>
                                      ₹
                                    </span>{" "}
                                    {total}
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
                                <em className="text-dark">{words}</em>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div
                      className="col-sm-12 col-lg-12"
                      style={{ marginTop: -140 }}
                    >
                      {" "}
                      <text style={{ fontWeight: "bold", fontSize: 12 }}>
                        {" "}
                        Account Name:{" "}
                      </text>{" "}
                      <text style={{ fontSize: 12 }}>
                        Balbhas Business Sysnomics Pvt Ltd.
                      </text>{" "}
                      <br></br>
                      <text style={{ fontWeight: "bold", fontSize: 12 }}>
                        {" "}
                        Account Number:{" "}
                      </text>
                      <text style={{ fontSize: 12 }}>8211936378</text> <br></br>
                      <text style={{ fontWeight: "bold", fontSize: 12 }}>
                        {" "}
                        Branch Name:{" "}
                      </text>
                      <text style={{ fontSize: 12 }}>Villvakkam</text> <br></br>
                      <text style={{ fontWeight: "bold", fontSize: 12 }}>
                        {" "}
                        IFSC Code:{" "}
                      </text>
                      <text style={{ fontSize: 12 }}>KKBK0008486</text>{" "}
                      <br></br>
                      <text style={{ fontWeight: "bold", fontSize: 12 }}>
                        SWIFT Code:{" "}
                      </text>
                      <text style={{ fontSize: 12 }}>KKBKINBBCPC </text>
                    </div>

                    <div className="col-sm-12 col-lg-12">
                      <h4 style={{ fontSize: 12 }}>Terms & Conditions</h4>
                      <p style={{ fontSize: 12 }}>Payment Terms: Immediate</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    );
  }
}

taxInvoice.propTypes = {
  requestAllDetails: PropTypes.func,
  details: PropTypes.array,
  detail: PropTypes.array,
  invitees: PropTypes.array,
  invoicePeriodRequest: PropTypes.array,

  //updateAgreement:PropTypes.func,
};

const mapStateToProps = (state) => {
  console.log(state, "feedback list");
  return {
    details: state.taxInvoiceReducer.details,
    invitees: state.taxInvoiceReducer.invitees,
    paymentStaus: state.taxInvoiceReducer.paymentStaus,
    invoicePeriodRequest: state.taxInvoiceReducer.invoicePeriodRequest,

    //updateAgreement:state.taxInvoiceReducer.updateAgreement
  };
};
const mapDispatchToProps = (dispatch) => ({
  //agreementUpdate: data => dispatch(agreementUpdate(data)),
  requestAllDetails: (invoiceId) => dispatch(requestAllDetails(invoiceId)),
  paymentDetails: (responces) => dispatch(paymentSuccess(responces)),
});

export default connect(mapStateToProps, mapDispatchToProps)(taxInvoice);

//export default taxInvoice;
