import React from "react";
import ReactDOM from "react-dom";
//import Pdf from "react-to-pdf";
import backgroundImage30 from "../../images/balbhas-logo.png";
import queryString from "query-string";
import { requestAllDetails } from "./action";
import { PropTypes } from "prop-types";
import * as Constants from "../../constants";
import { connect } from "react-redux";
//import "./styles.css";

const ref = React.createRef();
class download extends React.Component {
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
      subtotal: "",
    };
  }

  //const = {invoiceNumber,lineItems,invoiceDate,submitted,subtotal,total,words,company,city,country,pincode,address,paymentTerms,dueDate}
  componentDidMount() {
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
    this.props.requestAllDetails(this.state.invoiceNumber);
    let url = this.props.location.search;
    console.log(url);
    let params = queryString.parse(url);
    console.log(params);
    this.state.invoiceNumber = params.invoiceNumber;
    this.state.subtotal = params.subtotal;
    this.state.invoiceDate = params.invoiceDate;
    this.state.subtotal = params.subtotal;
    this.state.paymentTerms = params.paymentTerms;
    this.state.company = params.company;
    this.state.city = params.city;
    this.state.address = params.address;
    this.state.country = params.country;
    this.state.pincode = params.pincode;
    this.state.itemAndDescription = params.itemAndDescription;
    this.state.quantity = params.quantity;
    this.state.amount = params.amount;
    this.state.rate = params.rate;

    this.state.total = params.total;
    this.state.words = params.words;
    this.state.invoiceDate = params.invoiceDate;
    this.state.dueDate = params.dueDate;

    console.log("ticket number set to " + this.state.invoiceNumber);
    console.log("incoming---------> " + this.props.match.params.invoiceNumber);
    console.log("ticket number set to " + this.props.match.params.subtotal);

    console.log(
      "login INVOICE NUMB." +
        window.sessionStorage.getItem(Constants.ACCESS_INVOICENUMB)
    );
  }

  componentDidUpdate() {
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
  }

  render() {
    return (
      <div className="View">
        <Pdf targetRef={ref} filename="Invoice.pdf">
          {({ toPdf }) => (
            <button
              onClick={toPdf}
              className="genric-btn primary radius pull-right mr-20"
              variant=" "
            >
              DOWNLOAD
            </button>
          )}
        </Pdf>

        <div ref={ref}>
          <section className="about-generic-area bg-gr section-gap">
            <div className="row border-top-generic">
              <div className=" col-xl-8  padding">
                <div className="card" style={{ padding: "40px" }}>
                  <div
                    className="card-header p-2"
                    style={{ backgroundColor: "white" }}
                  >
                    <a className="pt-2 d-inline-block" data-abc="true">
                      <img src={backgroundImage30} width="200" height="68" />
                    </a>

                    <div className="float-right">
                      <h4 className="mt-5 mb-2 head7">
                        <strong>BALBHAS BUSINESS SYSNOMICS PVT LTD</strong>
                      </h4>
                      <p style={{ marginRight: 30 }}>
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
                      <h2>Tax Invoice</h2>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="row mb-4">
                      <div className="col-sm-6">
                        <h4 className="mb-3">Bill To</h4>
                        <h4 className="text-dark mb-1">{this.state.company},</h4>
                        <h4>
                          {this.state.address},<br></br>
                          {this.state.city},<br></br>
                          {this.state.country},<br></br>
                          {this.state.pincode}.<br></br>
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
                                  Invoice No.
                                </th>

                                <td>{this.state.invoiceNumber}</td>
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
                                <td>{this.state.invoiceDate}</td>
                              </tr>
                              <tr>
                                <th
                                  className="active align-middle"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Payment Terms
                                </th>
                                <td>{this.state.paymentTerms}</td>
                              </tr>
                              <tr>
                                <th
                                  className="active align-middle"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Due Date
                                </th>
                                <td>{this.state.dueDate}</td>
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
                        <tr>
                          <td className="center">{this.state.rate}</td>
                          <td className="left strong talign">
                            {this.state.itemAndDescription}
                          </td>
                          <td className="right">{this.state.quantity}</td>
                          <td className="center">{this.state.rate}</td>
                          <td className="right">{this.state.amount}</td>
                        </tr>
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
                            <td className="right borderless">
                              {this.state.subtotal}
                            </td>
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
                              <strong className="text-dark">
                                {this.state.total}
                              </strong>
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
                              <em className="text-dark">{this.state.words}</em>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="col-sm-12 col-lg-12" style={{ marginTop: -70 }}>
                    {" "}
                    <text style={{ fontWeight: "bold" }}>
                      {" "}
                      Account Name:{" "}
                    </text>{" "}
                    <text>Balbhas Business Sysnomics Pvt ltd</text> <br></br>
                    <text style={{ fontWeight: "bold" }}>
                      {" "}
                      Account Number:{" "}
                    </text>
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
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

download.propTypes = {
  requestAllDetails: PropTypes.func,
  details: PropTypes.array,
  detail: PropTypes.array,
  invitees: PropTypes.array,
};

const mapStateToProps = (state) => {
  console.log(state, "feedback list");
  return {
    details: state.taxInvoiceReducer.details,
    invitees: state.taxInvoiceReducer.invitees,
  };
};
const mapDispatchToProps = (dispatch) => ({
  requestAllDetails: (invoiceNumber) =>
    dispatch(requestAllDetails(invoiceNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(download);
