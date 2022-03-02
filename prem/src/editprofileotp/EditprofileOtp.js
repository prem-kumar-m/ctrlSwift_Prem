import React from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer.js";
import * as Yup from "yup"; // for everything
import Swal from "sweetalert2";
import backgroundImage21 from "../images/inner-header-bg.jpg";
import { Redirect } from "react-router";
import {
  emailValidator,
  mobileValidator,
  firstNameValidator,
  lastNameValidator,
  companyValidator,
  addressValidator,
  pincodeValidator,
  cityValidator,
  departmentValidator,
  passwordValidator,
  landlineValidator,
  countryValidator,
  mobileCountryCodeValidator,
} from "../Core/utils";
import { verifyValidateOtp, resendOtp, updateUser } from "./action";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import queryString from "query-string";
import * as Constants from "../constants";

import backgroundImage from "../images/inner-header-bg.jpg";

class EditprofileOtp extends React.Component {
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
      num: "",
      transferemail: "",
      country: "",
      city: "",
      pincode: "",
      otp: "",
      submitted: false,
      resendOtpSuccess: false,
      isValidatdOtpSuccess: false,
      showotpModal: "false",
      isUpdateSuccess: false,
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
    const {
      firstName,
      lastName,
      email,
      department,
      mobileCountryCode,
      mobile,
      landlineCountryCode,
      landLine,
      company,
      address,
      country,
      city,
      pincode,
      transferemail,
      num,
      otp,
    } = this.state;
    const emailError = emailValidator(this.state.email);
    const mobileError = mobileValidator(this.state.mobile);

    const passwordError = passwordValidator(this.state.password);
    const firstNameError = firstNameValidator(this.state.firstName);
    const lastNameError = lastNameValidator(this.state.lastName);
    const departmentError = departmentValidator(this.state.department);
    const countryError = countryValidator(this.state.country);
    const cityError = cityValidator(this.state.city);
    const addressError = addressValidator(this.state.address);
    const pincodeError = pincodeValidator(this.state.pincode);

    const mobileCountryCodeError = mobileCountryCodeValidator(
      this.state.mobileCountryCode
    );
    if (
      emailError ||
      firstNameError ||
      lastNameError ||
      mobileError ||
      departmentError ||
      countryError ||
      cityError ||
      addressError ||
      pincodeError ||
      mobileCountryCodeError ||
      passwordError
    )
      this.setState({
        emailError: emailError,
        firstNameError: firstNameError,
        lastNameError: lastNameError,
        mobileError: mobileError,
        departmentError: departmentError,
        addressError: addressError,
        countryError: countryError,
        cityError: cityError,
        pincodeError: pincodeError,

        mobileCountryCodeError: mobileCountryCodeError,
        passwordError: passwordError,
      });

