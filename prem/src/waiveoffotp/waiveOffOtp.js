import { PropTypes } from "prop-types";
import queryString from "query-string";
import React from "react";
import { Button, Container, Modal, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Footer from "../components/footer/Footer.js";
import Header from "../components/headerwaiveoff/Header";
import { requestInvoiceOtp, resendOtp } from "./action";


class waiveOffOtp extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      invoiceOtp: "",
      invoiceNumber: "",

      submitted: false,
      resendOtpSuccess: true,
      isValidatdOtpSuccess: false,
      showotpModal: "false",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOtp = this.handleOtp.bind(this);
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

    const { invoiceNumber, invoiceOtp } = this.state;
    if (invoiceNumber && invoiceOtp && invoiceOtp.length == 6) {
      console.log("good");
      this.props.requestInvoiceOtp(invoiceOtp, invoiceNumber);
    }
  }

  handleOtp = () => {
    console.log("otp resent");
    console.log("this.state.invoiceNumber \n" + this.state.invoiceNumber);
    const { invoiceNumber, invoiceOtp } = this.state;
    if (invoiceNumber) {
      console.log("otp resent");
      this.props.requestresendOtp(invoiceNumber);
    }
  };

  handleClose = () => {
    this.setState({ showinvoiceOtpModal: false });
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

    this.state.invoiceNumber = params.invoiceNumber;
    this.state.invoiceOtp = params.invoiceOtp;
    this.state.resendOtp = params.resendOtp;
    console.log("otpchecking" + this.state.invoiceOtp);

    console.log("resendOtp" + this.state.resendOtp);
  }
  //resendOtp = (invoiceCode) => {
  // console.log('invoiceCode-----' +  ' and ' + JSON.stringify(invoiceCode));
  //this.setState({

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("otpchecking" + this.state.invoiceOtp);
    if (
      this.props.isValidatdinvoiceOtpSuccess !== prevProps.isValidatdotpSuccess
    ) {
      if (this.state.submitted && this.props.isValidatdOtpSuccess.success) {
        this.props.history.push(
          "/invoiceOtp?invoiceNumber=" +
            this.state.invoiceNumber +
            "&invoiceOtp=" +
            this.state.invoiceOtp
        );
      } else if (
        this.state.submitted &&
        !this.props.isValidatdOtpSuccess.success
      ) {
        Swal.fire({
          title: "",
          text: this.props.isValidatdinvoiceOtpSuccess.message,
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
      this.setState({ submitted: false });
    }

    if (this.props.otpSuccess !== prevProps.otpSuccess) {
      if (this.state.submitted && this.props.otpSuccess.success === true) {
        Swal.fire({
          title: "",
          text: " Waived Code verification Success, Waived Off!",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.value) {
            window.location.href = "/";
          }
        });
      } else if (
        this.state.submitted &&
        this.props.otpSuccess.success === false
      ) {
        Swal.fire({
          title: "",
          text: "Invalid Code",
          icon: "info",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "",
          text: this.props.resendOtpSuccess.message,
          icon: "info",
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
    console.log("invoiceOtp" + this.state.invoiceOtp);
    console.log("invoiceNumber" + this.state.invoiceNumber);

    const { invoiceOtp, invoiceNumber } = this.state;
    if (invoiceOtp && invoiceNumber) {
      if (
        this.state.invoiceOtp !== undefined &&
        this.state.invoiceNumber !== null &&
        this.state.invoiceOtp !== undefined &&
        this.state.invoiceNumber !== null
      )
        this.props.clickResendOtp(invoiceOtp, invoiceNumber);
    } else {
      this.props.clickResendOtp(invoiceOtp, invoiceNumber);
    }
  };

  render() {
    const { invoiceOtp, submitted } = this.state;

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
              Enter waiveOff Code{" "}
            </Modal.Title>
            <Modal.Body>
              <div className="md-form mb-2" onSubmit={this.handleSubmit}>
                <input
                  type="email"
                  id="defaultForm-email"
                  className="form-control validate"
                  name="invoiceOtp"
                  value={this.state.invoiceOtp}
                  maxLength={6}
                  minLength={6}
                  onInput={this.maxLengthCheck}
                  onChange={this.handleChange}
                />

                {submitted && !invoiceOtp && (
                  <div
                    style={{ fontSize: 12, color: "red" }}
                    className="nav-left "
                  >
                   waiveOff Code is required
                  </div>
                )}
                {submitted && invoiceOtp && invoiceOtp.length !== 6 && (
                  <div
                    style={{ fontSize: 12, color: "red" }}
                    className="nav-left"
                  >
                    waiveOff Code is must be 6-digits
                  </div>
                )}
                <label
                  data-error="wrong"
                  data-success="right"
                  for="defaultForm-email"
                >
                  Enter your WaiveOff Code
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
                VERIFY
              </Button>

              <Button
                className="genric-btn primary radius text-uppercase"
                variant=" "
                onClick={this.handleOtp}
                style={{ marginTop: 10, marginLeft: 40 }}
              >
                RESEND Code
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
        <Footer />
      </div>
    );
  }
}

waiveOffOtp.propTypes = {
  requestInvoiceOtp: PropTypes.func,
  resendOtp: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    invoiceOtp: state.waiveoffReducer.invoiceOtp,
    otpSuccess: state.waiveoffOtpReducer.otpSuccess,

    resendOtpSuccess: state.waiveoffOtpReducer.resendOtpSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestInvoiceOtp: (invoiceOtp, invoiceNumber) =>
    dispatch(requestInvoiceOtp(invoiceOtp, invoiceNumber)),
  requestresendOtp: (invoiceNumber) => dispatch(resendOtp(invoiceNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(waiveOffOtp);
