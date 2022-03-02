import { PropTypes } from "prop-types";
import React from "react";
import {
  Button, ButtonGroup, ButtonToolbar, Container, Row
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/footer/Footer.js";
import HeaderLogin from "../../components/header_login/HeaderLogin";
import * as Constants from "../../constants";
import "../../css/main.css";
import Logo from "../../images/logo.png";
import Pagination from "../../pagination/pagination";
import {
  paymentSuccess, requestInVoice, requestviewInvoiceList
} from "./action";

class viewInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        invoiceId: "",
        invoiceNumber: "",
        dateOfPayment: "",
        dueDate: "",
        status: "",
        mobile: "",
        customerId: "",
        data: "",
        organId: "",
        download: "",
        goForDelete: false,
        submitted: false,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callbackFunction = (childData) => {
    if (
      this.props.customer &&
      this.props.customer.success == true
    ) {
      this.setState({ datalist1: childData });
    } else {
      this.setState({ datalist1: childData });
    }
  };

  handleChange = (event) => {};

  handleSubmit(e) {
    e.preventdefault();
  }

  download = () => {
    console.log("download");
  };

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
      window.sessionStorage.getItem(Constants.ACCESS_TOTALINWORDS) !==
        undefined &&
      window.sessionStorage.getItem(Constants.ACCESS_TOTALINWORDS) != null
    ) {
      console.log(
        "login INVOICE NUMB." +
          window.sessionStorage.getItem(Constants.ACCESS_TOTALINWORDS)
      );
      // this.props.clearTokensCustomer();
    }
    this.props.requestviewInvoiceList();
    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_EMAIL)------>" +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL)
    );
    console.log("data" + this.props.customer);

    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID)------>" +
        window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID)
    );

    console.log(
      "componentDidMount ACCESSTOKEN----window.sessionStorage.getItem(Constants.ACCESS_INVOICETOKEN)------>" +
        JSON.stringify(
          window.sessionStorage.getItem(Constants.ACCESS_INVOICETOKEN)
        )
    );

    console.log(
      "componentDidMount----window.sessionStorage.getItem(Constants.ACCESS_BILLTO)------>" +
        JSON.stringify(
          window.sessionStorage.getItem(Constants.ACCESS_TOTALINWORDS)
        )
    );

    //this.props.downloadInvoice();
    //this.props.deleteInvoice();
  }

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

    if (this.props.customer !== prevProps.customer) {
      console.log("success success --->" + this.props.customer);
      if (this.props.customer.success === false) {
        Swal.fire({
          title: "Note",
          text: this.props.customer.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    }

    //console.log('component Did update');
    if (this.props.isSuccess !== prevProps.isSuccess) {
      //console.log('there is a change in props........' + prevProps.isSuccess + ' and ' + this.props.isSuccess);
      console.log("delete --->" + this.state.goForDelete);
      console.log("success success --->" + this.props.isSuccess.success);
      if (this.state.goForDelete && this.props.isSuccess.success) {
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

    if (this.props.invoiceUrl !== prevProps.invoiceUrl) {
      console.log("n\n\n\n\n\n\n" + this.props.invoiceUrl.response);
      if (this.props.invoiceUrl.success) {
        window.open(this.props.invoiceUrl.response);
      }
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
  }

  /*
 deleteRow = (data) => {
    //console.log(user);
    Swal.fire({
        title: 'Confirm to Delete',
        text: 'Do you want to delete ' + data.invoiceNumber,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        closeOnConfirm: true,
        closeOnCancel: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
    }).then((res) => {
        if(res.value){
            this.deleteInvoiceNumber(data)
        }else if(res.dismiss == 'cancel'){
            console.log('cancel');
        }



    })
}*/
  /*
deleteInvoiceNumber = (data) => {
    this.setState({goForDelete : true});
    this.props.deleteInvoice(data.invoiceNumber);
};*/

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

  loadRazorpay = (data) => {
    console.log(data);
    this.setState({
      paymentData: data,
    });
    console.log("Razorpay ");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    script.onload = this.displayRazorpay;
  };

  getInvoice = (inVoiveNumber) => {
    console.log(inVoiveNumber);
    this.props.requestInVoice(inVoiveNumber);
  };

  navigate = (url) => {
    this.props.history.push(url);
  };
  alert = (e) => {
    console.log(
      e.name + "\n" + this.state.isAdmin + "\n" + this.state.isPlanOrdered
    );
    this.props.history.push("/" + e.name);

  };
  render() {
    return (
      <div>
        <HeaderLogin />
        <div className="view">
          <section
            className="relative banner-area-inner24"
            style={{ paddingTop: "200px", textAlign: "center" }}
          >
            <div className="overlay overlay-bg overlay-bg-blk"></div>
            <div className="container">
              <div className="row height align-items-center justify-content-center">
                <div className="col-lg-10">
                  <div className="generic-banner-content">
                    <h2 className="head2-inner">One Process - One Tool</h2>
                    <p className="text-white" style={{ opacity: 0.5 }}>
                      CtrlSwiftTM comprises of a robust maturity assessment
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

        <section className="about-generic-area">
          <Container>
            <div className="card-body ">
              <div className="invoice">
                <Row className="col-md-12">
                <div className="col-md-12 " >
              <div className="d-flex justify-content-center">

              <ButtonToolbar
                aria-label="Toolbar with button groups"
                style={{ marginBottom: 20, marginLeft: 70 }}
              ><ButtonGroup className="mr-2">
                  <button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    to="./userDashboard"
                    onClick={(e) => this.alert({ name: "userDashboard" })}
                    id="cs-ud-userDashboard"
                  >
                    Dashboard
                  </button>{" "}
              </ButtonGroup>
                <ButtonGroup className="mr-2">

                  <button
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    onClick={(e) => this.alert({ name: "editProfile" })}
                    id="cs-us-editProfile"
                  >
                    Edit Profile
                  </button>{" "}
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                  <button
                    onClick={(e) => this.alert({ name: "viewInvoice" })}
                    className="genric-btn primary radius text-uppercase"
                    variant=""
                    id="cs-us-viewInvoice"
                  >
                    View Invoice
                  </button>
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                  <button
                    onClick={(e) => this.alert({ name: "planDetailsList" })}
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    id="cs-us-planDetailsList"
                  >
                    Plan Details
                  </button>{" "}
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                  <button
                    onClick={(e) => this.alert({ name: "viewDMSA" })}
                    className="genric-btn primary radius text-uppercase"
                    variant=" "
                    id="cs-us-viewDMSA"
                  >
                    View DMSA
                  </button>{" "}
                </ButtonGroup>
              </ButtonToolbar>
                  </div></div>
                </Row>
              </div>
              <form method="POST" style={{ marginTop: 20 }}>
                <div className="row tbl-price">
                  <div className="table-wrap col-lg-12">
                    <table className="schdule-table table table-bordered">
                      <thead className="thead-light">
                        <tr>
                          <th
                            className="head"
                            scope="col"
                            style={{ fontSize: 16, fontFamily: "Poppins" }}
                          >
                            Invoice ID
                          </th>
                          <th
                            className="head"
                            scope="col"
                            style={{ fontSize: 16, fontFamily: "Poppins" }}
                          >
                            Invoice Number
                          </th>

                          <th
                            className="head"
                            scope="col"
                            style={{ fontSize: 16, fontFamily: "Poppins" }}
                          >
                            Date of Payment
                          </th>
                          <th
                            className="head"
                            scope="col"
                            style={{ fontSize: 16, fontFamily: "Poppins" }}
                          >
                            Due Date
                          </th>
                          <th
                            className="head"
                            scope="col"
                            style={{ fontSize: 16, fontFamily: "Poppins" }}
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.datalist1 &&
                          this.state.datalist1.length > 0 &&
                          this.state.datalist1.map((data, datakey) => (
                            <tr key={datakey}>
                              {/* <td ><Link className="invoice-link" to={"/taxInvoice?invoiceId="+data.invoiceId }>{data.invoiceId}</Link></td> */}
                              <td>
                                <Link
                                  className="invoice-link"
                                  onClick={() =>
                                    this.getInvoice(data.invoiceId)
                                  }
                                >
                                  {data.invoiceId}
                                </Link>
                              </td>

                              <td> {data.invoiceNumber}</td>
                              <td>{data.dateOfPayment}</td>

                              <td>{data.dueDate}</td>

                              <td>
                                {data.status == "Pay now" ? (
                                  <Button
                                    className="genric-btn  radius pull-right mr-20"
                                    id="cs-h-Login"
                                    variant=" "
                                    //onClick={() => this.loadRazorpay(data)}
                                    onClick={() =>
                                      this.getInvoice(data.invoiceId)
                                    }
                                  >
                                    PAY NOW
                                  </Button>
                                ) : (
                                  data.status
                                )}
                              </td>

                              {/*}
                                                            <td>
                                                            <Button className="genric-btn primary radius text-uppercase"variant=" "   onClick={() => this.deleteRow(data)}>Delete</Button>
                                                    </td>*/}
                            </tr>
                          ))}


                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                        <div className="cs-align-center-invoice" >
                          <div className="col-12" style={{ margin: "auto" }}>
                            {this.props.customer && (
                              /*<PaginationComponent customer={this.props.customer} />}*/
                              <Pagination
                                parentCallback={this.callbackFunction}
                                customer={this.props.customer}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                <div></div>
                <div></div>
              </form>
            </div>
          </Container>
        </section>
        <Footer />
      </div>
    );
  }
}
/*const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  floatRight: {
   marginLeft:100,
   fontSize:8
  }
});*/
viewInvoice.propTypes = {
  requestviewInvoiceList: PropTypes.func,
  customer: PropTypes.array,
  //downloadInvoice: PropTypes.func,
  //deleteInvoice:PropTypes.func,
  invoiceUrl: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    isSuccess: state.viewInvoiceReducer.isSuccess,
    //citylist: state.viewInvoiceReducer.citylist,
    //userlist: state.viewInvoiceReducer.userlist,
    // isVerifySuccess: state.getmailcustomerReducer.isVerifySuccess
    customer: state.viewInvoiceReducer.customer,
    //download: state.viewInvoiceReducer.download,
    invoiceUrl: state.viewInvoiceReducer.invoiceUrl,
    paymentStaus: state.viewInvoiceReducer.paymentStaus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  //submitprofileUpdate: (invoiceId,invoiceNumber,dateOfPayment,dueDate,status,mobile) => dispatch(profileUpdate(invoiceId,invoiceNumber,dateOfPayment,dueDate,status,mobile)),
  //requestloadcitybycountry: country =>
  // dispatch(requestloadcitybycountry(country)),
  //requestloadcitylist: country => dispatch(requestloadcitylist(country)),
  requestviewInvoiceList: (customerId) =>
    dispatch(requestviewInvoiceList(customerId)),
  requestInVoice: (inVoiveNumber) => dispatch(requestInVoice(inVoiveNumber)),
  //downloadInvoice: state => dispatch(downloadInvoice(state)),
  //deleteInvoice: invoiceNumber =>dispatch(deleteInvoice(invoiceNumber)),
  paymentDetails: (responces) => dispatch(paymentSuccess(responces)),
});

export default connect(mapStateToProps, mapDispatchToProps)(viewInvoice);