    this.setState({ submitted: true });
    console.log(
      "\n pincode----" +
        pincode +
        "\n first----" +
        firstName +
        "\n last----" +
        lastName +
        "\n mobile----" +
        mobile +
        "\n email----" +
        email +
        "\n department----" +
        department +
        "\n country----" +
        country +
        "\n city.label----" +
        city +
        "\n address----" +
        address +
        "\n company----" +
        company +
        "\n landline----" +
        landLine +
        "\n landlinecode----" +
        landlineCountryCode +
        "\n transferr----" +
        transferemail
    );
    if (
      firstName &&
      lastName &&
      email &&
      department &&
      mobileCountryCode &&
      mobile &&
      address &&
      city &&
      country &&
      pincode &&
      company &&
      departmentError == "" &&
      firstNameError === "" &&
      lastNameError === "" &&
      mobileError === "" &&
      departmentError == "" &&
      addressError === "" &&
      countryError === "" &&
      cityError === "" &&
      pincodeError === "" &&
      mobileCountryCodeError === ""
    )
      if (otp.length === 6) {
        if (
          this.state.landLine !== undefined &&
          this.state.landLine !== null &&
          this.state.landlineCountryCode !== undefined &&
          this.state.landlineCountryCode !== null &&
          this.state.num !== undefined &&
          this.state.num !== null &&
          this.state.transferemail !== undefined &&
          this.state.transferemail !== null
        ) {
          this.props.updateUserProfile(
            firstName,
            lastName,
            email,
            department,
            mobileCountryCode,
            mobile,
            landlineCountryCode,
            landLine,
            company,
            address,
            country,
            city,
            pincode,
            transferemail,
            num,
            otp
          );
        } else {
          this.props.updateUserProfile(
            firstName,
            lastName,
            email,
            department,
            mobileCountryCode,
            mobile,
            landlineCountryCode,
            landLine,
            company,
            address,
            country,
            city,
            pincode,
            transferemail,
            num,
            otp
          );

          //this.props.updateUserProfile(firstName,lastName, email,department,mobileCountryCode,mobile,'','',company,address,country,city,pincode,'','',otp);
        }
      }
  }
  resendChange = () => {
    console.log("resendchecking" + this.state.otp);
    console.log("firstName" + this.state.firstName);
    console.log("lastName" + this.state.lastName);
    console.log("department" + this.state.department);
    console.log("landline" + this.state.landLine);
    console.log("landline code" + this.state.landlineCountryCode);
    console.log("mobile" + this.state.mobile);
    console.log("mobilecode" + this.state.mobileCountryCode);
    console.log("email" + this.state.email);

    this.setState({ submitted: true });

    const { email } = this.state;
    if (email) {
      this.props.clickResendOtp(email);
    }
  };

  handleSubmit3 = () => {
    const { email } = this.state;
    this.setState({ submitted: true });
    if (email) {
      {
        this.props.clickResendOtp(email);
      }
    }
  };

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
    this.state.transferemail = params.tranferAdminAccessToEmail;
    this.state.num = params.num;

    console.log("otpchecking" + this.state.otp);
    console.log("firstName" + this.state.firstName);
    console.log("cityOTP" + this.state.city);
    console.log("cityOTP" + this.state.email);

    console.log("cityOTP" + this.state.transferemail);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(window.sessionStorage.getItem(Constants.ACCESS_EMAIL));
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
    console.log("otpchecking" + this.state.otp);
    if (this.props.isUpdateSuccess !== prevProps.isUpdateSuccess) {
      if (this.state.submitted && this.props.isUpdateSuccess.success) {
        Swal.fire({
          title: "Success",
          text: "updated Successfully",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        this.props.history.push("./editProfile");
      } else if (this.state.submitted && !this.props.isUpdateSuccess.success) {
        Swal.fire({
          title: "",
          text: this.props.isUpdateSuccess.message,
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

  render() {
    const { otp, submitted } = this.state;
    return (
      <div>
        <div className="view">
          <img
            src={backgroundImage21}
            className="img-fluid"
            alt="smaple image"
          />
        </div>
        <Container>
          <Modal
            show={this.state.showotpModal}
            style={{ marginTop: 200 }}
            backdrop={"static"}
          >
            <Modal.Title style={{ textAlign: "center", marginTop: 10 }}>
              Enter OTP{" "}
            </Modal.Title>
            <Modal.Body>
              <div className="md-form mb-2" onSubmit={this.handleSubmit}>
                <input
                  type="email"
                  id="defaultForm-email"
                  className="form-control validate"
                  name="otp"
                  value={otp}
                  maxLength={6}
                  minLength={6}
                  onInput={this.maxLengthCheck}
                  onChange={this.handleChange}
                />

                {submitted && !otp && (
                  <div
                    style={{ fontSize: 12, color: "red" }}
                    className="nav-left "
                  >
                    OTP is required
                  </div>
                )}
                {submitted && otp.length !== 6 && otp && (
                  <div
                    style={{ fontSize: 12, color: "red" }}
                    className="nav-left"
                  >
                    OTP is must be 6-digits
                  </div>
                )}
                <label
                  data-error="wrong"
                  data-success="right"
                  for="defaultForm-email"
                >
                  Enter your OTP
                </label>
              </div>

              <Row className="justify-content-md-center">
                <Button
                  className="genric-btn primary radius text-uppercase"
                  variant=" "
                  onClick={this.handleSubmit}
                  style={{ marginTop: 10 }}
                >
                  VERIFY
                </Button>

                <Button
                  className="genric-btn primary radius text-uppercase"
                  variant=" "
                  onClick={this.handleSubmit3}
                  style={{ marginTop: 10, marginLeft: 40 }}
                >
                  RESEND
                </Button>
              </Row>
            </Modal.Body>
          </Modal>
        </Container>
        <Footer />
      </div>
    );
  }
}

EditprofileOtp.propTypes = {
  verifyValidateOtp: PropTypes.func,
  resendOtp: PropTypes.func,
  updateUser: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    isValidatdOtpSuccess: state.updateReducer.isValidatdOtpSuccess,
    resendOtpSuccess: state.updateReducer.resendOtpSuccess,
    isUpdateSuccess: state.updateReducer.isUpdateSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // submitverifyUpdateOtp: (email,otp) => dispatch(verifyValidateOtp(email,otp)),
  clickResendOtp: (email) => dispatch(resendOtp(email)),
  updateUserProfile: (
    firstName,
    lastName,
    email,
    department,
    mobileCountryCode,
    mobile,
    landlineCountryCode,
    landLine,
    company,
    address,
    country,
    city,
    pincode,
    transferemail,
    num,
    otp
  ) =>
    dispatch(
      updateUser(
        firstName,
        lastName,
        email,
        department,
        mobileCountryCode,
        mobile,
        landlineCountryCode,
        landLine,
        company,
        address,
        country,
        city,
        pincode,
        transferemail,
        num,
        otp
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditprofileOtp);
