import { PropTypes } from "prop-types";
import queryString from "query-string";
import React from "react";
import { Button, Container, Modal, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-email/style.css";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Footer from "../components/footer/Footer.js";
import Header from "../components/headerwaiveoff/Header";
import { requestInvoiceNumber } from "./action";




class waiveOffInvoice extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      firstName: "",
      firstNameError: "",
      lastName: "",
      lastNameError: "",
      email: "",
      emailError: "",
      departmentError: "",
      mobileError: "",
      companyError: "",
      department: "",
      mobile: "",
      landLine: "",
      company: "",
      address: "",
      addressError: "",
      countryError: "",
      cityError: "",
      pincodeError: "",
      mobileCountryCode: "",
      landlineCountryCode: "",
      invoiceNumber: "",
      data: "",

      country: "",
      city: "",
      pincode: "",
      otp: "",
      submitted: false,
      resendOtpSuccess: false,
      isValidatdOtpSuccess: false,
      showotpModal: "false",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { invoiceNumber } = this.state;
    if (invoiceNumber)
      this.props.history.push(
        "/waiveoffotp?invoiceNumber=" + this.state.invoiceNumber
      );
    this.props.requestInvoiceNumber(invoiceNumber);
  }

  handleClose = () => {
    this.setState({ showotpModal: false });
  };

  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  componentDidMount() {
    let url = this.props.location.search;
    let params = queryString.parse(url);
    this.state.firstName = params.firstName;
    this.state.mobile = params.mobile;
    this.state.lastName = params.lastName;
    this.state.email = params.email;
    this.state.department = params.department;
    this.state.country = params.country;
    this.state.company = params.company;
    this.state.city = params.city;
    this.state.address = params.address;
    this.state.pincode = params.pincode;
    this.state.mobileCountryCode = params.mobileCountryCode;
    this.state.landLine = params.landLine;
    this.state.landlineCountryCode = params.landlineCountryCode;

    // this.props.requestinvoiceNumber = params.invoiceNumber;

    //console.log('otpchecking'+this.state.otp)
    //console.log('firstName'+this.state.firstName)
    //console.log('cityOTP'+this.state.city)
    //console.log('invoiceNumber'+this.state.invoiceNumber)
  }
  requestinvoiceNumber = (invoiceNumber) => {
    console.log("invoiceNumber-----" + " and " + JSON.stringify(invoiceNumber));
    this.setState({});
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("otpchecking" + this.state.otp);

    if (this.props.invoiceSuccess !== prevProps.invoiceSuccess) {
      if (this.props.invoiceSuccess.success === true) {
        this.setState({
          drop: this.props.invoicesuccess.invoiceSuccess,
        });
      }
    }
    if (this.props.isValidatdOtpSuccess !== prevProps.isValidatdOtpSuccess) {
      {
        /*if (this.state.submitted && this.props.isValidatdOtpSuccess.success) {
            this.props.history.push('/RegisterPassword?firstName=' + this.state.firstName+ '&mobile=' + this.state.mobile+ '&email=' + this.state.email +
            '&lastName=' + this.state.lastName+  '&department=' + this.state.department+ '&company=' + this.state.company
            +'&country=' + this.state.country+'&city=' + this.state.city+'&address=' + this.state.address + '&landLine=' + this.state.landLine+'&landlineCountryCode=' + this.state.landlineCountryCode
            +'&pincode=' + this.state.pincode +'&mobileCountryCode=' + this.state.mobileCountryCode+ '&otp=' + this.state.otp);

          } */
      }
      if (this.state.submitted && !this.props.isValidateOtpSuccess.success) {
        Swal.fire({
          title: "",
          text: this.props.isValidateOtpSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
      this.setState({ submitted: false });
    }

    if (this.props.resendOtpSuccess !== prevProps.resendOtpSuccess) {
      if (this.state.submitted && this.props.resendOtpSuccess.success) {
        if (this.state.location === "India") {
          Swal.fire({
            title: "",
            text: "OTP has been sent to your mobile number",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        } else if (this.state.location === "Other") {
          Swal.fire({
            title: "",
            text: "OTP has been sent to your email ID",
            icon: "info",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        }
      } else {
        Swal.fire({
          title: "",
          text: this.props.resendOtpSuccess.message,
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
      this.setState({ submitted: false });
    }
  }

  resendChange = () => {
    this.setState({ submitted: true });
    console.log("resendchecking" + this.state.otp);
    console.log("firstName" + this.state.firstName);
    console.log("lastName" + this.state.lastName);
    console.log("department" + this.state.department);
    console.log("landline" + this.state.landLine);
    console.log("landline code" + this.state.landlineCountryCode);
    console.log("mobile" + this.state.mobile);
    console.log("mobilecode" + this.state.mobileCountryCode);

    const {
      firstName,
      lastName,
      mobile,
      email,
      department,
      mobileCountryCode,
      landlineCountryCode,
      landLine,
      country,
      city,
      address,
      company,
      pincode,
    } = this.state;
    if (
      firstName &&
      lastName &&
      mobile &&
      email &&
      department &&
      mobileCountryCode &&
      country &&
      company &&
      address &&
      city &&
      pincode
    ) {
      if (
        this.state.landLine !== undefined &&
        this.state.landLine !== null &&
        this.state.landlineCountryCode !== undefined &&
        this.state.landlineCountryCode !== null
      )
        this.props.clickResendOtp(
          firstName,
          lastName,
          mobile,
          email,
          department,
          mobileCountryCode,
          landlineCountryCode,
          landLine,
          country,
          company,
          address,
          city,
          pincode
        );
    } else {
      this.props.clickResendOtp(
        firstName,
        lastName,
        mobile,
        email,
        department,
        mobileCountryCode,
        "",
        "",
        country,
        company,
        address,
        city,
        pincode
      );
    }
  };

  render() {
    const { invoiceNumber, submitted } = this.state;
    return (
      <div>
        <Header />
        <div className="view">
          <section className="generic-banner relative banner-area-inner4"></section>
        </div>
        <Container>
          <Modal
            show={this.state.showotpModal}
            style={{ marginTop: 200 }}
            backdrop={"static"}
          >
            <Modal.Title style={{ textAlign: "center", marginTop: 10 }}>
              Enter Invoice Number{" "}
            </Modal.Title>
            <Modal.Body>
              <div className="md-form mb-2" onSubmit={this.handleSubmit}>
                <input
                  type="invoiceNumber"
                  id="defaultForm-email"
                  className="form-control validate"
                  name="invoiceNumber"
                  value={invoiceNumber}
                  maxLength={100}
                  minLength={100}
                  onInput={this.maxLengthCheck}
                  onChange={this.handleChange}
                />

                {submitted && !invoiceNumber && (
                  <div
                    style={{ fontSize: 12, color: "red" }}
                    className="nav-left "
                  >
                    Customer invoice is required
                  </div>
                )}

                <label
                  data-error="wrong"
                  data-success="right"
                  for="defaultForm-email"
                >
                  Enter your customer invoice
                </label>
              </div>

              <Row className="justify-content-md-center"></Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="genric-btn primary radius text-uppercase"
                variant=" "
                onClick={this.handleSubmit}
                style={{ marginTop: 10 }}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
        <Footer />
      </div>
    );
  }
}

waiveOffInvoice.propTypes = {
  requestinvoiceNumber: PropTypes.func,
  invoiceSuccess: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    invoiceNumber: state.waiveoffReducer.invoiceNumber,
    invoiceSuccess: state.waiveoffReducer.invoiceSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestInvoiceNumber: (invoiceNumber) =>
    dispatch(requestInvoiceNumber(invoiceNumber)),
});

connect(mapStateToProps, mapDispatchToProps)(waiveOffInvoice);

export default connect(mapStateToProps, mapDispatchToProps)(waiveOffInvoice);
